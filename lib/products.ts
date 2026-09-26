export type ProductGalleryItem = {
  id: string;
  label: string;
  /** Optional real image path under /public when available. */
  src?: string;
};

export type ProductColourOption = {
  id: string;
  label: string;
  hex: string;
};

export type Product = {
  slug: string;
  productId: string;
  name: string;
  category: string;
  collection: string;
  fabric: string;
  colour: string;
  colourOptions: ProductColourOption[];
  occasion: string;
  weave: string;
  design: string;
  price: number;
  priceLabel: string;
  createdAt: string;
  available: boolean;
  /** Shown on New Arrivals — kept separate from the main Sarees catalogue. */
  isNewArrival: boolean;
  shortDescription: string;
  about: string;
  gallery: ProductGalleryItem[];
};

export type CategoryNavItem = {
  id: string;
  label: string;
};

export type PriceRangeId = "all" | "under-10k" | "10k-20k" | "20k-plus";

export type AvailabilityId = "all" | "in-stock" | "out-of-stock";

export type SortId = "newest" | "price-asc" | "price-desc";

export type CatalogueFilters = {
  categoryNav: string;
  category: string;
  collection: string;
  colour: string;
  fabric: string;
  priceRange: PriceRangeId;
  availability: AvailabilityId;
  sort: SortId;
};

export const defaultCatalogueFilters: CatalogueFilters = {
  categoryNav: "all",
  category: "all",
  collection: "all",
  colour: "all",
  fabric: "all",
  priceRange: "all",
  availability: "all",
  sort: "newest",
};

export const defaultGallery: ProductGalleryItem[] = [
  { id: "full", label: "Full saree view" },
  { id: "model", label: "Model / styled view" },
  { id: "fabric", label: "Fabric / detail close-up" },
  { id: "pallu", label: "Pallu / border" },
  { id: "extra", label: "Additional view" },
];

/** Fixed colourways per design family — order never changes on select. */
const STYLE_COLOURWAYS: Record<string, string[]> = {
  Kanchipuram: ["Ruby Red", "Peacock Green", "Crimson", "Gold", "Ivory"],
  Banarasi: ["Ivory", "Rose", "Gold", "Crimson", "Silver"],
  "Soft Silk": ["Jade", "Teal", "Ivory", "Marigold", "Rose"],
  Designer: ["Midnight Blue", "Silver", "Ruby Red", "Ivory", "Teal"],
  Festive: ["Marigold", "Orange", "Ruby Red", "Gold", "Rose"],
  Wedding: ["Gold", "Crimson", "Ruby Red", "Ivory", "Peacock Green"],
};

function colourOptionsFor(
  category: string,
  defaultColour: string,
): ProductColourOption[] {
  const palette = [
    ...(STYLE_COLOURWAYS[category] ?? [
      "Ruby Red",
      "Ivory",
      "Jade",
      "Midnight Blue",
      "Gold",
    ]),
  ];

  if (!palette.includes(defaultColour)) {
    palette[palette.length - 1] = defaultColour;
  }

  return palette.slice(0, 5).map((label) => ({
    id: label
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    label,
    hex: colourHex(label),
  }));
}

function colourHex(label: string) {
  const map: Record<string, string> = {
    "Ruby Red": "#9b1b30",
    Ivory: "#f3efe6",
    Jade: "#2f7a5c",
    "Midnight Blue": "#0a2472",
    Marigold: "#e2a015",
    Gold: "#c9a227",
    "Peacock Green": "#0d5c4d",
    Rose: "#c96b8a",
    Silver: "#b8bec6",
    Crimson: "#b01030",
    Orange: "#d96a1f",
    Teal: "#1a7a7a",
  };
  return map[label] ?? "#6b7280";
}

type ProductInput = Omit<
  Product,
  "gallery" | "collection" | "available" | "colourOptions" | "isNewArrival"
> & {
  collection?: string;
  available?: boolean;
  gallery?: ProductGalleryItem[];
  colourOptions?: ProductColourOption[];
  isNewArrival?: boolean;
};

function createProduct(input: ProductInput): Product {
  return {
    ...input,
    available: input.available ?? true,
    isNewArrival: input.isNewArrival ?? false,
    collection: input.collection ?? input.category,
    gallery: input.gallery ?? defaultGallery,
    colourOptions:
      input.colourOptions ?? colourOptionsFor(input.category, input.colour),
  };
}

/** Placeholder catalogue data — replace with live inventory later. */
export const products: Product[] = [
  createProduct({
    slug: "ruby-kanjivaram",
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
    available: false,
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
  // —— New Arrivals (distinct styles, names and pricing from the main catalogue) ——
  createProduct({
    slug: "coral-temple-silk",
    productId: "JS-N01",
    name: "Coral Temple Silk",
    category: "Kanchipuram",
    fabric: "Pure Silk",
    colour: "Orange",
    occasion: "Wedding / Festive",
    weave: "Temple-border Kanchipuram handloom",
    design: "Coral body with temple zari borders",
    price: 19800,
    priceLabel: "₹19,800",
    createdAt: "2026-09-25",
    isNewArrival: true,
    shortDescription:
      "A coral Kanchipuram with temple borders and warm zari. Fresh from the loom for festive weddings.",
    about:
      "Newly woven in pure silk, this coral temple silk pairs a warm body with classic Kanchipuram borders. The design feels celebratory and contemporary. Ideal for festive weddings, with a luminous fall and structured pallu.",
  }),
  createProduct({
    slug: "mist-grey-banarasi",
    productId: "JS-N02",
    name: "Mist Grey Banarasi",
    category: "Banarasi",
    fabric: "Silk Brocade",
    colour: "Silver",
    occasion: "Reception / Evening",
    weave: "Fine Banarasi brocade",
    design: "Soft mist jaal with silver zari",
    price: 15600,
    priceLabel: "₹15,600",
    createdAt: "2026-09-24",
    isNewArrival: true,
    shortDescription:
      "A mist-grey Banarasi with silver jaal work. Quiet luxury for receptions and evening gatherings.",
    about:
      "Crafted in silk brocade with a soft mist ground, this Banarasi uses silver zari in a light floral jaal. The look is understated and modern. Suited to receptions and evening events, with a refined sheen and easy drape.",
  }),
  createProduct({
    slug: "saffron-soft-silk",
    productId: "JS-N03",
    name: "Saffron Soft Silk",
    category: "Soft Silk",
    fabric: "Soft Silk",
    colour: "Marigold",
    occasion: "Festive / Everyday",
    weave: "Lightweight soft silk",
    design: "Saffron field with slim tonal border",
    price: 8400,
    priceLabel: "₹8,400",
    createdAt: "2026-09-23",
    isNewArrival: true,
    shortDescription:
      "A saffron soft silk with a slim border. Bright, light and easy for festive days.",
    about:
      "Woven in soft silk for comfort, this saffron saree keeps ornament minimal and colour bold. Fresh seasonal colouring with a wearable fall. Perfect for festive days and polished everyday looks.",
  }),
  createProduct({
    slug: "indigo-evening-georgette",
    productId: "JS-N04",
    name: "Indigo Evening Georgette",
    category: "Designer",
    fabric: "Georgette",
    colour: "Midnight Blue",
    occasion: "Party / Evening",
    weave: "Fluid designer georgette",
    design: "Deep indigo with scattered shimmer motifs",
    price: 13900,
    priceLabel: "₹13,900",
    createdAt: "2026-09-22",
    isNewArrival: true,
    shortDescription:
      "A deep indigo designer georgette with soft shimmer. Made for evening parties and modern celebrations.",
    about:
      "A new designer drape in fluid georgette, this indigo saree uses scattered shimmer for evening light. The silhouette stays contemporary and light. Ideal for parties and cocktails, with soft movement and a sleek finish.",
  }),
  createProduct({
    slug: "blush-organza-bloom",
    productId: "JS-N05",
    name: "Blush Organza Bloom",
    category: "Designer",
    fabric: "Organza",
    colour: "Rose",
    occasion: "Reception / Party",
    weave: "Airy organza with floral accents",
    design: "Blush organza with delicate bloom motifs",
    price: 10500,
    priceLabel: "₹10,500",
    createdAt: "2026-09-21",
    isNewArrival: true,
    shortDescription:
      "A blush organza with delicate floral accents. Light, romantic and reception-ready.",
    about:
      "Finished in airy organza, this blush saree features soft bloom motifs and a romantic palette. Newly added for the season’s evening calendar. Best for receptions and parties, with translucent movement and gentle colour.",
  }),
  createProduct({
    slug: "emerald-festive-tissue",
    productId: "JS-N06",
    name: "Emerald Festive Tissue",
    category: "Festive",
    fabric: "Tissue Silk",
    colour: "Peacock Green",
    occasion: "Festive",
    weave: "Festive tissue silk",
    design: "Emerald tissue with light festive shimmer",
    price: 11200,
    priceLabel: "₹11,200",
    createdAt: "2026-09-20",
    isNewArrival: true,
    shortDescription:
      "An emerald tissue silk with festive shimmer. Bright colour for celebrations and seasonal gatherings.",
    about:
      "Newly stocked in tissue silk, this emerald saree brings festive glow without heaviness. Motifs stay light and celebratory. Ideal for festivals and family functions, with an airy drape and luminous surface.",
  }),
  createProduct({
    slug: "champagne-bridal-silk",
    productId: "JS-N07",
    name: "Champagne Bridal Silk",
    category: "Wedding",
    fabric: "Pure Silk",
    colour: "Gold",
    occasion: "Wedding",
    weave: "Bridal wedding silk",
    design: "Champagne gold with rich bridal borders",
    price: 32000,
    priceLabel: "₹32,000",
    createdAt: "2026-09-19",
    isNewArrival: true,
    shortDescription:
      "A champagne bridal silk with rich borders. Statement weaving for wedding ceremonies.",
    about:
      "A new bridal weave in pure silk, this champagne saree pairs soft gold tones with rich border work. Designed for ceremonial presence. Chosen for weddings and receptions, with substantial texture and lasting lustre.",
  }),
  createProduct({
    slug: "lavender-meadow-silk",
    productId: "JS-N08",
    name: "Lavender Meadow Silk",
    category: "Soft Silk",
    fabric: "Soft Silk",
    colour: "Rose",
    occasion: "Everyday / Festive",
    weave: "Soft silk with tonal accents",
    design: "Lavender-rose field with meadow-light border",
    price: 7200,
    priceLabel: "₹7,200",
    createdAt: "2026-09-18",
    isNewArrival: true,
    shortDescription:
      "A lavender soft silk with a light meadow border. Soft colour for festive days and elevated everyday wear.",
    about:
      "Crafted in soft silk for easy wear, this lavender saree uses a gentle rose-lavender tone and a restrained border. Fresh seasonal colouring. Suited to festive days and polished daily looks.",
  }),
  createProduct({
    slug: "copper-banarasi-glow",
    productId: "JS-N09",
    name: "Copper Banarasi Glow",
    category: "Banarasi",
    fabric: "Silk Brocade",
    colour: "Gold",
    occasion: "Festive / Wedding",
    weave: "Banarasi brocade with copper zari",
    design: "Warm copper floral with glowing zari",
    price: 17400,
    priceLabel: "₹17,400",
    createdAt: "2026-09-17",
    isNewArrival: true,
    shortDescription:
      "A copper-toned Banarasi with glowing zari florals. Warm elegance for festive and wedding evenings.",
    about:
      "A newly arrived Banarasi brocade in warm copper-gold tones, with glowing floral zari. The design feels rich yet wearable. Ideal for festive and wedding evenings, with a fine sheen and graceful fall.",
  }),
  createProduct({
    slug: "pearl-kanjivaram",
    productId: "JS-N10",
    name: "Pearl Kanjivaram",
    category: "Kanchipuram",
    fabric: "Pure Silk",
    colour: "Ivory",
    occasion: "Wedding / Formal",
    weave: "Traditional Kanchipuram handloom",
    design: "Pearl ivory body with contrast temple borders",
    price: 22500,
    priceLabel: "₹22,500",
    createdAt: "2026-09-16",
    isNewArrival: true,
    shortDescription:
      "A pearl ivory Kanjivaram with contrast temple borders. Fresh classic weaving for formal celebrations.",
    about:
      "Handloom-woven in pure silk, this pearl Kanjivaram pairs an ivory body with structured temple borders. Newly added for the wedding season. Best for formal celebrations, with a clean colour story and lasting drape.",
  }),
  createProduct({
    slug: "berry-soft-silk",
    productId: "JS-N11",
    name: "Berry Soft Silk",
    category: "Soft Silk",
    fabric: "Soft Silk",
    colour: "Crimson",
    occasion: "Festive / Everyday",
    weave: "Soft silk weave",
    design: "Deep berry field with slim contrast border",
    price: 6450,
    priceLabel: "₹6,450",
    createdAt: "2026-09-15",
    isNewArrival: true,
    shortDescription:
      "A berry soft silk with a slim contrast border. Deep colour, light fall, easy festive wear.",
    about:
      "Made in soft silk for comfort, this berry saree offers deep colour with a slim border. A fresh everyday-festive addition. Ideal for gatherings and elevated daily looks, with a soft hand and smooth finish.",
  }),
  createProduct({
    slug: "sky-festive-organza",
    productId: "JS-N12",
    name: "Sky Festive Organza",
    category: "Festive",
    fabric: "Organza",
    colour: "Teal",
    occasion: "Festive / Party",
    weave: "Light festive organza",
    design: "Sky-teal organza with airy festive accents",
    price: 9800,
    priceLabel: "₹9,800",
    createdAt: "2026-09-14",
    isNewArrival: true,
    shortDescription:
      "A sky-teal festive organza with airy accents. Light, bright and ready for celebrations.",
    about:
      "A new festive organza in sky-teal tones with light accents. The craft stays airy and celebratory. Perfect for festivals and parties, with translucent movement and fresh colour.",
  }),
];

/** Main Sarees catalogue — excludes New Arrivals exclusives. */
export const catalogueProducts: Product[] = products.filter(
  (product) => !product.isNewArrival,
);

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
    collections: uniqueSorted(items.map((item) => item.collection)),
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

export const availabilityOptions: { id: AvailabilityId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-stock", label: "In stock" },
  { id: "out-of-stock", label: "Out of stock" },
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

function matchesAvailability(product: Product, availability: AvailabilityId) {
  if (availability === "in-stock") return product.available;
  if (availability === "out-of-stock") return !product.available;
  return true;
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
    if (
      filters.collection !== "all" &&
      product.collection !== filters.collection
    ) {
      return false;
    }
    if (filters.colour !== "all" && product.colour !== filters.colour) {
      return false;
    }
    if (filters.fabric !== "all" && product.fabric !== filters.fabric) {
      return false;
    }
    if (!matchesPriceRange(product.price, filters.priceRange)) return false;
    if (!matchesAvailability(product, filters.availability)) return false;
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
    filters.collection !== "all" ||
    filters.colour !== "all" ||
    filters.fabric !== "all" ||
    filters.priceRange !== "all" ||
    filters.availability !== "all"
  );
}

export function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
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

export function getCatalogueProductBySlug(slug: string) {
  return catalogueProducts.find((product) => product.slug === slug);
}

export function getNewArrivalProductBySlug(slug: string) {
  return products.find(
    (product) => product.isNewArrival && product.slug === slug,
  );
}

export function getColourOption(
  product: Product,
  colourSlug?: string | null,
): ProductColourOption {
  if (colourSlug) {
    const match = product.colourOptions.find(
      (option) => option.id === colourSlug,
    );
    if (match) return match;
  }
  return (
    product.colourOptions.find((option) => option.label === product.colour) ??
    product.colourOptions[0] ?? {
      id: slugify(product.colour),
      label: product.colour,
      hex: "#6b7280",
    }
  );
}

/** Catalogue-aware product URL. Optional colour slug for shareable variants. */
export function productHref(
  productOrSlug: Product | string,
  colour?: string | ProductColourOption | null,
): string {
  const product =
    typeof productOrSlug === "string"
      ? getProductBySlug(productOrSlug)
      : productOrSlug;

  if (!product) {
    const slug =
      typeof productOrSlug === "string" ? productOrSlug : productOrSlug.slug;
    return `/sarees/${slug}`;
  }

  const base = product.isNewArrival
    ? `/new-arrivals/${product.slug}`
    : `/sarees/${product.slug}`;

  const colourId =
    typeof colour === "string"
      ? colour
      : colour && typeof colour === "object"
        ? colour.id
        : null;

  if (colourId) return `${base}/${colourId}`;
  return base;
}

export function productCatalogueHref(product: Product) {
  return product.isNewArrival ? "/new-arrivals" : "/sarees";
}

/** Stable cart line URL (uses stored catalogue flag — safe for stale basket rows). */
export function cartItemHref(item: {
  slug: string;
  colourId?: string;
  isNewArrival?: boolean;
}) {
  const base = item.isNewArrival
    ? `/new-arrivals/${item.slug}`
    : `/sarees/${item.slug}`;
  return item.colourId ? `${base}/${item.colourId}` : base;
}

/** New Arrivals exclusives — distinct styles, names and pricing. */
export function getNewArrivals(limit = 8): Product[] {
  return products
    .filter((product) => product.isNewArrival)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        item.isNewArrival === product.isNewArrival,
    )
    .map((item) => {
      let score = 0;
      if (
        item.collection === product.collection ||
        item.category === product.category
      ) {
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

/**
 * Colourways for a product design — fixed order from product data.
 * Selecting a colour never reorders this list.
 */
export function getProductColourOptions(product: Product): ProductColourOption[] {
  return product.colourOptions;
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

export function whatsappOrderUrl(
  baseUrl: string,
  lines: {
    name: string;
    productId: string;
    quantity: number;
    price: number;
    priceLabel: string;
    colour?: string;
  }[],
  storeName: string,
) {
  const total = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const itemBlock = lines
    .map((line, index) => {
      const colourLine = line.colour ? `\n   Colour: ${line.colour}` : "";
      return `${index + 1}. ${line.name}\n   SKU: ${line.productId}${colourLine}\n   Qty: ${line.quantity}\n   Price: ${line.priceLabel}`;
    })
    .join("\n\n");

  const text = [
    `*${storeName} — Saree Enquiry*`,
    "",
    "I would like to enquire about the following sarees:",
    "",
    itemBlock,
    "",
    `*Total enquiry value:* ${formatPrice(total)}`,
    "",
    "Please confirm availability and share order details. Thank you.",
  ].join("\n");

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(text)}`;
}
