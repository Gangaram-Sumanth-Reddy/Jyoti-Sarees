import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      <Section className="overflow-x-clip pt-6 sm:pt-8 lg:pt-10">
        <Container className="max-w-[82.5rem]">
          <Link
            href="/sarees"
            className="inline-flex items-center gap-1.5 text-small font-semibold text-navy transition-colors hover:text-accent"
          >
            <span aria-hidden="true">←</span>
            Back to Sarees
          </Link>

          {/*
            Narrow sticky gallery on the left; taller product details scroll on the right.
          */}
          <div className="mt-6 grid items-start gap-8 lg:mt-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] xl:gap-10">
            <div className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height)+1rem)] lg:self-start">
              <ProductGallery
                productName={product.name}
                gallery={product.gallery}
              />
            </div>

            <div className="min-w-0">
              <ProductInfo product={product} />
            </div>
          </div>
        </Container>
      </Section>

      <RelatedProducts products={related} />
      <ProductWhatsAppCta
        productName={product.name}
        productId={product.productId}
      />
    </>
  );
}
