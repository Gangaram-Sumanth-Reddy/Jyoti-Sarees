import type { Metadata } from "next";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { productMetadata } from "@/lib/product-seo";
import { getNewArrivalProductBySlug, getNewArrivals, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

/** Unknown slugs 404 before streaming; catalogue slugs redirect in next.config. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getNewArrivals(products.length).map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getNewArrivalProductBySlug(slug);
  if (!product) return { title: "Saree not found", robots: { index: false } };
  return productMetadata(product);
}

export default async function NewArrivalProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  return <ProductDetailView product={getNewArrivalProductBySlug(slug)} />;
}
