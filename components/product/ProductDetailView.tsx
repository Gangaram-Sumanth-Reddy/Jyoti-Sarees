import { notFound } from "next/navigation";
import { ProductDetailPanel } from "@/components/product/ProductDetailPanel";
import { ProductOfferBanner } from "@/components/product/ProductOfferBanner";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { productBreadcrumbs } from "@/lib/product-seo";
import { getRelatedProducts, type Product } from "@/lib/products";
import { productPageSchemas } from "@/lib/structured-data";

type ProductDetailViewProps = {
  product: Product | undefined;
  colourSlug?: string;
};

export function ProductDetailView({
  product,
  colourSlug,
}: ProductDetailViewProps) {
  if (!product) notFound();

  if (colourSlug) {
    const match = product.colourOptions.some(
      (option) => option.id === colourSlug,
    );
    if (!match) notFound();
  }

  const related = getRelatedProducts(product, 12);

  return (
    <>
      <JsonLd data={productPageSchemas(product)} />
      <Section className="overflow-x-clip pt-6 sm:pt-8 lg:pt-10">
        <Container className="max-w-[82.5rem]">
          <Breadcrumbs items={productBreadcrumbs(product)} />

          <ProductDetailPanel
            product={product}
            colourSlug={colourSlug}
            offerBanner={<ProductOfferBanner product={product} />}
          />
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container className="max-w-[82.5rem]">
          <ProductReviews productSlug={product.slug} productName={product.name} />
        </Container>
      </Section>

      <RelatedProducts products={related} />
      <RecentlyViewed currentSlug={product.slug} />
    </>
  );
}
