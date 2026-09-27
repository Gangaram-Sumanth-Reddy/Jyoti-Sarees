import type { Collection } from "@/lib/collections";
import type { JournalArticle } from "@/lib/journal";
import {
  productBreadcrumbs,
  productPath,
  productPhotos,
  type Crumb,
} from "@/lib/product-seo";
import { productHref, type Product } from "@/lib/products";
import { absoluteUrl, businessProfile, seoConfig } from "@/lib/seo";

/**
 * Schema.org JSON-LD builders. Every property comes from real catalogue or
 * verified business data; unknown values are omitted rather than guessed.
 * No ratings, reviews, GTINs or MPNs are emitted.
 */
type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

function compact<T extends JsonLd>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (entry === null || entry === undefined) return false;
      if (Array.isArray(entry)) return entry.length > 0;
      return true;
    }),
  ) as T;
}

function logoObject() {
  return {
    "@type": "ImageObject",
    url: absoluteUrl(businessProfile.logo.url),
    width: businessProfile.logo.width,
    height: businessProfile.logo.height,
  };
}

function postalAddress() {
  const address = businessProfile.address;
  return address ? { "@type": "PostalAddress", ...address } : null;
}

function sameAs() {
  return [
    ...businessProfile.socialProfiles,
    ...(businessProfile.googleBusinessProfileUrl
      ? [businessProfile.googleBusinessProfileUrl]
      : []),
  ];
}

export function organizationSchema(): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: businessProfile.name,
    legalName: businessProfile.legalName,
    url: absoluteUrl("/"),
    logo: logoObject(),
    description: seoConfig.brandDescription,
    email: businessProfile.email,
    telephone: businessProfile.phone,
    address: postalAddress(),
    sameAs: sameAs(),
  });
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: seoConfig.siteName,
    url: absoluteUrl("/"),
    inLanguage: seoConfig.language,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Only emitted once the business has a verified physical address. */
export function localBusinessSchema(): JsonLd | null {
  const address = postalAddress();
  if (!address) return null;
  return compact({
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": absoluteUrl("/#store"),
    name: businessProfile.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(seoConfig.defaultOgImage.url),
    logo: logoObject(),
    telephone: businessProfile.phone,
    email: businessProfile.email,
    address,
    geo: businessProfile.geo
      ? { "@type": "GeoCoordinates", ...businessProfile.geo }
      : null,
    openingHours: businessProfile.openingHours,
    priceRange: businessProfile.priceRange,
    sameAs: sameAs(),
    parentOrganization: { "@id": ORGANIZATION_ID },
  });
}

export function breadcrumbSchema(items: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function offerFor(product: Product, path: string) {
  return {
    "@type": "Offer",
    url: absoluteUrl(path),
    price: product.price,
    priceCurrency: "INR",
    availability: product.available
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
  };
}

/**
 * Product markup matching the visible product page: name, description,
 * fabric, colour, product ID, displayed price and displayed stock status.
 * Colourways shown on the page become ProductGroup variants.
 */
export function productSchema(product: Product): JsonLd {
  const path = productPath(product);
  const images = productPhotos(product).map((src) => absoluteUrl(src));
  const brand = { "@type": "Brand", name: seoConfig.siteName };
  const category = `${product.category} Sarees`;

  if (product.colourOptions.length <= 1) {
    return compact({
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": absoluteUrl(`${path}#product`),
      name: product.name,
      description: product.about,
      sku: product.productId,
      brand,
      category,
      color: product.colour,
      material: product.fabric,
      image: images,
      url: absoluteUrl(path),
      offers: offerFor(product, path),
    });
  }

  return compact({
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    "@id": absoluteUrl(`${path}#product`),
    name: product.name,
    description: product.about,
    productGroupID: product.productId,
    brand,
    category,
    material: product.fabric,
    image: images,
    url: absoluteUrl(path),
    variesBy: ["https://schema.org/color"],
    hasVariant: product.colourOptions.map((option) => {
      const variantPath = productHref(product, option.id);
      return compact({
        "@type": "Product",
        name: `${product.name} — ${option.label}`,
        color: option.label,
        material: product.fabric,
        inProductGroupWithID: product.productId,
        image: images,
        url: absoluteUrl(variantPath),
        offers: offerFor(product, variantPath),
      });
    }),
  });
}

export function productPageSchemas(product: Product): JsonLd[] {
  return [productSchema(product), breadcrumbSchema(productBreadcrumbs(product))];
}

export function collectionPageSchema(
  collection: Pick<Collection, "name" | "description">,
  path: string,
  items: Product[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description,
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(productHref(item)),
        name: item.name,
      })),
    },
  };
}

export function articleSchema(article: JournalArticle, path: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [absoluteUrl(article.image.url)],
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { "@type": "Organization", name: article.author, url: absoluteUrl("/about") },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: seoConfig.language,
  };
}
