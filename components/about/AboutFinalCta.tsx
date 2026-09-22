import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/about";
import { site } from "@/lib/site";

export function AboutFinalCta() {
  return (
    <Section tone="inverse" className="bg-midnight-gradient">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title={aboutContent.finalCta.title}
            description={aboutContent.finalCta.description}
            align="center"
            tone="inverse"
            className="mb-8 sm:mb-10"
          />
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href="/sarees"
              size="lg"
              className="border-transparent bg-white text-rich-black hover:bg-cream"
            >
              Explore Sarees
            </ButtonLink>
            <ExternalButtonLink
              href={site.whatsappUrl}
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-rich-black"
            >
              WhatsApp Us
            </ExternalButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
