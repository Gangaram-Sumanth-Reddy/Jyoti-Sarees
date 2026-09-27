import { site } from "@/lib/site";

export type LegalLink = { href: string; label: string };

export type LegalSection = {
  id?: string;
  title: string;
  paragraphs: string[];
  items?: { term: string; detail: string }[];
  bullets?: string[];
  links?: LegalLink[];
  afterParagraphs?: string[];
};

export type LegalDocument = {
  title: string;
  lastUpdated: string;
  version?: string;
  introduction: string;
  /** Key points shown in an "At a glance" panel; also enables the contents list. */
  summary?: string[];
  sections: LegalSection[];
  contactNote: string;
  contactLink?: LegalLink;
};

export const termsOfCondition: LegalDocument = {
  title: "Terms & Conditions",
  lastUpdated: "26 September 2026",
  introduction: `These Terms & Conditions (“Terms”) govern your use of the ${site.name} website and related enquiry and ordering services. By browsing our site, submitting an enquiry, or placing an order through WhatsApp, phone, email, or in store, you agree to these Terms. If you do not agree, please do not use the website or our services.`,
  sections: [
    {
      title: "1. About our services",
      paragraphs: [
        `${site.name} offers curated sarees for browsing and purchase through an enquiry-led process. Product pages and catalogue listings are for information and selection support. Final availability, pricing confirmation, payment, and delivery are arranged directly with our team.`,
        "This website does not accept online card or UPI checkout. Orders are confirmed offline or via WhatsApp / phone after we verify stock and details with you.",
      ],
    },
    {
      title: "2. Eligibility",
      paragraphs: [
        "You confirm that you are at least 18 years old, or that you are using the site under the supervision of a parent or guardian, and that the information you provide is accurate and complete.",
      ],
    },
    {
      title: "3. Product information and availability",
      paragraphs: [
        "We aim to display products accurately, including colours, fabrics, and descriptions. Slight variations can occur due to weaving, dyeing, screen settings, and photography. Images are illustrative; the physical product may differ modestly in shade or texture.",
        "Stock is limited and may change without notice. Listing a product online does not guarantee availability until our team confirms it for your order.",
      ],
    },
    {
      title: "4. Enquiries, cart, and orders",
      paragraphs: [
        "Adding items to an enquiry cart or submitting a contact form is a request for information or assistance—not a completed purchase. An order becomes binding only when both parties confirm the product(s), quantity, price, and delivery arrangements.",
        "You are responsible for providing correct contact and delivery details. Delays or failed delivery caused by incorrect information are your responsibility.",
      ],
    },
    {
      title: "5. Pricing and payment",
      paragraphs: [
        "Prices shown on the website (if any) are indicative unless expressly confirmed by us. Confirmed pricing will be shared during WhatsApp, phone, email, or in-store discussion.",
        `Payment methods, timelines, and any advance amount will be agreed at confirmation. We never ask for sensitive payment credentials through unofficial channels. Always verify you are communicating with official ${site.name} contact details.`,
      ],
    },
    {
      title: "6. Delivery and timelines",
      paragraphs: [
        "Delivery options, timelines, and charges depend on your location, product type, and courier availability. Estimated timelines shared during confirmation are approximate and may vary due to logistics, festivals, weather, or circumstances beyond our control.",
        "Risk in the goods typically passes to you upon delivery to the address you provide, unless otherwise agreed in writing.",
      ],
    },
    {
      title: "7. Cancellations, returns, and exchanges",
      paragraphs: [
        "Because many sarees are unique or limited, cancellation and return rules may differ by product. Our team will explain the applicable policy when confirming your order.",
        "In general, unused products in original condition may be eligible for exchange or return within a period we specify at confirmation, subject to inspection. Customised, heavily discounted, or specially ordered pieces may be non-returnable.",
        "If an item arrives damaged or incorrect, contact us promptly with photos so we can arrange a fair resolution.",
      ],
    },
    {
      title: "8. Acceptable use of the website",
      paragraphs: [
        "You agree not to misuse the website, including by attempting unauthorised access, scraping content at scale, introducing malware, submitting false enquiries, or interfering with site operation. We may suspend access if we reasonably believe these Terms have been violated.",
      ],
    },
    {
      title: "9. Intellectual property",
      paragraphs: [
        `All website content—including text, logos, product photography, graphics, and layout—is owned by ${site.name} or used with permission. You may view and share content for personal, non-commercial purposes. You may not copy, reproduce, or commercially exploit our content without prior written consent.`,
      ],
    },
    {
      title: "10. Third-party services and links",
      paragraphs: [
        "Our site may link to WhatsApp, Instagram, Facebook, or other third-party services. Those platforms are governed by their own terms and privacy policies. We are not responsible for their content, availability, or practices.",
      ],
    },
    {
      title: "11. Disclaimer of warranties",
      paragraphs: [
        "The website and its content are provided on an “as is” and “as available” basis. While we work to keep information accurate and the site reliable, we do not warrant uninterrupted access, error-free content, or that every product description will match every expectation without verification.",
        "Nothing in these Terms limits rights that cannot be excluded under applicable consumer protection law.",
      ],
    },
    {
      title: "12. Limitation of liability",
      paragraphs: [
        `To the fullest extent permitted by law, ${site.name} is not liable for indirect, incidental, special, or consequential losses arising from use of the website or delay in fulfilment caused by events outside our reasonable control. Our total liability related to any order is generally limited to the amount you paid for that order.`,
      ],
    },
    {
      title: "13. Indemnity",
      paragraphs: [
        "You agree to indemnify and hold us harmless from claims, losses, or expenses arising from your misuse of the website, inaccurate information you provide, or your breach of these Terms, except where caused by our wilful misconduct.",
      ],
    },
    {
      title: "14. Governing law and disputes",
      paragraphs: [
        "These Terms are governed by the laws of India. Courts in the jurisdiction of our principal place of business shall have exclusive jurisdiction, subject to any mandatory consumer protections that apply to you.",
        "We encourage you to contact us first so we can try to resolve concerns amicably.",
      ],
    },
    {
      title: "15. Changes to these Terms",
      paragraphs: [
        "We may update these Terms periodically. The “Last updated” date will reflect the latest version. Continued use of the website after changes means you accept the updated Terms.",
      ],
    },
  ],
  contactNote: `For questions about these Terms & Conditions, contact ${site.name} at ${site.email} or ${site.phone}. Address: ${site.address}.`,
};

