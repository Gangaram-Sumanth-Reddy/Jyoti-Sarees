import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/lib/site";

export function Testimonials() {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeading
          title={copy.testimonials.title}
          description={copy.testimonials.description}
          align="center"
          className="max-w-2xl"
        />
        <div
          className="mx-auto max-w-2xl rounded-md border border-dashed border-border-strong bg-surface px-6 py-12 text-center sm:px-10"
          role="status"
        >
          <p className="text-body text-muted">
            Testimonials will be added once genuine customer feedback is ready
            to share.
          </p>
        </div>
      </Container>
    </Section>
  );
}
