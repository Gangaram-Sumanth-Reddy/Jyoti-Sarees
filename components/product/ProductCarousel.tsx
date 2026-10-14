"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { RatingBadge } from "@/components/reviews/RatingBadge";
import { PriceOffer } from "@/components/ui/PriceOffer";
import {
  formatPrice,
  isNewArrivalPick,
  productHref,
  type Product,
} from "@/lib/products";

type ProductCarouselProps = {
  title: string;
  description?: string;
  products: Product[];
};

function CarouselCard({ product }: { product: Product }) {
  const photo = product.gallery.find((entry) => entry.src)?.src;
  const sellingPrice = product.sellingPrice ?? product.price;

  return (
    <li className="w-[10.5rem] shrink-0 snap-start sm:w-[11.5rem] lg:w-[12.5rem]">
      <Link
        href={productHref(product)}
        className="group flex h-full flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="relative block aspect-[3/4] overflow-hidden rounded-lg bg-[#f2efea] ring-1 ring-black/5">
          {photo ? (
            <Image
              src={photo}
              alt={`${product.name} saree`}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 200px, (min-width: 640px) 184px, 168px"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : null}
          {isNewArrivalPick(product) ? (
            <span className="absolute left-2 top-2 rounded-md bg-navy px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-white shadow-soft">
              New
            </span>
          ) : null}
          <RatingBadge slug={product.slug} className="bottom-2 left-2" />
        </span>

        <span className="mt-2 block truncate text-small font-medium text-rich-black group-hover:text-accent">
          {product.name}
        </span>
        <PriceOffer
          className="mt-1"
          sellingPrice={sellingPrice}
          originalPrice={product.originalPrice}
          sellingLabel={product.priceLabel}
        />
        {product.offerPrice !== undefined && product.offerPrice < sellingPrice ? (
          <span className="mt-1 block truncate text-[0.75rem] font-semibold text-accent">
            {formatPrice(product.offerPrice)}
            {product.offerNote ? ` ${product.offerNote}` : ""}
          </span>
        ) : null}
      </Link>
    </li>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Scroll to previous sarees" : "Scroll to more sarees"}
      className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-white text-navy shadow-soft transition-[background-color,opacity] duration-200 hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-35"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={direction === "prev" ? "M15 5 8 12l7 7" : "m9 5 7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function ProductCarousel({ title, description, products }: ProductCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft >= maxScroll - 4,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateEdges, products.length]);

  function scrollByPage(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  }

  if (products.length === 0) return null;

  const scrollable = !(edges.start && edges.end);

  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-h3 font-semibold text-rich-black">{title}</h2>
          {description ? (
            <p className="mt-1 text-small text-muted">{description}</p>
          ) : null}
        </div>
        {scrollable ? (
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <ArrowButton direction="prev" disabled={edges.start} onClick={() => scrollByPage(-1)} />
            <ArrowButton direction="next" disabled={edges.end} onClick={() => scrollByPage(1)} />
          </div>
        ) : null}
      </div>

      <ul
        ref={trackRef}
        onScroll={updateEdges}
        className="scrollbar-none -mx-gutter flex list-none snap-x snap-mandatory scroll-px-gutter gap-3 overflow-x-auto scroll-smooth px-gutter pb-2 sm:mx-0 sm:scroll-px-0 sm:gap-4 sm:px-0"
      >
        {products.map((product) => (
          <CarouselCard key={product.slug} product={product} />
        ))}
      </ul>
    </div>
  );
}
