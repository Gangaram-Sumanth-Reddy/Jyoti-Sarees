import { ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export function NewArrivalsCta() {
  return (
    <Section tone="inverse" className="bg-midnight-gradient">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title="Looking for something you don't see here?"
            description="Tell us what you're looking for and our team will help you find it."
            align="center"
            tone="inverse"
            className="mb-8 sm:mb-10"
          />
          <ExternalButtonLink
            href={site.whatsappUrl}
            size="lg"
            className="border-transparent bg-white text-rich-black hover:bg-cream"
          >
            WhatsApp Us
          </ExternalButtonLink>
        </div>
      </Container>
    </Section>
  );
}
