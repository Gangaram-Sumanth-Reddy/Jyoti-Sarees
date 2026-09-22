import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/about";

export function AboutStory() {
  return (
    <Section tone="muted">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title={aboutContent.story.title}
            align="center"
            className="max-w-2xl"
          />
          <div className="space-y-5 text-body text-muted">
            {aboutContent.story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
