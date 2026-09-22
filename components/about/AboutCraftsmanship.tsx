import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/about";

export function AboutCraftsmanship() {
  return (
    <Section tone="muted">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <ImageFrame aspect="portrait" radius="lg" className="lg:order-2">
            <ImagePlaceholder label="Craftsmanship" tone="navy" />
          </ImageFrame>
          <div className="lg:order-1">
            <SectionHeading
              title={aboutContent.craftsmanship.title}
              description={aboutContent.craftsmanship.description}
              className="mb-6 sm:mb-8 lg:mb-8"
            />
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
              {aboutContent.craftsmanship.points.map((point) => (
                <li
                  key={point.title}
                  className="rounded-md border border-border bg-white px-4 py-4"
                >
                  <h3 className="text-h3">{point.title}</h3>
                  <p className="mt-2 text-small text-muted">{point.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
