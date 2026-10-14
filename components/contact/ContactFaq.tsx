import type { ReactNode } from "react";
import Link from "next/link";
import { bulkOrders } from "@/lib/contact";
import { deliveryConfig, isShippingPageEnabled } from "@/lib/seo";
import { site } from "@/lib/site";

type Faq = { question: string; answer: ReactNode };

function buildFaqs(): Faq[] {
  const faqs: Faq[] = [
    {
      question: "How do I buy a saree from Jyoti Sarees?",
      answer:
        "Add the sarees you like to your enquiry list, or send us the product ID on WhatsApp, by phone or through the enquiry form. Our team confirms availability and details with you personally — there is no online checkout or payment on this website.",
    },
    {
      question: "Can I see more details or photos before deciding?",
      answer:
        "Yes. Message us with the saree's product ID and we will share more details, including how the colour and zari look, before anything is finalised.",
    },
  ];

  if (isShippingPageEnabled()) {
    const parts = [
      deliveryConfig.india.confirmed ? deliveryConfig.india.summary : null,
      deliveryConfig.international.confirmed &&
      deliveryConfig.international.destinations.length > 0
        ? `We also deliver to ${deliveryConfig.international.destinations.join(", ")}.`
        : null,
    ].filter(Boolean);
    faqs.push({
      question: "Do you deliver?",
      answer: (
        <>
          {parts.join(" ")} See our{" "}
          <Link
            href="/shipping"
            className="font-semibold text-navy underline underline-offset-2"
          >
            shipping information
          </Link>{" "}
          for details.
        </>
      ),
    });
  }

  faqs.push(
    {
      question: "Where are the stores, and when are they open?",
      answer: `We are in ${site.cities}, open ${site.hours.opens} – ${site.hours.closes}. The store addresses are listed on this page.`,
    },
    {
      question: "Do you take bulk orders?",
      answer: `Yes, when stock allows. The minimum is ${bulkOrders.minimum}. This includes ${bulkOrders.types.join(", ").replace(/, ([^,]*)$/, ", and $1").toLowerCase()}.`,
    },
    {
      question: "How is my personal information used?",
      answer: (
        <>
          Only to respond to your enquiry, unless you separately opt in to
          updates. Read our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-navy underline underline-offset-2"
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </>
      ),
    },
  );

  return faqs;
}

export function ContactFaqList() {
  const faqs = buildFaqs();

  return (
    <div className="grid gap-3 lg:flex lg:h-full lg:flex-col lg:justify-between">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-lg border border-border bg-white px-5 py-4 shadow-soft"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-body font-semibold text-rich-black [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden="true"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-cream text-navy"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-200 group-open:rotate-180"
              >
                <path
                  d="M6 9.5 12 15.5 18 9.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </summary>
          <p className="mt-3 pr-12 text-body leading-relaxed text-rich-black">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
