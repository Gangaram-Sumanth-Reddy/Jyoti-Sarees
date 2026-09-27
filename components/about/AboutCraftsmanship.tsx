import { AboutImage } from "@/components/about/AboutImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/about";

export function AboutCraftsmanship() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)]">
          <AboutImage
            src={aboutContent.craftsmanship.image.src}
            alt={aboutContent.craftsmanship.image.alt}
            aspectClassName="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]"
            sizes="(min-width: 1280px) 28rem, (min-width: 1024px) 26rem, 100vw"
            objectPosition="50% 60%"
          />
          <div>
            <SectionHeading
              title={aboutContent.craftsmanship.title}
              description={aboutContent.craftsmanship.description}
              className="mb-6 sm:mb-8 lg:mb-8"
            />
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
              {aboutContent.craftsmanship.points.map((point) => (
                <li
                  key={point.title}
                  className="rounded-md border border-border bg-white px-5 py-5"
                >
                  <h3 className="text-h3">{point.title}</h3>
                  <p className="mt-2 text-small text-muted">{point.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
