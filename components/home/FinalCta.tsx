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
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <ExternalButtonLink
              href={site.whatsappUrl}
              size="lg"
              className="border-transparent bg-white text-rich-black hover:bg-cream"
            >
              WhatsApp Us
            </ExternalButtonLink>
            <ButtonLink
              href="/contact"
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-rich-black"
            >
              Visit Our Store
            </ButtonLink>
          </div>
          <p className="mt-8 text-small text-white/75">
            Planning a larger order?{" "}
            <Link
              href="/contact#bulk-enquiry"
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
