export type ProductGalleryItem = {
  id: string;
  label: string;
};

export type Product = {
  slug: string;
  productId: string;
  name: string;
  category: string;
  collection: string;
  fabric: string;
  colour: string;
  occasion: string;
  weave: string;
  design: string;
  price: number;
  priceLabel: string;
  createdAt: string;
  shortDescription: string;
  about: string;
  gallery: ProductGalleryItem[];
};

export type CategoryNavItem = {
  id: string;
  label: string;
};

export type PriceRangeId = "all" | "under-10k" | "10k-20k" | "20k-plus";

export type SortId = "newest" | "price-asc" | "price-desc";

export type CatalogueFilters = {
  categoryNav: string;
  category: string;
  colour: string;
  fabric: string;
  priceRange: PriceRangeId;
  sort: SortId;
};

export const defaultCatalogueFilters: CatalogueFilters = {
  categoryNav: "all",
  category: "all",
  colour: "all",
  fabric: "all",
  priceRange: "all",
  sort: "newest",
};

export const defaultGallery: ProductGalleryItem[] = [
  { id: "full", label: "Full saree view" },
  { id: "model", label: "Model / styled view" },
  { id: "fabric", label: "Fabric / detail close-up" },
  { id: "pallu", label: "Pallu / border" },
  { id: "extra", label: "Additional view" },
];

type ProductInput = Omit<Product, "gallery" | "collection"> & {
  collection?: string;
  gallery?: ProductGalleryItem[];
};

function createProduct(input: ProductInput): Product {
  return {
    ...input,
    collection: input.collection ?? input.category,
    gallery: input.gallery ?? defaultGallery,
  };
}

/** Placeholder catalogue data — replace with live inventory later. */
export const products: Product[] = [
  createProduct({
    slug: "kanjeevaram-ruby",
    productId: "JS-001",
    name: "Ruby Kanjivaram",
    category: "Kanchipuram",
    fabric: "Pure Silk",
    colour: "Ruby Red",
    occasion: "Wedding",
    weave: "Traditional Kanchipuram handloom",
    design: "Temple border with classic zari motifs",
    price: 18500,
    priceLabel: "₹18,500",
    createdAt: "2026-09-18",
    shortDescription:
      "A rich ruby Kanjivaram silk with temple borders and luminous zari. Ideal for weddings and ceremonial occasions.",
    about:
      "Woven in pure silk with a traditional Kanchipuram handloom technique, this saree pairs a deep ruby body with structured temple borders. The design balances heritage motifs with a clean, modern drape. Best suited for weddings and formal celebrations, with a substantial fall and lasting lustre.",
  }),
  createProduct({
    slug: "ivory-banarasi",
    productId: "JS-002",
    name: "Ivory Banarasi",
    category: "Banarasi",
    fabric: "Silk Brocade",
    colour: "Ivory",
    occasion: "Wedding",
    weave: "Banarasi brocade",
    design: "Delicate floral jaal with soft zari",
    price: 14200,
    priceLabel: "₹14,200",
    createdAt: "2026-09-16",
    shortDescription:
      "An ivory Banarasi brocade with soft floral jaal work. Elegant for weddings, receptions and festive gatherings.",
    about:
      "Crafted in silk brocade using classic Banarasi weaving, this ivory saree features a refined floral jaal and gentle zari highlights. The design feels light yet ceremonial. Perfect for weddings and festive evenings, with a graceful drape and understated sheen.",
  }),
  createProduct({
    slug: "jade-soft-silk",
    productId: "JS-003",
    name: "Jade Soft Silk",
    category: "Soft Silk",
    fabric: "Soft Silk",
    colour: "Jade",
    occasion: "Everyday / Festive",
    weave: "Soft silk weave",
    design: "Minimal border with tonal accents",
    price: 6900,
    priceLabel: "₹6,900",
    createdAt: "2026-09-14",
    shortDescription:
      "A lightweight jade soft silk with a smooth fall. Easy to wear for festive days and elevated everyday looks.",
    about:
      "Made in soft silk for comfort and fluid movement, this jade saree uses a clean tonal border and quiet detailing. The craft prioritises ease without losing polish. Suited to festive gatherings and refined daily wear, with a light hand and soft lustre.",
  }),
  createProduct({
    slug: "midnight-designer",
    productId: "JS-004",
    name: "Midnight Designer",
    category: "Designer",
    fabric: "Georgette",
    colour: "Midnight Blue",
    occasion: "Party / Evening",
    weave: "Contemporary designer finish",
    design: "Modern silhouette with subtle shimmer",
    price: 12800,
    priceLabel: "₹12,800",
    createdAt: "2026-09-12",
    shortDescription:
      "A midnight blue designer georgette with contemporary detailing. Made for evening events and modern celebrations.",
    about:
      "Finished in fluid georgette with a contemporary designer approach, this midnight saree offers soft movement and subtle shimmer. The design keeps ornament restrained for a sleek evening look. Ideal for parties and modern gatherings, with an easy drape and polished finish.",
  }),
  createProduct({
    slug: "marigold-festive",
    productId: "JS-005",
    name: "Marigold Festive",
    category: "Festive",
    fabric: "Tissue Silk",
    colour: "Marigold",
    occasion: "Festive",
    weave: "Tissue silk weave",
    design: "Bright festive motifs with light shimmer",
    price: 9450,
    priceLabel: "₹9,450",
    createdAt: "2026-09-10",
    shortDescription:
      "A marigold tissue silk with festive shimmer. Bright, celebratory and ready for seasonal gatherings.",
    about:
      "Woven in tissue silk for a light festive glow, this marigold saree brings cheerful colour with delicate shimmer. Motifs stay lively without feeling heavy. Best for festive occasions and celebrations, with an airy drape and luminous surface.",
  }),
  createProduct({
    slug: "golden-wedding-weave",
    productId: "JS-006",
    name: "Golden Wedding Weave",
    category: "Wedding",
    fabric: "Pure Silk",
    colour: "Gold",
    occasion: "Wedding",
    weave: "Rich wedding silk weave",
    design: "Opulent borders with traditional motifs",
    price: 24000,
    priceLabel: "₹24,000",
    createdAt: "2026-09-08",
    shortDescription:
      "A golden wedding silk with opulent borders. Designed for bridal and ceremonial moments that deserve presence.",
    about:
      "Crafted in pure silk with a rich wedding weave, this golden saree features opulent borders and traditional motifs. The design is ceremonial yet carefully balanced. Chosen for bridal and wedding events, with substantial texture and lasting brilliance.",
  }),
  createProduct({
    slug: "peacock-kanchipuram",
    productId: "JS-007",
    name: "Peacock Kanchipuram",
    category: "Kanchipuram",
    fabric: "Pure Silk",
    colour: "Peacock Green",
    occasion: "Wedding / Formal",
    weave: "Traditional Kanchipuram handloom",
    design: "Peacock-inspired borders and contrast pallu",
    price: 21000,
    priceLabel: "₹21,000",
    createdAt: "2026-09-06",
    shortDescription:
      "A peacock-green Kanchipuram with contrast pallu and heritage borders. Statement elegance for formal celebrations.",
    about:
      "Handloom-woven in pure silk, this peacock-green Kanchipuram highlights contrast pallu work and heritage border language. The craftsmanship is classic and precise. Ideal for weddings and formal occasions, with a strong colour story and structured drape.",
  }),
  createProduct({
    slug: "rose-banarasi",
    productId: "JS-008",
    name: "Rose Banarasi",
    category: "Banarasi",
    fabric: "Silk Brocade",
    colour: "Rose",
    occasion: "Festive / Wedding",
    weave: "Banarasi brocade",
    design: "Romantic floral sprays with soft zari",
    price: 16800,
    priceLabel: "₹16,800",
    createdAt: "2026-09-04",
    shortDescription:
      "A rose Banarasi brocade with romantic florals. Soft colour, fine zari and festive-ready presence.",
    about:
      "Woven as a Banarasi silk brocade, this rose saree features romantic floral sprays and soft zari accents. The design feels feminine and celebratory. Suited to festive and wedding occasions, with a refined sheen and graceful fall.",
  }),
  createProduct({
    slug: "silver-designer",
    productId: "JS-009",
    name: "Silver Designer Drape",
    category: "Designer",
    fabric: "Organza",
    colour: "Silver",
    occasion: "Party / Reception",
    weave: "Designer organza finish",
    design: "Light metallic accents on airy organza",
    price: 11200,
    priceLabel: "₹11,200",
    createdAt: "2026-09-02",
    shortDescription:
      "A silver designer organza with light metallic accents. Airy, modern and suited to evening receptions.",
    about:
      "Finished in airy organza with a contemporary designer touch, this silver saree uses light metallic accents for quiet glamour. The craft keeps the look modern and wearable. Perfect for parties and receptions, with translucent movement and soft shimmer.",
  }),
  createProduct({
    slug: "crimson-wedding",
    productId: "JS-010",
    name: "Crimson Wedding Silk",
    category: "Wedding",
    fabric: "Pure Silk",
    colour: "Crimson",
    occasion: "Wedding",
    weave: "Rich wedding silk weave",
    design: "Bold crimson body with heavy border work",
    price: 27500,
    priceLabel: "₹27,500",
    createdAt: "2026-08-28",
    shortDescription:
      "A deep crimson wedding silk with bold border work. Made for bridal ceremonies and grand celebrations.",
    about:
      "Woven in pure silk for wedding grandeur, this crimson saree pairs a deep body with bold border detailing. Traditional craft meets a strong colour statement. Intended for bridal and ceremonial events, with rich texture and lasting presence.",
  }),
  createProduct({
    slug: "sunset-festive",
    productId: "JS-011",
    name: "Sunset Festive Silk",
    category: "Festive",
    fabric: "Soft Silk",
    colour: "Orange",
    occasion: "Festive",
    weave: "Soft silk festive weave",
    design: "Warm sunset tones with light border accents",
    price: 8200,
    priceLabel: "₹8,200",
    createdAt: "2026-08-22",
    shortDescription:
      "A warm orange festive soft silk with light accents. Bright colour for celebrations and seasonal gatherings.",
    about:
      "Crafted in soft silk for comfortable festive wear, this sunset-orange saree uses warm tones and light border accents. The design stays cheerful and easy. Ideal for festive occasions, with a soft hand and lively colour.",
  }),
  createProduct({
    slug: "teal-soft-silk",
    productId: "JS-012",
    name: "Teal Soft Silk",
    category: "Soft Silk",
    fabric: "Soft Silk",
    colour: "Teal",
    occasion: "Everyday / Festive",
    weave: "Soft silk weave",
    design: "Clean teal field with restrained border",
    price: 7500,
    priceLabel: "₹7,500",
    createdAt: "2026-08-18",
    shortDescription:
      "A teal soft silk with a clean field and restrained border. Fresh colour for festive days and polished everyday wear.",
    about:
      "Made in soft silk for everyday ease, this teal saree keeps the field clean and the border restrained. Craft and design favour wearability with quiet elegance. Suited to festive days and elevated daily looks, with a light drape and smooth finish.",
  }),
];

const CATEGORY_NAV_ORDER = [
  "All Sarees",
  "Silk Sarees",
  "Kanchipuram",
  "Banarasi",
  "Designer",
  "Festive",
  "Wedding",
] as const;

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function isSilkProduct(product: Product) {
  return /silk/i.test(product.fabric) || /silk/i.test(product.category);
}

/** Builds horizontal category nav from products that actually exist. */
export function getCategoryNav(items: Product[] = products): CategoryNavItem[] {
  const present = new Set(items.map((item) => item.category));
  const hasSilk = items.some(isSilkProduct);

  return CATEGORY_NAV_ORDER.filter((label) => {
    if (label === "All Sarees") return true;
    if (label === "Silk Sarees") return hasSilk || present.has("Silk Sarees");
    return present.has(label);
  }).map((label) => ({
    id: label === "All Sarees" ? "all" : slugify(label),
    label,
  }));
}

export function getFilterOptions(items: Product[] = products) {
  return {
    categories: uniqueSorted(items.map((item) => item.category)),
    colours: uniqueSorted(items.map((item) => item.colour)),
    fabrics: uniqueSorted(items.map((item) => item.fabric)),
  };
}

export const priceRangeOptions: { id: PriceRangeId; label: string }[] = [
  { id: "all", label: "All prices" },
  { id: "under-10k", label: "Under ₹10,000" },
  { id: "10k-20k", label: "₹10,000 – ₹20,000" },
  { id: "20k-plus", label: "₹20,000 & above" },
];

export const sortOptions: { id: SortId; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

function matchesPriceRange(price: number, range: PriceRangeId) {
  switch (range) {
    case "under-10k":
      return price < 10000;
    case "10k-20k":
      return price >= 10000 && price <= 20000;
    case "20k-plus":
      return price > 20000;
    default:
      return true;
  }
}

function matchesCategoryNav(product: Product, categoryNav: string) {
  if (categoryNav === "all") return true;
  if (categoryNav === "silk-sarees") return isSilkProduct(product);
  return slugify(product.category) === categoryNav;
}

export function filterAndSortProducts(
  items: Product[],
  filters: CatalogueFilters,
): Product[] {
  const filtered = items.filter((product) => {
    if (!matchesCategoryNav(product, filters.categoryNav)) return false;
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }
    if (filters.colour !== "all" && product.colour !== filters.colour) {
      return false;
    }
    if (filters.fabric !== "all" && product.fabric !== filters.fabric) {
      return false;
    }
    if (!matchesPriceRange(product.price, filters.priceRange)) return false;
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export function hasActiveFilters(filters: CatalogueFilters) {
  return (
    filters.categoryNav !== "all" ||
    filters.category !== "all" ||
    filters.colour !== "all" ||
    filters.fabric !== "all" ||
    filters.priceRange !== "all"
  );
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

/** Canonical product detail route used across Home, catalogue, and related cards. */
export function productHref(slug: string) {
  return `/sarees/${slug}`;
}

/** Latest catalogue items, newest first. */
export function getNewArrivals(limit = 8): Product[] {
  return [...products]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((item) => item.slug !== product.slug)
    .map((item) => {
      let score = 0;
      if (item.collection === product.collection || item.category === product.category) {
        score += 5;
      }
      if (item.fabric === product.fabric) score += 3;
      if (item.colour === product.colour) score += 2;
      if (item.occasion === product.occasion) score += 1;
      return { item, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.item.createdAt.localeCompare(a.item.createdAt);
    })
    .slice(0, limit)
    .map(({ item }) => item);
}

export function whatsappEnquiryUrl(
  productName: string,
  baseUrl: string,
  productId?: string,
) {
  const text = productId
    ? `Hi, I'm interested in ${productName} (${productId}). Please share more details.`
    : `Hi, I'm interested in ${productName}. Please share more details.`;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(text)}`;
}
