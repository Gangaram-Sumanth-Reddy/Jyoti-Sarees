import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/lib/site";

export function AboutTeaser() {
  return (
    <Section tone="muted">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <ImageFrame aspect="landscape" radius="lg">
            <ImagePlaceholder label="About Jyoti Sarees" tone="navy" />
          </ImageFrame>
          <div>
            <SectionHeading
              title={copy.about.title}
              description={copy.about.description}
              className="mb-6 sm:mb-8 lg:mb-8"
            />
            <div className="max-sm:flex max-sm:justify-center">
              <ButtonLink href="/about" className="max-sm:gap-2.5 max-sm:pr-5">
                <span className="leading-none">Our Story</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 sm:hidden"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
