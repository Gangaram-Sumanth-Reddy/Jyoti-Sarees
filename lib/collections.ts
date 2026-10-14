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
  /** Card photo; without one the first product photo is used. */
  image?: string;
};

function catalogueCollection(input: {
  slug: string;
  name: string;
  category: string;
  summary: string;
  related: string[];
  image?: string;
}): Collection {
  return {
    slug: input.slug,
    name: input.name,
    image: input.image,
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
    image: "/assets/banners/collections/ajrakh.jpg",
  }),
  catalogueCollection({
    slug: "banarasi",
    name: "Banarasi",
    category: "Banarasi",
    summary:
      "Banarasi sarees in the current catalogue, including georgette, kora silk, tissue and silk pattu.",
    related: ["ajrakh", "pattu", "kora"],
    image: "/assets/banners/collections/banarasi.jpg",
  }),
  catalogueCollection({
    slug: "pattu",
    name: "Pattu",
    category: "Pattu",
    summary: "Traditional, soft and fancy Pattu sarees from the current Jyoti Sarees catalogue.",
    related: ["ajrakh", "banarasi", "kora"],
    image: "/assets/banners/collections/pattu.jpg",
  }),
  catalogueCollection({
    slug: "kora",
    name: "Kora",
    category: "Kora",
    summary: "Pure and fancy Kora sarees from the current Jyoti Sarees catalogue.",
    related: ["ajrakh", "banarasi", "pattu"],
    image: "/assets/banners/collections/kora.jpg",
  }),
  catalogueCollection({
    slug: "silk",
    name: "Silk",
    category: "Silk",
    summary: "Silk, fancy silk, silk tissue and Mashroof silk sarees from the current Jyoti Sarees catalogue.",
    related: ["pattu", "banarasi", "georgette"],
    image: "/assets/banners/collections/silk.jpg",
  }),
  catalogueCollection({
    slug: "georgette",
    name: "Georgette",
    category: "Georgette",
    summary: "Pure and khadi georgette sarees from the current Jyoti Sarees catalogue.",
    related: ["silk", "designer", "banarasi"],
    image: "/assets/banners/collections/georgette.jpg",
  }),
  catalogueCollection({
    slug: "designer",
    name: "Designer",
    category: "Designer",
    summary: "Fancy designer sarees from the current Jyoti Sarees catalogue.",
    related: ["georgette", "silk", "pattu"],
    image: "/assets/banners/collections/designer.jpg",
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

/** The collection's own photo, else the lead photo of its first saree. */
export function getCollectionCoverImage(collection: Collection) {
  return (
    collection.image ??
    getProductsForCollection(collection)
      .flatMap((product) => product.gallery)
      .find((item) => item.src)?.src
  );
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
