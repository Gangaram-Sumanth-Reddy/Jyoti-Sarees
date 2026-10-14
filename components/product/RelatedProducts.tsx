import { ProductCarousel } from "@/components/product/ProductCarousel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Product } from "@/lib/products";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <Section>
      <Container className="max-w-[82.5rem]">
        <ProductCarousel
          title="You May Also Like"
          description="Related sarees from a similar collection, fabric, colour or style."
          products={products}
        />
      </Container>
    </Section>
  );
}
