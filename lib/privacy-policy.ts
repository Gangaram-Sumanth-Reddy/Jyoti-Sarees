import type { LegalDocument } from "@/lib/legal";
import { privacyConfig, privacyRoutes } from "@/lib/privacy-config";
import { site } from "@/lib/site";

const c = privacyConfig;
const g = c.grievanceOfficer;

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: c.lastUpdated,
  version: c.policyVersion,
  introduction: `This policy explains what personal data ${c.businessName} collects through this website and related conversations, why we collect it, how long we keep it, and the choices and rights you have. If anything is unclear, please contact us.`,
  summary: [
    "We collect only what we need to answer your enquiry, and most form fields are optional.",
    "Marketing messages are sent only if you tick a separate, optional box.",
    "Testimonials are reviewed before publication and published only with your consent.",
    "We do not sell your personal data, and you can ask to access, correct or delete it.",
  ],
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      paragraphs: [
        `This website is operated by ${c.legalBusinessName}, trading as ${c.businessName} (“we”, “us”, “our”). We decide why and how the personal data described in this policy is processed.`,
      ],
      items: [
        { term: "Business address", detail: c.businessAddress },
        { term: "Privacy contact", detail: c.privacyEmail },
        { term: "General enquiries", detail: `${site.email} · ${site.phone}` },
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: [
        "We collect personal data only when you choose to share it with us. What we collect depends on how you contact us:",
      ],
      items: [
        {
          term: "Saree enquiry form",
          detail:
            "Required: your name, mobile number, the saree or requirement you are asking about, and quantity. Optional: email address, address, PIN code, state and city. Also your marketing preference, if you choose to give one.",
        },
        {
          term: "Testimonial form",
          detail:
            "Required: your name, your testimonial and your consent to publish. Optional: city and the saree you purchased.",
        },
        {
          term: "Privacy request form",
          detail:
            "Your name, the email address or mobile number you used with us, the type of request, and your description of it.",
        },
        {
          term: "WhatsApp, phone and email",
          detail:
            "Your phone number or email address, your WhatsApp profile name, and the messages, photos or details you choose to send us.",
        },
        {
          term: "Technical information",
          detail:
            "Our hosting provider may keep standard request logs (such as IP address, browser type and time of request) to operate and secure the website.",
        },
        {
          term: "Enquiry cart",
          detail:
            "Items you add to your enquiry cart are saved in your own browser’s local storage, not on our servers, until you clear them.",
        },
      ],
      bullets: [
        "We do not ask for, and you should not send us, government ID numbers (such as Aadhaar or PAN), bank or card details, dates of birth, or other sensitive information through our website forms.",
        "This website does not take online payments.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "Why we use your information",
      paragraphs: [
        "We use your personal data only for the purpose you shared it for:",
      ],
      bullets: [
        "To respond to your enquiry: checking availability, pricing, colours and delivery options, and contacting you about it.",
        "To arrange and fulfil an order you decide to place with us through WhatsApp, phone, email or in store.",
        "To review testimonials and, with your consent, publish them.",
        "To handle privacy requests and grievances, and keep a record that we did.",
        "To send you updates about new collections, offers and promotions, only if you gave separate consent for this.",
        "To keep the website secure and prevent spam or misuse.",
        "To meet obligations that apply to us under law, such as accounting and tax records for completed sales.",
      ],
    },
    {
      id: "enquiries",
      title: "How we handle enquiries",
      paragraphs: [
        "When you submit the enquiry form, your details are sent to our server, checked, and stored in an access-restricted database. They are not visible to other visitors. Only authorised members of our team review them.",
        "After submitting, you can also choose to continue on WhatsApp. WhatsApp opens with your enquiry pre-filled, and nothing is sent until you tap send yourself.",
      ],
    },
    {
      id: "testimonials",
      title: "How we handle testimonials",
      paragraphs: [
        "Testimonials are never published automatically. Every submission is reviewed by our team first, and submitting a testimonial does not guarantee that it will be published.",
        "We publish a testimonial only if you have ticked the publication consent box. If published, your testimonial, your name and any city or saree you provided may appear publicly on our website. We may shorten a testimonial or correct obvious typing errors, but we will not change its meaning.",
        "You can ask us to remove a published testimonial at any time, and we will take it down from our website.",
      ],
    },
    {
      id: "whatsapp",
      title: "WhatsApp interactions",
      paragraphs: [
        "Our WhatsApp buttons open a conversation with our business account, sometimes with a pre-filled message such as product names or your enquiry details. You can edit or delete that message before sending it.",
        "WhatsApp is provided by Meta Platforms, which processes your messages and account information under its own terms and privacy policy. Messages you send us are also stored in our business WhatsApp account and on the devices our team uses to reply.",
      ],
    },
    {
      id: "marketing",
      title: "Marketing communications",
      paragraphs: [
        "We send promotional messages about new collections, offers and promotions only if you tick the separate, optional box on our enquiry form. It is never pre-ticked, and you do not need to agree to it to send an enquiry.",
        "You can stop these messages at any time by replying “STOP” on WhatsApp, by emailing us, or through our privacy request form.",
      ],
    },
    {
      id: "service-providers",
      title: "Service providers and sharing",
      paragraphs: [
        "We do not sell your personal data. We share it only with service providers who help us run the website and communicate with you, and only as far as they need it to provide that service:",
      ],
      items: c.processors.map((processor) => ({
        term: processor.name,
        detail: `${processor.purpose} Data involved: ${processor.dataShared}`,
      })),
      bullets: [
        "Courier or logistics partners receive your name, phone number and delivery address only when you place an order that needs delivery.",
        "We may disclose information where required by law, or to a court or authority with the legal power to request it.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep your data",
      paragraphs: [
        "We keep personal data only for as long as it is needed for the purpose it was collected for, or as long as the law requires. After that, we delete it or anonymise it.",
      ],
      items: [
        { term: "Enquiries", detail: c.retention.enquiries },
        { term: "Testimonials that are not published", detail: c.retention.testimonialSubmissions },
        { term: "Published testimonials", detail: c.retention.publishedTestimonials },
        { term: "Marketing consent records", detail: c.retention.marketingConsent },
        { term: "Privacy requests and grievances", detail: c.retention.privacyRequests },
        { term: "WhatsApp conversations", detail: c.retention.whatsappChats },
      ],
    },
    {
      id: "security",
      title: "How we protect your data",
      paragraphs: [
        "Website forms are processed on our server, not directly in your browser. Submissions are checked on the server and stored in a database that the public cannot read. Access is limited to authorised members of our team, and database credentials are never exposed to website visitors.",
        "No method of storing or sending information online is completely secure. If a personal data breach affects you, we will inform you and the relevant authorities as required by law.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      paragraphs: [
        "Subject to applicable Indian law, you can ask us to:",
      ],
      bullets: [
        "Give you a summary of the personal data we hold about you and how we use it.",
        "Correct, complete or update personal data that is inaccurate or out of date.",
        "Erase your personal data where it is no longer needed and we are not required to keep it by law.",
        "Withdraw consent you have given, for example to marketing messages or a published testimonial.",
        "Address a grievance about how your personal data has been handled.",
        "Nominate another person to exercise these rights on your behalf in the event of death or incapacity.",
      ],
      links: [{ href: privacyRoutes.requests, label: "Make a privacy request" }],
      afterParagraphs: [
        "We may need to confirm your identity before acting on a request, so that we do not share or change someone else’s data. We will contact you using the details you provided with your request. We never display personal data on this website.",
      ],
    },
    {
      id: "withdrawing-consent",
      title: "Withdrawing consent",
      paragraphs: [
        "Withdrawing consent is as easy as giving it. You can use our privacy request form, email us, or tell us on WhatsApp. Withdrawing consent does not affect anything we did with your data before you withdrew it, and it does not affect your ability to send us an enquiry.",
      ],
    },
    {
      id: "grievances",
      title: "Grievances and contact",
      paragraphs: [
        "If you have a concern about how your personal data has been handled, please contact us first. We will do our best to resolve it.",
      ],
      items: [
        { term: "Grievance contact", detail: g.name },
        { term: "Email", detail: g.email },
        { term: "Phone", detail: g.phone },
        { term: "Response times", detail: g.responseTime },
      ],
      afterParagraphs: [
        "If you are not satisfied with our response, you may be able to take your complaint to the Data Protection Board of India, under the applicable law.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Our website is meant for adults. We do not knowingly collect personal data from children under 18. If you believe a child has sent us their details, please contact us and we will delete them.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and local storage",
      paragraphs: [
        "We do not currently use advertising or analytics cookies. The only information stored on your device is your enquiry cart, kept in your browser’s local storage so it is still there when you return. You can clear it at any time through your browser settings.",
        "If we introduce analytics or similar tools in the future, we will update this policy first and ask for your consent where required.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We will update this policy when our practices change. The version number and “Last updated” date at the top of this page show the current version. If a change significantly affects how we use data you have already shared, we will let you know before it takes effect.",
      ],
    },
  ],
  contactNote: `Questions about this policy? Contact ${c.businessName} at ${c.privacyEmail}, or use our privacy request form.`,
  contactLink: { href: privacyRoutes.requests, label: "Privacy request form" },
};
