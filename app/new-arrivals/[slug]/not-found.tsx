import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function NewArrivalNotFound() {
  return (
    <Section className="pt-16 sm:pt-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
            Not found
          </p>
          <h1 className="mt-3 text-h1">Saree not found</h1>
          <p className="mt-4 text-body text-muted">
            This new arrival does not exist or may have been moved. Browse the
            latest designs or the full Sarees catalogue.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/new-arrivals"
              className="inline-flex min-h-11 items-center justify-center rounded-pill border border-transparent bg-button-primary px-6 text-button font-semibold tracking-[0.04em] text-button-primary-text transition-colors hover:bg-button-primary-hover"
            >
              View New Arrivals
            </Link>
            <Link
              href="/sarees"
              className="inline-flex min-h-11 items-center justify-center rounded-pill border border-navy bg-transparent px-6 text-button font-semibold tracking-[0.04em] text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Browse Sarees
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
