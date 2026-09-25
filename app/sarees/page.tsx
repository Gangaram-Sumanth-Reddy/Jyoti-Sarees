import type { Metadata } from "next";
import { CatalogueBanner } from "@/components/catalogue/CatalogueBanner";
import { CatalogueBrowser } from "@/components/catalogue/CatalogueBrowser";
import { CatalogueCta } from "@/components/catalogue/CatalogueCta";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Sarees",
  description:
    "Explore our curated collection of sarees, from timeless traditional weaves to contemporary styles.",
};

export default function SareesPage() {
  return (
    <>
      <CatalogueBanner />
      <CatalogueBrowser products={products} />
      <CatalogueCta />
    </>
  );
}
