import type { Metadata } from "next";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { productMetadata } from "@/lib/product-seo";
import { catalogueProducts, getCatalogueProductBySlug } from "@/lib/products";

type ProductColourPageProps = {
  params: Promise<{ slug: string; colour: string }>;
};

export const dynamicParams = false;

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
  const option = product?.colourOptions.find((entry) => entry.id === colour);
  if (!product || !option) return { title: "Saree not found", robots: { index: false } };
  return productMetadata(product, option);
}

export default async function SareeProductColourPage({
  params,
}: ProductColourPageProps) {
  const { slug, colour } = await params;
  return (
    <ProductDetailView product={getCatalogueProductBySlug(slug)} colourSlug={colour} />
  );
}
