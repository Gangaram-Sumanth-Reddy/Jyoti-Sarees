import { CollectionCard } from "@/components/ui/CollectionCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections } from "@/lib/collections";

export function CatalogueCollections() {
  return (
    <Section tone="muted" className="pb-0">
      <Container>
        <SectionHeading
          title="Shop by Collection"
          description="Browse curated saree collections, then refine by colour, fabric and price."
          align="center"
          className="max-w-2xl mb-8 sm:mb-10"
        />
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {collections.map((collection) => (
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
