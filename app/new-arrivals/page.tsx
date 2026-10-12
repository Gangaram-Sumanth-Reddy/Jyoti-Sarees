import { CatalogueBrowser } from "@/components/catalogue/CatalogueBrowser";
import { NewArrivalsHero } from "@/components/new-arrivals/NewArrivalsHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNewArrivals, products } from "@/lib/products";
import { buildMetadata, seoImages } from "@/lib/seo";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/structured-data";

const arrivals = getNewArrivals(products.length);
const latestYear = arrivals[0]
  ? new Date(arrivals[0].createdAt).getUTCFullYear()
  : null;

const description =
  "The latest sarees added to Jyoti Sarees — Ajrakh, Banarasi, Pattu and Kora pieces, newest first. Enquire on WhatsApp about any saree.";

export const metadata = buildMetadata({
  title: latestYear
    ? `New Saree Arrivals ${latestYear} | Latest Saree Collection`
    : "New Saree Arrivals | Latest Saree Collection",
  description,
  path: "/new-arrivals",
  image: seoImages.newCollection,
});

export default function NewArrivalsPage() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({ name: "New Arrivals", description }, "/new-arrivals", arrivals),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "New Arrivals", path: "/new-arrivals" },
          ]),
        ]}
      />
      <NewArrivalsHero />
      <CatalogueBrowser products={arrivals} cardBadge="New" />
    </>
  );
}
