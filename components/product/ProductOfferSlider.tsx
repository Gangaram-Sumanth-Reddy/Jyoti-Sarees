"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type TransitionEvent } from "react";
import { PriceOffer } from "@/components/ui/PriceOffer";
import { cn } from "@/lib/cn";
import type { StoreOffer } from "@/lib/offers";

export type OfferSlide = {
  slug: string;
  name: string;
  href: string;
  photo?: string;
  sellingPrice: number;
  originalPrice?: number;
  priceLabel: string;
};

const INTERVAL_MS = 4000;

type ProductOfferSliderProps = {
  offer: StoreOffer;
  slides: OfferSlide[];
};

export function ProductOfferSlider({ offer, slides }: ProductOfferSliderProps) {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const multiple = slides.length > 1;
  /* A copy of the first slide sits at the end so the loop always moves left. */
  const track = multiple ? [...slides, slides[0]] : slides;

  useEffect(() => {
    if (!multiple || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((current) => Math.min(current + 1, slides.length)),
      INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [multiple, paused, slides.length]);

  useEffect(() => {
    if (animate) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [animate]);

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || active !== slides.length) return;
    setAnimate(false);
    setActive(0);
  }

  return (
    <aside
      aria-label={offer.title}
      aria-roledescription={multiple ? "carousel" : undefined}
      className="relative mb-5 overflow-hidden rounded-lg border border-border bg-section-muted transition-colors hover:border-navy/35"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={cn(
          "flex",
          animate && "transition-transform duration-500 ease-out motion-reduce:transition-none",
        )}
        style={{ transform: `translateX(-${active * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {track.map((slide, index) => {
          const current = index === active;
          return (
            <Link
              key={index === slides.length ? `${slide.slug}-loop` : slide.slug}
              href={slide.href}
              inert={!current}
              aria-hidden={!current}
              aria-roledescription={multiple ? "slide" : undefined}
              aria-label={`${offer.title}: ${slide.name}`}
              className="group flex w-full shrink-0 items-center gap-3 p-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:gap-3.5 sm:p-2.5"
            >
              <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-white shadow-soft sm:h-[4.5rem] sm:w-[3.375rem]">
                {slide.photo ? (
                  <Image
                    src={slide.photo}
                    alt=""
                    fill
                    sizes="54px"
                    className="object-cover object-top"
                  />
                ) : null}
              </span>

              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-accent">
                  {offer.title}
                </span>
                <span className="line-clamp-2 text-[0.75rem] font-medium leading-snug text-rich-black">
                  {offer.terms}
                </span>
                <span className="truncate text-[0.75rem] text-muted group-hover:text-accent">
                  {slide.name}
                </span>
                <PriceOffer
                  sellingPrice={slide.sellingPrice}
                  originalPrice={slide.originalPrice}
                  sellingLabel={slide.priceLabel}
                />
              </span>

              <span className="shrink-0 self-start rounded-md bg-navy/10 px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-navy">
                {offer.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
