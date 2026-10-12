import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function DussehraOffer() {
  return (
    <section className="bg-section-muted pt-4 sm:pt-6" aria-labelledby="dussehra-offer-title">
      <Container className="max-w-[90rem]">
        <div className="dussehra-banner overflow-hidden rounded-2xl px-5 py-6 text-center sm:rounded-3xl sm:px-8 sm:py-7">
          <div className="relative z-10 mx-auto flex w-full max-w-[34rem] flex-col items-center">
            <span className="dussehra-mark" aria-hidden="true">
              <span />
            </span>
            <h1
              id="dussehra-offer-title"
              className="text-[clamp(1.45rem,1.1rem+1vw,2rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
            >
              Happy Dussehra!
            </h1>
            <p className="mt-1.5 max-w-[28ch] text-[0.95rem] leading-snug sm:text-[1.02rem]">
              Celebrate with timeless sarees
            </p>
            <p className="dussehra-offer mt-2 text-[0.78rem] font-bold uppercase leading-snug tracking-[0.05em] sm:text-[0.88rem]">
              Shop for ₹5,000 and get 1 saree free!
            </p>
            <ButtonLink href="#sarees-listing" size="sm" className="dussehra-cta mt-3.5">
              Explore Sarees
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
