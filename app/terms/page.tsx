import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { termsOfCondition } from "@/lib/legal";

export const metadata: Metadata = {
  title: termsOfCondition.title,
  description:
    "Terms of Condition for using the Jyoti Sarees website, enquiries, and order process.",
};

export default function TermsPage() {
  return <LegalDocumentView document={termsOfCondition} />;
}
