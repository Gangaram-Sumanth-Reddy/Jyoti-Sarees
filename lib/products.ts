import { catalogueEntries } from "./catalogue-products";
import { swatchFor } from "./colours";

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
  /** Current selling price in INR. Same value as `sellingPrice`. */
  price: number;
  /** Current selling price in INR. */
  sellingPrice: number;
  priceLabel: string;
  /** Confirmed price before the selling price. Omit until the client provides it. */
  originalPrice?: number;
  /** Coupon or UPI price. Omit unless it is configured for this saree. */
  offerPrice?: number;
  /** Shown with `offerPrice`, for example "with coupon". */
  offerNote?: string;
  /** ISO date the saree was added — drives New Arrivals order and sitemap dates. */
  createdAt: string;
  /** ISO date of the last meaningful change to the listing (defaults to createdAt). */
  updatedAt?: string;
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
  /** `null` means no lower / upper bound (slider handle at the catalogue edge). */
  priceMin: number | null;
  priceMax: number | null;
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
  priceMin: null,
  priceMax: null,
  availability: "all",
  sort: "newest",
};

export const defaultGallery: ProductGalleryItem[] = [
  { id: "full", label: "Full saree view" },
  { id: "model", label: "Model / styled view" },
  { id: "fabric", label: "Fabric / detail close-up" },
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

/** Client catalogue. Real photos replace `defaultGallery` by setting `gallery[].src`. */
export const products: Product[] = catalogueEntries.map((entry, index) => {
  const priceLabel = `₹${entry.sellingPrice.toLocaleString("en-IN")}`;
  const details = [
    entry.colour ? `Colour: ${entry.colour}.` : "",
    entry.design ? `${entry.design}.` : "",
    entry.note ?? "",
    `Fabric: ${entry.fabric}.`,
    `Price: ${priceLabel}.`,
  ].filter(Boolean);
  const summary = `${entry.name}. ${details.join(" ")}`;
  const added = new Date(Date.UTC(2026, 9, 11));
  added.setUTCDate(added.getUTCDate() - index);

  return createProduct({
    slug: slugify(entry.name),
    productId: entry.sku,
    name: entry.name,
    category: entry.category,
    fabric: entry.fabric,
    colour: entry.colour ?? "",
    colourOptions: entry.colour
      ? [
          {
            id: slugify(entry.colour),
            label: entry.colour,
            hex: entry.colour === "Bright shade" ? "" : swatchFor(entry.colour),
          },
        ]
      : [],
    occasion: "",
    weave: "",
    design: entry.design ?? "",
    price: entry.sellingPrice,
    sellingPrice: entry.sellingPrice,
    priceLabel,
    originalPrice: entry.originalPrice,
    offerPrice: entry.offerPrice,
    offerNote: entry.offerNote,
    createdAt: added.toISOString().slice(0, 10),
    shortDescription: summary,
    about: summary,
  });
});

/** Main Sarees catalogue — excludes New Arrivals exclusives. */
export const catalogueProducts: Product[] = products.filter(
  (product) => !product.isNewArrival,
);

const CATEGORY_NAV_ORDER = [
  "All Sarees",
  "Ajrakh",
  "Banarasi",
  "Pattu",
  "Kora",
  "Silk Sarees",
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
    colours: uniqueSorted(items.map((item) => item.colour).filter(Boolean)),
    fabrics: uniqueSorted(items.map((item) => item.fabric)),
  };
}

export function getPriceBounds(items: Product[] = products) {
  if (items.length === 0) return { min: 0, max: 0 };
  const prices = items.map((item) => item.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
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
    if (filters.priceMin !== null && product.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== null && product.price > filters.priceMax) {
      return false;
    }
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
    filters.priceMin !== null ||
    filters.priceMax !== null ||
    filters.availability !== "all"
  );
}

export function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

/** Whole-number percent saved. Null unless a confirmed original price is higher. */
export function discountPercent(sellingPrice: number, originalPrice?: number) {
  if (originalPrice === undefined || originalPrice <= sellingPrice) return null;
  const percent = Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
  return percent >= 1 ? percent : null;
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
      id: product.colour ? slugify(product.colour) : "unspecified",
      label: product.colour,
      hex: "",
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
  const exclusive = products.filter((product) => product.isNewArrival);
  const source = exclusive.length > 0 ? exclusive : products;
  return [...source]
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
  priceLabel?: string,
) {
  const reference = [productId ? `(${productId})` : "", priceLabel ? `Price: ${priceLabel}.` : ""]
    .filter(Boolean)
    .join(" ");
  const text = reference
    ? `Hi, I'm interested in ${productName} ${reference} Please share more details.`
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
