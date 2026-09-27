"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { copy, site } from "@/lib/site";

const SLIDE_MS = 3000;

type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  offer?: string;
  image: string;
  alt: string;
  objectPosition: string;
  softTopFade?: boolean;
  notesOnRight?: boolean;
  /** On desktop the photo fills the whole card and the copy sits over its empty wall. */
  fullBleed?: {
    objectPosition: string;
    contentClassName: string;
    scrimClassName?: string;
  };
};

const slides: readonly HeroSlide[] = [
  {
    id: "timeless",
    eyebrow: "New Collection 2026",
    title: copy.hero.title,
    description:
      "Handpicked silks and heritage weaves, from everyday drapes to wedding grandeur.",
    image: "/assets/H1.png",
    alt: "Model in an ivory silk saree with a royal blue and gold zari border",
    objectPosition: "100% 70%",
  },
  {
    id: "craftsmanship",
    eyebrow: "Timeless Craftsmanship",
    title: "Elegance Woven with Quality.",
    description:
      "Thoughtfully selected sarees crafted with beautiful fabrics, refined details and timeless appeal.",
    image: "/assets/H2.png",
    alt: "Model in a soft peach checked saree with a scalloped gold border",
    objectPosition: "0% 50%",
    softTopFade: true,
    notesOnRight: true,
    fullBleed: {
      objectPosition: "50% 0%",
      contentClassName: "left-[52%] w-[33%]",
    },
  },
  {
    id: "offer",
    eyebrow: "Special Offer",
    title: "Celebrate in Style.",
    description:
      "Explore our latest saree collection and discover special offers for the season.",
    offer: "Up to 20% Off",
    image: "/assets/H3.png",
    alt: "Model seated in a royal blue saree with silver motifs and border",
    objectPosition: "16% 50%",
    softTopFade: true,
    notesOnRight: true,
    fullBleed: {
      objectPosition: "50% 40%",
      contentClassName: "left-[52%] right-[6%]",
      scrimClassName:
        "bg-linear-to-l from-white/35 via-white/15 to-transparent",
    },
  },
];

function SilkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6c2.7 0 2.7 2 5.3 2S12 6 14.7 6 17.3 8 20 8M4 12c2.7 0 2.7 2 5.3 2S12 12 14.7 12s2.6 2 5.3 2M4 18c2.7 0 2.7 2 5.3 2S12 18 14.7 18s2.6 2 5.3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 11.5a7.5 7.5 0 0 1-11.1 6.6L4.5 19.5l1.4-4.2A7.5 7.5 0 1 1 20 11.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FloatingNote({
  icon,
  title,
  detail,
  className,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
  className?: string;
}) {
  return (
    <div
      className={`hero-float-note flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 py-2.5 pl-2.5 pr-4 ${className ?? ""}`}
    >
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-small font-semibold leading-tight text-rich-black">
          {title}
        </span>
        <span className="mt-0.5 block text-[0.75rem] leading-tight text-navy/75">
          {detail}
        </span>
      </span>
    </div>
  );
}

function SlideCopy({ slide, isMain }: { slide: HeroSlide; isMain: boolean }) {
  const Title = isMain ? "h1" : "h2";
  return (
    <>
      <p className="text-small font-semibold uppercase tracking-[0.2em] text-navy">
        {slide.eyebrow}
      </p>
      <Title className="mt-4 max-w-[15ch] text-balance text-[clamp(2.1rem,1.3rem+2.6vw,3.6rem)] font-semibold max-sm:mt-3 max-sm:text-[clamp(1.875rem,1.1rem+3.6vw,2.25rem)] leading-[1.08] tracking-[-0.02em] text-rich-black">
        {slide.title}
      </Title>
      {slide.offer ? (
        <p className="mt-4 inline-flex items-center rounded-pill bg-navy px-3.5 py-1.5 text-small font-semibold uppercase tracking-[0.12em] text-white">
          {slide.offer}
        </p>
      ) : null}
      <p className="mt-5 max-w-[42ch] text-body leading-relaxed text-rich-black/75 max-sm:mt-3.5">
        {slide.description}
      </p>
    </>
  );
}

function HeroActions({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mt-8 flex gap-3 max-sm:mt-6 max-sm:grid max-sm:grid-cols-2 max-sm:gap-[clamp(0.5rem,0.2rem+1.2vw,0.75rem)]",
        className,
      )}
    >
      <ButtonLink
        href="/sarees"
        size="lg"
        className="bg-navy hover:bg-navy-mid max-sm:min-w-0 max-sm:px-[clamp(0.5rem,0.1rem+1.6vw,1rem)] max-sm:text-[clamp(0.78rem,0.62rem+0.8vw,0.9375rem)] max-sm:tracking-[0.02em]"
      >
        Explore Sarees
      </ButtonLink>
      <ExternalButtonLink
        href={site.whatsappUrl}
        variant="secondary"
        size="lg"
        className="bg-white/60 max-sm:min-w-0 max-sm:px-[clamp(0.5rem,0.1rem+1.6vw,1rem)] max-sm:text-[clamp(0.78rem,0.62rem+0.8vw,0.9375rem)] max-sm:tracking-[0.02em]"
      >
        WhatsApp Us
      </ExternalButtonLink>
    </div>
  );
}

function SlideDots({
  active,
  onSelect,
  className,
}: {
  active: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {slides.map((slide, index) => {
        const isActive = index === active;
        return (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show slide ${index + 1} of ${slides.length}`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelect(index)}
            className="group inline-flex h-6 items-center px-1"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all duration-500 ease-out",
                isActive
                  ? "w-7 bg-navy"
                  : "w-2 bg-navy/25 group-hover:bg-navy/45",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const fullBleedActive = Boolean(slides[active]?.fullBleed);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(
      () => setActive((current) => (current + 1) % slides.length),
      SLIDE_MS,
    );
    return () => window.clearTimeout(id);
  }, [active, paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured sarees"
      className="bg-white pb-10 pt-5 sm:pb-14 sm:pt-7 lg:pb-16 lg:pt-8"
    >
      <Container>
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Stacked sheet behind the card gives the floating, layered depth. */}
          <div
            className="hero-card-sheet absolute inset-x-6 -bottom-3 top-6 rounded-[2rem] sm:inset-x-10 sm:-bottom-4 lg:rounded-[2.5rem]"
            aria-hidden="true"
          />

          <div className="hero-card relative grid overflow-hidden rounded-[1.75rem] lg:min-h-[36rem] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:rounded-[2.5rem] xl:min-h-[38rem]">
            <div className="relative z-10 flex flex-col justify-center px-5 pb-2 pt-8 min-[400px]:px-6 sm:px-10 sm:pb-4 sm:pt-12 lg:py-16 lg:pl-14 lg:pr-4 xl:pl-16">
              <div className="grid">
                {slides.map((slide, index) => {
                  const isActive = index === active;
                  return (
                    <div
                      key={slide.id}
                      aria-hidden={!isActive}
                      className={cn(
                        "col-start-1 row-start-1 self-end transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
                        slide.fullBleed && "lg:hidden",
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-2 opacity-0",
                      )}
                    >
                      <SlideCopy slide={slide} isMain={index === 0} />
                    </div>
                  );
                })}
              </div>
              <div
                className={cn(
                  "transition-opacity duration-700 ease-out motion-reduce:transition-none",
                  fullBleedActive && "lg:pointer-events-none lg:opacity-0",
                )}
              >
                <HeroActions />
                <SlideDots
                  active={active}
                  onSelect={setActive}
                  className="mt-7 justify-center lg:hidden"
                />
              </div>
            </div>

            <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[28rem] lg:min-h-0">
              {slides.map((slide, index) => {
                const isActive = index === active;
                return (
                  <div
                    key={slide.id}
                    aria-hidden={!isActive}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none",
                      isActive ? "z-[1] opacity-100" : "pointer-events-none opacity-0",
                    )}
                  >
                    <div
                      className={cn(
                        "hero-card-image absolute inset-0",
                        slide.softTopFade && "hero-card-image-soft-top",
                      )}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        preload={index === 0}
                        quality={90}
                        sizes="(min-width: 1024px) 1080px, (min-width: 640px) 125vw, 225vw"
                        style={{ objectPosition: slide.objectPosition }}
                        className="object-cover"
                      />
                    </div>

                    <FloatingNote
                      icon={<SilkIcon />}
                      title="Pure silk & zari weaves"
                      detail="Kanchipuram · Banarasi · Soft Silk"
                      className={cn(
                        "absolute bottom-5 z-10 hidden sm:bottom-8 sm:flex lg:bottom-16",
                        slide.notesOnRight
                          ? "right-4 sm:right-8 lg:right-10"
                          : "left-4 sm:left-8 lg:-left-8",
                      )}
                    />
                    <FloatingNote
                      icon={<ChatIcon />}
                      title="Personal assistance"
                      detail="Reserve your saree on WhatsApp"
                      className={cn(
                        "absolute top-[12%] z-10 hidden md:flex",
                        slide.notesOnRight ? "right-[6%]" : "left-[8%]",
                      )}
                    />
                  </div>
                );
              })}
            </div>

            {slides.map((slide, index) => {
              if (!slide.fullBleed) return null;
              const isActive = index === active;
              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  className={cn(
                    "absolute inset-0 z-20 hidden transition-opacity duration-1000 ease-in-out motion-reduce:transition-none lg:block",
                    isActive ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    quality={90}
                    sizes="(min-width: 1440px) 1320px, 92vw"
                    style={{ objectPosition: slide.fullBleed.objectPosition }}
                    className="object-cover"
                  />
                  {slide.fullBleed.scrimClassName ? (
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-0 right-0 w-1/2",
                        slide.fullBleed.scrimClassName,
                      )}
                    />
                  ) : null}
                  <div
                    className={cn(
                      "absolute inset-y-0 flex flex-col justify-center py-16",
                      slide.fullBleed.contentClassName,
                    )}
                  >
                    <div
                      className={cn(
                        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
                        isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                      )}
                    >
                      <SlideCopy slide={slide} isMain={false} />
                      <HeroActions />
                    </div>
                  </div>
                </div>
              );
            })}

            <SlideDots
              active={active}
              onSelect={setActive}
              className="absolute inset-x-0 bottom-4 z-30 hidden justify-center lg:flex"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
