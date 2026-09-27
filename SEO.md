# Jyoti Sarees — SEO Guide

How search visibility works on this site, what is configured, and what the
business still needs to confirm. The rule throughout: **only publish what is
real and verified.** No fake reviews or ratings, no invented GTIN/MPN, no
doorway or city pages, no hidden text, no "#1" or guaranteed-ranking claims.

---

## 1. Architecture

| Concern | Where |
| --- | --- |
| Site-wide SEO config, business profile, `buildMetadata()` | `lib/seo.ts` |
| Delivery policy flags (gates `/shipping`) | `lib/delivery.ts` |
| Category landing-page content (intro, guide, FAQs, links) | `lib/collections.ts` |
| Product titles, descriptions, breadcrumbs, OG images | `lib/product-seo.ts` |
| JSON-LD builders | `lib/structured-data.ts` |
| Journal articles | `lib/journal.ts` |
| JSON-LD renderer / visible breadcrumbs | `components/seo/` |
| Sitemap, robots, manifest | `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` |
| Redirects, image formats, `/shipping` gate | `next.config.ts` |

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.jyotisarees.com`) in production.
Canonicals, sitemap, robots and structured data all derive from it. Vercel
preview deployments are automatically `noindex` and disallowed in robots.

## 2. URL structure

| URL | Page |
| --- | --- |
| `/` | Home |
| `/sarees` | Full catalogue |
| `/sarees/{collection}` | Category page (only categories with products) |
| `/sarees/{product}` | Catalogue product (canonical) |
| `/sarees/{product}/{colour}` | Colour view — canonical points to base product |
| `/new-arrivals` | Latest sarees, newest `createdAt` first |
| `/new-arrivals/{product}` | New-arrival product (canonical) |
| `/journal`, `/journal/{slug}` | Saree guides |
| `/about`, `/contact`, `/privacy-policy`, `/terms` | Info pages |
| `/shipping` | Only live once delivery is confirmed (404 until then) |
| `/cart`, `/privacy-requests` | `noindex` utility pages |

**Redirects (308, permanent):** `/collections/*` → `/sarees/*`, `/privacy` →
`/privacy-policy`, `/blog/*` → `/journal/*`, and a product requested under the
wrong section (e.g. `/sarees/{new-arrival}`) → its canonical section.

Unknown product, collection, colour and article slugs return a real **HTTP
404** (static params with `dynamicParams = false`). This matters because the
root `loading.tsx` streams responses; an in-page `notFound()` would otherwise
return 200.

## 3. Keyword map

One primary intent per URL — no two pages target the same query.

| Page | Primary intent | Supporting terms |
| --- | --- | --- |
| `/` | Jyoti Sarees (brand), premium sarees | silk sarees, new collections |
| `/sarees` | silk / Banarasi / designer / wedding sarees | sarees catalogue |
| `/sarees/kanchipuram-silk` | Kanchipuram silk sarees | Kanjivaram, temple border, pure silk |
| `/sarees/banarasi` | Banarasi sarees | silk brocade, zari, wedding |
| `/sarees/soft-silk` | soft silk sarees | lightweight silk, festive |
| `/sarees/silk` | silk sarees | pure silk, tissue silk |
| `/sarees/designer` | designer sarees | party wear, georgette, organza |
| `/sarees/festive` | festive sarees | Diwali, pooja, tissue silk |
| `/sarees/wedding` | wedding sarees | bridal, reception |
| `/sarees/georgette` | georgette sarees | lightweight, party |
| `/sarees/organza` | organza sarees | sheer, reception |
| `/new-arrivals` | new saree arrivals {year} | latest saree collection |
| `/journal/saree-fabric-guide` | saree fabric guide | types of saree fabric |
| `/journal/kanchipuram-vs-banarasi-silk-sarees` | Kanchipuram vs Banarasi | difference |
| `/journal/how-to-care-for-silk-sarees` | how to care for silk sarees | storage, zari care |
| Product pages | "{product name} {fabric/category} saree" | colour, occasion |

Do **not** add pages for categories the catalogue does not carry (e.g. cotton,
handloom, city names). Add a collection only when real products exist.

## 4. Metadata

`buildMetadata()` sets title, description, canonical, full Open Graph and
Twitter data on every page (child `openGraph` objects replace the parent's, so
each page sets the complete set).

- Titles: `{Page title} | Jyoti Sarees` (template). Home uses an absolute title.
- Products: `{Name} | {Fabric/Category} Saree | Jyoti Sarees`, never repeating
  words already in the name.
- Descriptions are unique and kept ≤ ~160 characters.
- Product share images: real photos once added; until then a generated card at
  `/og/product/{slug}` (name, fabric, price — catalogue data only).
- English only (`en-IN`) — no hreflang until translated versions exist.

## 5. Structured data

| Schema | Where | Notes |
| --- | --- | --- |
| Organization | Home | Only verified fields; `sameAs` from env |
| WebSite | Home | |
| ClothingStore (LocalBusiness) | Home | **Emitted only when `businessProfile.address` is set** |
| BreadcrumbList | All content pages | Mirrors visible breadcrumbs |
| CollectionPage + ItemList | `/sarees`, collections, `/new-arrivals` | |
| Product / ProductGroup | Product pages | Price, INR, stock from `available`, colours as variants |
| Article | Journal articles | Author: the business (no invented people) |
| Blog | `/journal` | |

**Intentionally not emitted:** ratings, reviews, GTIN, MPN (none verified);
FAQPage (Google limits FAQ rich results to authoritative government/health
sites — FAQs remain as visible content); shipping/return policy markup (policy
not confirmed).

> Product rich results require at least one real product image. Products have
> placeholder visuals today, so Search Console will warn about missing `image`
> until photography is added to each product's `gallery[].src`.

Validate with the [Rich Results Test](https://search.google.com/test/rich-results)
and [Schema Markup Validator](https://validator.schema.org/).

## 6. Sitemap & robots

- `/sitemap.xml` lists canonical, indexable URLs only: home, catalogue, new
  arrivals, collections with products, base product URLs, journal, info pages
  and `/shipping` when enabled. Colour variants, cart, privacy-request form and
  API routes are excluded. `lastModified` uses real dates only (product
  `updatedAt` → `createdAt`, article `dateModified`).
- `/robots.txt` allows everything except `/api/` and links the sitemap. `/cart`
  and `/privacy-requests` stay crawlable so their `noindex` is honoured.

## 7. Internal linking

- Header/footer → Sarees, New Arrivals, Saree Guides, About, Contact.
- `/sarees` intro → every collection page.
- Collection pages → related collections, New Arrivals, relevant guides.
- Product pages → breadcrumb to their collection, related sarees.
- Journal articles → related collections, New Arrivals, Contact, other guides.
- 404 page → Sarees, New Arrivals, Home and popular collections.

## 8. Images & performance

- `next/image` everywhere with AVIF/WebP (`images.formats`), `sizes` set, and
  `preload` (Next 16 replacement for `priority`) only on the LCP image.
- Descriptive alt text; decorative thumbnails use empty alt.
- Favicon `app/icon.png` (256px) and `app/apple-icon.png` (180px);
  `public/assets/logo-512.png` (from the logo) for the manifest and schema.
- Large source images to optimise when convenient: `H1–H3.png` (~1.5 MB each),
  `New arrivals.png` (2 MB), `Logo.png` (1.2 MB), `Logo-text.png`.

## 9. Local SEO

Currently **no** LocalBusiness markup — the address on the site is a
placeholder. To enable:

1. Fill `businessProfile.address` (and optionally `geo`, `openingHours`,
   `priceRange`) in `lib/seo.ts` with the verified store address.
2. Set `BUSINESS_PHONE`, `BUSINESS_EMAIL`, `BUSINESS_SOCIAL_PROFILES`,
   `BUSINESS_GOOGLE_PROFILE_URL`.
3. Replace the placeholder addresses in `lib/contact.ts` and `lib/site.ts` so
   the visible NAP (name, address, phone) matches the markup and the Google
   Business Profile exactly.
4. Claim and verify the Google Business Profile.

No city landing pages — a single accurate store/contact page is enough.

## 10. Delivery SEO

Delivery is **not** claimed anywhere. When the policy is confirmed, set
`deliveryConfig.india` / `international` in `lib/delivery.ts` (`confirmed:
true`, summary, handling time, destinations). `/shipping`, the contact FAQ
answer and the sitemap entry switch on automatically. Rebuild to apply.

## 11. Content guidelines

- Write for customers first: fabric, weave, occasion, care, sizing questions.
- Every product: unique description, accurate fabric/colour/price, real photos
  with descriptive filenames and alt text.
- Journal: add guides only when genuinely useful (e.g. choosing a bridal saree,
  draping styles, blouse pairing). Update `dateModified` when revising.
- Keep claims verifiable. Current copy to review with the business:
  "Up to 20% Off" (home and catalogue banners), "master weavers" / "authentic
  handloom" banner copy, "New Collection 2026", and whether homepage
  testimonials are from real customers (with consent).

## 12. Search Console checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain and redeploy.
- [ ] Add a Domain property in Google Search Console; verify via DNS.
- [ ] Submit `https://{domain}/sitemap.xml`.
- [ ] URL-inspect home, `/sarees`, one collection, one product, one article.
- [ ] Check Pages report: only intended URLs indexed; colour URLs show
      "Alternate page with proper canonical".
- [ ] Check Enhancements: Breadcrumbs, Products (expect image warnings until
      photos are added).
- [ ] Review Core Web Vitals after real traffic.
- [ ] Add Bing Webmaster Tools (can import from Search Console).
- [ ] Re-submit the sitemap after adding products or articles.

## 13. Future opportunities

- Real product photography → Product rich results and Google Images traffic.
- Genuine customer reviews collected with consent → `Review` markup only once
  they are real and displayed on the page.
- Verified address + Google Business Profile → LocalBusiness markup.
- Confirmed shipping/returns → `OfferShippingDetails` / `MerchantReturnPolicy`.
- More guides answering real customer questions from WhatsApp enquiries.
- Product data feed for Google Merchant Center (free listings) once photos,
  availability and delivery are confirmed.
