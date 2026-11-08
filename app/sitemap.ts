import type { MetadataRoute } from "next";
import { collectionHref, getProductsForCollection, indexableCollections } from "@/lib/collections";
import { journalArticles, journalHref } from "@/lib/journal";
import { productPath } from "@/lib/product-seo";
import { products, type Product } from "@/lib/products";
import { absoluteUrl, isShippingPageEnabled } from "@/lib/seo";

function productModified(product: Product) {
  return new Date(product.updatedAt ?? product.createdAt);
}

function latest(dates: Date[]) {
  return dates.length > 0
    ? new Date(Math.max(...dates.map((date) => date.getTime())))
    : undefined;
}

/**
 * Canonical, indexable URLs only. Colour variants (canonicalised to the base
 * product), the enquiry list, privacy request form and API routes are excluded.
 * lastModified is only set where a real date exists.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const arrivals = products.filter((product) => product.isNewArrival);
  const catalogue = products.filter((product) => !product.isNewArrival);
  const latestJournal = latest(
    journalArticles.map((article) => new Date(article.dateModified)),
  );

  const entry = (
    path: string,
    lastModified?: Date,
    images?: string[],
  ): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
    ...(images && images.length > 0 ? { images } : {}),
  });

  return [
    entry("/", latest(products.map(productModified))),
    entry("/sarees", latest(catalogue.map(productModified))),
    entry("/new-arrivals", latest(arrivals.map(productModified))),
    ...indexableCollections.map((collection) =>
      entry(
        collectionHref(collection.slug),
        latest(getProductsForCollection(collection).map(productModified)),
      ),
    ),
    ...products.map((product) =>
      entry(
        productPath(product),
        productModified(product),
        product.gallery
          .map((item) => item.src)
          .filter((src): src is string => Boolean(src))
          .map((src) => absoluteUrl(src)),
      ),
    ),
    entry("/journal", latestJournal),
    ...journalArticles.map((article) =>
      entry(journalHref(article.slug), new Date(article.dateModified), [
        absoluteUrl(article.image.url),
      ]),
    ),
    entry("/about"),
    entry("/contact"),
    ...(isShippingPageEnabled() ? [entry("/shipping")] : []),
    entry("/privacy-policy"),
    entry("/terms"),
  ];
}
