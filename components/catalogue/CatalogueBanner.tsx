"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { catalogueBanners } from "@/lib/catalogue-banners";

const AUTO_MS = 2500;

type CatalogueBannerProps = {
  /** Screen-reader title for the carousel (defaults to Sarees). */
  label?: string;
};

export function CatalogueBanner({
  label = "Sarees — promotional highlights",
}: CatalogueBannerProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const labelId = useId();
  const slide = catalogueBanners[index] ?? catalogueBanners[0];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % catalogueBanners.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, index]);

  if (!slide) return null;

  const dark = slide.tone === "dark";

  return (
    <section
      className="w-full overflow-x-clip bg-cream"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <h1 id={labelId} className="sr-only">
        {label}
      </h1>

      <div className="catalogue-banner relative w-full overflow-hidden">
        {catalogueBanners.map((item, slideIndex) => {
          const active = slideIndex === index;
          const itemDark = item.tone === "dark";
          return (
            <div
              key={item.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={!active}
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  priority={slideIndex === 0}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: item.objectPosition ?? "50% 40%" }}
                />
              ) : (
                <div
                  className={cn(
                    "absolute inset-0",
                    itemDark
                      ? "bg-midnight-gradient"
                      : "catalogue-banner-gradient-light",
                  )}
                />
              )}
              <div
                className={cn(
                  "absolute inset-0",
                  item.src
                    ? itemDark
                      ? "bg-gradient-to-r from-navy-deep/75 via-navy-deep/45 to-navy-deep/10"
                      : "bg-gradient-to-r from-white/88 via-white/55 to-white/10"
                    : itemDark
                      ? "bg-navy-deep/20"
                      : "",
                )}
                aria-hidden="true"
              />
            </div>
          );
        })}

        <div className="relative z-10 flex h-full items-center px-gutter">
          <div className="mx-auto w-full max-w-content">
            <div
              key={slide.id}
              className="catalogue-banner-copy max-w-xl py-1"
            >
              <p
                className={cn(
                  "text-[0.68rem] font-semibold uppercase tracking-[0.2em] sm:text-small",
                  dark ? "text-white/85" : "text-navy",
                )}
              >
                {slide.eyebrow}
              </p>
              <p
                className={cn(
                  "mt-1.5 text-balance text-[clamp(1.35rem,1rem+1.4vw,2rem)] font-semibold leading-tight tracking-[-0.02em]",
                  dark ? "text-white" : "text-rich-black",
                )}
              >
                {slide.title}
              </p>
              <p
                className={cn(
                  "mt-1.5 max-w-md text-[0.9rem] leading-relaxed sm:text-body",
                  dark ? "text-white/90" : "text-muted",
                )}
              >
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5 sm:bottom-3.5">
          {catalogueBanners.map((item, slideIndex) => {
            const active = slideIndex === index;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Show banner ${slideIndex + 1} of ${catalogueBanners.length}`}
                aria-current={active ? "true" : undefined}
                onClick={() => setIndex(slideIndex)}
                className={cn(
                  "h-1.5 rounded-pill transition-all duration-300",
                  active ? "w-6" : "w-1.5",
                  dark
                    ? active
                      ? "bg-white"
                      : "bg-white/40 hover:bg-white/65"
                    : active
                      ? "bg-navy"
                      : "bg-navy/25 hover:bg-navy/45",
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
