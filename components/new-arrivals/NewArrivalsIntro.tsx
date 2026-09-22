import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function NewArrivalsIntro() {
  return (
    <Section tone="muted" className="py-8 sm:py-10">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-small font-semibold uppercase tracking-[0.16em] text-accent">
            Freshly Curated
          </p>
          <p className="mt-3 text-body text-muted">
            The newest additions to our collection—selected for colour, craft and
            occasion-ready elegance.
          </p>
        </div>
      </Container>
    </Section>
  );
}
