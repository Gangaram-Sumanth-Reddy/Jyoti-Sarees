export const site = {
  name: "Jyoti Sarees",
  shortName: "Jyoti",
  tagline: "Draped in elegance",
  description:
    "Premium sarees from Jyoti Sarees — heritage craft with clean, modern elegance.",
  whatsappUrl: "https://wa.me/919999999999",
  instagramUrl: "https://www.instagram.com/",
  facebookUrl: "https://www.facebook.com/",
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
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Condition" },
] as const;

export type NavItem = (typeof navigation)[number];

export { collections } from "@/lib/collections";

export const craftsmanshipPoints = [
  {
    title: "Authentic Craftsmanship",
    description:
      "Every saree honours traditional weaving techniques and careful finishing.",
  },
  {
    title: "Thoughtful Curation",
    description:
      "We select pieces for quality, comfort, and lasting wear—not fleeting trends.",
  },
  {
    title: "Timeless Elegance",
    description:
      "Designs meant to be cherished across occasions and generations.",
  },
] as const;

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
      "Jyoti Sarees brings together authentic craftsmanship and thoughtful curation. We believe every drape should feel personal—elegant, comfortable, and made to be remembered.",
  },
  craftsmanship: {
    title: "Made to Be Remembered",
    description:
      "Our promise is simple: quality you can feel, beauty that endures, and service that guides you with care.",
  },
  testimonials: {
    title: "Loved by Our Customers",
    description:
      "Genuine stories from customers who shop with Jyoti Sarees will appear here.",
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
