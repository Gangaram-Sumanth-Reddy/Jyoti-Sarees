"use client";

import type { ReactNode } from "react";
import { PriceRangeSlider } from "@/components/catalogue/PriceRangeSlider";
import { cn } from "@/lib/cn";
import {
  getFilterOptions,
  getPriceBounds,
  sortOptions,
  type CatalogueFilters,
  type Product,
  type SortId,
} from "@/lib/products";
import { isLightSwatch, swatchFor } from "@/lib/colours";

/** Display hex values for catalogue colour filter swatches. */

type CatalogueFiltersSidebarProps = {
  products: Product[];
  filters: CatalogueFilters;
  onChange: <K extends keyof CatalogueFilters>(
    key: K,
    value: CatalogueFilters[K],
  ) => void;
  onClear: () => void;
  canClear: boolean;
  /** Radio group names must be unique when the sidebar renders twice (desktop + drawer). */
  idPrefix: string;
  /** The drawer supplies its own visible title. */
  hideTitle?: boolean;
  className?: string;
};

function FilterGroup({
  title,
  children,
  contentClassName,
}: {
  title: string;
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-navy">
        {title}
      </legend>
      <div className={cn("flex flex-col gap-1.5", contentClassName)}>
        {children}
      </div>
    </fieldset>
  );
}

function FilterPill({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-7 items-center rounded-pill border px-2.5 text-[0.7rem] font-semibold tracking-[0.02em] transition-colors duration-200 max-lg:min-h-9 max-lg:px-3.5 max-lg:text-[0.8125rem]",
        selected
          ? "border-navy bg-navy text-white"
          : "border-border bg-white text-rich-black hover:border-navy/45 hover:text-navy",
      )}
    >
      {label}
    </button>
  );
}

function FilterRadio({
  name,
  value,
  checked,
  label,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-[0.8rem] transition-colors max-lg:min-h-10 max-lg:gap-2.5 max-lg:px-2 max-lg:text-small",
        checked
          ? "bg-navy/8 font-semibold text-navy"
          : "text-rich-black hover:bg-cream",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="size-3.5 shrink-0 accent-navy"
      />
      <span>{label}</span>
    </label>
  );
}

function SwatchCheck({ light }: { light: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className={cn(light ? "text-navy" : "text-white")}
    >
      <path
        d="M2 5.2 4.1 7.2 8 2.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CatalogueFiltersSidebar({
  products,
  filters,
  onChange,
  onClear,
  canClear,
  idPrefix,
  hideTitle = false,
  className,
}: CatalogueFiltersSidebarProps) {
  const options = getFilterOptions(products);
  const priceBounds = getPriceBounds(products);
  const selectedColour = filters.colour === "all" ? null : filters.colour;

  return (
    <aside
      className={cn(
        "rounded-lg border border-border bg-white p-3.5 shadow-soft sm:p-4",
        className,
      )}
      aria-label="Product filters"
    >
      <div
        className={cn(
          "mb-3 flex items-center justify-between gap-2 border-b border-border pb-2.5",
          hideTitle && "justify-end",
        )}
      >
        <h2
          className={cn(
            "text-body font-semibold text-rich-black",
            hideTitle && "sr-only",
          )}
        >
          Filters
        </h2>
        <button
          type="button"
          onClick={onClear}
          disabled={!canClear}
          className={cn(
            "inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-pill border border-navy bg-white px-3.5 max-lg:h-10 max-lg:px-4",
            "text-[0.72rem] font-semibold tracking-[0.02em] text-navy transition-colors duration-200",
            "hover:bg-navy hover:text-white",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            "disabled:pointer-events-none disabled:border-border-strong disabled:text-navy/45",
          )}
        >
          Clear All Filters
        </button>
      </div>

      <div className="flex flex-col gap-3.5">
        <FilterGroup
          title="Collection"
          contentClassName="flex-row flex-wrap gap-1.5"
        >
          <FilterPill
            selected={filters.collection === "all"}
            label="All"
            onClick={() => onChange("collection", "all")}
          />
          {options.collections.map((collection) => (
            <FilterPill
              key={collection}
              selected={filters.collection === collection}
              label={collection}
              onClick={() => onChange("collection", collection)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Colour" contentClassName="gap-2">
          <FilterPill
            selected={filters.colour === "all"}
            label="All colours"
            onClick={() => onChange("colour", "all")}
          />

          <div
            className="flex flex-wrap gap-1.5 max-lg:gap-2"
            role="listbox"
            aria-label="Colour"
          >
            {options.colours.map((colour) => {
              const selected = filters.colour === colour;
              const hex = swatchFor(colour);
              const light = isLightSwatch(hex);

              return (
                <button
                  key={colour}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  aria-label={colour}
                  title={colour}
                  onClick={() => onChange("colour", colour)}
                  className={cn(
                    "relative inline-flex h-[1.375rem] w-7 items-center justify-center rounded-md border transition-all duration-200 max-lg:h-8 max-lg:w-10",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    selected
                      ? "border-navy ring-2 ring-navy/40 ring-offset-1 ring-offset-white"
                      : light
                        ? "border-border-strong hover:border-navy/50"
                        : "border-transparent hover:ring-1 hover:ring-navy/25",
                  )}
                  style={{ backgroundColor: hex }}
                >
                  {selected ? <SwatchCheck light={light} /> : null}
                </button>
              );
            })}
          </div>

          <p
            className="min-h-[1rem] text-[0.68rem] text-muted"
            aria-live="polite"
          >
            {selectedColour ? selectedColour : "\u00A0"}
          </p>
        </FilterGroup>

        <FilterGroup title="Fabric" contentClassName="flex-row flex-wrap gap-1.5">
          <FilterPill
            selected={filters.fabric === "all"}
            label="All"
            onClick={() => onChange("fabric", "all")}
          />
          {options.fabrics.map((fabric) => (
            <FilterPill
              key={fabric}
              selected={filters.fabric === fabric}
              label={fabric}
              onClick={() => onChange("fabric", fabric)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Price">
          <PriceRangeSlider
            min={priceBounds.min}
            max={priceBounds.max}
            valueMin={filters.priceMin}
            valueMax={filters.priceMax}
            idPrefix={idPrefix}
            onChange={({ min, max }) => {
              onChange("priceMin", min);
              onChange("priceMax", max);
            }}
          />
        </FilterGroup>

        <div className="border-t border-border pt-3.5">
          <FilterGroup title="Sort By">
            {sortOptions.map((option) => (
              <FilterRadio
                key={option.id}
                name={`${idPrefix}-sort`}
                value={option.id}
                checked={filters.sort === option.id}
                label={option.label}
                onChange={() => onChange("sort", option.id as SortId)}
              />
            ))}
          </FilterGroup>
        </div>
      </div>
    </aside>
  );
}
