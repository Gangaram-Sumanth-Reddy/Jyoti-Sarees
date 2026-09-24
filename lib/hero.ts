export const heroSlides = [
  {
    id: "h1",
    src: "/assets/hero/H1.png",
    alt: "Model in an ivory saree with royal blue and gold border",
    contentAlign: "left" as const,
    tone: "light" as const,
    eyebrow: "NEW COLLECTION 2026",
    headline: "Timeless",
    accent: "Elegance",
    subtext: "Where heritage meets a modern expression of grace.",
    primaryCta: { href: "/sarees", label: "Explore Sarees" },
    showWhatsApp: true,
  },
  {
    id: "h2",
    src: "/assets/hero/H2.png",
    alt: "Model in a deep navy saree with gold zari border",
    contentAlign: "left" as const,
    tone: "dark" as const,
    eyebrow: "THE ROYAL EDIT",
    headline: "Grace in Every",
    accent: "Drape",
    subtext: "Rich weaves and exquisite details for unforgettable occasions.",
    primaryCta: { href: "/sarees", label: "Explore Sarees" },
    showWhatsApp: true,
  },
] as const;

export type HeroSlide = (typeof heroSlides)[number];
