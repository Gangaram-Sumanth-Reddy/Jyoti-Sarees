import { notFound } from "next/navigation";
import { ProductDetailPanel } from "@/components/product/ProductDetailPanel";
import { ProductWhatsAppCta } from "@/components/product/ProductWhatsAppCta";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { productBreadcrumbs } from "@/lib/product-seo";
import {
  getColourOption,
  getRelatedProducts,
  type Product,
} from "@/lib/products";
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

  const selected = getColourOption(product, colourSlug);
  const related = getRelatedProducts(product, 4);

  return (
    <>
      <JsonLd data={productPageSchemas(product)} />
      <Section className="overflow-x-clip pt-6 sm:pt-8 lg:pt-10">
        <Container className="max-w-[82.5rem]">
          <Breadcrumbs items={productBreadcrumbs(product)} />

          <ProductDetailPanel product={product} colourSlug={colourSlug} />
        </Container>
      </Section>

      <RelatedProducts products={related} />
      <ProductWhatsAppCta
        productName={`${product.name} (${selected.label})`}
        productId={product.productId}
      />
    </>
  );
}
