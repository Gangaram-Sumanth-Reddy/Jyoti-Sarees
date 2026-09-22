import { ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy, site } from "@/lib/site";

const gallerySlots = [
  "Look 1",
  "Look 2",
  "Look 3",
  "Look 4",
  "Look 5",
  "Look 6",
] as const;

export function InstagramGallery() {
  return (
    <Section>
      <Container>
        <SectionHeading
          title={copy.instagram.title}
          description={copy.instagram.description}
          align="center"
          className="max-w-2xl"
        />
        <ul className="grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {gallerySlots.map((label) => (
            <li key={label}>
              <ImageFrame aspect="square" radius="md">
                <ImagePlaceholder label={label} />
              </ImageFrame>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center sm:mt-12">
          <ExternalButtonLink href={site.instagramUrl}>
            Follow Us on Instagram
          </ExternalButtonLink>
        </div>
      </Container>
    </Section>
  );
}
