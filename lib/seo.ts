import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Central SEO + business-entity configuration.
 *
 * Rule: anything emitted in structured data must be verified by the business.
 * Unverified values stay `null`/empty and are simply omitted from JSON-LD —
 * never replaced with a guess. Values the business may change later can be
 * supplied through environment variables (see .env.example).
 */

function fromEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function listFromEnv(name: string) {
  return (fromEnv(name) ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function resolveSiteUrl() {
  const explicit = fromEnv("NEXT_PUBLIC_SITE_URL");
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = fromEnv("VERCEL_PROJECT_PRODUCTION_URL");
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export type SeoImage = { url: string; width: number; height: number; alt: string };

export const seoImages = {
  brand: {
    url: "/assets/banners/heritage.jpg",
    width: 1280,
    height: 720,
    alt: "Weaver's hands at a wooden handloom weaving a navy silk saree with a gold temple border",
  },
  wedding: {
    url: "/assets/banners/wedding.jpg",
    width: 1280,
    height: 720,
    alt: "Bride seated in an ivory and gold Kanchipuram silk saree with the pallu draped across the floor",
  },
  festive: {
    url: "/assets/banners/festive.jpg",
    width: 1280,
    height: 720,
    alt: "Woman in a navy silk saree with gold zari border beside festive diyas",
  },
  newCollection: {
    url: "/assets/banners/new-collection.jpg",
    width: 1280,
    height: 720,
    alt: "Ivory silk saree with a navy and gold zari border flowing through the air",
  },
  about: {
    url: "/assets/about/hero.jpg",
    width: 1152,
    height: 864,
    alt: "Woman in a navy Kanchipuram silk saree with a gold zari border beside shelves of folded silk sarees",
  },
} satisfies Record<string, SeoImage>;

export type SeoImageKey = keyof typeof seoImages;

/** Only production deployments should be indexed (preview builds are noindex). */
const vercelEnv = fromEnv("VERCEL_ENV");
export const isIndexableDeployment = vercelEnv ? vercelEnv === "production" : true;

export const seoConfig = {
  siteName: site.name,
  siteUrl: resolveSiteUrl(),
  locale: "en_IN",
  language: "en-IN",
  /** Single English version — no hreflang until localized versions exist. */
  supportedLanguages: ["en-IN"],
  titleTemplate: `%s | ${site.name}`,
  defaultTitle: `${site.name} | Premium Sarees, Silk Sarees & New Collections`,
  defaultDescription:
    "Premium sarees from Jyoti Sarees — Kanchipuram, Banarasi, soft silk and designer weaves for weddings and festivals. Browse new arrivals and enquire on WhatsApp.",
  brandDescription:
    "Jyoti Sarees is an Indian saree business curating silk, brocade and designer sarees for weddings, festivals and everyday wear, with enquiries handled personally over WhatsApp, phone and email.",
  defaultOgImage: seoImages.brand,
  twitterCard: "summary_large_image" as const,
  twitterHandle: fromEnv("NEXT_PUBLIC_TWITTER_HANDLE"),
} as const;

export type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: "IN";
};

/**
 * Verified business entity details. Leave a field null until the business
 * confirms it — structured data omits null fields and LocalBusiness markup is
 * only emitted once a verified address exists.
 */
export const businessProfile = {
  name: site.name,
  legalName: fromEnv("BUSINESS_LEGAL_NAME"),
  logo: { url: "/assets/logo-512.png", width: 512, height: 512 },
  email: fromEnv("BUSINESS_EMAIL"),
  phone: fromEnv("BUSINESS_PHONE"),
  address: null as PostalAddress | null,
  geo: null as { latitude: number; longitude: number } | null,
  /** Schema.org openingHours strings, e.g. "Mo-Sa 10:00-20:00". */
  openingHours: [] as string[],
  /** Official profile URLs only (Instagram, Facebook, YouTube, Google Business Profile). */
  socialProfiles: listFromEnv("BUSINESS_SOCIAL_PROFILES"),
  googleBusinessProfileUrl: fromEnv("BUSINESS_GOOGLE_PROFILE_URL"),
  priceRange: null as string | null,
};

export { deliveryConfig, isShippingPageEnabled } from "@/lib/delivery";

export function absoluteUrl(path = "/") {
  return `${seoConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildMetadataInput = {
  /** Page title without the brand suffix (template adds " | Jyoti Sarees"). */
  title: string;
  /** Use the title exactly as given (no brand suffix). */
  absoluteTitle?: boolean;
  description: string;
  path: string;
  image?: SeoImage;
  type?: "website" | "article";
  noIndex?: boolean;
  /** Canonical override (e.g. colour variants pointing at the base product). */
  canonicalPath?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Builds complete per-page metadata. Child `openGraph`/`twitter` objects
 * replace the parent's entirely, so every page sets the full set here.
 */
export function buildMetadata({
  title,
  absoluteTitle,
  description,
  path,
  image = seoConfig.defaultOgImage,
  type = "website",
  noIndex,
  canonicalPath,
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${seoConfig.siteName}`;
  const canonical = canonicalPath ?? path;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      type,
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: seoConfig.twitterCard,
      title: fullTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
      ...(seoConfig.twitterHandle ? { site: seoConfig.twitterHandle } : {}),
    },
    ...(noIndex || !isIndexableDeployment
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

/** Trims a description to a snippet-friendly length at a word boundary. */
export function snippet(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
