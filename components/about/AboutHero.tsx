import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/about";

export function AboutHero() {
  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <h1 className="text-h1 text-balance">{aboutContent.hero.title}</h1>
            <p className="mt-4 text-body text-muted sm:mt-5">
              {aboutContent.hero.description}
            </p>
          </div>
          <ImageFrame aspect="feature" radius="lg">
            <ImagePlaceholder label="Jyoti Sarees brand image" tone="midnight" />
          </ImageFrame>
        </div>
      </Container>
    </Section>
  );
}
