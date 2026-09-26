"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  sortedCountryCodes,
  type CountryDialCode,
} from "@/lib/country-codes";

type CountryCodeSelectProps = {
  valueIso: string;
  onChange: (country: CountryDialCode) => void;
  className?: string;
};

export function CountryCodeSelect({
  valueIso,
  onChange,
  className,
}: CountryCodeSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const selected =
    sortedCountryCodes.find((entry) => entry.iso === valueIso) ??
    sortedCountryCodes[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedCountryCodes;
    return sortedCountryCodes.filter(
      (entry) =>
        entry.name.toLowerCase().includes(q) ||
        entry.iso.toLowerCase().includes(q) ||
        entry.code.includes(q.replace(/^\+/, "")),
    );
  }, [query]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const index = filtered.findIndex((entry) => entry.iso === valueIso);
    setActiveIndex(index >= 0 ? index : 0);
  }, [open, filtered, valueIso]);

  function selectCountry(country: CountryDialCode) {
    onChange(country);
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={rootRef} className={cn("relative shrink-0", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-full min-w-[5.75rem] items-center justify-between gap-1 border-0 border-r border-border bg-cream px-2.5 text-left text-small font-semibold text-navy outline-none transition-colors hover:bg-cream/80"
      >
        <span className="truncate">
          {selected.iso} {selected.code}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M3 4.5 6 7.5 9 4.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+0.35rem)] z-40 w-[min(18rem,calc(100vw-2.5rem))] overflow-hidden rounded-md border border-border bg-white shadow-card">
          <div className="border-b border-border p-2">
            <input
              type="search"
              value={query}
              autoFocus
              placeholder="Search country or code"
              aria-label="Search country code"
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActiveIndex((current) =>
                    Math.min(current + 1, filtered.length - 1),
                  );
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActiveIndex((current) => Math.max(current - 1, 0));
                } else if (event.key === "Enter") {
                  event.preventDefault();
                  const next = filtered[activeIndex];
                  if (next) selectCountry(next);
                } else if (event.key === "Escape") {
                  setOpen(false);
                  setQuery("");
                }
              }}
              className="min-h-9 w-full rounded-md border border-border bg-surface px-3 text-small text-navy outline-none placeholder:text-subtle focus-visible:border-navy"
            />
          </div>
          <ul
            id={listId}
            role="listbox"
            className="max-h-56 overflow-y-auto overscroll-contain py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2.5 text-small text-muted">No matches</li>
            ) : (
              filtered.map((entry, index) => {
                const active = index === activeIndex;
                const selectedItem = entry.iso === valueIso;
                return (
                  <li key={`${entry.iso}-${entry.code}`} role="option" aria-selected={selectedItem}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-small transition-colors",
                        active || selectedItem
                          ? "bg-cream text-navy"
                          : "text-rich-black hover:bg-cream/80",
                      )}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectCountry(entry)}
                    >
                      <span className="min-w-0 truncate font-medium">
                        {entry.name}
                      </span>
                      <span className="shrink-0 tabular-nums text-navy/80">
                        {entry.iso} {entry.code}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
