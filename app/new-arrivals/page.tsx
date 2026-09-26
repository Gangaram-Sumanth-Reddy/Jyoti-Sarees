import type { Metadata } from "next";
import { CatalogueBrowser } from "@/components/catalogue/CatalogueBrowser";
import { CatalogueCta } from "@/components/catalogue/CatalogueCta";
import { NewArrivalsHero } from "@/components/new-arrivals/NewArrivalsHero";
import { getNewArrivals, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "New Arrivals",
  description:
    "Discover the latest sarees added to the Jyoti Sarees collection.",
};

export default function NewArrivalsPage() {
  const arrivals = getNewArrivals(products.length);

  return (
    <>
      <NewArrivalsHero />
      <CatalogueBrowser products={arrivals} cardBadge="New" />
      <CatalogueCta />
    </>
  );
}
