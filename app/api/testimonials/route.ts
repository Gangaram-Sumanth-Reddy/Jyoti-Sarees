import { privacyConfig } from "@/lib/privacy-config";
import { handleFormSubmission } from "@/lib/server/form-endpoint";
import { parseTestimonial } from "@/lib/testimonial-submissions";

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    formType: "testimonial",
    referencePrefix: "TST",
    parse: parseTestimonial,
    toRow: (data) => ({
      name: data.name,
      city: data.city || null,
      saree: data.saree || null,
      message: data.message,
      publicationConsent: true,
      consentText: privacyConfig.consentText.testimonialPublication,
      policyVersion: privacyConfig.policyVersion,
    }),
  });
}
