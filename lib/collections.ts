import { products, type Product } from "@/lib/products";
import type { SeoImageKey } from "@/lib/seo";

export type CollectionFaq = { question: string; answer: string };

export type Collection = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  /** Product categories that belong to this collection. */
  categories: readonly string[];
  /** Optional fabric match (e.g. Georgette, Organza). */
  fabrics?: readonly string[];
  /** Search title without the brand suffix. */
  seoTitle: string;
  metaDescription: string;
  ogImage: SeoImageKey;
  intro: string[];
  guide: { heading: string; paragraphs: string[] }[];
  faqs: CollectionFaq[];
  /** Related collection slugs, used for internal links. */
  related: string[];
  /** Related journal article slugs. */
  journal: string[];
};

function catalogueCollection(input: {
  slug: string;
  name: string;
  category: string;
  summary: string;
  related: string[];
}): Collection {
  return {
    slug: input.slug,
    name: input.name,
    shortDescription: input.summary,
    description: input.summary,
    categories: [input.category],
    seoTitle: `${input.name} Sarees`,
    metaDescription: `${input.summary} Enquire on WhatsApp with the product ID.`,
    ogImage: "brand",
    intro: [
      input.summary,
      "Each saree page shows the name, fabric, colour when it was confirmed, and the price supplied for that piece.",
    ],
    guide: [
      {
        heading: "What is listed",
        paragraphs: [
          "Only the details provided for each saree are shown. Where a colour was not confirmed, the product page does not guess one.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I ask about a saree in this collection?",
        answer:
          "Open the saree and message us on WhatsApp. The message includes the product name, product ID and price.",
      },
    ],
    related: input.related,
    journal: [],
  };
}

/**
 * Category landing pages for the current catalogue. Only categories that
 * exist in the product list get a page (see `indexableCollections`).
 */
export const collections: Collection[] = [
  catalogueCollection({
    slug: "ajrakh",
    name: "Ajrakh",
    category: "Ajrakh",
    summary: "Pure Ajrakh sarees from the current Jyoti Sarees catalogue.",
    related: ["banarasi", "pattu", "kora"],
  }),
  catalogueCollection({
    slug: "banarasi",
    name: "Banarasi",
    category: "Banarasi",
    summary:
      "Banarasi sarees in the current catalogue, including georgette and kora silk.",
    related: ["ajrakh", "pattu", "kora"],
  }),
  catalogueCollection({
    slug: "pattu",
    name: "Pattu",
    category: "Pattu",
    summary: "Fancy Pattu sarees from the current Jyoti Sarees catalogue.",
    related: ["ajrakh", "banarasi", "kora"],
  }),
  catalogueCollection({
    slug: "kora",
    name: "Kora",
    category: "Kora",
    summary: "Pure Kora sarees from the current Jyoti Sarees catalogue.",
    related: ["ajrakh", "banarasi", "pattu"],
  }),
];

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductsForCollection(collection: Collection): Product[] {
  const categories = new Set(collection.categories);
  const fabrics = collection.fabrics
    ? new Set(collection.fabrics)
    : null;

  return products.filter((product) => {
    if (fabrics) {
      return fabrics.has(product.fabric);
    }
    return (
      categories.has(product.category) ||
      categories.has(product.collection) ||
      product.collection === collection.name
    );
  });
}

/** Collections with at least one product — the only ones that get a page. */
export const indexableCollections = collections.filter(
  (collection) => getProductsForCollection(collection).length > 0,
);

export function getIndexableCollection(slug: string) {
  return indexableCollections.find((collection) => collection.slug === slug);
}

export function collectionHref(slug: string) {
  return `/sarees/${slug}`;
}

/** The category landing page a product belongs to (for breadcrumbs). */
export function getPrimaryCollection(product: Product) {
  return indexableCollections.find(
    (collection) =>
      !collection.fabrics && collection.categories.includes(product.category),
  );
}

export function getRelatedCollections(collection: Collection) {
  return collection.related
    .map((slug) => getIndexableCollection(slug))
    .filter((entry): entry is Collection => Boolean(entry));
}
