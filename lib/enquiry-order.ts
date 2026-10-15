import type { EnquiryCartItem } from "@/lib/enquiry-cart";
import {
  cartItemHref,
  discountPercent,
  formatPrice,
  getProductBySlug,
  productHref,
} from "@/lib/products";
import { site } from "@/lib/site";

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

/** WhatsApp text for an order enquiry. `origin` turns product paths into absolute links. */
export function buildEnquiryOrderMessage(lines: readonly EnquiryLine[], origin: string) {
  const summary = summarizeEnquiry(lines);
  const blocks = lines.map((line, index) => {
    const rows = [
      `*${index + 1}. ${line.name}*`,
      `SKU: ${line.productId}`,
      `Colour: ${line.colour}`,
      `Link: ${origin}${line.href}`,
      `Qty: ${line.quantity} × ${formatPrice(line.unitPrice)}`,
    ];
    if (line.originalPrice !== undefined && line.discountPercent !== null) {
      rows.push(`MRP: ${formatPrice(line.originalPrice)} (${line.discountPercent}% off)`);
    }
    rows.push(`Line total: ${formatPrice(line.lineTotal)}`);
    return rows.join("\n");
  });

  const totals = [
    `Different sarees: ${summary.uniqueCount} · Total quantity: ${summary.totalQuantity}`,
  ];
  if (summary.savings > 0) {
    totals.push(`MRP total: ${formatPrice(summary.mrpTotal)}`, `Discount: −${formatPrice(summary.savings)}`);
  }
  totals.push(`*Total enquiry value: ${formatPrice(summary.total)}*`);

  return [
    `*${site.name} — Order Enquiry*`,
    "",
    `Hello ${site.name}, I would like to order the following sarees:`,
    "",
    blocks.join("\n\n"),
    "",
    "--------------------",
    ...totals,
    "",
    "Please confirm stock availability, the final price and delivery details. I understand this is an enquiry — no order has been placed and no payment has been made yet.",
  ].join("\n");
}
