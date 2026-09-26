import type { Metadata } from "next";
import { ContactEnquiryPanel } from "@/components/contact/ContactEnquiryPanel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactCopy } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: contactCopy.hero.description,
};

export default function ContactPage() {
  return (
    <Section className="overflow-x-clip pt-8 sm:pt-10 lg:pt-12">
      <Container className="max-w-[84rem]">
        <ContactEnquiryPanel />
      </Container>
    </Section>
  );
}
