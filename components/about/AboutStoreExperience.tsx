import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/about";

const storeImages = [
  "Store interior",
  "Collection display",
  "In-store experience",
] as const;

export function AboutStoreExperience() {
  return (
    <Section>
      <Container>
        <SectionHeading
          title={aboutContent.store.title}
          description={aboutContent.store.description}
          align="center"
          className="max-w-2xl"
        />
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3 lg:gap-5">
          {storeImages.map((label) => (
            <li key={label}>
              <ImageFrame aspect="landscape" radius="lg">
                <ImagePlaceholder label={label} />
              </ImageFrame>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center sm:mt-12">
          <ButtonLink href="/contact">Visit Our Stores</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
