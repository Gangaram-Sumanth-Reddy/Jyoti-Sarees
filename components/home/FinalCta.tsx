import Link from "next/link";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy, site } from "@/lib/site";

export function FinalCta() {
  return (
    <Section tone="inverse" className="bg-midnight-gradient">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title={copy.finalCta.title}
            description={copy.finalCta.description}
            align="center"
            tone="inverse"
            className="mb-8 sm:mb-10"
          />
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 max-sm:mx-auto max-sm:grid max-sm:max-w-sm max-sm:grid-cols-2 max-sm:gap-[clamp(0.5rem,0.2rem+1.2vw,0.75rem)]">
            <ExternalButtonLink
              href={site.whatsappUrl}
              size="lg"
              className="border-transparent bg-white text-rich-black hover:bg-cream max-sm:min-w-0 max-sm:px-[clamp(0.5rem,0.1rem+1.6vw,1rem)] max-sm:text-[clamp(0.78rem,0.62rem+0.8vw,0.9375rem)] max-sm:tracking-[0.02em]"
            >
              WhatsApp Us
            </ExternalButtonLink>
            <ButtonLink
              href="/contact"
              variant="secondary"
              size="lg"
              className="border-white text-white hover:!border-white hover:!bg-white hover:!text-navy max-sm:min-w-0 max-sm:px-[clamp(0.5rem,0.1rem+1.6vw,1rem)] max-sm:text-[clamp(0.78rem,0.62rem+0.8vw,0.9375rem)] max-sm:tracking-[0.02em]"
            >
              Visit Our Store
            </ButtonLink>
          </div>
          <p className="mt-8 text-small text-white/75">
            Planning a larger order?{" "}
            <Link
              href="/contact"
              className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Bulk Enquiry
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
