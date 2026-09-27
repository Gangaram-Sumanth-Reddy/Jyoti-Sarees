import { getPhoneCountry, isValidMobileForCountry } from "@/lib/contact";
import {
  hasErrors,
  isValidEmail,
  readBoolean,
  readString,
  type FieldErrors,
  type ParseResult,
} from "@/lib/form-validation";
import { isValidIndianPincode } from "@/lib/india-pincodes";

/**
 * Only name, contact number and the saree requirement are needed to answer an
 * enquiry. Everything else is optional and only helps with availability and
 * delivery questions.
 */
export type EnquiryInput = {
  fullName: string;
  countryIso: string;
  mobile: string;
  email: string;
  address: string;
  pincode: string;
  state: string;
  city: string;
  requirement: string;
  quantity: string;
  marketingConsent: boolean;
};

export type EnquiryErrors = FieldErrors<EnquiryInput>;

export const emptyEnquiry: EnquiryInput = {
  fullName: "",
  countryIso: "IN",
  mobile: "",
  email: "",
  address: "",
  pincode: "",
  state: "",
  city: "",
  requirement: "",
  quantity: "1",
  marketingConsent: false,
};

const limits = {
  fullName: 100,
  countryIso: 3,
  mobile: 15,
  email: 254,
  address: 300,
  pincode: 6,
  state: 60,
  city: 80,
  requirement: 500,
  quantity: 3,
} as const;

export function validateEnquiry(form: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const country = getPhoneCountry(form.countryIso);

  if (!form.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!isValidMobileForCountry(form.countryIso, form.mobile)) {
    errors.mobile = `Enter a valid ${country.digits}-digit number for ${country.code}.`;
  }
  if (form.email.trim() && !isValidEmail(form.email.trim())) {
    errors.email = "Enter a valid email address, or leave this blank.";
  }
  if (form.pincode.trim() && !isValidIndianPincode(form.pincode)) {
    errors.pincode = "Enter a valid 6-digit PIN code, or leave this blank.";
  }
  if (!form.requirement.trim()) {
    errors.requirement = "Tell us the saree type or requirement.";
  }
  const qty = Number(form.quantity);
  if (!Number.isInteger(qty) || qty < 1 || qty > 999) {
    errors.quantity = "Enter a quantity between 1 and 999.";
  }

  return errors;
}

/** Server-side parsing of an untrusted enquiry payload. */
export function parseEnquiry(body: unknown): ParseResult<EnquiryInput> {
  const data: EnquiryInput = {
    fullName: readString(body, "fullName", limits.fullName),
    countryIso: readString(body, "countryIso", limits.countryIso) || "IN",
    mobile: readString(body, "mobile", limits.mobile).replace(/\D/g, ""),
    email: readString(body, "email", limits.email),
    address: readString(body, "address", limits.address),
    pincode: readString(body, "pincode", limits.pincode),
    state: readString(body, "state", limits.state),
    city: readString(body, "city", limits.city),
    requirement: readString(body, "requirement", limits.requirement),
    quantity: readString(body, "quantity", limits.quantity),
    marketingConsent: readBoolean(body, "marketingConsent"),
  };
  const errors = validateEnquiry(data);
  return hasErrors(errors) ? { ok: false, errors } : { ok: true, data };
}
