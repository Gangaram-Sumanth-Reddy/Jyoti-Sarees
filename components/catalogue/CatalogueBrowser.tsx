"use client";

import { useMemo, useState } from "react";
import { CatalogueEmptyState } from "@/components/catalogue/CatalogueEmptyState";
import { ProductFiltersBar } from "@/components/catalogue/ProductFiltersBar";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import {
  defaultCatalogueFilters,
  filterAndSortProducts,
  getCategoryNav,
  hasActiveFilters,
  productHref,
  type CatalogueFilters,
  type Product,
} from "@/lib/products";

type CatalogueBrowserProps = {
  products: Product[];
};

export function CatalogueBrowser({ products }: CatalogueBrowserProps) {
  const [filters, setFilters] = useState<CatalogueFilters>(defaultCatalogueFilters);

  const categoryNav = useMemo(() => getCategoryNav(products), [products]);
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
    <Section tone="muted" className="pt-0">
      <Container>
        <div className="-mx-gutter overflow-x-auto px-gutter pb-2">
          <nav aria-label="Collection categories">
            <ul className="flex min-w-max list-none gap-2 p-0 sm:gap-3">
              {categoryNav.map((item) => {
                const active = filters.categoryNav === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => updateFilter("categoryNav", item.id)}
                      aria-pressed={active}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-pill border px-5 text-small font-semibold tracking-[0.06em] transition-colors duration-200",
                        active
                          ? "border-navy bg-navy text-white"
                          : "border-border bg-white text-rich-black hover:border-border-strong hover:text-accent",
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="mt-8">
          <ProductFiltersBar
            products={products}
            filters={filters}
            onChange={updateFilter}
            onClear={clearFilters}
            showClear={filtersActive}
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-small text-muted" aria-live="polite">
            {visible.length} {visible.length === 1 ? "saree" : "sarees"}
          </p>
        </div>

        {visible.length > 0 ? (
          <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {visible.map((product) => (
              <ProductCard
                key={product.slug}
                name={product.name}
                category={product.category}
                fabric={product.fabric}
                price={product.priceLabel}
                href={productHref(product.slug)}
                productId={product.productId}
                showWhatsApp
              />
            ))}
          </ul>
        ) : (
          <div className="mt-6">
            <CatalogueEmptyState onClear={clearFilters} />
          </div>
        )}
      </Container>
    </Section>
  );
}
