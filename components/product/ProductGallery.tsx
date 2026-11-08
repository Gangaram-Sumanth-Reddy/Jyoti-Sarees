"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ProductShareButton } from "@/components/product/ProductShareButton";
import { cn } from "@/lib/cn";
import type { ProductGalleryItem } from "@/lib/products";

type ProductGalleryProps = {
  productName: string;
  /** Clean product path shared by the share button. */
  sharePath: string;
  gallery: ProductGalleryItem[];
  /** Selected colourway — tints placeholders so only the saree colour changes. */
  colourHex?: string;
  colourLabel?: string;
};

type GalleryVariant = "thumb" | "main" | "lightbox";

const photoSizes: Record<GalleryVariant, string> = {
  thumb: "48px",
  main: "(min-width: 1280px) 27rem, (min-width: 1024px) 25rem, calc(100vw - 6rem)",
  lightbox: "100vw",
};

const photoFit: Record<GalleryVariant, string> = {
  thumb: "object-cover object-top",
  /* Some fabric close-ups are landscape; contain keeps them uncropped. */
  main: "object-contain",
  lightbox: "object-contain",
};

function GalleryVisual({
  item,
  productName,
  variant,
  preload = false,
  colourHex,
  colourLabel,
}: {
  item: ProductGalleryItem;
  productName: string;
  variant: GalleryVariant;
  preload?: boolean;
  colourHex?: string;
  colourLabel?: string;
}) {
  const compact = variant === "thumb";

  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={
          compact
            ? ""
            : `${/saree$/i.test(productName) ? productName : `${productName} saree`}${
                colourLabel ? ` in ${colourLabel}` : ""
              } — ${item.label.toLowerCase()}`
        }
        fill
        preload={preload}
        sizes={photoSizes[variant]}
        className={photoFit[variant]}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-2 text-center transition-colors duration-300"
      style={{
        backgroundColor: colourHex
          ? `color-mix(in srgb, ${colourHex} 28%, #f5f0e8)`
          : undefined,
      }}
      aria-hidden="true"
    >
      {!colourHex ? (
        <div className="absolute inset-0 bg-cream" />
      ) : (
        <div
          className="absolute inset-x-[12%] inset-y-[8%] rounded-sm opacity-90"
          style={{
            background: `linear-gradient(160deg, color-mix(in srgb, ${colourHex} 55%, white) 0%, ${colourHex} 45%, color-mix(in srgb, ${colourHex} 70%, #1a1a1a) 100%)`,
          }}
        />
      )}
      <span
        className={cn(
          "relative z-10 font-semibold uppercase tracking-[0.1em]",
          colourHex ? "text-white/90 drop-shadow-sm" : "text-navy/55",
          compact
            ? "text-[0.52rem] leading-tight"
            : "max-w-[12ch] text-[0.68rem] sm:text-small",
        )}
      >
        {compact ? item.label.split(/[\s/]/)[0] : item.label}
      </span>
    </div>
  );
}

export function ProductGallery({
  productName,
  sharePath,
  gallery,
  colourHex,
  colourLabel,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const labelId = useId();
  const active = gallery[activeIndex] ?? gallery[0];

  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;
    if (lightboxOpen && !dialog.open) dialog.showModal();
    if (!lightboxOpen && dialog.open) dialog.close();
  }, [lightboxOpen]);

  if (!active) return null;

  return (
    <div className="min-w-0 w-full">
      <div className="flex items-start gap-2 sm:gap-2.5">
        <ul
          className="flex w-11 shrink-0 list-none flex-col gap-1.5 p-0 sm:w-12"
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
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative aspect-square w-full overflow-hidden rounded-md border bg-cream transition-colors duration-200",
                    selected
                      ? "border-navy ring-2 ring-navy/35 ring-offset-1 ring-offset-white"
                      : "border-border hover:border-border-strong",
                  )}
                  aria-label={`Show ${item.label}`}
                  title={item.label}
                >
                  <GalleryVisual
                    item={item}
                    productName={productName}
                    variant="thumb"
                    colourHex={colourHex}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative min-w-0 flex-1">
          <ProductShareButton
            productName={productName}
            path={sharePath}
            className="absolute right-2.5 top-2.5 z-10 sm:right-3 sm:top-3"
          />
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative block w-full overflow-hidden rounded-lg border border-border bg-cream text-left shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={`View ${active.label} fullscreen`}
          >
            <div className="relative aspect-[2/3] w-full">
              <GalleryVisual
                item={active}
                productName={productName}
                variant="main"
                preload={activeIndex === 0}
                colourHex={colourHex}
                colourLabel={colourLabel}
              />
            </div>
            <span className="pointer-events-none absolute bottom-2 right-2 rounded-pill border border-border bg-white/95 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-navy opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              Expand
            </span>
          </button>

          <p id={labelId} className="mt-2 text-small font-medium text-navy">
            {active.label}
            {colourLabel ? (
              <span className="font-normal text-muted"> · {colourLabel}</span>
            ) : null}
          </p>
        </div>
      </div>

      <dialog
        ref={lightboxRef}
        className="fixed inset-0 z-[80] m-0 h-dvh max-h-none w-full max-w-none border-0 bg-navy-deep/92 p-0 text-white open:flex open:items-center open:justify-center backdrop:bg-navy-deep/80"
        aria-label={`${productName} image viewer`}
        onClose={() => setLightboxOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setLightboxOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setActiveIndex((current) => (current + 1) % gallery.length);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setActiveIndex(
              (current) => (current - 1 + gallery.length) % gallery.length,
            );
          }
        }}
      >
        <div className="relative flex h-full w-full max-w-5xl flex-col px-4 py-5 sm:px-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-small text-white/80">
              {active.label}
              {colourLabel ? ` · ${colourLabel}` : ""}
            </p>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-pill bg-white/10 text-white hover:bg-white/20"
              aria-label="Close image viewer"
            >
              ×
            </button>
          </div>

          <div className="relative mx-auto min-h-0 w-full flex-1">
            <div className="absolute inset-0 overflow-hidden rounded-lg bg-cream">
              <GalleryVisual
                item={active}
                productName={productName}
                variant="lightbox"
                colourHex={colourHex}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              className="rounded-pill border border-white/30 px-4 py-2 text-small font-semibold hover:bg-white/10"
              onClick={() =>
                setActiveIndex(
                  (current) => (current - 1 + gallery.length) % gallery.length,
                )
              }
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-pill border border-white/30 px-4 py-2 text-small font-semibold hover:bg-white/10"
              onClick={() =>
                setActiveIndex((current) => (current + 1) % gallery.length)
              }
            >
              Next
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
