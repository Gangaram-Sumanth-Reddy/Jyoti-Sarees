import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { privacyPolicy } from "@/lib/privacy-policy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: privacyPolicy.title,
  description:
    "How Jyoti Sarees collects, uses, retains and protects personal data shared through enquiries, testimonials and WhatsApp, and how to exercise your privacy rights.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalDocumentView document={privacyPolicy} />;
}
