import { products, type Product } from "@/lib/products";

export type Collection = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  /** Product categories that belong to this collection. */
  categories: readonly string[];
};

export const collections: Collection[] = [
  {
    slug: "kanchipuram-silk",
    name: "Kanchipuram Silk",
    shortDescription: "Temple borders and rich silk weaves.",
    description:
      "Discover traditional Kanchipuram silk sarees known for structured borders, pure silk bodies and ceremonial elegance—ideal for weddings and formal occasions.",
    categories: ["Kanchipuram"],
  },
  {
    slug: "banarasi",
    name: "Banarasi",
    shortDescription: "Intricate brocade for celebratory wear.",
    description:
      "Explore Banarasi sarees with refined brocade, soft zari and festive detailing—chosen for weddings, receptions and celebratory evenings.",
    categories: ["Banarasi"],
  },
  {
    slug: "soft-silk",
    name: "Soft Silk",
    shortDescription: "Light drape with everyday elegance.",
    description:
      "Soft silk sarees with an easy fall and light hand—perfect for festive days and elevated everyday wear without heavy formality.",
    categories: ["Soft Silk"],
  },
  {
    slug: "designer",
    name: "Designer",
    shortDescription: "Contemporary silhouettes, classic craft.",
    description:
      "Contemporary designer sarees with modern finishes and wearable glamour—suited to parties, receptions and modern celebrations.",
    categories: ["Designer"],
  },
  {
    slug: "festive",
    name: "Festive",
    shortDescription: "Colour and detail for the season.",
    description:
      "Festive sarees in bright colours and celebratory textures—curated for seasonal gatherings, functions and joyful occasions.",
    categories: ["Festive"],
  },
  {
    slug: "wedding",
    name: "Wedding",
    shortDescription: "Heirloom pieces for momentous days.",
    description:
      "Wedding sarees selected for presence, rich fabrics and ceremonial detailing—made for bridal and wedding celebrations.",
    categories: ["Wedding"],
  },
];

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductsForCollection(collection: Collection): Product[] {
  const categories = new Set(collection.categories);
  return products.filter(
    (product) =>
      categories.has(product.category) ||
      categories.has(product.collection) ||
      product.collection === collection.name,
  );
}

export function collectionHref(slug: string) {
  return `/collections/${slug}`;
}
