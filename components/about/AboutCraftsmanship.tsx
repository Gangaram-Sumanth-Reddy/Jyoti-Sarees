import type { ReactNode } from "react";
import { AboutImage } from "@/components/about/AboutImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/about";

const valueIcons: Record<string, ReactNode> = {
  Quality: (
    <path d="M6 3h12l3 6-9 12L3 9l3-6Zm-3 6h18M12 21 8.5 9 11 3m1 18 3.5-12L13 3" />
  ),
  Elegance: (
    <path d="M12 3.5 13.6 8.2 18.5 9.8 13.6 11.4 12 16.1 10.4 11.4 5.5 9.8 10.4 8.2 12 3.5Z" />
  ),
  Trust: <path d="M12 3 5 6v5.2c0 4.2 2.9 7.2 7 8.8 4.1-1.6 7-4.6 7-8.8V6L12 3Z" />,
  Tradition: <path d="M4 20h16M7 20V10.5L12 6l5 4.5V20M10 20v-4h4v4" />,
  Family: (
    <>
      <circle cx="9" cy="8" r="2.2" />
      <circle cx="15.5" cy="9" r="1.8" />
      <path d="M4.5 19.5v-1.2a3.2 3.2 0 0 1 3.2-3.2h2.6a3.2 3.2 0 0 1 3.2 3.2v1.2M13.2 19.5v-.8a2.6 2.6 0 0 1 2.6-2.6h1.2a2.6 2.6 0 0 1 2.6 2.6v.8" />
    </>
  ),
};

export function AboutValues() {
  return (
    <Section tone="muted">
      <Container>
        <div className="grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl">
            <p className="text-small font-semibold uppercase tracking-[0.16em] text-accent">
              Our promise
            </p>
            <h2 className="mt-3 text-h2 text-balance">What Jyoti Sarees stands for</h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {aboutContent.values.map((value) => (
                <li key={value.title} className="flex items-center gap-3.5 py-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-navy shadow-soft">
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
                      {valueIcons[value.title]}
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-body font-semibold text-rich-black">{value.title}</h3>
                    <p className="mt-0.5 text-small leading-snug text-muted">
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <AboutImage
            src={aboutContent.storyImage.src}
            alt={aboutContent.storyImage.alt}
            aspectClassName="aspect-[4/3] w-full max-h-[min(26rem,calc(100dvh-var(--site-header-height)-8rem))]"
            sizes="(min-width: 1024px) 42vw, 100vw"
            objectPosition="center 42%"
          />
        </div>
      </Container>
    </Section>
  );
}
