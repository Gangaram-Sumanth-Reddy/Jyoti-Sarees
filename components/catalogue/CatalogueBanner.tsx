"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { catalogueBanners } from "@/lib/catalogue-banners";

const AUTO_MS = 4500;

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
  const ctaClass = dark
    ? "border-transparent bg-white text-navy hover:bg-cream"
    : "bg-navy text-white hover:bg-navy-mid";

  return (
    <section
      className="w-full overflow-x-clip transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: slide.panel }}
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
        <div className="catalogue-banner-media overflow-hidden">
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
                style={{ backgroundColor: item.panel }}
                aria-hidden={!active}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized
                  priority={slideIndex === 0}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: item.objectPosition }}
                />
                {/* Readability: soft fade into the copy panel on phones, left-side scrim from sm up. */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/4 sm:hidden"
                  style={{
                    backgroundImage: `linear-gradient(to top, ${item.panel}, transparent)`,
                  }}
                  aria-hidden="true"
                />
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 hidden w-3/5 sm:block lg:w-1/2",
                    itemDark
                      ? "bg-gradient-to-r from-navy-deep/55 via-navy-deep/20 to-transparent"
                      : "bg-gradient-to-r from-[#f4efe7]/75 via-[#f4efe7]/30 to-transparent",
                  )}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>

        <div className="relative z-10 flex items-center pb-11 pt-4 sm:absolute sm:inset-0 sm:py-0">
          <Container>
            <div
              key={slide.id}
              className="catalogue-banner-copy max-w-[26rem] sm:max-w-[46%] lg:max-w-[29rem]"
            >
              <p
                className={cn(
                  "flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] sm:text-[0.75rem]",
                  dark ? "text-[#e3c887]" : "text-navy",
                )}
              >
                <span>{slide.eyebrow}</span>
                {slide.offer ? (
                  <>
                    <span
                      className={cn(
                        "h-3 w-px",
                        dark ? "bg-[#e3c887]/60" : "bg-navy/35",
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "font-bold",
                        dark ? "text-white" : "text-rich-black",
                      )}
                    >
                      {slide.offer}
                    </span>
                  </>
                ) : null}
              </p>
              <p
                className={cn(
                  "mt-2.5 text-balance text-[clamp(1.75rem,1.05rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] sm:mt-3",
                  dark ? "text-white" : "text-rich-black",
                )}
              >
                {slide.title}
              </p>
              <p
                className={cn(
                  "mt-2.5 max-w-[34ch] text-[0.95rem] leading-relaxed sm:mt-3 lg:text-[1.05rem]",
                  dark ? "text-white/85" : "text-rich-black/75",
                )}
              >
                {slide.subtitle}
              </p>
              {slide.cta ? (
                <div className="mt-4 sm:mt-5 lg:mt-6">
                  {slide.cta.external ? (
                    <ExternalButtonLink
                      href={slide.cta.href}
                      size="sm"
                      className={ctaClass}
                    >
                      {slide.cta.label}
                    </ExternalButtonLink>
                  ) : (
                    <ButtonLink href={slide.cta.href} size="sm" className={ctaClass}>
                      {slide.cta.label}
                    </ButtonLink>
                  )}
                </div>
              ) : null}
            </div>
          </Container>
        </div>

        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5 lg:bottom-5">
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
                  "h-1 rounded-pill transition-all duration-300",
                  active ? "w-5" : "w-1.5",
                  dark
                    ? active
                      ? "bg-white/90"
                      : "bg-white/35 hover:bg-white/60"
                    : active
                      ? "bg-navy/80"
                      : "bg-navy/20 hover:bg-navy/40",
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
