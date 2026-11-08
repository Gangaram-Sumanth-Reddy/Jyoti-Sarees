import { site } from "@/lib/site";

/** WhatsApp chat link with a pre-filled, URL-encoded message. */
export function whatsappMessageUrl(text: string, baseUrl: string = site.whatsappUrl) {
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(text)}`;
}

function formalMessage(subject: string, body: readonly string[]) {
  return [
    `*JYOTI SAREES — ${subject}*`,
    "",
    "Hello Jyoti Sarees team,",
    "",
    ...body,
    "",
    "Thank you.",
  ].join("\n");
}

/** General contact message for "WhatsApp Us" buttons — never the cart order. */
export function generalEnquiryMessage() {
  return formalMessage("ENQUIRY", [
    "I am interested in your saree collection and would like some assistance.",
    "",
    "Kindly share the following:",
    "1. Latest designs and new arrivals",
    "2. Prices and availability",
    "3. Ordering and delivery details",
  ]);
}

/** Pre-filled "WhatsApp Us" link used by the header, menus, hero and floating button. */
export const whatsappGeneralUrl = whatsappMessageUrl(generalEnquiryMessage());

/** Single-saree enquiry from a product page. */
export function productEnquiryMessage(product: {
  name: string;
  sku?: string;
  colour?: string;
  priceLabel?: string;
  url?: string;
}) {
  const details = [
    `1. Saree: ${product.name}`,
    product.sku ? `SKU: ${product.sku}` : null,
    product.colour ? `Colour: ${product.colour}` : null,
    product.priceLabel ? `Listed price: ${product.priceLabel}` : null,
    product.url ? `Link: ${product.url}` : null,
  ]
    .filter((line): line is string => line !== null)
    .map((line, index) => (index === 0 ? line : `   ${line}`));

  return formalMessage("SAREE ENQUIRY", [
    "I am interested in the following saree.",
    "",
    "*Saree Details*",
    ...details,
    "",
    "Kindly confirm availability and share delivery details.",
  ]);
}

export const whatsappFeedbackUrl = whatsappMessageUrl(
  formalMessage("FEEDBACK", [
    "I would like to share feedback about my experience with Jyoti Sarees.",
    "",
    "Saree purchased:",
    "My feedback:",
  ]),
);

export const whatsappPrivacyUrl = whatsappMessageUrl(
  formalMessage("PRIVACY REQUEST", [
    "I would like to make a request about my personal data.",
    "",
    "Name:",
    "Registered phone number:",
    "Request (access / correction / deletion / stop marketing):",
  ]),
);
