"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CatalogueEmptyState } from "@/components/catalogue/CatalogueEmptyState";
import { CatalogueFiltersSidebar } from "@/components/catalogue/CatalogueFiltersSidebar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import {
  availabilityOptions,
  defaultCatalogueFilters,
  filterAndSortProducts,
  hasActiveFilters,
  productHref,
  sortOptions,
  type AvailabilityId,
  type CatalogueFilters,
  type Product,
  type SortId,
} from "@/lib/products";

type CatalogueBrowserProps = {
  products: Product[];
};

export function CatalogueBrowser({ products }: CatalogueBrowserProps) {
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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (drawerOpen && !dialog.open) dialog.showModal();
    if (!drawerOpen && dialog.open) dialog.close();
  }, [drawerOpen]);

  return (
    <Section tone="muted" className="pt-6 sm:pt-8">
      <Container className="max-w-[90rem]">
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <p
              className="shrink-0 whitespace-nowrap text-small text-muted"
              aria-live="polite"
            >
              Showing{" "}
              <span className="font-semibold text-rich-black">
                {visible.length}
              </span>{" "}
              {visible.length === 1 ? "saree" : "sarees"}
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant={filtersActive ? "primary" : "secondary"}
                size="sm"
                className="min-h-9 px-3 text-[0.7rem]"
                onClick={clearFilters}
                disabled={!filtersActive}
              >
                Clear All
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setDrawerOpen(true)}
              >
                Filters
                {filtersActive ? " · On" : ""}
              </Button>
            </div>
          </div>
          <Select
            label="Sort"
            name="sort-mobile"
            value={filters.sort}
            onChange={(event) =>
              updateFilter("sort", event.target.value as SortId)
            }
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select
            label="Stock"
            name="stock-mobile"
            value={filters.availability}
            onChange={(event) =>
              updateFilter(
                "availability",
                event.target.value as AvailabilityId,
              )
            }
          >
            {availabilityOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label === "All" ? "All stock" : option.label}
              </option>
            ))}
          </Select>
        </div>

        {/*
          One grid row: filter column height tracks the product column, so
          sticky works for the full product scroll. Toolbar lives only in the
          product column so it aligns with the cards.
        */}
        <div className="lg:grid lg:grid-cols-[minmax(17.5rem,18.75rem)_minmax(0,1fr)] lg:items-start lg:gap-4 xl:gap-5">
          <CatalogueFiltersSidebar
            products={products}
            filters={filters}
            onChange={updateFilter}
            className={cn(
              "sticky z-20 mt-0 hidden w-full self-start lg:block",
              "top-[var(--site-header-height)]",
              /* Safety only: scrollbar appears if viewport is shorter than filters */
              "max-h-[calc(100dvh-var(--site-header-height)-0.75rem)]",
              "overflow-y-auto overscroll-contain",
            )}
          />

          <div className="min-w-0">
            <div
              className={cn(
                "sticky z-30 mb-4 hidden min-h-14 items-center justify-between gap-4 lg:flex",
                "top-[var(--site-header-height)]",
                "rounded-lg border border-border bg-white px-4 py-3 shadow-soft",
              )}
            >
              <p
                className="shrink-0 whitespace-nowrap text-small text-muted"
                aria-live="polite"
              >
                Showing{" "}
                <span className="font-semibold text-rich-black">
                  {visible.length}
                </span>{" "}
                {visible.length === 1 ? "saree" : "sarees"}
              </p>

              <div className="flex shrink-0 items-center gap-2.5">
                <Button
                  type="button"
                  variant={filtersActive ? "primary" : "secondary"}
                  size="sm"
                  className={cn(
                    "min-h-10 whitespace-nowrap px-4 text-[0.75rem]",
                    !filtersActive && "opacity-75",
                  )}
                  onClick={clearFilters}
                  disabled={!filtersActive}
                >
                  Clear All Filters
                </Button>
                <Select
                  label="Stock"
                  name="stock-desktop"
                  hideLabel
                  wrapperClassName="w-auto shrink-0"
                  value={filters.availability}
                  onChange={(event) =>
                    updateFilter(
                      "availability",
                      event.target.value as AvailabilityId,
                    )
                  }
                  className="min-h-10 w-[9.5rem] bg-white px-3 text-small"
                >
                  {availabilityOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label === "All" ? "Stock" : option.label}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Sort"
                  name="sort-desktop"
                  hideLabel
                  wrapperClassName="w-auto shrink-0"
                  value={filters.sort}
                  onChange={(event) =>
                    updateFilter("sort", event.target.value as SortId)
                  }
                  className="min-h-10 w-[11.5rem] bg-white px-3 text-small"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {visible.length > 0 ? (
              <ul className="mt-4 grid list-none grid-cols-1 items-stretch gap-4 p-0 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3 lg:gap-4 xl:gap-5">
                {visible.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    href={productHref(product.slug)}
                    showAddToCart
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
              showClear={filtersActive}
              showClearButton
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
