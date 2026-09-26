import {
  getCountryByCodeAndIso,
  sortedCountryCodes,
  type CountryDialCode,
} from "@/lib/country-codes";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export type ContactAddress = {
  id: string;
  label: string;
  lines: string[];
};

export const contactAddresses: ContactAddress[] = [
  {
    id: "flagship",
    label: "Flagship store",
    lines: ["123 Main Road, Market Area", "Your City, India 000000"],
  },
  {
    id: "branch",
    label: "Branch",
    lines: ["45 Silk Street, Textile Lane", "Your City, India 000000"],
  },
];

export const contactSocials = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: site.whatsappUrl,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: site.instagramUrl,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: site.facebookUrl,
  },
] as const;

export { sortedCountryCodes };
export type { CountryDialCode };

export function getPhoneCountry(isoOrCode: string, code?: string): CountryDialCode {
  if (code) return getCountryByCodeAndIso(code, isoOrCode);
  const byIso = sortedCountryCodes.find((entry) => entry.iso === isoOrCode);
  if (byIso) return byIso;
  return getCountryByCodeAndIso(isoOrCode);
}

export function isValidMobileForCountry(iso: string, mobile: string) {
  const country = getPhoneCountry(iso);
  const digits = mobile.replace(/\D/g, "");
  if (digits.length !== country.digits) return false;
  if (country.iso === "IN") return /^[6-9]\d{9}$/.test(digits);
  return new RegExp(`^\\d{${country.digits}}$`).test(digits);
}

export const contactCopy = {
  hero: {
    title: "Get in Touch",
    description:
      "Share your enquiry and our team will help you find the right saree — no online payment required.",
  },
  form: {
    title: "Send an enquiry",
    description:
      "Tell us what you need. We will confirm availability and details with you.",
    successTitle: "Enquiry received",
    successDescription:
      "Thank you. Our team will review your request and get back to you shortly. For a quicker response, you can also message us on WhatsApp.",
  },
} as const;

/** Catalogue-driven saree type / requirement suggestions. */
export function getSareeRequirementSuggestions(): string[] {
  const values = new Set<string>();

  for (const product of products) {
    values.add(product.name);
    values.add(product.category);
    values.add(product.collection);
    values.add(product.fabric);
    if (product.occasion) values.add(product.occasion);
    if (product.design) values.add(product.design);
  }

  return [...values].sort((a, b) => a.localeCompare(b, "en"));
}

export function contactEnquiryWhatsAppUrl(
  baseUrl: string,
  payload: {
    name: string;
    mobile: string;
    email: string;
    address: string;
    pincode: string;
    state: string;
    city: string;
    requirement: string;
    quantity: string;
  },
) {
  const text = [
    `*${site.name} — Contact Enquiry*`,
    "",
    `Name: ${payload.name}`,
    `Mobile: ${payload.mobile}`,
    `Email: ${payload.email}`,
    `Address: ${payload.address}`,
    `PIN code: ${payload.pincode}`,
    `State: ${payload.state}`,
    `City: ${payload.city}`,
    `Saree / Requirement: ${payload.requirement}`,
    `Quantity: ${payload.quantity}`,
    "",
    "Please share availability and details. Thank you.",
  ].join("\n");

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(text)}`;
}
