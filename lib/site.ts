export const site = {
  name: "Jyoti Sarees",
  shortName: "Jyoti",
  tagline: "Heritage weaves, chosen with care.\nFor celebrations and every day.",
  description:
    "Premium sarees from Jyoti Sarees — heritage craft with clean, modern elegance.",
  whatsapp: "9556820010",
  whatsappUrl: "https://wa.me/919556820010",
  instagramUrl:
    "https://www.instagram.com/jyoti_sarees_?stkn=aGd3dnMyYXl3MWI4&utm_source=qr",
  facebookUrl: "https://www.facebook.com/share/1Dkntsvdx9/?mibextid=wwXIfr",
  email: "hello@jyotisarees.com",
  phones: [
    { display: "0556820010", href: "tel:0556820010" },
    { display: "05556677477", href: "tel:05556677477" },
  ],
  phone: "0556820010, 05556677477",
  phoneHref: "tel:0556820010",
  cities: "Nabrangpur, Jeypore",
  hours: {
    opens: "10:00 AM",
    closes: "8:30 PM",
  },
  stores: [
    {
      id: "nabrangpur",
      name: "Jyoti Sarees",
      city: "Nabrangpur",
      lines: [
        "Nabrangpur – ICICI Bank backside,",
        "P. Bhaskar Rao Residency,",
        "Second Floor,",
        "Nabrangpur – 764059",
      ],
      mapLines: [
        "Nabrangpur – ICICI Bank backside,",
        "P. Bhaskar Rao Residency,",
        "Second Floor, Nabrangpur – 764059",
      ],
    },
    {
      id: "jeypore",
      name: "Jyoti Sarees",
      city: "Jeypore",
      lines: [
        "Mahantye Street,",
        "Opposite of Maharaja Bakery,",
        "Jeypore – 764001",
      ],
      mapLines: [
        "Mahantye Street,",
        "Opposite of Maharaja Bakery,",
        "Jeypore – 764001",
      ],
    },
  ],
  address:
    "Nabrangpur – ICICI Bank backside, P. Bhaskar Rao Residency, Second Floor, Nabrangpur – 764059. Mahantye Street, Opposite of Maharaja Bakery, Jeypore – 764001",
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

