import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/lib/products";
import { productHref } from "@/lib/products";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <Section>
      <Container className="max-w-[82.5rem]">
        <SectionHeading
          title="You May Also Like"
          description="Related sarees from a similar collection, fabric, colour or style."
          align="center"
          className="max-w-2xl"
        />
        <ul className="grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              href={productHref(product)}
              className="h-full"
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
