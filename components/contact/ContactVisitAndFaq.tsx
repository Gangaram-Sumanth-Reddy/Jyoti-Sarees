import { ContactStoreList } from "@/components/contact/ContactAddresses";
import { ContactFaqList } from "@/components/contact/ContactFaq";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

/** Store addresses beside the FAQ on desktop; stacked on smaller screens. */
export function ContactVisitAndFaq() {
  return (
    <Section tone="muted">
      <Container className="max-w-[84rem]">
        <SectionHeading
          eyebrow="Visit & Help"
          title="Visit Our Stores & Get Quick Answers"
          description={`Drop by our stores in ${site.cities.replace(", ", " and ")}, open ${site.hours.opens} – ${site.hours.closes}, or find answers to common questions about buying, store visits and bulk orders.`}
          align="center"
          className="!max-w-4xl lg:[&>h2]:whitespace-nowrap"
        />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch lg:gap-12 xl:gap-16">
          <section aria-label="Our stores" className="min-w-0">
            <ContactStoreList />
          </section>
          <section aria-label="Frequently asked questions" className="min-w-0">
            <ContactFaqList />
          </section>
        </div>
      </Container>
    </Section>
  );
}
