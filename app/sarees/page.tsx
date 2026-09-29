import { CatalogueBanner } from "@/components/catalogue/CatalogueBanner";
import { CatalogueBrowser } from "@/components/catalogue/CatalogueBrowser";
import { CatalogueCta } from "@/components/catalogue/CatalogueCta";
import { CatalogueIntro } from "@/components/catalogue/CatalogueIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { catalogueProducts } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/structured-data";

const description =
  "Browse Kanchipuram silk, Banarasi, soft silk, designer, festive and wedding sarees at Jyoti Sarees. Filter by fabric, colour and price, then enquire on WhatsApp.";

export const metadata = buildMetadata({
  title: "Silk, Banarasi, Designer & Wedding Sarees",
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
      <CatalogueBanner />
      <CatalogueIntro />
      <CatalogueBrowser products={catalogueProducts} />
      <CatalogueCta />
    </>
  );
}
