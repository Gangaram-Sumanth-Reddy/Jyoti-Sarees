"use client";

import { useId, useState } from "react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";
import type { ProductGalleryItem } from "@/lib/products";

const tones = ["midnight", "navy", "accent", "cream", "navy"] as const;

type ProductGalleryProps = {
  productName: string;
  gallery: ProductGalleryItem[];
};

export function ProductGallery({ productName, gallery }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const labelId = useId();
  const active = gallery[activeIndex] ?? gallery[0];

  if (!active) return null;

  return (
    <div className="min-w-0">
      <ImageFrame aspect="portrait" radius="lg" className="shadow-soft">
        <ImagePlaceholder
          label={`${productName} — ${active.label}`}
          tone={tones[activeIndex % tones.length]}
        />
      </ImageFrame>
      <p id={labelId} className="mt-3 text-small text-muted">
        {active.label}
      </p>

      <ul
        className="mt-4 grid list-none grid-cols-5 gap-2 p-0 sm:gap-3"
        role="listbox"
        aria-labelledby={labelId}
        aria-label="Saree image views"
      >
        {gallery.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <li key={item.id} role="option" aria-selected={selected}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-full overflow-hidden rounded-md border transition-colors duration-200",
                  selected
                    ? "border-navy ring-2 ring-accent/30"
                    : "border-border hover:border-border-strong",
                )}
                aria-label={`Show ${item.label}`}
              >
                <ImageFrame aspect="square" radius="none">
                  <ImagePlaceholder
                    label={String(index + 1)}
                    tone={tones[index % tones.length]}
                    className="text-[0.65rem] sm:text-small"
                  />
                </ImageFrame>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:hidden">
        {gallery.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={`${item.id}-chip`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "inline-flex shrink-0 items-center rounded-pill border px-3 py-2 text-small font-semibold tracking-[0.04em] transition-colors",
                selected
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-white text-rich-black",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
