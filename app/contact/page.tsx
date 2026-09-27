import { ContactAddresses } from "@/components/contact/ContactAddresses";
import { ContactEnquiryPanel } from "@/components/contact/ContactEnquiryPanel";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Jyoti Sarees — Saree Enquiries on WhatsApp",
  description:
    "Enquire about any saree at Jyoti Sarees on WhatsApp, by phone or through our enquiry form. Our team confirms availability and details with you — no online payment.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section className="overflow-x-clip pt-8 sm:pt-10 lg:pt-12">
        <Container className="max-w-[84rem]">
          <ContactEnquiryPanel />
        </Container>
      </Section>
      <ContactAddresses />
      <ContactFaq />
    </>
  );
}
