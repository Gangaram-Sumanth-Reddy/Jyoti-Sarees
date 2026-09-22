import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionBrowser } from "@/components/collections/CollectionBrowser";
import { CollectionCta } from "@/components/collections/CollectionCta";
import { CollectionHero } from "@/components/collections/CollectionHero";
import {
  collections,
  getCollectionBySlug,
  getProductsForCollection,
} from "@/lib/collections";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return { title: "Collection not found" };
  }

  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = getProductsForCollection(collection);

  return (
    <>
      <CollectionHero
        collection={collection}
        productCount={collectionProducts.length}
      />
      <CollectionBrowser
        collection={collection}
        products={collectionProducts}
      />
      <CollectionCta />
    </>
  );
}
