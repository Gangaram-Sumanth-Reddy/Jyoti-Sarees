import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type NewArrivalsHeroProps = {
  /** Number of sarees currently listed as new arrivals. */
  count: number;
};

export function NewArrivalsHero({ count }: NewArrivalsHeroProps) {
  return (
    <Section className="pb-8 pt-8 sm:pb-10 sm:pt-10 lg:pb-12 lg:pt-12">
      <Container>
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.6fr)] lg:gap-12">
          <div className="max-w-xl">
            <p className="text-small font-semibold uppercase tracking-[0.16em] text-accent">
              Just Arrived
            </p>
            <h1 className="mt-3 text-h1 text-balance">New Arrivals</h1>
            <p className="mt-3 max-w-[38ch] text-body text-muted sm:mt-4">
              Discover the latest sarees added to the Jyoti Sarees collection.
            </p>
            <p className="mt-5 inline-flex items-center gap-2.5 text-small font-semibold text-navy sm:mt-6">
              <span className="size-1.5 rounded-full bg-navy" aria-hidden="true" />
              {count} new {count === 1 ? "saree" : "sarees"} in the collection
            </p>
          </div>
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-cream shadow-soft sm:aspect-[5/2]">
            <Image
              src="/assets/New%20arrivals.png"
              alt="Three models in lilac, coral and aqua sarees seated in a sunlit room beneath a New Arrivals title"
              fill
              preload
              sizes="(min-width: 1024px) 64vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
