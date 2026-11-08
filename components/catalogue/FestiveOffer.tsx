import { Container } from "@/components/ui/Container";
import { getActiveOffer } from "@/lib/offers";

/**
 * Single clean wish card — no image column. Greeting + offer follow the
 * festival calendar; copy and CTA stay centred.
 */
export function FestiveOffer() {
  const offer = getActiveOffer();
  if (!offer) return null;

  return (
    <section className="bg-section-muted pt-4 sm:pt-6" aria-labelledby="festive-offer-title">
      <Container className="max-w-[90rem]">
        <a
          href="#sarees-listing"
          className="group block rounded-2xl border border-border bg-white shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:rounded-3xl"
          aria-label={`${offer.wish}. ${offer.title}`}
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-6 py-9 text-center sm:px-10 sm:py-11 lg:py-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent sm:text-xs">
              {offer.eyebrow}
            </p>
            <h2
              id="festive-offer-title"
              className="mt-2.5 font-serif text-[1.85rem] font-semibold leading-tight text-rich-black sm:mt-3 sm:text-3xl lg:text-[2.35rem]"
            >
              {offer.wish}
            </h2>
            <p className="mt-2 text-sm font-medium text-navy sm:text-base">{offer.title}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">{offer.terms}</p>
            <span className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-navy px-7 text-sm font-semibold tracking-wide text-white transition-colors group-hover:bg-navy-mid">
              Shop sarees
            </span>
          </div>
        </a>
      </Container>
    </section>
  );
}
