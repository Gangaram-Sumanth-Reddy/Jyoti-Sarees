import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailPanel } from "@/components/product/ProductDetailPanel";
import { ProductWhatsAppCta } from "@/components/product/ProductWhatsAppCta";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getColourOption,
  getRelatedProducts,
  productCatalogueHref,
  type Product,
} from "@/lib/products";

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
  const backHref = productCatalogueHref(product);
  const backLabel = product.isNewArrival
    ? "Back to New Arrivals"
    : "Back to Sarees";

  return (
    <>
      <Section className="overflow-x-clip pt-6 sm:pt-8 lg:pt-10">
        <Container className="max-w-[82.5rem]">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-small font-semibold text-navy transition-colors hover:text-accent"
          >
            <span aria-hidden="true">←</span>
            {backLabel}
          </Link>

          <ProductDetailPanel product={product} colourSlug={selected.id} />
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
