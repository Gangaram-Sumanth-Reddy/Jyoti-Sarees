import {
  getCountryByCodeAndIso,
  sortedCountryCodes,
  type CountryDialCode,
} from "@/lib/country-codes";
import { site } from "@/lib/site";
import { whatsappGeneralUrl } from "@/lib/whatsapp";

export type ContactAddress = {
  id: string;
  label: string;
  lines: readonly string[];
  mapsHref: string;
};

function mapsSearchUrl(lines: readonly string[]) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lines.join(" "))}`;
}

export const contactAddresses: ContactAddress[] = site.stores.map((store) => ({
  id: store.id,
  label: store.city,
  lines: store.lines,
  mapsHref: mapsSearchUrl(store.mapLines),
}));

export const bulkOrders = {
  minimum: "50–500 pieces and above, if available",
  types: [
    "Uniforms for traditional functions",
    "Parties",
    "School uniforms",
    "Office uniforms",
    "Gifting purposes",
  ],
} as const;

export const contactSocials = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: whatsappGeneralUrl,
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
    message: string;
  },
) {
  const details = [
    ["Name", payload.name],
    ["Mobile", payload.mobile],
    ["Email", payload.email],
    ["Address", payload.address],
    ["PIN code", payload.pincode],
    ["State", payload.state],
    ["City", payload.city],
    ["Message", payload.message],
  ]
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`);

  const text = [
    `*${site.name} — Contact Enquiry*`,
    "",
    ...details,
    "",
    "Please share availability and details. Thank you.",
  ].join("\n");

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(text)}`;
}
