import { seoImages, type SeoImage } from "@/lib/seo";

export type JournalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type JournalArticle = {
  slug: string;
  title: string;
  /** Search title without the brand suffix. */
  seoTitle: string;
  description: string;
  excerpt: string;
  author: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  image: SeoImage;
  sections: JournalSection[];
  /** Collection slugs linked from the article. */
  relatedCollections: string[];
};

/**
 * Editorial guides. Add new articles here; the journal index, article pages,
 * sitemap and Article structured data pick them up automatically. Keep every
 * guide genuinely useful — no thin keyword pages.
 */
export const journalArticles: JournalArticle[] = [
  {
    slug: "saree-fabric-guide",
    title: "A Practical Guide to Saree Fabrics",
    seoTitle: "Saree Fabric Guide: Silk, Brocade, Georgette & Organza",
    description:
      "How pure silk, silk brocade, soft silk, tissue silk, georgette and organza sarees differ in feel, drape and occasion — and how to choose between them.",
    excerpt:
      "Pure silk, brocade, soft silk, tissue, georgette and organza each drape differently. Here is how to tell them apart and when to wear each.",
    author: "Jyoti Sarees",
    datePublished: "2026-09-27",
    dateModified: "2026-09-27",
    readingMinutes: 6,
    image: seoImages.brand,
    sections: [
      {
        heading: "Why fabric matters more than colour",
        paragraphs: [
          "Two sarees in the same shade can feel completely different once draped. Fabric decides how heavy the saree is, how it pleats, how it catches light and how comfortable it will be over a long day. Knowing the main saree fabrics makes it much easier to choose the right piece for an occasion — and to ask the right questions when you enquire.",
        ],
      },
      {
        heading: "Pure silk",
        paragraphs: [
          "Pure silk sarees are usually woven from mulberry silk. They have a deep lustre, rich colour and noticeable weight, and they hold zari borders beautifully. Kanchipuram sarees are the best-known example.",
          "Choose pure silk for weddings, ceremonies and formal family occasions, where presence and tradition matter more than lightness.",
        ],
      },
      {
        heading: "Silk brocade",
        paragraphs: [
          "Brocade has its patterns woven into the fabric as it is made, rather than printed or embroidered afterwards. Banarasi sarees are famous for silk brocade, with floral jaal, buttis and zari worked across the body.",
          "Brocade suits weddings, receptions and festive evenings. Lighter brocades are surprisingly wearable for long functions.",
        ],
      },
      {
        heading: "Soft silk",
        paragraphs: [
          "Soft silk is woven to be lighter and more pliable than traditional heavy silk. It keeps a natural sheen but drapes closely and is easier to manage, which makes it a favourite for festivals, poojas, office celebrations and family visits.",
        ],
      },
      {
        heading: "Tissue silk",
        paragraphs: [
          "Tissue silk has metallic threads woven through it, giving a shimmering, almost glowing surface. It photographs beautifully under lamps and evening lighting and is a popular festive choice.",
        ],
      },
      {
        heading: "Georgette",
        paragraphs: [
          "Georgette is lightweight with a slightly crinkled, matte texture and a fluid fall. It resists creasing better than many fabrics and is comfortable in warm weather, which makes georgette sarees popular for parties, receptions and daytime events.",
        ],
      },
      {
        heading: "Organza",
        paragraphs: [
          "Organza is sheer and crisp with a gentle sheen. It holds its shape and stands slightly away from the body, giving an airy, structured look that suits receptions, engagements and evening celebrations.",
        ],
      },
      {
        heading: "Choosing by occasion",
        paragraphs: ["A simple way to narrow down your options:"],
        bullets: [
          "Wedding ceremony: pure silk (Kanchipuram) or heavier silk brocade (Banarasi).",
          "Reception or engagement: lighter Banarasi brocade, organza or designer georgette.",
          "Festivals and poojas: soft silk for comfort, tissue silk for shine.",
          "Parties and evening events: georgette or organza designer sarees.",
          "Long days and regular wear: soft silk or georgette.",
        ],
      },
      {
        heading: "Ask before you decide",
        paragraphs: [
          "Every saree on our website lists its fabric, weave and design. If you would like more detail about a particular piece — weight, zari, or how a colour looks in daylight — send us an enquiry with its product ID and our team will help.",
        ],
      },
    ],
    relatedCollections: ["silk", "kanchipuram-silk", "banarasi", "soft-silk", "georgette", "organza"],
  },
  {
    slug: "kanchipuram-vs-banarasi-silk-sarees",
    title: "Kanchipuram vs Banarasi: How the Two Great Silk Sarees Differ",
    seoTitle: "Kanchipuram vs Banarasi Silk Sarees: Key Differences",
    description:
      "Kanchipuram and Banarasi are India's best-known silk sarees. Compare their origins, weave, weight, motifs and the occasions each suits best.",
    excerpt:
      "Both are celebrated silk sarees, but they come from different traditions and feel very different to wear. A side-by-side guide.",
    author: "Jyoti Sarees",
    datePublished: "2026-09-27",
    dateModified: "2026-09-27",
    readingMinutes: 5,
    image: seoImages.wedding,
    sections: [
      {
        heading: "Two traditions, two regions",
        paragraphs: [
          "Kanchipuram sarees — often spelled Kanjivaram — come from the temple town of Kanchipuram in Tamil Nadu. Banarasi sarees come from Varanasi (Banaras) in Uttar Pradesh. Both are closely associated with weddings, but they grew out of different weaving traditions, and that shows in how they look and feel.",
        ],
      },
      {
        heading: "Weave and structure",
        paragraphs: [
          "Kanchipuram sarees are known for heavy mulberry silk and bold borders. The border and pallu are often woven in a contrasting colour and interlocked with the body, giving the saree a firm, structured drape.",
          "Banarasi sarees are known for brocade: patterns in zari and silk woven directly into the fabric across the body. The focus is on intricate surface detail rather than a heavy contrast border.",
        ],
      },
      {
        heading: "Weight and drape",
        paragraphs: [
          "A traditional Kanchipuram silk is typically heavier and stiffer, which gives it a regal, sculpted look — ideal for ceremonies where you will not be moving around too much.",
          "Banarasi brocades range from heavy bridal pieces to lighter designs that drape softly, so there is often a Banarasi option for a long reception or evening function.",
        ],
      },
      {
        heading: "Motifs and colour",
        paragraphs: [
          "Kanchipuram motifs often include temple towers, checks, stripes, peacocks and floral buttas, set against rich body colours such as ruby, peacock green and gold.",
          "Banarasi designs favour floral and foliate jaal, scattered buttis and Mughal-inspired patterns, frequently in softer shades like ivory, rose and silver alongside classic reds.",
        ],
      },
      {
        heading: "Which should you choose?",
        paragraphs: ["There is no single right answer, but these guidelines help:"],
        bullets: [
          "For a South Indian wedding ceremony or a traditional look with bold borders, Kanchipuram is the classic choice.",
          "For intricate all-over detail, or a lighter option for receptions, a Banarasi brocade often works better.",
          "If you will be standing or moving for many hours, ask about the saree's weight before deciding.",
          "Consider the colours of the ceremony and family traditions — both weaves come in a wide range of shades.",
        ],
      },
      {
        heading: "Compare pieces side by side",
        paragraphs: [
          "Browse our Kanchipuram silk and Banarasi collections to compare real pieces, then add the ones you like to your enquiry list. Our team can confirm availability and answer questions about any saree before you decide.",
        ],
      },
    ],
    relatedCollections: ["kanchipuram-silk", "banarasi", "wedding"],
  },
  {
    slug: "how-to-care-for-silk-sarees",
    title: "How to Care for Silk Sarees So They Last for Years",
    seoTitle: "How to Care for Silk Sarees: Cleaning & Storage",
    description:
      "Practical advice on cleaning, drying, ironing and storing silk sarees — including how to protect zari borders — so your silks stay beautiful for years.",
    excerpt:
      "Good silk sarees can last for generations. Simple habits for cleaning, storing and protecting zari make all the difference.",
    author: "Jyoti Sarees",
    datePublished: "2026-09-27",
    dateModified: "2026-09-27",
    readingMinutes: 5,
    image: seoImages.newCollection,
    sections: [
      {
        heading: "After wearing",
        paragraphs: [
          "Air your saree in the shade for a few hours before folding it away, so any moisture and perfume can evaporate. Avoid spraying perfume or deodorant directly onto silk and zari, as it can stain and tarnish.",
        ],
      },
      {
        heading: "Cleaning",
        paragraphs: [
          "Dry cleaning is the safest option for pure silk, brocade and sarees with heavy zari. For small spills, blot gently with a clean cloth — never rub — and take the saree to a trusted cleaner as soon as you can.",
          "Lighter soft silks may tolerate a very gentle hand wash in cold water with a mild detergent, but always check with the seller first, and never wring silk.",
        ],
      },
      {
        heading: "Ironing",
        paragraphs: [
          "Iron silk on a low to medium setting, on the reverse side, with a thin cotton cloth between the iron and the saree. Avoid pressing directly on zari, and never spray water onto silk while ironing, as it can leave marks.",
        ],
      },
      {
        heading: "Storage",
        paragraphs: ["How you store a silk saree matters as much as how you clean it:"],
        bullets: [
          "Wrap each saree in a breathable cotton or muslin cloth — avoid plastic, which traps moisture.",
          "Keep sarees away from direct sunlight, which fades colour, and away from damp walls.",
          "Refold along different lines every few months so zari does not crack at the same creases.",
          "Store heavy silks flat or folded rather than on thin hangers, which can stretch the fabric.",
          "Neem leaves or cedar blocks can help deter insects; avoid naphthalene balls in direct contact with silk.",
        ],
      },
      {
        heading: "Protecting zari",
        paragraphs: [
          "Zari can tarnish when exposed to moisture, perfume and air over long periods. Wrapping the zari border in a separate layer of soft cloth, and airing the saree once or twice a year, helps keep it bright.",
        ],
      },
      {
        heading: "Choosing a saree you can care for",
        paragraphs: [
          "If you want something beautiful but low-maintenance, soft silk or georgette is easier to look after than heavy pure silk or brocade. Our team is happy to answer care questions about any saree when you enquire.",
        ],
      },
    ],
    relatedCollections: ["silk", "kanchipuram-silk", "soft-silk"],
  },
];

export function getJournalArticle(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}

export function journalHref(slug: string) {
  return `/journal/${slug}`;
}

export function formatJournalDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
