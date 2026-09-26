import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import {
  getCatalogueProductBySlug,
  getColourOption,
  getNewArrivalProductBySlug,
  getNewArrivals,
  productHref,
  products,
} from "@/lib/products";

type ProductColourPageProps = {
  params: Promise<{ slug: string; colour: string }>;
};

export function generateStaticParams() {
  return getNewArrivals(products.length).flatMap((product) =>
    product.colourOptions.map((option) => ({
      slug: product.slug,
      colour: option.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: ProductColourPageProps): Promise<Metadata> {
  const { slug, colour } = await params;
  const product = getNewArrivalProductBySlug(slug);
  if (!product) return { title: "Saree not found" };
  const option = getColourOption(product, colour);
  return {
    title: `${product.name} — ${option.label}`,
    description: product.shortDescription,
  };
}

export default async function NewArrivalProductColourPage({
  params,
}: ProductColourPageProps) {
  const { slug, colour } = await params;
  const product = getNewArrivalProductBySlug(slug);

  if (!product) {
    const catalogue = getCatalogueProductBySlug(slug);
    if (catalogue) redirect(productHref(catalogue, colour));
  }

  return <ProductDetailView product={product} colourSlug={colour} />;
}
