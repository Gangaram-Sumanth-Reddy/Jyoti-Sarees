import { ButtonLink } from "@/components/ui/Button";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collectionHref, collections } from "@/lib/collections";
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
        <ul
          data-scroll-row
          className="scrollbar-none -mx-gutter mt-2 flex list-none snap-x snap-mandatory scroll-px-gutter items-stretch gap-3 overflow-x-auto px-gutter pb-3 pt-1 sm:gap-4 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:p-0"
        >
          {featured.map((collection) => (
            <CollectionCard
              key={collection.slug}
              name={collection.name}
              description={collection.shortDescription}
              href={collectionHref(collection.slug)}
              className="h-full w-[62%] shrink-0 snap-start max-lg:!h-auto min-[480px]:w-[44%] sm:w-[36%] md:w-[29%] lg:w-auto"
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
