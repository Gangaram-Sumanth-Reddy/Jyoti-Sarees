import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function DussehraOffer() {
  return (
    <section className="bg-section-muted pt-4 sm:pt-6" aria-labelledby="dussehra-offer-title">
      <Container className="max-w-[90rem]">
        <h1 id="dussehra-offer-title" className="sr-only">
          Dussehra Festive Offer: buy up to ₹5,000 and get one premium saree free
        </h1>
        <a
          href="#sarees-listing"
          className="group block overflow-hidden rounded-2xl border border-border bg-cream shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:rounded-3xl"
          aria-label="Shop the Dussehra festive offer"
        >
          <Image
            src="/assets/banners/dussehra-offer.jpg"
            alt="Dussehra Festive Offer — buy up to ₹5,000 and get one premium saree free"
            width={2043}
            height={770}
            preload
            sizes="(min-width: 1440px) 88rem, 100vw"
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </a>
      </Container>
    </section>
  );
}
