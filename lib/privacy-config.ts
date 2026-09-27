import { site } from "@/lib/site";

/**
 * Single source of truth for privacy-related business information.
 *
 * Values wrapped in `pending(...)` have NOT been confirmed by the business and
 * render as a visible "[To be confirmed: …]" marker wherever they appear.
 * Replace each one with the confirmed value (a plain string) before launch.
 * Retention periods in particular must be decided by the business with its
 * advisers — do not fill them in with guesses.
 */
const PENDING_PREFIX = "[To be confirmed: ";

export function pending(label: string) {
  return `${PENDING_PREFIX}${label}]`;
}

export function isPending(value: string) {
  return value.startsWith(PENDING_PREFIX);
}

export const pendingPattern = /\[To be confirmed: [^\]]+\]/g;

export type DataProcessor = {
  name: string;
  purpose: string;
  dataShared: string;
};

export const privacyConfig = {
  businessName: site.name,
  legalBusinessName: pending("Legal business name"),
  businessAddress: pending("Registered business address"),

  privacyEmail: pending("Privacy contact email"),
  grievanceOfficer: {
    name: pending("Grievance officer name / designation"),
    email: pending("Grievance contact email"),
    phone: pending("Grievance contact phone"),
    responseTime: pending("Grievance acknowledgement and resolution timelines"),
  },

  policyVersion: "1.0",
  lastUpdated: "27 September 2026",

  retention: {
    enquiries: pending("Enquiry data retention period"),
    testimonialSubmissions: pending(
      "Retention period for testimonials that are not published",
    ),
    publishedTestimonials: pending(
      "How long published testimonials stay on the website",
    ),
    marketingConsent: pending("Marketing consent record retention period"),
    privacyRequests: pending("Privacy request record retention period"),
    whatsappChats: pending("WhatsApp conversation retention period"),
  },

  processors: [
    {
      name: pending("Website hosting provider"),
      purpose: "Hosts this website and runs the server that receives form submissions.",
      dataShared: "Form submissions in transit and standard technical request logs.",
    },
    {
      name: pending("Database provider (e.g. Supabase)"),
      purpose: "Stores enquiries, testimonial submissions and privacy requests.",
      dataShared: "The details you submit through our forms.",
    },
    {
      name: "WhatsApp (Meta Platforms)",
      purpose: "Messaging, only when you choose to contact us on WhatsApp.",
      dataShared: "Your WhatsApp number, profile name and the messages you send.",
    },
  ] satisfies DataProcessor[],

  consentText: {
    marketing:
      "I would like to receive updates about new collections, offers and promotions from Jyoti Sarees.",
    testimonialPublication:
      "I agree that Jyoti Sarees may publish this testimonial on its website, along with my name and any city or saree I have provided.",
  },
} as const;

/** Where privacy requests are emailed until a dedicated privacy address is confirmed. */
export function privacyContactEmail() {
  return isPending(privacyConfig.privacyEmail)
    ? site.email
    : privacyConfig.privacyEmail;
}

export const privacyRoutes = {
  policy: "/privacy-policy",
  requests: "/privacy-requests",
} as const;
