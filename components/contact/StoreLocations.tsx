import { ExternalButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactCopy, stores } from "@/lib/contact";

export function StoreLocations() {
  return (
    <Section id="stores" tone="muted">
      <Container>
        <SectionHeading
          title={contactCopy.stores.title}
          description={contactCopy.stores.description}
          align="center"
          className="max-w-2xl"
        />
        <ul className="grid list-none gap-6 p-0 lg:grid-cols-2 lg:gap-8">
          {stores.map((store) => (
            <Card as="li" key={store.id} className="flex flex-col overflow-hidden p-0">
              <div className="aspect-[16/10] w-full overflow-hidden bg-cream">
                <iframe
                  title={`Map for ${store.name}`}
                  src={store.mapEmbedUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-small font-semibold uppercase tracking-[0.12em] text-accent">
                    {store.city}
                  </p>
                  <h3 className="mt-2 text-h3">{store.name}</h3>
                </div>
                <address className="space-y-2 text-body not-italic text-muted">
                  <p>{store.address}</p>
                  <p>
                    <a
                      href={store.phoneHref}
                      className="font-semibold text-rich-black transition-colors hover:text-accent"
                    >
                      {store.phone}
                    </a>
                  </p>
                  <p>{store.hours}</p>
                </address>
                <div className="mt-auto pt-2">
                  <ExternalButtonLink href={store.directionsUrl} size="sm">
                    Get Directions
                  </ExternalButtonLink>
                </div>
              </div>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
