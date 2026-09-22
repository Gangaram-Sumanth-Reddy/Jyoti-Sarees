import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";

export function CatalogueHero() {
  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          <div className="max-w-xl">
            <h1 className="text-h1 text-balance">Sarees</h1>
            <p className="mt-4 text-body text-muted sm:mt-5">
              Explore our curated collection of sarees, from timeless traditional
              weaves to contemporary styles.
            </p>
          </div>
          <ImageFrame aspect="feature" radius="lg">
            <ImagePlaceholder label="Sarees collection" tone="midnight" />
          </ImageFrame>
        </div>
      </Container>
    </Section>
  );
}
