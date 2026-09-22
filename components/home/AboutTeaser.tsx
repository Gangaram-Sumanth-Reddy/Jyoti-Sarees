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
            <ButtonLink href="/about">Our Story</ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
