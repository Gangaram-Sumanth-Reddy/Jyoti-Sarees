import { site } from "@/lib/site";

export type CatalogueBannerSlide = {
  id: string;
  tone: "light" | "dark";
  eyebrow: string;
  /** Short offer tag shown beside the eyebrow (e.g. "Up to 20% Off"). */
  offer?: string;
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  /**
   * The banner is taller than 16:9 on phones (only X crops) and wider on
   * tablet/desktop (only Y crops), so one value controls both.
   */
  objectPosition: string;
  /** Matches the photo's lower-left backdrop; used for the mobile copy panel. */
  panel: string;
  cta?: { label: string; href: string; external?: boolean };
};

/** Short promotional banners for the Sarees catalogue page. */
export const catalogueBanners: CatalogueBannerSlide[] = [
  {
    id: "festive",
    tone: "dark",
    eyebrow: "Festive Edit",
    offer: "Up to 20% Off",
    title: "Celebrate in silk",
    subtitle: "Navy and gold weaves, handpicked for the festive season.",
    src: "/assets/banners/festive.jpg",
    alt: "Woman in a navy silk saree with gold zari border, pallu flowing beside festive diyas",
    objectPosition: "75% 0%",
    panel: "#10111d",
    cta: { label: "Enquire on WhatsApp", href: site.whatsappUrl, external: true },
  },
  {
    id: "wedding",
    tone: "light",
    eyebrow: "Wedding Collection",
    title: "Heirlooms for your big day",
    subtitle: "Kanchipuram silks with rich zari, curated for brides and families.",
    src: "/assets/banners/wedding.jpg",
    alt: "Bride seated in an ivory and gold Kanchipuram silk saree with the pallu draped across the floor",
    objectPosition: "70% 20%",
    panel: "#e9dccb",
    cta: { label: "Book a Consultation", href: "/contact" },
  },
  {
    id: "new",
    tone: "light",
    eyebrow: "New Collection",
    title: "Fresh drapes, just arrived",
    subtitle: "Soft silks and woven zari borders, newly added to our floor.",
    src: "/assets/banners/new-collection.jpg",
    alt: "Ivory silk saree with a navy and gold zari border flowing through the air",
    objectPosition: "80% 65%",
    panel: "#ece7e0",
    cta: { label: "View New Arrivals", href: "/new-arrivals" },
  },
  {
    id: "heritage",
    tone: "dark",
    eyebrow: "Traditional Craftsmanship",
    title: "Woven by hand, made to last",
    subtitle: "Authentic handloom sarees from master weavers.",
    src: "/assets/banners/heritage.jpg",
    alt: "Weaver's hands at a wooden handloom weaving a navy silk saree with a gold temple border",
    objectPosition: "75% 60%",
    panel: "#1c1611",
  },
];
