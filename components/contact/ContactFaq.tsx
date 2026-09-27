import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { deliveryConfig, isShippingPageEnabled } from "@/lib/seo";

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
          <Link href="/shipping" className="font-semibold text-navy underline underline-offset-2">
            shipping information
          </Link>{" "}
          for details.
        </>
      ),
    });
  }

  faqs.push({
    question: "How is my personal information used?",
    answer: (
      <>
        Only to respond to your enquiry, unless you separately opt in to
        updates. Read our{" "}
        <Link href="/privacy-policy" className="font-semibold text-navy underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        for details.
      </>
    ),
  });

  return faqs;
}

export function ContactFaq() {
  const faqs = buildFaqs();

  return (
    <Section>
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Help"
          title="Frequently asked questions"
          align="center"
          className="max-w-2xl"
        />
        <div className="divide-y divide-border rounded-lg border border-border bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-body font-semibold text-rich-black [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-navy transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-body text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
