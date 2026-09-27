import { AboutImage } from "@/components/about/AboutImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/about";

export function AboutStory() {
  return (
    <Section tone="muted">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
          <div className="max-w-2xl">
            <SectionHeading
              title={aboutContent.story.title}
              className="mb-6 sm:mb-8 lg:mb-8"
            />
            <div className="space-y-5 text-body text-muted">
              {aboutContent.story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <AboutImage
            src={aboutContent.story.image.src}
            alt={aboutContent.story.image.alt}
            aspectClassName="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]"
            sizes="(min-width: 1280px) 28rem, (min-width: 1024px) 26rem, 100vw"
            objectPosition="50% 45%"
          />
        </div>
      </Container>
    </Section>
  );
}
