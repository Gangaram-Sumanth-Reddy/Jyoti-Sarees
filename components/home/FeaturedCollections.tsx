import { ButtonLink } from "@/components/ui/Button";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections, copy } from "@/lib/site";

export function FeaturedCollections() {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeading
          title={copy.collections.title}
          description={copy.collections.description}
          align="center"
          className="max-w-2xl"
        />
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.slug}
              name={collection.name}
              description={collection.shortDescription}
              href={`/collections/${collection.slug}`}
            />
          ))}
        </ul>
        <div className="mt-10 flex justify-center sm:mt-12">
          <ButtonLink href="/sarees" variant="secondary">
            View All Sarees
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
