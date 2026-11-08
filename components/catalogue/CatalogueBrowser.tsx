"use client";

import { useMemo, useState } from "react";
import { CatalogueEmptyState } from "@/components/catalogue/CatalogueEmptyState";
import { CatalogueFiltersSidebar } from "@/components/catalogue/CatalogueFiltersSidebar";
import { FilterSheet, FilterTriggerIcon } from "@/components/catalogue/FilterSheet";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import {
  activeFilterCount,
  defaultCatalogueFilters,
  filterAndSortProducts,
  hasActiveFilters,
  productHref,
  type CatalogueFilters,
  type Product,
} from "@/lib/products";

type CatalogueBrowserProps = {
  products: Product[];
  /** Optional badge on every card (e.g. "New" on New Arrivals). */
  cardBadge?: string;
};

export function CatalogueBrowser({
  products,
  cardBadge,
}: CatalogueBrowserProps) {
  const [filters, setFilters] = useState<CatalogueFilters>(defaultCatalogueFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
  const filterCount = activeFilterCount(filters);
  const canClear = filtersActive || filters.sort !== defaultCatalogueFilters.sort;

  return (
    <Section tone="muted" id="sarees-listing" className="scroll-mt-24 pt-6 sm:pt-8">
      <Container className="max-w-[90rem]">
        <div className="sticky top-[var(--site-header-height)] z-30 -mx-gutter flex items-center justify-between gap-3 border-b border-border/70 bg-section-muted/95 px-gutter py-2.5 backdrop-blur-sm lg:hidden">
          <p className="text-small font-semibold text-rich-black" aria-live="polite">
            {visible.length} {visible.length === 1 ? "saree" : "sarees"}
          </p>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="min-h-11 px-5"
            aria-haspopup="dialog"
            aria-label={
              filterCount > 0
                ? `Filter and sort, ${filterCount} active`
                : "Filter and sort"
            }
            onClick={() => setDrawerOpen(true)}
          >
            <FilterTriggerIcon />
            Filter &amp; Sort
            {filterCount > 0 ? (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[0.7rem] font-bold leading-5 text-navy">
                {filterCount}
              </span>
            ) : null}
          </Button>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(17.5rem,18.75rem)_minmax(0,1fr)] lg:items-start lg:gap-4 xl:gap-5">
          <CatalogueFiltersSidebar
            products={products}
            filters={filters}
            onChange={updateFilter}
            onClear={clearFilters}
            canClear={canClear}
            idPrefix="desktop"
            className={cn(
              "sticky z-20 hidden w-full self-start overflow-hidden lg:flex",
              "top-[calc(var(--site-header-height)+1rem)]",
              "max-h-[calc(100dvh-var(--site-header-height)-2rem)]",
            )}
          />

          <div className="min-w-0">
            {visible.length > 0 ? (
              <ul className="mt-4 grid list-none grid-cols-2 items-stretch gap-3 p-0 sm:gap-4 lg:mt-0 lg:grid-cols-3 lg:gap-4">
                {visible.map((product, index) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    href={productHref(product)}
                    badge={cardBadge}
                    eager={index < 3}
                    className="h-full"
                  />
                ))}
              </ul>
            ) : (
              <CatalogueEmptyState onClear={clearFilters} />
            )}
          </div>
        </div>
      </Container>

      <FilterSheet
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filter & Sort"
        footer={
          <Button
            type="button"
            size="lg"
            className="w-full"
            onClick={() => setDrawerOpen(false)}
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
          idPrefix="drawer"
          hideTitle
          className="flex !rounded-none !border-0 !shadow-none"
        />
      </FilterSheet>
    </Section>
  );
}
