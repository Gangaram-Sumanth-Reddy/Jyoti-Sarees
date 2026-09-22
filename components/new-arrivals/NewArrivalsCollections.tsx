import { CollectionCard } from "@/components/ui/CollectionCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections } from "@/lib/collections";

const featuredSlugs = [
  "kanchipuram-silk",
  "banarasi",
  "soft-silk",
  "designer",
] as const;

export function NewArrivalsCollections() {
  const featured = featuredSlugs
    .map((slug) => collections.find((collection) => collection.slug === slug))
    .filter((collection): collection is (typeof collections)[number] =>
      Boolean(collection),
    );

  return (
    <Section tone="muted">
      <Container>
        <SectionHeading
          title="Explore More Collections"
          description="Continue browsing related weaves and styles from the Jyoti Sarees catalogue."
          align="center"
          className="max-w-2xl"
        />
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {featured.map((collection) => (
            <CollectionCard
              key={collection.slug}
              name={collection.name}
              description={collection.shortDescription}
              href={`/collections/${collection.slug}`}
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
