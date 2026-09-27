import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata, deliveryConfig, isShippingPageEnabled } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

/**
 * Only published once the business confirms its delivery policy in
 * `deliveryConfig` (lib/seo.ts). Until then this route returns 404 and is
 * left out of the sitemap, so no unverified delivery claims go live.
 */
export const metadata = buildMetadata({
  title: "Shipping & Delivery Information",
  description:
    "How Jyoti Sarees handles delivery for sarees confirmed through WhatsApp, phone or email enquiries.",
  path: "/shipping",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Shipping", path: "/shipping" },
];

export default function ShippingPage() {
  if (!isShippingPageEnabled()) notFound();

  const { india, international } = deliveryConfig;

  return (
    <Section className="pt-6 sm:pt-8 lg:pt-10">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Container className="max-w-3xl">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 text-h1 text-balance lg:mt-8">Shipping &amp; delivery</h1>
        <p className="mt-4 text-body text-muted">
          Orders are confirmed personally over WhatsApp, phone or email. Delivery
          details, charges and timelines are confirmed with you before anything is
          finalised.
        </p>

        {india.confirmed ? (
          <section className="mt-8">
            <h2 className="text-h3">Delivery within India</h2>
            <div className="mt-3 space-y-2 text-body text-muted">
              {india.summary ? <p>{india.summary}</p> : null}
              {india.handlingTime ? <p>Dispatch: {india.handlingTime}</p> : null}
              {india.method ? <p>Method: {india.method}</p> : null}
            </div>
          </section>
        ) : null}

        {international.confirmed && international.destinations.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-h3">International delivery</h2>
            <div className="mt-3 space-y-2 text-body text-muted">
              <p>We currently deliver to: {international.destinations.join(", ")}.</p>
              {international.customsNote ? <p>{international.customsNote}</p> : null}
            </div>
          </section>
        ) : null}

        <div className="mt-10 max-sm:flex max-sm:justify-center">
          <ButtonLink href="/contact">Ask about delivery</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
