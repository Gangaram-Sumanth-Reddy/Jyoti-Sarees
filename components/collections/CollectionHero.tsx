import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import type { Collection } from "@/lib/collections";

type CollectionHeroProps = {
  collection: Collection;
  productCount: number;
};

export function CollectionHero({ collection, productCount }: CollectionHeroProps) {
  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
          <div className="max-w-xl">
            <p className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
              Collection
            </p>
            <h1 className="mt-3 text-h1 text-balance">{collection.name}</h1>
            <p className="mt-4 text-body text-muted sm:mt-5">
              {collection.description}
            </p>
            <p className="mt-5 text-small font-semibold tracking-[0.06em] text-rich-black">
              {productCount} {productCount === 1 ? "saree" : "sarees"} in this
              collection
            </p>
          </div>
          <ImageFrame aspect="feature" radius="lg">
            <ImagePlaceholder
              label={`${collection.name} banner`}
              tone="midnight"
            />
          </ImageFrame>
        </div>
      </Container>
    </Section>
  );
}
