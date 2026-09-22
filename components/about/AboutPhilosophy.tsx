import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/about";

export function AboutPhilosophy() {
  return (
    <Section>
      <Container>
        <SectionHeading
          title={aboutContent.philosophy.title}
          align="center"
          className="max-w-2xl"
        />
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-3 lg:gap-6">
          {aboutContent.philosophy.points.map((point) => (
            <Card as="li" key={point.title} variant="muted" className="shadow-none">
              <h3 className="text-h3">{point.title}</h3>
              <p className="mt-3 text-body text-muted">{point.description}</p>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
