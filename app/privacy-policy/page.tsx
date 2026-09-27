import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { privacyPolicy } from "@/lib/privacy-policy";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description:
    "How Jyoti Sarees collects, uses, retains and protects personal data shared through enquiries, testimonials and WhatsApp, and how to exercise your privacy rights.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentView document={privacyPolicy} />;
}
