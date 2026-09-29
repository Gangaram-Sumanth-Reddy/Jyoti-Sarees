import { AboutImage } from "@/components/about/AboutImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/about";

export function AboutHero() {
  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl">
            <p className="text-small font-semibold uppercase tracking-[0.16em] text-accent">
              {aboutContent.hero.eyebrow}
            </p>
            <h1 className="mt-3 text-h1 text-balance">{aboutContent.hero.title}</h1>
            <p className="mt-4 text-body text-muted sm:mt-5">
              {aboutContent.hero.description}
            </p>
            <p className="mt-6 text-body font-semibold text-navy">
              {aboutContent.hero.founder}
            </p>
          </div>
          <AboutImage
            src={aboutContent.hero.image.src}
            alt={aboutContent.hero.image.alt}
            aspectClassName="aspect-[4/3] lg:max-h-[calc(100dvh-var(--site-header-height)-7rem)]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            objectPosition="50% 25%"
            preload
          />
        </div>
      </Container>
    </Section>
  );
}
