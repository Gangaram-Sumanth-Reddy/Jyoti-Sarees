import type { ReactNode } from "react";
import Image from "next/image";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { copy, site } from "@/lib/site";

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

export function Hero() {
  return (
    <section className="bg-white pb-10 pt-5 sm:pb-14 sm:pt-7 lg:pb-16 lg:pt-8">
      <Container>
        <div className="relative">
          {/* Stacked sheet behind the card gives the floating, layered depth. */}
          <div
            className="hero-card-sheet absolute inset-x-6 -bottom-3 top-6 rounded-[2rem] sm:inset-x-10 sm:-bottom-4 lg:rounded-[2.5rem]"
            aria-hidden="true"
          />

          <div className="hero-card relative grid overflow-hidden rounded-[1.75rem] lg:min-h-[36rem] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:rounded-[2.5rem] xl:min-h-[38rem]">
            <div className="relative z-10 flex flex-col justify-center px-6 pb-4 pt-9 sm:px-10 sm:pt-12 lg:py-16 lg:pl-14 lg:pr-4 xl:pl-16">
              <p className="text-small font-semibold uppercase tracking-[0.2em] text-navy">
                New Collection 2026
              </p>
              <h1 className="mt-4 max-w-[15ch] text-balance text-[clamp(2.1rem,1.3rem+2.6vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-rich-black">
                {copy.hero.title}
              </h1>
              <p className="mt-5 max-w-[42ch] text-body leading-relaxed text-rich-black/75">
                Handpicked silks and heritage weaves, from everyday drapes to
                wedding grandeur.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/sarees"
                  size="lg"
                  className="bg-navy hover:bg-navy-mid"
                >
                  Explore Sarees
                </ButtonLink>
                <ExternalButtonLink
                  href={site.whatsappUrl}
                  variant="secondary"
                  size="lg"
                  className="bg-white/60"
                >
                  WhatsApp Us
                </ExternalButtonLink>
              </div>
            </div>

            <div className="relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-0">
              <div className="hero-card-image absolute inset-0">
                <Image
                  src="/assets/H1.png"
                  alt="Model in an ivory silk saree with a royal blue and gold zari border"
                  fill
                  priority
                  quality={90}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-[100%_70%]"
                />
              </div>

              <FloatingNote
                icon={<SilkIcon />}
                title="Pure silk & zari weaves"
                detail="Kanchipuram · Banarasi · Soft Silk"
                className="absolute bottom-5 left-4 z-10 sm:bottom-8 sm:left-8 lg:-left-8 lg:bottom-12"
              />
              <FloatingNote
                icon={<ChatIcon />}
                title="Personal assistance"
                detail="Reserve your saree on WhatsApp"
                className="absolute left-[8%] top-[12%] z-10 hidden md:flex"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
