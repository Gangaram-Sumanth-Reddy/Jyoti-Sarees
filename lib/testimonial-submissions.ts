import {
  hasErrors,
  readBoolean,
  readString,
  type FieldErrors,
  type ParseResult,
} from "@/lib/form-validation";
import { products } from "@/lib/products";

export type TestimonialSubmission = {
  name: string;
  city: string;
  saree: string;
  message: string;
  publicationConsent: boolean;
};

export type TestimonialErrors = FieldErrors<TestimonialSubmission>;

export const emptyTestimonialSubmission: TestimonialSubmission = {
  name: "",
  city: "",
  saree: "",
  message: "",
  publicationConsent: false,
};

export const testimonialSareeOptions: string[] = [
  ...new Set(products.map((product) => product.name)),
].sort((a, b) => a.localeCompare(b, "en"));

const limits = { name: 80, city: 80, saree: 120, message: 1500 } as const;

export function validateTestimonial(data: TestimonialSubmission): TestimonialErrors {
  const errors: TestimonialErrors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!data.message.trim()) errors.message = "Please share a few words about your experience.";
  if (!data.publicationConsent) {
    errors.publicationConsent =
      "Please confirm we may publish your testimonial, or close this form.";
  }
  return errors;
}

/** Server-side parsing of an untrusted testimonial payload. */
export function parseTestimonial(body: unknown): ParseResult<TestimonialSubmission> {
  const data: TestimonialSubmission = {
    name: readString(body, "name", limits.name),
    city: readString(body, "city", limits.city),
    saree: readString(body, "saree", limits.saree),
    message: readString(body, "message", limits.message),
    publicationConsent: readBoolean(body, "publicationConsent"),
  };
  const errors = validateTestimonial(data);
  return hasErrors(errors) ? { ok: false, errors } : { ok: true, data };
}
