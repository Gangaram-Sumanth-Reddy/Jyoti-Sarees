"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CatalogueEmptyState } from "@/components/catalogue/CatalogueEmptyState";
import { CatalogueFiltersSidebar } from "@/components/catalogue/CatalogueFiltersSidebar";
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const drawerTitleId = useId();

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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (drawerOpen && !dialog.open) dialog.showModal();
    if (!drawerOpen && dialog.open) dialog.close();
  }, [drawerOpen]);

  return (
    <Section tone="muted" className="pt-6 sm:pt-8">
      <Container className="max-w-[90rem]">
        <div className="flex justify-end lg:hidden">
          <Button
            type="button"
            variant={filtersActive ? "primary" : "secondary"}
            size="sm"
            onClick={() => setDrawerOpen(true)}
          >
            Filters &amp; Sort
            {filtersActive ? " · On" : ""}
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
              "sticky z-20 hidden w-full self-start lg:block",
              "top-[calc(var(--site-header-height)+1rem)]",
              "max-h-[calc(100dvh-var(--site-header-height)-2rem)]",
              "overflow-y-auto overscroll-contain",
            )}
          />

          <div className="min-w-0">
            {visible.length > 0 ? (
              <ul className="mt-4 grid list-none grid-cols-1 items-stretch gap-4 p-0 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3 lg:gap-4 xl:gap-5">
                {visible.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    href={productHref(product)}
                    showAddToCart
                    badge={cardBadge}
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

      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 open:flex open:justify-end backdrop:bg-navy-deep/45"
        aria-labelledby={drawerTitleId}
        onClose={() => setDrawerOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setDrawerOpen(false);
        }}
      >
        <div className="flex h-full w-full max-w-sm flex-col bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 id={drawerTitleId} className="text-body font-semibold">
              Filters
            </h2>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill text-navy hover:bg-cream"
              aria-label="Close filters"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <CatalogueFiltersSidebar
              products={products}
              filters={filters}
              onChange={updateFilter}
              onClear={clearFilters}
              canClear={canClear}
              idPrefix="drawer"
              className="border-0 p-0 shadow-none"
            />
          </div>
          <div className="border-t border-border p-4">
            <Button
              type="button"
              className="w-full"
              onClick={() => setDrawerOpen(false)}
            >
              Show {visible.length} {visible.length === 1 ? "saree" : "sarees"}
            </Button>
          </div>
        </div>
      </dialog>
    </Section>
  );
}
