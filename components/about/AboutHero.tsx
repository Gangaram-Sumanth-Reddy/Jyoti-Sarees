import { AboutImage } from "@/components/about/AboutImage";
import { FounderStory } from "@/components/about/FounderStory";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/about";

export function AboutHero() {
  return (
    <Section className="flex items-center !py-8 sm:!py-10 lg:h-[calc(100dvh-var(--site-header-height))] lg:overflow-hidden lg:!py-8">
      <Container className="w-full">
        <div className="grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <p className="text-small font-semibold uppercase tracking-[0.16em] text-accent">
              {aboutContent.hero.eyebrow}
            </p>
            <h1 className="mt-3 text-h1 text-balance">{aboutContent.hero.title}</h1>
            <p className="mt-4 max-w-md text-body leading-relaxed text-muted sm:mt-5">
              “{aboutContent.hero.description}”
            </p>
            <FounderStory />
          </div>
          <AboutImage
            src={aboutContent.hero.portrait.src}
            alt={aboutContent.hero.portrait.alt}
            aspectClassName="aspect-[3/2] w-full lg:max-h-[calc(100dvh-var(--site-header-height)-6rem)]"
            sizes="(min-width: 1024px) 46vw, 100vw"
            objectPosition="center 40%"
            preload
          />
        </div>
      </Container>
    </Section>
  );
}
