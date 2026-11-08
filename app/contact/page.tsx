import { ContactBulkOrders } from "@/components/contact/ContactBulkOrders";
import { ContactEnquiryPanel } from "@/components/contact/ContactEnquiryPanel";
import { ContactVisitAndFaq } from "@/components/contact/ContactVisitAndFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Contact Jyoti Sarees — Saree Enquiries on WhatsApp",
  description:
    "Visit Jyoti Sarees in Nabrangpur or Jeypore, or enquire on WhatsApp, by phone or email. Our team confirms availability and details with you — no online payment.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <Section className="overflow-x-clip pt-8 sm:pt-10 lg:pt-8">
        <Container className="max-w-[84rem]">
          <ContactEnquiryPanel />
        </Container>
      </Section>
      <ContactBulkOrders />
      <ContactVisitAndFaq />
    </>
  );
}
