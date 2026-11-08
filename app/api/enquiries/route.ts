import { getPhoneCountry } from "@/lib/contact";
import { parseEnquiry } from "@/lib/enquiry";
import { privacyConfig } from "@/lib/privacy-config";
import { handleFormSubmission } from "@/lib/server/form-endpoint";

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    formType: "enquiry",
    referencePrefix: "ENQ",
    parse: parseEnquiry,
    toRow: (data) => ({
      fullName: data.fullName,
      countryCode: getPhoneCountry(data.countryIso).code,
      phone: data.mobile,
      email: data.email || null,
      state: data.state || null,
      city: data.city || null,
      pincode: data.pincode || null,
      address: data.address || null,
      message: data.message,
      policyVersion: privacyConfig.policyVersion,
    }),
  });
}
