import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductAbout } from "@/components/product/ProductAbout";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductWhatsAppCta } from "@/components/product/ProductWhatsAppCta";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Saree not found" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  return (
    <>
      <Section className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <ProductGallery productName={product.name} gallery={product.gallery} />
            <ProductInfo product={product} />
          </div>
        </Container>
      </Section>

      <ProductAbout product={product} />
      <RelatedProducts products={related} />
      <ProductWhatsAppCta
        productName={product.name}
        productId={product.productId}
      />
    </>
  );
}
