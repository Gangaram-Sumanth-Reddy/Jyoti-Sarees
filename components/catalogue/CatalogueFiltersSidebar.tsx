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
import { familySwatch, isLightSwatch } from "@/lib/colours";

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
        "inline-flex min-h-7 items-center justify-center whitespace-nowrap rounded-pill border px-2.5 text-[0.7rem] font-semibold tracking-[0.02em] transition-colors duration-200 max-lg:min-h-9 max-lg:px-3.5 max-lg:text-[0.8125rem]",
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
        "flex-col rounded-lg border border-border bg-white shadow-soft",
        className,
      )}
      aria-label="Product filters"
    >
      <div
        className={cn(
          "sticky z-10 flex shrink-0 items-center justify-between gap-2 border-b border-border bg-white",
          /* In the drawer the sheet body (p-4) scrolls; -top-4 pins the header flush with its top edge. */
          hideTitle
            ? "-top-4 -mt-4 justify-end pb-2.5 pt-4"
            : "top-0 rounded-t-lg px-3.5 pb-2.5 pt-3.5 sm:px-4 sm:pt-4",
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
            "inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-pill border border-button-secondary-border bg-button-secondary px-3.5 max-lg:h-10 max-lg:px-4",
            "text-[0.72rem] font-semibold tracking-[0.02em] text-button-secondary-text transition-colors duration-200",
            "hover:bg-button-secondary-hover hover:text-button-secondary-hover-text",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            "disabled:pointer-events-none disabled:opacity-45",
          )}
        >
          Clear All Filters
        </button>
      </div>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-3.5",
          hideTitle
            ? "pt-3"
            : "filter-scroll overscroll-contain px-3.5 pb-3.5 pt-3 sm:px-4 sm:pb-4",
        )}
      >
        <FilterGroup
          title="Collection"
          contentClassName="flex-row flex-wrap gap-1.5 max-lg:gap-2 [&>button]:grow"
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
              const hex = familySwatch(colour);
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

        <FilterGroup
          title="Fabric"
          contentClassName="flex-row flex-wrap gap-1.5 max-lg:gap-2 [&>button]:grow"
        >
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
