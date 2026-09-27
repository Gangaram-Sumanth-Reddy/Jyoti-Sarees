import type { ReactNode } from "react";
import { AboutImage } from "@/components/about/AboutImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/about";

const philosophyIcons: Record<string, ReactNode> = {
  Tradition: (
    <path d="M12 3c-2.5 3-4 5.3-4 7.5a4 4 0 0 0 8 0C16 8.3 14.5 6 12 3ZM6 21h12M9 21v-3.5M15 21v-3.5M8 17.5h8" />
  ),
  Quality: (
    <path d="M6 3h12l3 6-9 12L3 9l3-6Zm-3 6h18M12 21 8.5 9 11 3m1 18 3.5-12L13 3" />
  ),
  Elegance: (
    <path d="M11 3.5 12.9 9l5.6 1.9-5.6 1.9L11 18.4l-1.9-5.6-5.6-1.9L9.1 9 11 3.5ZM18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
  ),
};

export function AboutHero() {
  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="text-h1 text-balance">{aboutContent.hero.title}</h1>
            <p className="mt-4 max-w-[40ch] text-body text-muted sm:mt-5 lg:text-[1.125rem]">
              {aboutContent.hero.description}
            </p>

            <h2 className="mt-8 text-small font-semibold uppercase tracking-[0.16em] text-accent sm:mt-10">
              {aboutContent.philosophy.title}
            </h2>
            <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-3">
              {aboutContent.philosophy.points.map((point) => (
                <li
                  key={point.title}
                  className="flex gap-3 rounded-lg border border-border bg-white p-4 shadow-soft sm:flex-col sm:gap-0"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy/[0.07] text-navy">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {philosophyIcons[point.title]}
                    </svg>
                  </span>
                  <div className="sm:mt-3">
                    <h3 className="text-body font-semibold text-rich-black">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-small leading-relaxed text-muted">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <AboutImage
            src={aboutContent.hero.image.src}
            alt={aboutContent.hero.image.alt}
            aspectClassName="aspect-[4/3] lg:max-h-[calc(100dvh-var(--site-header-height)-7rem)]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            objectPosition="50% 25%"
            preload
          />
        </div>
      </Container>
    </Section>
  );
}
