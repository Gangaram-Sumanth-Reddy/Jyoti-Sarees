"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { heroSlides } from "@/lib/hero";
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

  if (!slide) return null;

  const dark = slide.tone === "dark";
  const alignRight = slide.contentAlign === "right";

  return (
    <section
      className="relative w-full overflow-hidden bg-cream"
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

      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "min(calc(100svh - 4.75rem), calc(100vw * 941 / 1672))",
        }}
      >
        {heroSlides.map((item, slideIndex) => {
          const active = slideIndex === index;
          return (
            <div
              key={item.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-in-out",
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
                className="object-cover"
                style={{ objectPosition: item.objectPosition }}
              />
            </div>
          );
        })}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500",
            dark
              ? "bg-gradient-to-r from-navy-deep/70 via-navy-deep/25 to-transparent sm:from-navy-deep/45 sm:via-navy-deep/10"
              : alignRight
                ? "bg-gradient-to-l from-white/80 via-white/35 to-transparent sm:from-white/45 sm:via-white/10"
                : "bg-gradient-to-r from-white/80 via-white/35 to-transparent sm:from-white/40 sm:via-white/8",
          )}
          aria-hidden="true"
        />

        <Container className="relative z-10 flex h-full items-center py-8 sm:py-10">
          <div
            className={cn(
              "flex w-full",
              alignRight ? "justify-end" : "justify-start",
            )}
          >
            <div
              key={slide.id}
              className="hero-copy-in max-w-[18rem] text-left sm:max-w-md lg:max-w-lg"
            >
              <p
                className={cn(
                  "text-[0.7rem] font-semibold uppercase tracking-[0.22em] sm:text-small sm:tracking-[0.2em]",
                  dark ? "text-gold-soft" : "text-accent",
                )}
              >
                {slide.eyebrow}
              </p>

              <h1
                className={cn(
                  "mt-3 text-balance font-semibold leading-[1.12] tracking-[-0.02em]",
                  "text-[clamp(1.85rem,1.1rem+2.4vw,3.15rem)]",
                  dark ? "text-white" : "text-rich-black",
                )}
              >
                {slide.headline}{" "}
                <span className="font-normal italic tracking-[-0.01em]">
                  {slide.accent}
                </span>
              </h1>

              <p
                className={cn(
                  "mt-3 max-w-[28ch] text-[0.95rem] leading-relaxed sm:mt-4 sm:max-w-sm sm:text-body",
                  dark ? "text-white/85" : "text-muted",
                )}
              >
                {slide.subtext}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                <ButtonLink
                  href="/sarees"
                  size="lg"
                  className={
                    dark
                      ? "border-transparent bg-white text-rich-black hover:bg-cream"
                      : undefined
                  }
                >
                  Explore Sarees
                </ButtonLink>
                <ExternalButtonLink
                  href={site.whatsappUrl}
                  variant="secondary"
                  size="lg"
                  className={
                    dark
                      ? "border-white text-white hover:bg-white hover:text-rich-black"
                      : undefined
                  }
                >
                  WhatsApp Us
                </ExternalButtonLink>
              </div>
            </div>
          </div>
        </Container>

        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2 sm:bottom-5">
          {heroSlides.map((item, slideIndex) => {
            const active = slideIndex === index;
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
                  dark
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
