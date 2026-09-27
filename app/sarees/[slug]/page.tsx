import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionBrowser } from "@/components/collections/CollectionBrowser";
import { CollectionCta } from "@/components/collections/CollectionCta";
import { CollectionGuide } from "@/components/collections/CollectionGuide";
import { CollectionHero } from "@/components/collections/CollectionHero";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  collectionHref,
  getIndexableCollection,
  getProductsForCollection,
  getRelatedCollections,
  indexableCollections,
  type Collection,
} from "@/lib/collections";
import { productMetadata } from "@/lib/product-seo";
import { catalogueProducts, getCatalogueProductBySlug } from "@/lib/products";
import { buildMetadata, seoImages } from "@/lib/seo";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/structured-data";

type SareeSlugPageProps = {
  params: Promise<{ slug: string }>;
};

/** Unknown slugs 404 before streaming; new-arrival slugs redirect in next.config. */
export const dynamicParams = false;

/** `/sarees/[slug]` serves both category landing pages and catalogue products. */
export function generateStaticParams() {
  return [
    ...indexableCollections.map((collection) => ({ slug: collection.slug })),
    ...catalogueProducts.map((product) => ({ slug: product.slug })),
  ];
}

export async function generateMetadata({
  params,
}: SareeSlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const collection = getIndexableCollection(slug);
  if (collection) {
    return buildMetadata({
      title: collection.seoTitle,
      description: collection.metaDescription,
      path: collectionHref(collection.slug),
      image: seoImages[collection.ogImage],
    });
  }

  const product = getCatalogueProductBySlug(slug);
  if (product) return productMetadata(product);

  return { title: "Saree not found", robots: { index: false } };
}

function collectionCrumbs(collection: Collection) {
  return [
    { name: "Home", path: "/" },
    { name: "Sarees", path: "/sarees" },
    { name: collection.name, path: collectionHref(collection.slug) },
  ];
}

export default async function SareeSlugPage({ params }: SareeSlugPageProps) {
  const { slug } = await params;

  const collection = getIndexableCollection(slug);
  if (collection) {
    const items = getProductsForCollection(collection);
    const crumbs = collectionCrumbs(collection);
    return (
      <>
        <JsonLd
          data={[
            collectionPageSchema(
              { name: collection.seoTitle, description: collection.metaDescription },
              collectionHref(collection.slug),
              items,
            ),
            breadcrumbSchema(crumbs),
          ]}
        />
        <CollectionHero
          collection={collection}
          productCount={items.length}
          breadcrumbs={crumbs}
        />
        <CollectionBrowser collection={collection} products={items} />
        <CollectionGuide
          collection={collection}
          related={getRelatedCollections(collection)}
        />
        <CollectionCta />
      </>
    );
  }

  const product = getCatalogueProductBySlug(slug);
  if (product) return <ProductDetailView product={product} />;

  notFound();
}
