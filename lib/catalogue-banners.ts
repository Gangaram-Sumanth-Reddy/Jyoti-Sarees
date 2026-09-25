export type CatalogueBannerSlide = {
  id: string;
  tone: "light" | "dark";
  eyebrow: string;
  title: string;
  subtitle: string;
  src?: string;
  objectPosition?: string;
};

/** Short promotional banners for the Sarees catalogue page. */
export const catalogueBanners: CatalogueBannerSlide[] = [
  {
    id: "festive",
    tone: "dark",
    eyebrow: "Festive Edit",
    title: "Celebrate in silk",
    subtitle: "Handpicked weaves for weddings, festivals and family gatherings.",
    src: "/assets/hero/H2.png",
    objectPosition: "72% 40%",
  },
  {
    id: "heritage",
    tone: "light",
    eyebrow: "Heritage Collection",
    title: "Temple borders, timeless drape",
    subtitle: "Kanchipuram and Banarasi classics curated for every occasion.",
    src: "/assets/hero/H1.png",
    objectPosition: "62% 35%",
  },
  {
    id: "new",
    tone: "dark",
    eyebrow: "New Arrivals",
    title: "Fresh colours for the season",
    subtitle: "Discover soft silks and designer drapes newly added to the floor.",
  },
  {
    id: "atelier",
    tone: "light",
    eyebrow: "Jyoti Atelier",
    title: "Enquire with care",
    subtitle: "Add sarees to your enquiry basket — we confirm availability on WhatsApp.",
  },
];
