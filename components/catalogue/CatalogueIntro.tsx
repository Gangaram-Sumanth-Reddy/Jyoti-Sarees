import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { collectionHref, type Collection } from "@/lib/collections";

type CatalogueIntroProps = {
  collections: Collection[];
};

/** Visible page heading for /sarees with links to each category page. */
export function CatalogueIntro({ collections }: CatalogueIntroProps) {
  return (
    <section className="bg-section-muted pt-6 sm:pt-8" aria-labelledby="sarees-heading">
      <Container className="max-w-[90rem]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
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
          <nav aria-label="Saree categories" className="min-w-0">
            <ul className="flex list-none flex-wrap gap-2 p-0 lg:justify-end">
              {collections.map((collection) => (
                <li key={collection.slug}>
                  <Link
                    href={collectionHref(collection.slug)}
                    className="inline-flex min-h-9 items-center rounded-pill border border-border bg-white px-3.5 text-small font-semibold text-navy transition-colors hover:border-navy hover:text-accent"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
