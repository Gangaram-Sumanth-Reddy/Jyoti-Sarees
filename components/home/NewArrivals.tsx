import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getNewArrivals, productHref } from "@/lib/products";
import { copy } from "@/lib/site";

export function NewArrivals() {
  const arrivals = getNewArrivals(6);

  return (
    <Section>
      <Container>
        <SectionHeading
          title={copy.newArrivals.title}
          description={copy.newArrivals.description}
          align="center"
          className="max-w-2xl"
        />
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {arrivals.map((product) => (
            <ProductCard
              key={product.slug}
              name={product.name}
              category={product.category}
              fabric={product.fabric}
              price={product.priceLabel}
              href={productHref(product.slug)}
              productId={product.productId}
            />
          ))}
        </ul>
        <div className="mt-10 flex justify-center sm:mt-12">
          <ButtonLink href="/new-arrivals" variant="secondary">
            View All New Arrivals
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
