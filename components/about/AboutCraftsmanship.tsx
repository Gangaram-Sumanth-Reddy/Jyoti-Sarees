import type { ReactNode } from "react";
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
  Trust: (
    <path d="M12 3 5 6v5.2c0 4.2 2.9 7.2 7 8.8 4.1-1.6 7-4.6 7-8.8V6L12 3Z" />
  ),
  Love: <path d="M12 19s-6.2-3.9-6.2-8.1A3.4 3.4 0 0 1 12 8.6a3.4 3.4 0 0 1 6.2 2.3C18.2 15.1 12 19 12 19Z" />,
};

export function AboutValues() {
  return (
    <Section>
      <Container>
        <h2 className="sr-only">What Jyoti Sarees stands for</h2>
        <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.values.map((value) => (
            <li
              key={value.title}
              className="flex gap-3 rounded-lg border border-border bg-white p-4 shadow-soft sm:flex-col sm:p-5"
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
                  {valueIcons[value.title]}
                </svg>
              </span>
              <div className="sm:mt-3">
                <h3 className="text-body font-semibold text-rich-black">{value.title}</h3>
                <p className="mt-1 text-small leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
