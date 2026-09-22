import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";

export function NewArrivalsHero() {
  return (
    <Section className="pb-8 pt-8 sm:pb-10 sm:pt-10 lg:pb-12 lg:pt-12">
      <Container>
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <div className="max-w-xl">
            <h1 className="text-h1 text-balance">New Arrivals</h1>
            <p className="mt-3 text-body text-muted sm:mt-4">
              Discover the latest sarees added to the Jyoti Sarees collection.
            </p>
          </div>
          <ImageFrame aspect="wide" radius="lg" className="shadow-soft">
            <ImagePlaceholder label="New Arrivals" tone="midnight" />
          </ImageFrame>
        </div>
      </Container>
    </Section>
  );
}
