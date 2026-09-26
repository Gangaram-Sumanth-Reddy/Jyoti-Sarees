import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import {
  catalogueProducts,
  getCatalogueProductBySlug,
  getColourOption,
  getNewArrivalProductBySlug,
  productHref,
} from "@/lib/products";

type ProductColourPageProps = {
  params: Promise<{ slug: string; colour: string }>;
};

export function generateStaticParams() {
  return catalogueProducts.flatMap((product) =>
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
  const product = getCatalogueProductBySlug(slug);
  if (!product) return { title: "Saree not found" };
  const option = getColourOption(product, colour);
  return {
    title: `${product.name} — ${option.label}`,
    description: product.shortDescription,
  };
}

export default async function SareeProductColourPage({
  params,
}: ProductColourPageProps) {
  const { slug, colour } = await params;
  const product = getCatalogueProductBySlug(slug);

  if (!product) {
    const arrival = getNewArrivalProductBySlug(slug);
    if (arrival) redirect(productHref(arrival, colour));
  }

  return <ProductDetailView product={product} colourSlug={colour} />;
}
