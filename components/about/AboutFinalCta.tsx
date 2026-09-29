import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/about";
import { site } from "@/lib/site";

export function AboutFinalCta() {
  return (
    <Section tone="inverse" className="bg-midnight-gradient">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-h2 text-inverse">
            {aboutContent.finalCta.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-body text-white/80">
            {aboutContent.finalCta.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
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
              className="border-white text-white hover:!border-white hover:!bg-white hover:!text-navy"
            >
              WhatsApp Us
            </ExternalButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
