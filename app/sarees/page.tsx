import type { Metadata } from "next";
import { CatalogueBrowser } from "@/components/catalogue/CatalogueBrowser";
import { CatalogueCollections } from "@/components/catalogue/CatalogueCollections";
import { CatalogueCta } from "@/components/catalogue/CatalogueCta";
import { CatalogueHero } from "@/components/catalogue/CatalogueHero";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Sarees",
  description:
    "Explore our curated collection of sarees, from timeless traditional weaves to contemporary styles.",
};

export default function SareesPage() {
  return (
    <>
      <CatalogueHero />
      <CatalogueCollections />
      <CatalogueBrowser products={products} />
      <CatalogueCta />
    </>
  );
}
