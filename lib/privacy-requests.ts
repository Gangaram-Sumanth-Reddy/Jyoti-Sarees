import {
  hasErrors,
  isValidEmail,
  readString,
  type FieldErrors,
  type ParseResult,
} from "@/lib/form-validation";

export const privacyRequestTypes = [
  {
    value: "access",
    label: "Access my personal data",
    description: "Ask for a summary of the personal data we hold about you and how it is used.",
  },
  {
    value: "correction",
    label: "Correct or update my data",
    description: "Fix details that are inaccurate, incomplete or out of date.",
  },
  {
    value: "deletion",
    label: "Delete my data",
    description:
      "Ask us to erase your data where we no longer need it or are not required by law to keep it.",
  },
  {
    value: "withdraw_consent",
    label: "Withdraw consent",
    description:
      "Stop marketing messages or withdraw consent you gave, such as for a published testimonial.",
  },
  {
    value: "grievance",
    label: "Raise a grievance or complaint",
    description: "Tell us about a concern with how your personal data has been handled.",
  },
] as const;

export type PrivacyRequestType = (typeof privacyRequestTypes)[number]["value"];

export type PrivacyRequestInput = {
  name: string;
  contact: string;
  requestType: PrivacyRequestType | "";
  description: string;
};

export type PrivacyRequestErrors = FieldErrors<PrivacyRequestInput>;

export const emptyPrivacyRequest: PrivacyRequestInput = {
  name: "",
  contact: "",
  requestType: "",
  description: "",
};

const limits = { name: 100, contact: 254, description: 2000 } as const;

function isValidContact(value: string) {
  if (isValidEmail(value)) return true;
  const digits = value.replace(/[\s()+-]/g, "");
  return /^\d{7,15}$/.test(digits);
}

export function getPrivacyRequestLabel(type: string) {
  return privacyRequestTypes.find((entry) => entry.value === type)?.label ?? type;
}

export function validatePrivacyRequest(data: PrivacyRequestInput): PrivacyRequestErrors {
  const errors: PrivacyRequestErrors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!isValidContact(data.contact.trim())) {
    errors.contact = "Enter the email address or mobile number you used with us.";
  }
  if (!privacyRequestTypes.some((entry) => entry.value === data.requestType)) {
    errors.requestType = "Please choose the type of request.";
  }
  if (!data.description.trim()) {
    errors.description = "Please describe your request so we can help.";
  }
  return errors;
}

/** Server-side parsing of an untrusted privacy request payload. */
export function parsePrivacyRequest(body: unknown): ParseResult<PrivacyRequestInput> {
  const data: PrivacyRequestInput = {
    name: readString(body, "name", limits.name),
    contact: readString(body, "contact", limits.contact),
    requestType: readString(body, "requestType", 32) as PrivacyRequestType,
    description: readString(body, "description", limits.description),
  };
  const errors = validatePrivacyRequest(data);
  return hasErrors(errors) ? { ok: false, errors } : { ok: true, data };
}
