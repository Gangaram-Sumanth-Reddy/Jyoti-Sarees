import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description:
    "How Jyoti Sarees collects, uses, and protects your personal information when you browse, enquire, or order.",
};

export default function PrivacyPage() {
  return <LegalDocumentView document={privacyPolicy} />;
}
