import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  collectionHref,
  collections,
  getCollectionCoverImage,
} from "@/lib/collections";
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
        {/* All circles share one row: they shrink to fit, and the row scrolls only below the minimum size. */}
        <ul
          style={{ "--count": featured.length } as CSSProperties}
          className="scrollbar-none -mx-gutter mt-2 flex list-none snap-x snap-mandatory scroll-px-gutter justify-center-safe gap-[var(--gap)] overflow-x-auto px-gutter pb-2 pt-1 [--gap:0.875rem] md:[--gap:1rem] lg:[--gap:1.5rem] xl:[--gap:2rem]"
        >
          {featured.map((collection) => {
            const image = getCollectionCoverImage(collection);
            return (
              <li
                key={collection.slug}
                className="w-[clamp(8rem,calc((100%-(var(--count)-1)*var(--gap))/var(--count)),9.5rem)] md:w-[clamp(5.25rem,calc((100%-(var(--count)-1)*var(--gap))/var(--count)),9.5rem)] shrink-0 snap-start"
              >
                <Link
                  href={collectionHref(collection.slug)}
                  className="group flex flex-col items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                >
                  <span className="block w-full rounded-full border-2 border-navy/60 bg-page p-[3px] transition-colors duration-300 group-hover:border-accent sm:p-1">
                    <span className="relative block aspect-square overflow-hidden rounded-full bg-surface">
                      {image ? (
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 152px, 128px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                      ) : (
                        <ImagePlaceholder label={collection.name} />
                      )}
                    </span>
                  </span>
                  <span className="w-full truncate text-center text-sm font-medium leading-tight text-rich-black transition-colors group-hover:text-accent sm:text-base">
                    {collection.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 flex justify-center sm:mt-12">
          <ButtonLink href="/sarees">
            Explore All Collections
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
