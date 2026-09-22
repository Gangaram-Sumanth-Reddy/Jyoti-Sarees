import type { Metadata } from "next";
import { NewArrivalsBrowser } from "@/components/new-arrivals/NewArrivalsBrowser";
import { NewArrivalsCollections } from "@/components/new-arrivals/NewArrivalsCollections";
import { NewArrivalsCta } from "@/components/new-arrivals/NewArrivalsCta";
import { NewArrivalsHero } from "@/components/new-arrivals/NewArrivalsHero";
import { NewArrivalsIntro } from "@/components/new-arrivals/NewArrivalsIntro";
import { getNewArrivals } from "@/lib/products";

export const metadata: Metadata = {
  title: "New Arrivals",
  description:
    "Discover the latest sarees added to the Jyoti Sarees collection.",
};

export default function NewArrivalsPage() {
  const arrivals = getNewArrivals(12);

  return (
    <>
      <NewArrivalsHero />
      <NewArrivalsIntro />
      <NewArrivalsBrowser products={arrivals} />
      <NewArrivalsCollections />
      <NewArrivalsCta />
    </>
  );
}
