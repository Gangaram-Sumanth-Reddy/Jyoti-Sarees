"use client";

import { useMemo, useState } from "react";
import { CatalogueEmptyState } from "@/components/catalogue/CatalogueEmptyState";
import { ProductFiltersBar } from "@/components/catalogue/ProductFiltersBar";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section } from "@/components/ui/Section";
import {
  defaultCatalogueFilters,
  filterAndSortProducts,
  hasActiveFilters,
  productHref,
  type CatalogueFilters,
  type Product,
} from "@/lib/products";

type NewArrivalsBrowserProps = {
  products: Product[];
};

export function NewArrivalsBrowser({ products }: NewArrivalsBrowserProps) {
  const [filters, setFilters] = useState<CatalogueFilters>(defaultCatalogueFilters);

  const visible = useMemo(
    () => filterAndSortProducts(products, filters),
    [products, filters],
  );

  function updateFilter<K extends keyof CatalogueFilters>(
    key: K,
    value: CatalogueFilters[K],
  ) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function clearFilters() {
    setFilters(defaultCatalogueFilters);
  }

  const filtersActive = hasActiveFilters(filters);

  return (
    <Section className="pt-8 sm:pt-10">
      <Container>
        <ProductFiltersBar
          products={products}
          filters={filters}
          onChange={updateFilter}
          onClear={clearFilters}
          showClear={filtersActive}
          resultCount={visible.length}
          resultLabel="Sarees"
        />

        {visible.length > 0 ? (
          <ul className="mt-8 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-4 lg:gap-6">
            {visible.map((product) => (
              <ProductCard
                key={product.slug}
                name={product.name}
                category={product.category}
                fabric={product.fabric}
                price={product.priceLabel}
                href={productHref(product.slug)}
                productId={product.productId}
                badge="New"
              />
            ))}
          </ul>
        ) : (
          <div className="mt-8">
            <CatalogueEmptyState onClear={clearFilters} />
          </div>
        )}
      </Container>
    </Section>
  );
}
