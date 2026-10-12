"use client";

import { useMemo, useState } from "react";
import { CatalogueFiltersSidebar } from "@/components/catalogue/CatalogueFiltersSidebar";
import { CollectionEmptyState } from "@/components/collections/CollectionEmptyState";
import { FilterSheet, FilterTriggerIcon } from "@/components/catalogue/FilterSheet";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import {
  defaultCatalogueFilters,
  filterAndSortProducts,
  hasActiveFilters,
  productHref,
  type CatalogueFilters,
  type Product,
} from "@/lib/products";

type CollectionBrowserProps = {
  products: Product[];
};

export function CollectionBrowser({ products }: CollectionBrowserProps) {
  const [filters, setFilters] = useState<CatalogueFilters>(defaultCatalogueFilters);
  const [sheetOpen, setSheetOpen] = useState(false);

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
  const canClear = filtersActive || filters.sort !== defaultCatalogueFilters.sort;
  const hasSourceProducts = products.length > 0;

  return (
    <Section tone="muted" className="pt-6 sm:pt-8">
      <Container>
        {hasSourceProducts ? (
          <>
            <div className="flex items-center justify-between gap-3 lg:hidden">
              <p className="text-small font-semibold text-rich-black" aria-live="polite">
                {visible.length} {visible.length === 1 ? "saree" : "sarees"}
              </p>
              <Button
                type="button"
                variant={filtersActive ? "primary" : "secondary"}
                size="sm"
                className="min-h-11 px-5"
                aria-haspopup="dialog"
                onClick={() => setSheetOpen(true)}
              >
                <FilterTriggerIcon />
                Filters &amp; Sort
                {filtersActive ? " · On" : ""}
              </Button>
            </div>

            <div className="mt-4 lg:mt-0 lg:grid lg:grid-cols-[minmax(17.5rem,18.75rem)_minmax(0,1fr)] lg:items-start lg:gap-4 xl:gap-5">
              <CatalogueFiltersSidebar
                products={products}
                filters={filters}
                onChange={updateFilter}
                onClear={clearFilters}
                canClear={canClear}
                idPrefix="collection-desktop"
                className={cn(
                  "sticky z-20 hidden w-full self-start lg:block",
                  "top-[calc(var(--site-header-height)+1rem)]",
                  "max-h-[calc(100dvh-var(--site-header-height)-2rem)]",
                  "overflow-y-auto overscroll-contain",
                )}
              />

              <div className="min-w-0">
                {visible.length > 0 ? (
                  <ul className="grid list-none grid-cols-2 items-stretch gap-3 p-0 sm:gap-4 lg:grid-cols-3 lg:gap-4">
                    {visible.map((product) => (
                      <ProductCard
                        key={product.slug}
                        product={product}
                        href={productHref(product)}
                        className="h-full"
                      />
                    ))}
                  </ul>
                ) : (
                  <CollectionEmptyState filtered onClear={clearFilters} />
                )}
              </div>
            </div>

            <FilterSheet
              open={sheetOpen}
              onClose={() => setSheetOpen(false)}
              title="Filters & Sort"
              footer={
                <Button
                  type="button"
                  size="lg"
                  className="w-full"
                  onClick={() => setSheetOpen(false)}
                >
                  Show {visible.length} {visible.length === 1 ? "saree" : "sarees"}
                </Button>
              }
            >
              <CatalogueFiltersSidebar
                products={products}
                filters={filters}
                onChange={updateFilter}
                onClear={clearFilters}
                canClear={canClear}
                idPrefix="collection-drawer"
                hideTitle
                className="!border-0 !p-0 !shadow-none"
              />
            </FilterSheet>
          </>
        ) : (
          <CollectionEmptyState />
        )}
      </Container>
    </Section>
  );
}
