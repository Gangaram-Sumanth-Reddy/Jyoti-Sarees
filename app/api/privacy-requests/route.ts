import { privacyConfig } from "@/lib/privacy-config";
import { getPrivacyRequestLabel, parsePrivacyRequest } from "@/lib/privacy-requests";
import { handleFormSubmission } from "@/lib/server/form-endpoint";

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    formType: "privacy_request",
    referencePrefix: "PR",
    parse: parsePrivacyRequest,
    toRow: (data) => ({
      name: data.name,
      contact: data.contact,
      requestType: getPrivacyRequestLabel(data.requestType),
      description: data.description,
      policyVersion: privacyConfig.policyVersion,
    }),
  });
}
