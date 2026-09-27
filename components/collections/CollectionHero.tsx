import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import type { Collection } from "@/lib/collections";
import type { Crumb } from "@/lib/product-seo";
import { seoImages } from "@/lib/seo";

type CollectionHeroProps = {
  collection: Collection;
  productCount: number;
  breadcrumbs: Crumb[];
};

export function CollectionHero({
  collection,
  productCount,
  breadcrumbs,
}: CollectionHeroProps) {
  const image = seoImages[collection.ogImage];

  return (
    <Section className="pt-6 sm:pt-8 lg:pt-10">
      <Container>
        <Breadcrumbs items={breadcrumbs} className="mb-6 lg:mb-8" />
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
          <div className="max-w-xl">
            <p className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
              Collection
            </p>
            <h1 className="mt-3 text-h1 text-balance">
              {collection.seoTitle.replace(/\s*\(.*\)$/, "")}
            </h1>
            <p className="mt-4 text-body text-muted sm:mt-5">
              {collection.description}
            </p>
            <p className="mt-5 text-small font-semibold tracking-[0.06em] text-rich-black">
              {productCount} {productCount === 1 ? "saree" : "sarees"} in this
              collection
            </p>
          </div>
          <ImageFrame aspect="wide" radius="lg">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </ImageFrame>
        </div>
      </Container>
    </Section>
  );
}
