"use client";

import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import {
  getFilterOptions,
  priceRangeOptions,
  sortOptions,
  type CatalogueFilters,
  type PriceRangeId,
  type Product,
  type SortId,
} from "@/lib/products";

type ProductFiltersBarProps = {
  products: Product[];
  filters: CatalogueFilters;
  onChange: <K extends keyof CatalogueFilters>(
    key: K,
    value: CatalogueFilters[K],
  ) => void;
  onClear: () => void;
  showClear: boolean;
  categoryLabel?: string;
  hideCategory?: boolean;
  resultCount?: number;
  resultLabel?: string;
};

export function ProductFiltersBar({
  products,
  filters,
  onChange,
  onClear,
  showClear,
  categoryLabel = "Category",
  hideCategory = false,
  resultCount,
  resultLabel = "Sarees",
}: ProductFiltersBarProps) {
  const options = getFilterOptions(products);

  return (
    <div className="rounded-lg border border-border bg-white p-4 shadow-soft sm:p-5 lg:p-6">
      {typeof resultCount === "number" ? (
        <div className="mb-5 flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-body font-semibold text-rich-black" aria-live="polite">
            {resultCount} {resultCount === 1 ? resultLabel.replace(/s$/, "") : resultLabel}
          </p>
          <p className="text-small text-muted">Filter and sort to refine your view</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div
          className={
            hideCategory
              ? "grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              : "grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          }
        >
          {hideCategory ? null : (
            <Select
              label={categoryLabel}
              name="category"
              value={filters.category}
              onChange={(event) => onChange("category", event.target.value)}
            >
              <option value="all">All categories</option>
              {options.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          )}

          <Select
            label="Colour"
            name="colour"
            value={filters.colour}
            onChange={(event) => onChange("colour", event.target.value)}
          >
            <option value="all">All colours</option>
            {options.colours.map((colour) => (
              <option key={colour} value={colour}>
                {colour}
              </option>
            ))}
          </Select>

          <Select
            label="Fabric"
            name="fabric"
            value={filters.fabric}
            onChange={(event) => onChange("fabric", event.target.value)}
          >
            <option value="all">All fabrics</option>
            {options.fabrics.map((fabric) => (
              <option key={fabric} value={fabric}>
                {fabric}
              </option>
            ))}
          </Select>

          <Select
            label="Price"
            name="price"
            value={filters.priceRange}
            onChange={(event) =>
              onChange("priceRange", event.target.value as PriceRangeId)
            }
          >
            {priceRangeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end lg:w-auto lg:min-w-[14rem]">
          <Select
            label="Sort"
            name="sort"
            value={filters.sort}
            onChange={(event) => onChange("sort", event.target.value as SortId)}
            className="lg:min-w-[14rem]"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
          {showClear ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="shrink-0 sm:min-h-11"
              onClick={onClear}
            >
              Clear
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
