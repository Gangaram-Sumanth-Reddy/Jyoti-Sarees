export const site = {
  name: "Jyoti Sarees",
  shortName: "Jyoti",
  tagline: "Draped in elegance",
  description:
    "Premium sarees from Jyoti Sarees — heritage craft with clean, modern elegance.",
  whatsappUrl: "https://wa.me/919999999999",
  instagramUrl:
    "https://www.instagram.com/jyoti_sarees_?stkn=aGd3dnMyYXl3MWI4&utm_source=qr",
  facebookUrl: "https://www.facebook.com/share/1Dkntsvdx9/?mibextid=wwXIfr",
  email: "hello@jyotisarees.com",
  phone: "+91 99999 99999",
  phoneHref: "tel:+919999999999",
  address: "Jyoti Sarees, Main Road, Your City, India",
} as const;

export const navigation = [
  { href: "/sarees", label: "Sarees" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = [
  { href: "/sarees", label: "Sarees" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/journal", label: "Saree Guides" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy-requests", label: "Privacy Requests" },
] as const;

export type NavItem = (typeof navigation)[number];

export { collections } from "@/lib/collections";

export const copy = {
  hero: {
    title: "Timeless Sarees. Crafted for Every Occasion.",
    description:
      "From everyday elegance to wedding grandeur, discover handpicked sarees rooted in tradition and refined for how you live and celebrate today.",
  },
  collections: {
    title: "Explore Our Collections",
    description:
      "Heritage weaves and contemporary drapes, curated across the styles our customers love most.",
  },
  newArrivals: {
    title: "New Arrivals",
    description: "Fresh additions from our latest curation.",
  },
  about: {
    title: "The Story Behind Jyoti Sarees",
    description:
      "Behind every saree is a story. Behind Jyoti Sarees is Potnuru Jyoti — a woman who turned courage, sacrifice and determination into a dream built with her family.",
  },
  testimonials: {
    title: "Loved by Our Customers",
    description:
      "Heartfelt words from women who found their perfect drape with Jyoti Sarees.",
  },
  instagram: {
    title: "Follow Jyoti Sarees",
    description:
      "A glimpse of new drapes, festive looks, and life at the store.",
  },
  finalCta: {
    title: "Looking for Something Special?",
    description:
      "Tell us the occasion, colour, or weave you have in mind—we will help you find the right saree.",
  },
} as const;

