import { getPhoneCountry, isValidMobileForCountry } from "@/lib/contact";
import type { EnquiryCartItem } from "@/lib/enquiry-cart";
import { hasErrors, readString, type FieldErrors } from "@/lib/form-validation";
import {
  cartItemHref,
  discountPercent,
  formatPrice,
  getProductBySlug,
  productHref,
  slugify,
} from "@/lib/products";

/** A cart line priced from the current catalogue (stored cart values are only a fallback). */
export type EnquiryLine = {
  key: string;
  slug: string;
  name: string;
  productId: string;
  colour: string;
  fabric: string;
  quantity: number;
  unitPrice: number;
  /** Catalogue MRP, only when it is higher than the selling price. */
  originalPrice?: number;
  discountPercent: number | null;
  lineTotal: number;
  lineOriginalTotal: number;
  /** Site-relative product page. */
  href: string;
  image?: string;
};

export type EnquirySummary = {
  uniqueCount: number;
  totalQuantity: number;
  mrpTotal: number;
  savings: number;
  total: number;
};

export function getEnquiryLines(items: readonly EnquiryCartItem[]): EnquiryLine[] {
  return items.map((item) => {
    const product = getProductBySlug(item.slug);
    const unitPrice = product?.price ?? item.price;
    const original = product?.originalPrice;
    const originalPrice = original !== undefined && original > unitPrice ? original : undefined;
    // Colour pages exist only for products with more than one colourway.
    const href = product
      ? product.colourOptions.length > 1
        ? productHref(product, item.colourId)
        : productHref(product)
      : cartItemHref(item);

    return {
      key: `${item.slug}::${item.colour}`,
      slug: item.slug,
      name: product?.name ?? item.name,
      productId: product?.productId ?? item.productId,
      colour: item.colour,
      fabric: product?.fabric ?? item.fabric,
      quantity: item.quantity,
      unitPrice,
      originalPrice,
      discountPercent: discountPercent(unitPrice, originalPrice),
      lineTotal: unitPrice * item.quantity,
      lineOriginalTotal: (originalPrice ?? unitPrice) * item.quantity,
      href,
      image: product?.gallery.find((entry) => entry.src)?.src,
    };
  });
}

export function summarizeEnquiry(lines: readonly EnquiryLine[]): EnquirySummary {
  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const mrpTotal = lines.reduce((sum, line) => sum + line.lineOriginalTotal, 0);
  return {
    uniqueCount: lines.length,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    mrpTotal,
    savings: mrpTotal - total,
    total,
  };
}

/** MRP and per-saree discount for a line; MRP equals the price when there is no confirmed discount. */
export function linePricing(line: EnquiryLine) {
  const mrp = line.originalPrice ?? line.unitPrice;
  return { mrp, discount: mrp - line.unitPrice };
}

/* ------------------------------------------------------------------------ */
/* Customer details and the lead saved to Google Sheets                      */
/* ------------------------------------------------------------------------ */

export const ENQUIRY_LEAD_SOURCE = "Enquiry Cart";
export const ENQUIRY_ID_PATTERN = /^JSE-[A-Z0-9]{8}$/;
export const ENQUIRY_MAX_LINES = 40;

const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** New enquiry ID, e.g. JSE-7K3M9QXA. Reused on retries so the sheet never gets the lead twice. */
export function createEnquiryId() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return `JSE-${Array.from(bytes, (byte) => ID_ALPHABET[byte % ID_ALPHABET.length]).join("")}`;
}

export type OrderCustomer = {
  fullName: string;
  countryIso: string;
  mobile: string;
};

export type OrderCustomerErrors = FieldErrors<OrderCustomer>;

export const emptyOrderCustomer: OrderCustomer = { fullName: "", countryIso: "IN", mobile: "" };

const customerLimits = { fullName: 100, countryIso: 3, mobile: 15 } as const;

export function validateOrderCustomer(customer: OrderCustomer): OrderCustomerErrors {
  const errors: OrderCustomerErrors = {};
  const name = customer.fullName.trim();
  if (!name) errors.fullName = "Please enter your full name.";
  else if (name.length < 2) errors.fullName = "Please enter your full name.";
  if (!isValidMobileForCountry(customer.countryIso, customer.mobile)) {
    const country = getPhoneCountry(customer.countryIso);
    errors.mobile =
      country.iso === "IN"
        ? "Enter a valid 10-digit Indian WhatsApp number (starting with 6–9)."
        : `Enter a valid ${country.digits}-digit WhatsApp number for ${country.code}.`;
  }
  return errors;
}

/** "+91 9876543210" */
export function formatCustomerWhatsApp(customer: OrderCustomer) {
  return `${getPhoneCountry(customer.countryIso).code} ${customer.mobile.replace(/\D/g, "")}`;
}

/** The cart part of the request body: only identifiers and quantities — prices come from the catalogue. */
export type OrderEnquiryItemInput = { slug: string; colour: string; quantity: number };

export type OrderEnquiryPayload = OrderCustomer & {
  enquiryId: string;
  items: OrderEnquiryItemInput[];
};

export type ParsedOrderEnquiry = {
  enquiryId: string;
  customer: OrderCustomer;
  lines: EnquiryLine[];
};

type OrderEnquiryErrors = OrderCustomerErrors & { items?: string; enquiryId?: string };

function readItems(body: unknown): EnquiryCartItem[] | null {
  const raw = (body as Record<string, unknown> | null)?.items;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > ENQUIRY_MAX_LINES) return null;

  const seen = new Set<string>();
  const items: EnquiryCartItem[] = [];
  for (const entry of raw) {
    const slug = readString(entry, "slug", 200);
    const colour = readString(entry, "colour", 80);
    const quantity = (entry as Record<string, unknown> | null)?.quantity;
    const product = slug ? getProductBySlug(slug) : undefined;
    if (!product || !colour || typeof quantity !== "number") return null;
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return null;

    const option = product.colourOptions.find((entry) => entry.label === colour);
    if (!option && colour !== product.colour) return null;

    const key = `${slug}::${colour}`;
    if (seen.has(key)) return null;
    seen.add(key);

    items.push({
      slug,
      productId: product.productId,
      name: product.name,
      price: product.price,
      priceLabel: product.priceLabel,
      colour,
      colourId: option?.id ?? slugify(colour),
      fabric: product.fabric,
      quantity,
      isNewArrival: product.isNewArrival,
    });
  }
  return items;
}

/** Server-side parsing of an untrusted cart enquiry. Prices are always re-read from the catalogue. */
export function parseOrderEnquiry(
  body: unknown,
): { ok: true; data: ParsedOrderEnquiry } | { ok: false; errors: OrderEnquiryErrors } {
  const customer: OrderCustomer = {
    fullName: readString(body, "fullName", customerLimits.fullName),
    countryIso: readString(body, "countryIso", customerLimits.countryIso) || "IN",
    mobile: readString(body, "mobile", customerLimits.mobile).replace(/\D/g, ""),
  };
  const errors: OrderEnquiryErrors = validateOrderCustomer(customer);

  const enquiryId = readString(body, "enquiryId", 12);
  if (!ENQUIRY_ID_PATTERN.test(enquiryId)) errors.enquiryId = "Invalid enquiry reference.";

  const items = readItems(body);
  if (!items) errors.items = "Your enquiry list has changed. Please review it and try again.";

  if (hasErrors(errors) || !items) return { ok: false, errors };
  return { ok: true, data: { enquiryId, customer, lines: getEnquiryLines(items) } };
}

/* ------------------------------------------------------------------------ */
/* WhatsApp message                                                          */
/* ------------------------------------------------------------------------ */

/**
 * WhatsApp text for a saved order enquiry. `origin` turns product paths into
 * absolute links; links are left out when the origin is not known yet.
 */
export function buildEnquiryOrderMessage(
  lines: readonly EnquiryLine[],
  origin: string,
  customer: OrderCustomer,
  enquiryId: string,
) {
  const summary = summarizeEnquiry(lines);

  const sarees = lines.map((line, index) => {
    const { mrp, discount } = linePricing(line);
    const rows = [
      `${index + 1}. ${line.name}`,
      `   SKU: ${line.productId}`,
      `   Quantity: ${line.quantity}`,
      `   MRP: ${formatPrice(mrp)}`,
      `   Discount: ${formatPrice(discount)}`,
      `   Price per saree: ${formatPrice(line.unitPrice)}`,
      `   Subtotal: ${formatPrice(line.lineTotal)}`,
    ];
    if (origin) rows.push(`   Link: ${origin}${line.href}`);
    return rows.join("\n");
  });

  return [
    "*JYOTI SAREES — ENQUIRY*",
    "",
    "Hello Jyoti Sarees team,",
    "",
    "I would like to enquire about the following sarees.",
    "",
    "*Customer Details*",
    `1. Name: ${customer.fullName.trim()}`,
    `2. WhatsApp: ${formatCustomerWhatsApp(customer)}`,
    `3. Enquiry ID: ${enquiryId}`,
    "",
    "*Selected Sarees*",
    sarees.join("\n\n"),
    "",
    "*Enquiry Summary*",
    `- Total designs: ${summary.uniqueCount}`,
    `- Total quantity: ${summary.totalQuantity}`,
    `- Total MRP: ${formatPrice(summary.mrpTotal)}`,
    `- Total savings: ${formatPrice(summary.savings)}`,
    `- *Enquiry total: ${formatPrice(summary.total)}*`,
    "",
    "Please confirm availability and final delivery details. Thank you.",
  ].join("\n");
}
