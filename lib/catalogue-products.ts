/**
 * Client catalogue. Prices are INR amounts exactly as supplied.
 * Gallery images stay empty until real product photos are added on each
 * product in `lib/products.ts` (`gallery[].src`).
 */
export type CatalogueEntry = {
  sku: string;
  name: string;
  category: string;
  fabric: string;
  /** Omitted when the client did not confirm a colour. */
  colour?: string;
  /** Only details stated in the product name. */
  design?: string;
  /** Extra note the client supplied, such as an unconfirmed colour. */
  note?: string;
  /** Current selling price in INR, exactly as supplied. */
  sellingPrice: number;
  /** Suggested price before `sellingPrice`, in INR. Edit per saree. */
  originalPrice?: number;
  /** Coupon or UPI price for this saree only. Leave unset until configured. */
  offerPrice?: number;
  /** Label shown with `offerPrice`, for example "with coupon". */
  offerNote?: string;
};

export const catalogueEntries: CatalogueEntry[] = [
  {
    sku: "JS-A001",
    name: "Pure Ajrakh Red Saree",
    category: "Ajrakh",
    fabric: "Pure Ajrakh",
    colour: "Red",
    sellingPrice: 6500,
    originalPrice: 8248,
  },
  {
    sku: "JS-A002",
    name: "Pure Ajrakh Maroon Saree with Bandhani Dots and Rainbow Pallu",
    category: "Ajrakh",
    fabric: "Pure Ajrakh",
    colour: "Maroon",
    design: "Bandhani dots and a rainbow pallu",
    sellingPrice: 6500,
    originalPrice: 9126,
  },
  {
    sku: "JS-A003",
    name: "Pure Ajrakh Bright Plain Saree with Shibori Pallu",
    category: "Ajrakh",
    fabric: "Pure Ajrakh",
    colour: "Bright shade",
    design: "Plain body with a shibori pallu",
    note: "Exact colour to be confirmed.",
    sellingPrice: 4200,
    originalPrice: 6842,
  },
  {
    sku: "JS-A004",
    name: "Pure Ajrakh Saree with All-Over Design",
    category: "Ajrakh",
    fabric: "Pure Ajrakh",
    design: "All-over design",
    sellingPrice: 5000,
    originalPrice: 7936,
  },
  {
    sku: "JS-A005",
    name: "Pure Ajrakh Purple Saree with Elephant Border",
    category: "Ajrakh",
    fabric: "Pure Ajrakh",
    colour: "Purple",
    design: "Elephant border",
    sellingPrice: 9500,
    originalPrice: 9864,
  },
  {
    sku: "JS-A006",
    name: "Pure Ajrakh Saree with Contrast Border",
    category: "Ajrakh",
    fabric: "Pure Ajrakh",
    design: "Contrast border",
    sellingPrice: 7500,
    originalPrice: 9184,
  },
  {
    sku: "JS-A007",
    name: "Pure Ajrakh Wine-Coloured Saree",
    category: "Ajrakh",
    fabric: "Pure Ajrakh",
    colour: "Wine",
    sellingPrice: 6500,
    originalPrice: 7685,
  },
  {
    sku: "JS-A008",
    name: "Pure Ajrakh Bright Blue Saree with Red Border and Bandhani Dots",
    category: "Ajrakh",
    fabric: "Pure Ajrakh",
    colour: "Bright Blue with Red",
    design: "Red border and bandhani dots",
    sellingPrice: 6500,
    originalPrice: 9472,
  },
  {
    sku: "JS-A009",
    name: "Pure Ajrakh Dark Green Saree with Bandhani Dots and Golden Zari Pallu",
    category: "Ajrakh",
    fabric: "Pure Ajrakh",
    colour: "Dark Green",
    design: "Bandhani dots and a golden zari pallu",
    sellingPrice: 6500,
    originalPrice: 8420,
  },
  {
    sku: "JS-A010",
    name: "Pure Ajrakh Saree with Traditional Golden Border and All-Over Design",
    category: "Ajrakh",
    fabric: "Pure Ajrakh",
    design: "Traditional golden border and an all-over design",
    sellingPrice: 6500,
    originalPrice: 7058,
  },
  {
    sku: "JS-A011",
    name: "Baby Pink Fancy Pattu Saree",
    category: "Pattu",
    fabric: "Fancy Pattu",
    colour: "Baby Pink",
    sellingPrice: 7000,
    originalPrice: 8647,
  },
  {
    sku: "JS-A012",
    name: "Banarasi Georgette Peach Saree with Ice Blue Contrast Border",
    category: "Banarasi",
    fabric: "Georgette",
    colour: "Peach with Ice Blue",
    design: "Ice blue contrast border",
    sellingPrice: 9500,
    originalPrice: 9782,
  },
  {
    sku: "JS-A013",
    name: "Pure Banarasi Kora Silk Saree",
    category: "Banarasi",
    fabric: "Kora Silk",
    colour: "Light Baby Pink",
    sellingPrice: 6000,
    originalPrice: 7486,
  },
  {
    sku: "JS-A014",
    name: "Pure Banarasi Georgette Light Blue Saree with Light Teal Green Border",
    category: "Banarasi",
    fabric: "Georgette",
    colour: "Light Blue with Teal Green",
    design: "Light teal green border",
    sellingPrice: 7500,
    originalPrice: 8894,
  },
  {
    sku: "JS-A015",
    name: "Pure Kora Red Saree with Colourful Leaf Motifs and All-Over Butis",
    category: "Kora",
    fabric: "Pure Kora",
    colour: "Red",
    design: "Colourful leaf motifs and all-over butis",
    sellingPrice: 4500,
    originalPrice: 6274,
  },
  {
    sku: "JS-A016",
    name: "Pure Kora Fancy Saree with Golden Work",
    category: "Kora",
    fabric: "Pure Kora",
    design: "Golden work",
    sellingPrice: 4500,
    originalPrice: 5968,
  },
  {
    sku: "JS-A017",
    name: "Pure Kora Fancy Cream Saree with All-Over Floral Threadwork",
    category: "Kora",
    fabric: "Pure Kora",
    colour: "Cream",
    design: "All-over floral threadwork",
    sellingPrice: 4500,
    originalPrice: 8126,
  },
  {
    sku: "JS-A018",
    name: "Pure Kora Fancy Black Saree with Small Golden Border and Colourful Floral Prints",
    category: "Kora",
    fabric: "Pure Kora",
    colour: "Black",
    design: "Small golden border and colourful floral prints",
    sellingPrice: 4500,
    originalPrice: 5342,
  },
  {
    sku: "JS-A019",
    name: "Pure Kora Fancy Lavender Saree with Golden Butis",
    category: "Kora",
    fabric: "Pure Kora",
    colour: "Lavender",
    design: "Golden butis",
    sellingPrice: 4500,
    originalPrice: 9967,
  },
  {
    sku: "JS-A020",
    name: "Pure Kora Fancy Dual-Shade Saree in Orange and Red with an Elegant Border",
    category: "Kora",
    fabric: "Pure Kora",
    colour: "Orange and Red",
    design: "Elegant border",
    sellingPrice: 4500,
    originalPrice: 7185,
  },
];
