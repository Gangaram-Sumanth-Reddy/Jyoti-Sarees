"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { heroSlides } from "@/lib/hero";
import { setHeroNavTone } from "@/lib/hero-nav-tone";
import { site } from "@/lib/site";

const AUTO_MS = 3000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const labelId = useId();
  const slide = heroSlides[index] ?? heroSlides[0];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, index]);

  useEffect(() => {
    if (!slide) return;
    setHeroNavTone(slide.tone);
    return () => setHeroNavTone("light");
  }, [slide]);

  if (!slide) return null;

  const dark = slide.tone === "dark";

  return (
    <section
      className="relative -mt-[var(--site-header-height)] w-full max-w-full overflow-x-clip bg-cream"
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
      <h2 id={labelId} className="sr-only">
        Featured sarees
      </h2>

      <div className="hero-stage hero-stage--viewport relative w-full max-w-full overflow-hidden">
        {heroSlides.map((item, slideIndex) => {
          const active = slideIndex === index;
          return (
            <div
              key={item.id}
              data-slide={item.id}
              data-tone={item.tone}
              className={cn(
                "hero-slide absolute inset-0 transition-opacity duration-700 ease-in-out",
                active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={!active}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={slideIndex === 0}
                sizes="100vw"
                className="hero-slide-image"
              />
            </div>
          );
        })}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-700",
            dark
              ? "bg-gradient-to-r from-navy-deep/55 via-navy-deep/15 to-transparent sm:from-navy-deep/40 sm:via-navy-deep/8"
              : "bg-gradient-to-r from-white/75 via-white/25 to-transparent sm:from-white/35 sm:via-white/6",
          )}
          aria-hidden="true"
        />

        <div className="hero-copy relative z-10 flex h-full items-center px-gutter pb-12 pt-[calc(var(--site-header-height)+1.25rem)] sm:pb-14 sm:pt-[calc(var(--site-header-height)+1.5rem)]">
          <div className="mx-auto flex w-full max-w-content justify-start">
            <div
              key={slide.id}
              className="hero-copy-in max-w-[18rem] text-left sm:max-w-md lg:max-w-lg"
            >
              <p
                className={cn(
                  "text-[0.7rem] font-semibold uppercase tracking-[0.22em] sm:text-small sm:tracking-[0.2em]",
                  dark ? "text-white/85" : "text-navy",
                )}
              >
                {slide.eyebrow}
              </p>

              <h1
                className={cn(
                  "mt-3 text-balance font-semibold leading-[1.1] tracking-[-0.02em]",
                  "text-[clamp(2rem,1.15rem+2.85vw,3.45rem)]",
                  dark ? "text-white" : "text-rich-black",
                )}
              >
                {slide.headline}{" "}
                <span className="hero-accent-word">{slide.accent}</span>
              </h1>

              <p
                className={cn(
                  "mt-3 max-w-[28ch] text-[0.95rem] leading-relaxed sm:mt-4 sm:max-w-sm sm:text-body",
                  dark ? "text-white/90" : "text-muted",
                )}
              >
                {slide.subtext}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                <ButtonLink
                  href={slide.primaryCta.href}
                  size="lg"
                  className={
                    dark
                      ? "border-transparent bg-white text-rich-black hover:bg-white/90"
                      : "bg-navy hover:bg-navy-mid"
                  }
                >
                  {slide.primaryCta.label}
                </ButtonLink>
                {slide.showWhatsApp ? (
                  <ExternalButtonLink
                    href={site.whatsappUrl}
                    variant="secondary"
                    size="lg"
                    className={
                      dark
                        ? "border-white text-white hover:border-white hover:bg-white hover:text-rich-black"
                        : "border-navy text-navy hover:bg-navy hover:text-white"
                    }
                  >
                    WhatsApp Us
                  </ExternalButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2 sm:bottom-5">
          {heroSlides.map((item, slideIndex) => {
            const active = slideIndex === index;
            const slideDark = item.tone === "dark";
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Show slide ${slideIndex + 1} of ${heroSlides.length}`}
                aria-current={active ? "true" : undefined}
                onClick={() => setIndex(slideIndex)}
                className={cn(
                  "h-1.5 rounded-pill transition-all duration-300",
                  active ? "w-7" : "w-1.5",
                  slideDark
                    ? active
                      ? "bg-white"
                      : "bg-white/45 hover:bg-white/70"
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
