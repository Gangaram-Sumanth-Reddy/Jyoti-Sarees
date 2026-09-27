"use client";

import { useMemo, useState } from "react";
import { CollectionEmptyState } from "@/components/collections/CollectionEmptyState";
import { FilterSheet, FilterTriggerIcon } from "@/components/catalogue/FilterSheet";
import { ProductFiltersBar } from "@/components/catalogue/ProductFiltersBar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section } from "@/components/ui/Section";
import type { Collection } from "@/lib/collections";
import {
  defaultCatalogueFilters,
  filterAndSortProducts,
  hasActiveFilters,
  productHref,
  type CatalogueFilters,
  type Product,
} from "@/lib/products";

type CollectionBrowserProps = {
  collection: Collection;
  products: Product[];
};

export function CollectionBrowser({
  collection,
  products,
}: CollectionBrowserProps) {
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
  const hasSourceProducts = products.length > 0;

  return (
    <Section tone="muted" className="pt-0">
      <Container>
        <div className="mb-8 rounded-lg border border-border bg-white px-5 py-5 shadow-soft sm:px-6 sm:py-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="max-w-2xl">
              <p className="text-small font-semibold uppercase tracking-[0.12em] text-accent">
                {collection.name}
              </p>
              <p className="mt-2 text-body text-muted">
                {collection.shortDescription}
              </p>
            </div>
            <p className="shrink-0 text-small font-semibold text-rich-black">
              {products.length}{" "}
              {products.length === 1 ? "product available" : "products available"}
            </p>
          </div>
        </div>

        {hasSourceProducts ? (
          <>
            <ProductFiltersBar
              products={products}
              filters={filters}
              onChange={updateFilter}
              onClear={clearFilters}
              showClear={filtersActive}
              categoryLabel="Saree Type"
              idPrefix="inline"
              className="hidden md:block"
            />

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-small text-muted" aria-live="polite">
                Showing {visible.length}{" "}
                {visible.length === 1 ? "saree" : "sarees"}
              </p>
              <Button
                type="button"
                variant={filtersActive ? "primary" : "secondary"}
                size="sm"
                className="min-h-11 px-5 md:hidden"
                aria-haspopup="dialog"
                onClick={() => setSheetOpen(true)}
              >
                <FilterTriggerIcon />
                Filters &amp; Sort
                {filtersActive ? " · On" : ""}
              </Button>
            </div>

            <FilterSheet
              open={sheetOpen}
              onClose={() => setSheetOpen(false)}
              title="Filters & Sort"
              footer={
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="flex-1 px-4"
                    disabled={!filtersActive}
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    className="flex-[1.4] px-4"
                    onClick={() => setSheetOpen(false)}
                  >
                    Show {visible.length} {visible.length === 1 ? "saree" : "sarees"}
                  </Button>
                </div>
              }
            >
              <ProductFiltersBar
                products={products}
                filters={filters}
                onChange={updateFilter}
                onClear={clearFilters}
                showClear={false}
                categoryLabel="Saree Type"
                idPrefix="sheet"
                className="!border-0 !p-0 !shadow-none"
              />
            </FilterSheet>

            {visible.length > 0 ? (
              <ul className="mt-5 grid list-none grid-cols-2 gap-3 p-0 sm:mt-6 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                {visible.map((product) => (
                  <ProductCard
                    key={product.slug}
                    name={product.name}
                    category={product.category}
                    fabric={product.fabric}
                    price={product.priceLabel}
                    href={productHref(product)}
                    productId={product.productId}
                    showWhatsApp
                  />
                ))}
              </ul>
            ) : (
              <div className="mt-6">
                <CollectionEmptyState filtered onClear={clearFilters} />
              </div>
            )}
          </>
        ) : (
          <CollectionEmptyState />
        )}
      </Container>
    </Section>
  );
}
