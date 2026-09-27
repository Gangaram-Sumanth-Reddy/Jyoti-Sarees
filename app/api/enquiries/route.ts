import { getPhoneCountry } from "@/lib/contact";
import { parseEnquiry } from "@/lib/enquiry";
import { privacyConfig } from "@/lib/privacy-config";
import { handleFormSubmission } from "@/lib/server/form-endpoint";

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    table: "enquiries",
    referencePrefix: "ENQ",
    parse: parseEnquiry,
    toRow: (data, reference) => ({
      reference,
      full_name: data.fullName,
      phone_country_code: getPhoneCountry(data.countryIso).code,
      phone: data.mobile,
      email: data.email || null,
      address: data.address || null,
      pincode: data.pincode || null,
      state: data.state || null,
      city: data.city || null,
      requirement: data.requirement,
      quantity: Number(data.quantity),
      marketing_consent: data.marketingConsent,
      marketing_consent_at: data.marketingConsent ? new Date().toISOString() : null,
      marketing_consent_text: data.marketingConsent
        ? privacyConfig.consentText.marketing
        : null,
      policy_version: privacyConfig.policyVersion,
    }),
  });
}
