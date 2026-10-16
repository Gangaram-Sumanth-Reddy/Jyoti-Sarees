import { collectionHref, getPrimaryCollection } from "@/lib/collections";
import { productHref, type Product, type ProductColourOption } from "@/lib/products";
import type { Metadata } from "next";
import type { SeoImage } from "@/lib/seo";
import { buildMetadata, seoConfig } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/** Categories whose name describes the weave better than the raw fabric does. */
const WEAVE_CATEGORY_LABEL: Record<string, string> = {
  Kanchipuram: "Kanchipuram Silk",
  Banarasi: "Banarasi",
  "Soft Silk": "Soft Silk",
};

function isCoveredByName(name: string, phrase: string) {
  const words = new Set(name.toLowerCase().split(/\s+/));
  return phrase
    .toLowerCase()
    .split(/\s+/)
    .every((word) => words.has(word));
}

/** "[Fabric/Category] Saree" descriptor that does not repeat the product name. */
export function productDescriptor(product: Product) {
  const weave = WEAVE_CATEGORY_LABEL[product.category];
  const candidates = weave
    ? [weave, product.fabric]
    : [product.fabric, product.category];
  const phrase = candidates.find((candidate) => !isCoveredByName(product.name, candidate));
  return phrase ? `${phrase} Saree` : null;
}

/** e.g. "Ruby Kanjivaram | Kanchipuram Silk Saree" (template appends the brand). */
export function productTitle(product: Product, colour?: ProductColourOption) {
  const name = colour ? `${product.name} in ${colour.label}` : product.name;
  const descriptor = productDescriptor(product);
  if (descriptor) return `${name} | ${descriptor}`;
  // Colour titles end with the colour label, so test the product name — not the full string.
  return /saree\b/i.test(product.name) ? name : `${name} Saree`;
}

/** Unique, data-derived description kept within a typical snippet length. */
export function productDescription(product: Product, max = 160) {
  const base = product.shortDescription.replace(/\s+/g, " ").trim();
  const extras: string[] = [];
  // Avoid repeating fabric/price when the short description already carries them.
  if (!new RegExp(product.fabric.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(base)) {
    extras.push(product.fabric);
  }
  if (!base.includes(product.priceLabel)) extras.push(product.priceLabel);
  if (!/whatsapp/i.test(base)) extras.push("Enquire on WhatsApp");

  let text = base.replace(/[.!?]?$/, "");
  for (const part of extras) {
    const next = `${text}. ${part}`;
    if (next.length + 1 > max) break;
    text = next;
  }
  text = /[.!?]$/.test(text) ? text : `${text}.`;
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export function productPath(product: Product) {
  return productHref(product);
}

/** Real product photography, if any has been added to the gallery. */
export function productPhotos(product: Product) {
  return product.gallery
    .filter((item): item is typeof item & { src: string } => Boolean(item.src))
    .map((item) => item.src);
}

export function productOgImage(product: Product): SeoImage {
  const [photo] = productPhotos(product);
  const alt = `${product.name} — ${product.colour} ${product.fabric.toLowerCase()} saree from ${seoConfig.siteName}`;
  // Some link-preview crawlers (e.g. WhatsApp) don't render WebP, so share the JPEG copy.
  if (photo) return { url: photo.replace(/\.webp$/, ".jpg"), width: 1024, height: 1536, alt };
  return { url: `/og/product/${product.slug}`, width: 1200, height: 630, alt };
}

/**
 * Base product URLs are canonical. Colour URLs render the same product with a
 * different swatch selected, so they point their canonical at the base URL.
 */
export function productMetadata(product: Product, colour?: ProductColourOption): Metadata {
  return buildMetadata({
    title: productTitle(product, colour),
    description: productDescription(product),
    path: colour ? productHref(product, colour.id) : productPath(product),
    canonicalPath: productPath(product),
    image: productOgImage(product),
  });
}

export function productBreadcrumbs(product: Product): Crumb[] {
  if (product.isNewArrival) {
    return [
      { name: "Home", path: "/" },
      { name: "New Arrivals", path: "/new-arrivals" },
      { name: product.name, path: productPath(product) },
    ];
  }
  const collection = getPrimaryCollection(product);
  return [
    { name: "Home", path: "/" },
    { name: "Sarees", path: "/sarees" },
    ...(collection
      ? [{ name: collection.name, path: collectionHref(collection.slug) }]
      : []),
    { name: product.name, path: productPath(product) },
  ];
}
