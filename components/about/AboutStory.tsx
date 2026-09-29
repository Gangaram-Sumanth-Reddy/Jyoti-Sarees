import { AboutImage } from "@/components/about/AboutImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/about";

export function AboutStory() {
  return (
    <Section tone="muted">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
          <div className="max-w-2xl">
            {aboutContent.chapters.map((chapter) => (
              <section key={chapter.title} className="mt-8 first:mt-0">
                <h2 className="text-h3 text-balance">{chapter.title}</h2>
                <p className="mt-3 text-body text-muted">{chapter.body}</p>
              </section>
            ))}
          </div>
          <AboutImage
            src={aboutContent.storyImage.src}
            alt={aboutContent.storyImage.alt}
            aspectClassName="aspect-[4/3] sm:aspect-[16/10] lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:aspect-[4/5]"
            sizes="(min-width: 1280px) 28rem, (min-width: 1024px) 26rem, 100vw"
            objectPosition="50% 40%"
          />
        </div>

        <blockquote className="mx-auto mt-12 max-w-3xl border-l-2 border-navy bg-white px-5 py-5 shadow-soft sm:mt-14 sm:px-8 sm:py-6">
          <p className="text-balance text-[clamp(1.2rem,1.05rem+0.5vw,1.45rem)] font-semibold leading-snug tracking-[-0.015em] text-rich-black">
            {aboutContent.highlight}
          </p>
        </blockquote>
      </Container>
    </Section>
  );
}
