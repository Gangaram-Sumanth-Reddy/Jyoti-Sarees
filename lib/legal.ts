import { site } from "@/lib/site";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  lastUpdated: string;
  introduction: string;
  sections: LegalSection[];
  contactNote: string;
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "26 September 2026",
  introduction: `This Privacy Policy explains how ${site.name} (“we”, “us”, or “our”) collects, uses, stores, and protects your personal information when you visit our website, send an enquiry, place an order through WhatsApp, or otherwise contact us. By using our website or sharing your details with us, you agree to the practices described here.`,
  sections: [
    {
      title: "1. Who we are",
      paragraphs: [
        `${site.name} is a saree retail business based in India. We operate an enquiry-led website where customers can browse products and share requirements with our team. We do not process online payments on this website.`,
        `You can reach us at ${site.email}, ${site.phone}, or ${site.address}.`,
      ],
    },
    {
      title: "2. Information we collect",
      paragraphs: [
        "We collect information you choose to share with us, and limited technical data needed to run the website safely.",
      ],
      bullets: [
        "Identity and contact details: name, phone number (including country code), email address, and postal address.",
        "Order and enquiry details: saree type or requirement, quantity, preferred colour or product references, PIN code, state, city, and messages you send via forms or WhatsApp.",
        "Communication records: WhatsApp chats, emails, and call notes related to your enquiry or order.",
        "Technical data: IP address, browser type, device information, and pages visited, typically collected through standard server logs or analytics tools if enabled.",
        "Cart preferences: items you add to your enquiry cart may be stored locally in your browser so you can continue later.",
      ],
    },
    {
      title: "3. How we use your information",
      paragraphs: [
        "We use your information only for legitimate business purposes connected to serving you.",
      ],
      bullets: [
        "To respond to enquiries and confirm product availability, pricing, and delivery details.",
        "To process and fulfil orders arranged through WhatsApp, phone, or in-store communication.",
        "To contact you about your request, updates, or clarifications.",
        "To improve our website, catalogue experience, and customer service.",
        "To meet legal, accounting, or regulatory obligations where applicable.",
      ],
    },
    {
      title: "4. Enquiry-led sales and WhatsApp",
      paragraphs: [
        "Our website is designed for browsing and enquiries. Final order confirmation, payment instructions, and delivery arrangements typically happen through WhatsApp, phone, email, or in-store discussion.",
        "When you continue on WhatsApp, Meta Platforms (WhatsApp) may process your message content and account data under its own privacy policy. We encourage you to review WhatsApp’s terms and privacy settings.",
      ],
    },
    {
      title: "5. Legal bases for processing",
      paragraphs: [
        "Where applicable under Indian law and similar privacy frameworks, we process personal data based on:",
      ],
      bullets: [
        "Your consent, when you submit a form or choose to contact us.",
        "Performance of a contract or steps requested by you before purchasing.",
        "Our legitimate interests in operating the business, preventing misuse, and improving services, balanced against your rights.",
        "Compliance with legal obligations.",
      ],
    },
    {
      title: "6. Sharing your information",
      paragraphs: [
        "We do not sell your personal information. We may share limited data only when needed to serve you or meet our obligations.",
      ],
      bullets: [
        "Service providers who help us host the website, send communications, or analyse site performance, under appropriate confidentiality expectations.",
        "Courier or logistics partners when you place an order that requires delivery.",
        "Professional advisers (such as accountants or legal counsel) if reasonably required.",
        "Authorities or courts when disclosure is required by law or necessary to protect our rights, customers, or property.",
      ],
    },
    {
      title: "7. Cookies and local storage",
      paragraphs: [
        "Our site may use essential cookies or browser storage to keep the site working (for example, remembering enquiry cart items). If we use analytics cookies in future, we will update this policy and, where required, seek consent.",
        "You can clear cookies and local storage through your browser settings. Doing so may reset saved enquiry cart items.",
      ],
    },
    {
      title: "8. Data retention",
      paragraphs: [
        "We keep personal information only as long as needed for the purpose collected, including responding to enquiries, completing orders, resolving disputes, and meeting legal or accounting requirements. Enquiry and order records may be retained for a reasonable business period and then securely deleted or anonymised when no longer required.",
      ],
    },
    {
      title: "9. Data security",
      paragraphs: [
        "We take reasonable technical and organisational measures to protect your information against unauthorised access, loss, misuse, or alteration. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security, but we work to keep your data protected.",
      ],
    },
    {
      title: "10. Your rights",
      paragraphs: [
        "Subject to applicable law, you may request access to the personal information we hold about you, ask us to correct inaccurate details, withdraw consent where processing is consent-based, or request deletion where we no longer have a lawful need to keep the data.",
        `To exercise these rights, email ${site.email} or call ${site.phone}. We may need to verify your identity before responding.`,
      ],
    },
    {
      title: "11. Children’s privacy",
      paragraphs: [
        "Our website and services are intended for adults and general family shopping. We do not knowingly collect personal information from children under 18 without appropriate parental involvement. If you believe a child has provided us data, please contact us so we can review and delete it where appropriate.",
      ],
    },
    {
      title: "12. International visitors",
      paragraphs: [
        "Our business primarily serves customers in India. If you access the site from outside India, your information may be processed in India and in countries where our service providers operate. By using the site, you understand that your information may be transferred and stored in those locations.",
      ],
    },
    {
      title: "13. Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. The “Last updated” date at the top of this page will change when we revise the policy. Continued use of the website after updates means you accept the revised policy.",
      ],
    },
  ],
  contactNote: `If you have questions about this Privacy Policy or how we handle your data, contact ${site.name} at ${site.email} or ${site.phone}.`,
};

export const termsOfCondition: LegalDocument = {
  title: "Terms of Condition",
  lastUpdated: "26 September 2026",
  introduction: `These Terms of Condition (“Terms”) govern your use of the ${site.name} website and related enquiry and ordering services. By browsing our site, submitting an enquiry, or placing an order through WhatsApp, phone, email, or in store, you agree to these Terms. If you do not agree, please do not use the website or our services.`,
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
        "Payment methods, timelines, and any advance amount will be agreed at confirmation. We never ask for sensitive payment credentials through unofficial channels. Always verify you are communicating with official ${site.name} contact details.",
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
  contactNote: `For questions about these Terms of Condition, contact ${site.name} at ${site.email} or ${site.phone}. Address: ${site.address}.`,
};
