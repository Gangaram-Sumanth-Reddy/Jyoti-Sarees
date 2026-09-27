import { privacyConfig } from "@/lib/privacy-config";
import { parsePrivacyRequest } from "@/lib/privacy-requests";
import { handleFormSubmission } from "@/lib/server/form-endpoint";

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    table: "privacy_requests",
    referencePrefix: "PR",
    parse: parsePrivacyRequest,
    toRow: (data, reference) => ({
      reference,
      name: data.name,
      contact: data.contact,
      request_type: data.requestType,
      description: data.description,
      policy_version: privacyConfig.policyVersion,
    }),
  });
}
