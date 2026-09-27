import { privacyConfig } from "@/lib/privacy-config";
import { handleFormSubmission } from "@/lib/server/form-endpoint";
import { parseTestimonial } from "@/lib/testimonial-submissions";

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    table: "testimonial_submissions",
    referencePrefix: "TST",
    parse: parseTestimonial,
    toRow: (data, reference) => ({
      reference,
      name: data.name,
      city: data.city || null,
      saree: data.saree || null,
      message: data.message,
      publication_consent: true,
      publication_consent_at: new Date().toISOString(),
      publication_consent_text: privacyConfig.consentText.testimonialPublication,
      policy_version: privacyConfig.policyVersion,
    }),
  });
}
