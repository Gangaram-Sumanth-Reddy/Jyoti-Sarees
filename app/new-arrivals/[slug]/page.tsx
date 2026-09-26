import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  getCatalogueProductBySlug,
  getColourOption,
  getNewArrivalProductBySlug,
  getNewArrivals,
  productHref,
  products,
} from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

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
  if (!product) return { title: "Saree not found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

/** Canonical colour URL lives at `/new-arrivals/[slug]/[colour]`. */
export default async function NewArrivalProductIndexPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getNewArrivalProductBySlug(slug);

  if (!product) {
    const catalogue = getCatalogueProductBySlug(slug);
    if (catalogue) {
      redirect(productHref(catalogue, getColourOption(catalogue).id));
    }
    redirect("/new-arrivals");
  }

  const colour = getColourOption(product);
  redirect(productHref(product, colour.id));
}
