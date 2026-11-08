import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { termsOfCondition } from "@/lib/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: termsOfCondition.title,
  description:
    "Terms & Conditions for using the Jyoti Sarees website and making saree enquiries over WhatsApp, phone or email.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalDocumentView document={termsOfCondition} />;
}
