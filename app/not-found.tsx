import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { indexableCollections, collectionHref } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section className="pt-16 sm:pt-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
            404
          </p>
          <h1 className="mt-3 text-h1">Page not found</h1>
          <p className="mt-4 text-body text-muted">
            The page you are looking for does not exist or may have moved.
            Browse our sarees or head back to the homepage.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/sarees"
              className="inline-flex min-h-11 items-center justify-center rounded-pill border border-transparent bg-button-primary px-6 text-button font-semibold tracking-[0.04em] text-button-primary-text transition-colors hover:bg-button-primary-hover"
            >
              Browse Sarees
            </Link>
            <Link
              href="/new-arrivals"
              className="inline-flex min-h-11 items-center justify-center rounded-pill border border-navy bg-transparent px-6 text-button font-semibold tracking-[0.04em] text-navy transition-colors hover:bg-navy hover:text-white"
            >
              New Arrivals
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center px-4 text-button font-semibold text-navy hover:text-accent"
            >
              Home
            </Link>
          </div>
          <nav aria-label="Popular collections" className="mt-10">
            <ul className="flex list-none flex-wrap justify-center gap-2 p-0">
              {indexableCollections.slice(0, 6).map((collection) => (
                <li key={collection.slug}>
                  <Link
                    href={collectionHref(collection.slug)}
                    className="inline-flex min-h-9 items-center rounded-pill border border-border bg-white px-3.5 text-small font-semibold text-navy transition-colors hover:border-navy"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </Section>
  );
}
