import { CatalogueBrowser } from "@/components/catalogue/CatalogueBrowser";
import { DussehraOffer } from "@/components/catalogue/DussehraOffer";
import { JsonLd } from "@/components/seo/JsonLd";
import { catalogueProducts } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/structured-data";

const description =
  "Browse Ajrakh, Banarasi, Pattu and Kora sarees at Jyoti Sarees. Filter by fabric, colour and price, then enquire on WhatsApp.";

export const metadata = buildMetadata({
  title: "Ajrakh, Banarasi, Pattu & Kora Sarees",
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
      <CatalogueBrowser products={catalogueProducts} />
    </>
  );
}
