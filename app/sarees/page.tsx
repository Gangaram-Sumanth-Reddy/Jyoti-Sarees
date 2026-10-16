import { CatalogueBrowser } from "@/components/catalogue/CatalogueBrowser";
import { DussehraOffer } from "@/components/catalogue/DussehraOffer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { catalogueProducts } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/structured-data";

const description =
  "Browse Ajrakh, Banarasi, Pattu, Kora, Silk, Georgette and Designer sarees at Jyoti Sarees. Filter by fabric, colour and price, then enquire on WhatsApp.";

export const metadata = buildMetadata({
  title: "Ajrakh, Banarasi, Pattu, Kora & Silk Sarees",
  description,
  path: "/sarees",
});

export default function SareesPage() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({ name: "Sarees", description }, "/sarees", catalogueProducts),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sarees", path: "/sarees" },
          ]),
        ]}
      />
      <DussehraOffer />
      <Section tone="muted" className="!pb-0 pt-8 sm:pt-10">
        <Container className="max-w-[90rem]">
          <SectionHeading
            as="h1"
            title="Sarees"
            description="Explore our curated collection of sarees, from timeless traditional weaves to contemporary styles. Filter by fabric, colour and price, then enquire on WhatsApp."
            className="mb-0 max-w-2xl sm:mb-0 lg:mb-0"
          />
        </Container>
      </Section>
      <CatalogueBrowser products={catalogueProducts} />
    </>
  );
}
