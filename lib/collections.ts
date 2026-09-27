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
};

/**
 * Category landing pages. Only categories that exist in the catalogue get a
 * page (see `indexableCollections`). The first eight appear on the homepage.
 */
export const collections: Collection[] = [
  {
    slug: "kanchipuram-silk",
    name: "Kanchipuram Silk",
    shortDescription: "Temple borders and rich silk weaves.",
    description:
      "Discover traditional Kanchipuram silk sarees known for structured borders, pure silk bodies and ceremonial elegance—ideal for weddings and formal occasions.",
    categories: ["Kanchipuram"],
    seoTitle: "Kanchipuram Silk Sarees (Kanjivaram)",
    metaDescription:
      "Browse Kanchipuram (Kanjivaram) silk sarees at Jyoti Sarees — pure silk bodies, temple borders and zari for weddings and ceremonies. Enquire on WhatsApp.",
    ogImage: "wedding",
    intro: [
      "Kanchipuram sarees — often spelled Kanjivaram — take their name from the temple town of Kanchipuram in Tamil Nadu, where weavers have worked with mulberry silk and zari for generations. They are known for heavy silk, lustrous colour and bold borders.",
      "This collection brings together the Kanchipuram-style sarees in our catalogue, from deep ruby and peacock green to temple-inspired coral. Each listing shows its fabric, weave and design so you can compare pieces before you enquire.",
    ],
    guide: [
      {
        heading: "Fabric and weave",
        paragraphs: [
          "Traditional Kanchipuram sarees are woven from mulberry silk, with zari (metallic thread) used for the borders, pallu and motifs. Borders and pallu are often woven in a contrasting colour and interlocked with the body, which gives the saree its structure and weight.",
          "Common motifs include temple towers, checks, stripes, peacocks and floral buttas.",
        ],
      },
      {
        heading: "When to wear a Kanchipuram saree",
        paragraphs: [
          "Their weight and sheen make Kanchipuram silks a natural choice for weddings, engagements, religious ceremonies and formal family occasions. Deeper shades such as ruby, crimson and peacock green are popular with brides and close family, while golds and ivories suit daytime ceremonies.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between Kanchipuram and Kanjivaram sarees?",
        answer:
          "They are the same. Kanjivaram is a widely used spelling of Kanchipuram, the town in Tamil Nadu where this style of silk saree originates.",
      },
      {
        question: "How should I store a Kanchipuram silk saree?",
        answer:
          "Store it folded in a breathable cotton or muslin cloth, away from direct sunlight and damp. Refolding along different lines every few months helps stop the zari from cracking at the creases.",
      },
      {
        question: "Can I ask about a saree's colour or zari before deciding?",
        answer:
          "Yes. Enquire on WhatsApp with the saree's product ID and our team will share more details and confirm availability before anything is finalised.",
      },
    ],
    related: ["banarasi", "wedding", "silk"],
    journal: ["kanchipuram-vs-banarasi-silk-sarees", "how-to-care-for-silk-sarees"],
  },
  {
    slug: "banarasi",
    name: "Banarasi",
    shortDescription: "Intricate brocade for celebratory wear.",
    description:
      "Explore Banarasi sarees with refined brocade, soft zari and festive detailing—chosen for weddings, receptions and celebratory evenings.",
    categories: ["Banarasi"],
    seoTitle: "Banarasi Sarees",
    metaDescription:
      "Explore Banarasi sarees at Jyoti Sarees — silk brocade with floral jaal and soft zari for weddings, receptions and festive evenings. Enquire on WhatsApp.",
    ogImage: "wedding",
    intro: [
      "Banarasi sarees come from Varanasi (Banaras) in Uttar Pradesh and are celebrated for brocade weaving, where patterns in zari and silk are woven directly into the fabric. The result is a saree with rich surface detail that still drapes gracefully.",
      "Our Banarasi collection includes silk brocade sarees in ivory, rose and mist grey, with floral jaal and understated zari suited to ceremonies and evening functions alike.",
    ],
    guide: [
      {
        heading: "Brocade, jaal and zari",
        paragraphs: [
          "Brocade weaving builds motifs into the cloth as it is woven, so patterns sit within the fabric rather than on top of it. Jaal is an all-over net or trellis pattern, often floral, while buttis are small scattered motifs.",
          "Zari may be gold- or silver-toned and gives Banarasi sarees their characteristic glow.",
        ],
      },
      {
        heading: "Styling a Banarasi saree",
        paragraphs: [
          "Lighter Banarasi sarees in ivory, rose or silver work beautifully for receptions, engagements and festive evenings, while heavier brocades suit wedding ceremonies. Because the fabric carries so much detail, a simple blouse and minimal jewellery often let the weave stand out.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are Banarasi sarees suitable for weddings?",
        answer:
          "Yes. Banarasi brocade is one of the most popular choices for weddings and receptions. Heavier zari work suits the ceremony, while lighter jaal designs work well for receptions and family functions.",
      },
      {
        question: "How is a Banarasi saree different from a Kanchipuram saree?",
        answer:
          "Banarasi sarees are known for fine brocade patterns woven across the body, while Kanchipuram sarees are known for heavier silk and bold contrast borders. Our journal guide comparing the two explains the differences in weave, weight and occasion.",
      },
    ],
    related: ["kanchipuram-silk", "wedding", "organza"],
    journal: ["kanchipuram-vs-banarasi-silk-sarees", "saree-fabric-guide"],
  },
  {
    slug: "soft-silk",
    name: "Soft Silk",
    shortDescription: "Light drape with everyday elegance.",
    description:
      "Soft silk sarees with an easy fall and light hand—perfect for festive days and elevated everyday wear without heavy formality.",
    categories: ["Soft Silk"],
    seoTitle: "Soft Silk Sarees",
    metaDescription:
      "Browse soft silk sarees at Jyoti Sarees — lightweight silk with an easy drape in jade, teal and saffron for festive days and elevated everyday wear.",
    ogImage: "festive",
    intro: [
      "Soft silk sarees are woven to be lighter and more pliable than traditional heavy silks, so they stay comfortable through long days while keeping silk's natural sheen.",
      "This collection features soft silks in jade, teal, saffron and warm festive tones, with minimal borders and tonal accents that move easily from festive gatherings to office celebrations and family visits.",
    ],
    guide: [
      {
        heading: "Why choose soft silk",
        paragraphs: [
          "Soft silk drapes closely and pleats neatly, which makes it easier to wear if you find heavy silk tiring. It usually carries lighter zari or tonal borders, keeping the saree elegant without feeling formal.",
        ],
      },
      {
        heading: "Occasions for soft silk",
        paragraphs: [
          "Soft silk is a versatile choice for festivals, poojas, family functions and work events. Brighter shades such as saffron and marigold suit festive days, while jade and teal feel polished for daytime occasions.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is soft silk the same as pure silk?",
        answer:
          "Not always. “Soft silk” describes the saree's light, pliable feel rather than one specific fibre. Each product page lists the fabric, and our team can answer questions about any piece.",
      },
      {
        question: "Are soft silk sarees good for regular wear?",
        answer:
          "They are one of the most wearable silk options — lighter than traditional silks and easy to drape — which is why many people choose them for regular festive and work occasions.",
      },
    ],
    related: ["silk", "festive", "kanchipuram-silk"],
    journal: ["saree-fabric-guide", "how-to-care-for-silk-sarees"],
  },
  {
    slug: "designer",
    name: "Designer",
    shortDescription: "Contemporary silhouettes, classic craft.",
    description:
      "Contemporary designer sarees with modern finishes and wearable glamour—suited to parties, receptions and modern celebrations.",
    categories: ["Designer"],
    seoTitle: "Designer Sarees",
    metaDescription:
      "Discover designer sarees at Jyoti Sarees — contemporary georgette and organza drapes with modern finishes for parties, receptions and evening celebrations.",
    ogImage: "newCollection",
    intro: [
      "Designer sarees bring contemporary colour, lighter fabrics and modern finishing to the six yards. They suit occasions where you want a polished, current look rather than a traditional heavy silk.",
      "Our designer edit includes georgette and organza sarees in midnight blue, silver and jewel tones — easy to drape and pair with statement blouses for parties and receptions.",
    ],
    guide: [
      {
        heading: "Fabrics used in designer sarees",
        paragraphs: [
          "Designer sarees are often made in georgette, organza, chiffon or blended fabrics that are lighter than silk. Georgette gives a fluid, flowing drape, while organza is crisp and sheer with a subtle sheen.",
        ],
      },
      {
        heading: "Styling for evening events",
        paragraphs: [
          "Deep shades such as midnight blue and ruby look beautiful under evening lighting, and metallic silver or ivory suits receptions and cocktail events. A structured or embellished blouse can change the look completely, so one designer saree can be styled for several occasions.",
        ],
      },
    ],
    faqs: [
      {
        question: "What occasions are designer sarees best for?",
        answer:
          "Designer sarees are popular for parties, receptions, sangeet and cocktail evenings, and with wedding guests who prefer something lighter than traditional silk.",
      },
      {
        question: "Are designer sarees easy to drape?",
        answer:
          "Lighter fabrics such as georgette and organza are generally easier to drape and pleat than heavy silks, which makes them comfortable for long evening events.",
      },
    ],
    related: ["georgette", "organza", "festive"],
    journal: ["saree-fabric-guide"],
  },
  {
    slug: "festive",
    name: "Festive",
    shortDescription: "Colour and detail for the season.",
    description:
      "Festive sarees in bright colours and celebratory textures—curated for seasonal gatherings, functions and joyful occasions.",
    categories: ["Festive"],
    seoTitle: "Festive Sarees",
    metaDescription:
      "Browse festive sarees at Jyoti Sarees — tissue silk, soft silk and organza in marigold, saffron and jewel tones for Diwali, poojas and celebrations.",
    ogImage: "festive",
    intro: [
      "Festive sarees are about colour and light. This collection gathers the sarees in our catalogue chosen for seasonal celebrations — marigold, sunset orange, gold and rose, in fabrics with a natural glow.",
      "From tissue silk that catches lamplight to soft silk that stays comfortable through long pooja days, these sarees are picked to feel celebratory without being difficult to wear.",
    ],
    guide: [
      {
        heading: "Festive fabrics",
        paragraphs: [
          "Tissue silk has metallic threads woven through it, giving a shimmering finish that suits evening celebrations. Soft silk offers comfort for long days, while organza adds a light, airy sheen.",
        ],
      },
      {
        heading: "Choosing a festive colour",
        paragraphs: [
          "Warm shades — marigold, saffron, orange and gold — are traditional favourites for Diwali, Navratri, Pongal and other festivals. Rose and teal offer a softer alternative if you prefer a less bright palette.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which fabrics are best for festive sarees?",
        answer:
          "It depends on the celebration. Tissue silk and organza have a festive shine for evenings, while soft silk is comfortable for daytime poojas and family gatherings. Each saree's page lists its fabric.",
      },
      {
        question: "Can I enquire about several sarees at once?",
        answer:
          "Yes. Add the sarees you like to your enquiry list and send them to us on WhatsApp in a single message. Our team will confirm availability and details.",
      },
    ],
    related: ["soft-silk", "organza", "silk"],
    journal: ["saree-fabric-guide"],
  },
  {
    slug: "wedding",
    name: "Wedding",
    shortDescription: "Heirloom pieces for momentous days.",
    description:
      "Wedding sarees selected for presence, rich fabrics and ceremonial detailing—made for bridal and wedding celebrations.",
    categories: ["Wedding"],
    seoTitle: "Wedding Sarees",
    metaDescription:
      "Explore wedding sarees at Jyoti Sarees — pure silk in gold, crimson and ruby with rich zari for brides, families and wedding ceremonies. Enquire on WhatsApp.",
    ogImage: "wedding",
    intro: [
      "Wedding sarees are chosen to be remembered. This collection brings together pure silk sarees in gold, crimson, ruby and peacock green, with rich zari and ceremonial detailing suited to brides, mothers and close family.",
      "Browse by colour and weave, then enquire with the product ID — our team will confirm availability and help you compare pieces for different ceremonies.",
    ],
    guide: [
      {
        heading: "Choosing a wedding saree",
        paragraphs: [
          "Think about the ceremony, the time of day and the traditions involved. Heavier pure silks with broad zari borders are traditional for the main ceremony, while lighter silks or brocades can work better for receptions and pre-wedding functions.",
        ],
      },
      {
        heading: "Colours for weddings",
        paragraphs: [
          "Red, crimson and gold remain classic bridal colours in many communities, while ivory with gold is traditional in others. Peacock green, ruby and deep jewel tones are popular with family members and guests who want a ceremonial look.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have sarees for brides and wedding families?",
        answer:
          "Yes. This collection includes pure silk sarees suited to brides and family members, and our Kanchipuram and Banarasi collections include further wedding-appropriate pieces.",
      },
      {
        question: "Can I get help choosing sarees for a wedding?",
        answer:
          "Yes. Send us an enquiry or message us on WhatsApp with the occasion, colours and number of sarees you are looking for, and our team will help you shortlist options.",
      },
    ],
    related: ["kanchipuram-silk", "banarasi", "silk"],
    journal: ["kanchipuram-vs-banarasi-silk-sarees", "how-to-care-for-silk-sarees"],
  },
  {
    slug: "georgette",
    name: "Georgette",
    shortDescription: "Fluid drape for evening ease.",
    description:
      "Georgette sarees with soft movement and contemporary finish—chosen for parties, receptions and light evening wear.",
    categories: ["Designer"],
    fabrics: ["Georgette"],
    seoTitle: "Georgette Sarees",
    metaDescription:
      "Browse georgette sarees at Jyoti Sarees — fluid, lightweight drapes in midnight blue and indigo for parties, receptions and evening wear.",
    ogImage: "newCollection",
    intro: [
      "Georgette is a lightweight, slightly textured fabric with a beautiful fall, which makes georgette sarees easy to drape and comfortable to wear for hours.",
      "Our georgette sarees lean contemporary — deep midnight and indigo shades with clean finishes — and suit evening events, receptions and parties.",
    ],
    guide: [
      {
        heading: "About georgette",
        paragraphs: [
          "Georgette has a crinkled, matte surface and moves fluidly as you walk. It holds pleats well, resists creasing better than many fabrics and is lighter to wear than silk.",
        ],
      },
      {
        heading: "Caring for georgette",
        paragraphs: [
          "Georgette is delicate: dry cleaning or a gentle cold hand wash is safest, and it should be ironed on a low setting. Store it folded or on a padded hanger, away from jewellery that can snag the weave.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is georgette good for warm-weather events?",
        answer:
          "Yes. Georgette is light and breathable compared with heavier silks, which makes it comfortable for daytime and warm-weather functions as well as evenings.",
      },
    ],
    related: ["designer", "organza", "festive"],
    journal: ["saree-fabric-guide"],
  },
  {
    slug: "organza",
    name: "Organza",
    shortDescription: "Airy sheers with festive light.",
    description:
      "Organza sarees with translucent movement and delicate accents—ideal for receptions, parties and celebratory evenings.",
    categories: ["Designer", "Festive"],
    fabrics: ["Organza"],
    seoTitle: "Organza Sarees",
    metaDescription:
      "Discover organza sarees at Jyoti Sarees — sheer, crisp drapes in silver and sky-teal with delicate accents for receptions, parties and festive evenings.",
    ogImage: "newCollection",
    intro: [
      "Organza is a sheer, crisp fabric with a gentle sheen. Organza sarees feel light and airy yet hold their shape, giving a structured, elegant silhouette.",
      "This collection includes designer and festive organza sarees in silver, sky-teal and soft tones — pieces that photograph beautifully at receptions and evening celebrations.",
    ],
    guide: [
      {
        heading: "About organza",
        paragraphs: [
          "Organza is traditionally woven from silk, though many modern organzas use blended yarns. Its tight, sheer weave gives a crisp finish that stands slightly away from the body, which is why organza sarees look voluminous and light.",
        ],
      },
      {
        heading: "Styling organza",
        paragraphs: [
          "Pastel and metallic organzas suit daytime receptions and engagements, while deeper tones work for evening parties. A structured blouse and light jewellery keep the look airy.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is an organza saree comfortable to wear?",
        answer:
          "Organza is very light, though crisper than georgette or soft silk. Many people find it comfortable for receptions and parties where a structured, elegant drape is the goal.",
      },
    ],
    related: ["designer", "georgette", "festive"],
    journal: ["saree-fabric-guide"],
  },
  {
    slug: "silk",
    name: "Silk",
    shortDescription: "Pure, soft and tissue silks in one place.",
    description:
      "Every silk saree in the Jyoti Sarees catalogue — Kanchipuram pure silk, Banarasi silk brocade, soft silk and tissue silk for weddings, festivals and everyday elegance.",
    categories: [],
    fabrics: ["Pure Silk", "Silk Brocade", "Soft Silk", "Tissue Silk"],
    seoTitle: "Silk Sarees",
    metaDescription:
      "Browse silk sarees at Jyoti Sarees — Kanchipuram pure silk, Banarasi brocade, soft silk and tissue silk for weddings, festivals and special occasions.",
    ogImage: "brand",
    intro: [
      "Silk is the fabric most closely associated with the saree in India, prized for its sheen, depth of colour and the way it holds zari. This page brings every silk saree in our catalogue together in one place.",
      "You will find pure silk Kanchipuram weaves, Banarasi silk brocades, lightweight soft silks and shimmering tissue silks — use the filters to narrow down by colour, fabric and price.",
    ],
    guide: [
      {
        heading: "Types of silk sarees",
        paragraphs: [
          "Pure (mulberry) silk is heavier and more lustrous and is the traditional choice for Kanchipuram sarees. Silk brocade has patterns woven into the cloth, as in Banarasi sarees. Soft silk is lighter and more pliable, and tissue silk includes metallic threads for a shimmering finish.",
        ],
      },
      {
        heading: "Looking after silk",
        paragraphs: [
          "Silk sarees last longest when dry cleaned, stored in breathable cotton covers and refolded occasionally so that zari borders do not crack along the same creases.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which silk saree is best for a wedding?",
        answer:
          "Pure silk Kanchipuram and Banarasi brocade sarees are the most traditional wedding choices because of their weight, sheen and rich zari. Soft silk works well for pre-wedding functions and guests.",
      },
      {
        question: "How do I know what fabric a saree is?",
        answer:
          "Every product page lists the saree's fabric, weave and design. For more detail on a particular piece, enquire with its product ID and our team will help.",
      },
    ],
    related: ["kanchipuram-silk", "banarasi", "soft-silk"],
    journal: ["saree-fabric-guide", "how-to-care-for-silk-sarees"],
  },
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
