import { site } from "@/lib/site";

/** WhatsApp chat link with a pre-filled, URL-encoded message. */
export function whatsappMessageUrl(text: string, baseUrl: string = site.whatsappUrl) {
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(text)}`;
}

/** General contact message for the floating WhatsApp button — never the cart order. */
export function generalEnquiryMessage(websiteUrl?: string) {
  const lines = [
    `Hello ${site.name}, I'm interested in your saree collection. Please help me with available designs, prices and ordering details.`,
  ];
  if (websiteUrl) lines.push("", `Website: ${websiteUrl}`);
  return lines.join("\n");
}
