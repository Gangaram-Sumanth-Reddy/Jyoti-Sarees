import { site } from "@/lib/site";

export type StoreLocation = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  phoneHref: string;
  hours: string;
  mapEmbedUrl: string;
  directionsUrl: string;
};

/** Placeholder store data — replace with verified locations before launch. */
export const stores: StoreLocation[] = [
  {
    id: "flagship",
    name: "Jyoti Sarees — Flagship",
    city: "Your City",
    address: "123 Main Road, Market Area, Your City, India 000000",
    phone: site.phone,
    phoneHref: site.phoneHref,
    hours: "Mon–Sat: 10:30 AM – 8:00 PM · Sun: 11:00 AM – 7:00 PM",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Your+City+India&output=embed",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jyoti+Sarees+Your+City",
  },
  {
    id: "branch",
    name: "Jyoti Sarees — Branch",
    city: "Your City",
    address: "45 Silk Street, Textile Lane, Your City, India 000000",
    phone: site.phone,
    phoneHref: site.phoneHref,
    hours: "Mon–Sat: 10:30 AM – 8:00 PM · Sun: Closed",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Silk+Street+Your+City&output=embed",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jyoti+Sarees+Silk+Street+Your+City",
  },
];

export const contactOptions = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Saree enquiries and quick assistance",
    href: site.whatsappUrl,
    cta: "WhatsApp Us",
    external: true,
  },
  {
    id: "call",
    title: "Call Us",
    description: "Direct enquiries",
    href: site.phoneHref,
    cta: "Call Now",
    external: false,
  },
  {
    id: "email",
    title: "Email",
    description: "General/business enquiries",
    href: `mailto:${site.email}`,
    cta: "Email Us",
    external: false,
  },
] as const;

export const enquiryTypes = [
  { value: "general", label: "General" },
  { value: "saree", label: "Saree Enquiry" },
  { value: "bulk", label: "Bulk Order" },
  { value: "other", label: "Other" },
] as const;

export const contactCopy = {
  hero: {
    title: "Visit or Get in Touch",
    description:
      "Have a question, looking for a specific saree, or interested in a bulk order? Our team is here to help.",
  },
  stores: {
    title: "Store Locations",
    description:
      "Visit us in person to explore the collection. Address and hours below are placeholders until confirmed by the brand.",
  },
  options: {
    title: "Contact Options",
    description: "Choose the channel that works best for you.",
  },
  bulk: {
    title: "Bulk & Business Enquiries",
    description:
      "Planning a larger order for an event, boutique or business? Share your requirements and our team will get back to you with suitable options.",
  },
  general: {
    title: "General Enquiry",
    description: "Send us a message and we will respond as soon as we can.",
  },
  finalCta: {
    title: "Looking for a particular saree?",
    description:
      "Tell us what you're looking for and our team will help you find it.",
  },
} as const;

export function bulkWhatsAppUrl(baseUrl: string) {
  const text =
    "Hi Jyoti Sarees, I would like to discuss a bulk / business enquiry.";
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(text)}`;
}
