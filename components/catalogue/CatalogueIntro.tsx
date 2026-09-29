import { Container } from "@/components/ui/Container";

/** Visible page heading for /sarees. */
export function CatalogueIntro() {
  return (
    <section className="bg-section-muted pt-6 sm:pt-8" aria-labelledby="sarees-heading">
      <Container className="max-w-[90rem]">
        <div className="max-w-2xl">
          <h1
            id="sarees-heading"
            className="text-balance text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-rich-black"
          >
            Sarees
          </h1>
          <p className="mt-2 text-body text-muted">
            Silk, brocade and designer sarees for weddings, festivals and
            everyday elegance. Filter by fabric, colour or price, then enquire
            on WhatsApp about any piece.
          </p>
        </div>
      </Container>
    </section>
  );
}
