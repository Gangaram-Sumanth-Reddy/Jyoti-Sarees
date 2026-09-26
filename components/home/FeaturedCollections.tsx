import { ButtonLink } from "@/components/ui/Button";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections } from "@/lib/collections";
import { copy } from "@/lib/site";

const HOME_COLLECTION_LIMIT = 8;

export function FeaturedCollections() {
  const featured = collections.slice(0, HOME_COLLECTION_LIMIT);

  return (
    <Section tone="muted">
      <Container>
        <SectionHeading
          title={copy.collections.title}
          description={copy.collections.description}
          align="center"
          className="max-w-2xl"
        />
        <ul className="mt-2 grid list-none grid-cols-1 items-stretch gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
          {featured.map((collection) => (
            <CollectionCard
              key={collection.slug}
              name={collection.name}
              description={collection.shortDescription}
              href={`/collections/${collection.slug}`}
              className="h-full"
            />
          ))}
        </ul>
        <div className="mt-10 flex justify-center sm:mt-12">
          <ButtonLink href="/sarees" variant="secondary">
            Explore All Collections
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
