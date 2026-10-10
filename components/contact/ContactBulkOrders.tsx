import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bulkOrders } from "@/lib/contact";

export function ContactBulkOrders() {
  return (
    <Section
      id="bulk-enquiry"
      className="scroll-mt-[calc(var(--site-header-height)+1rem)] !pt-0"
    >
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Wholesale"
          title="Bulk orders"
          description={`Minimum quantity: ${bulkOrders.minimum}.`}
          align="center"
        />
        <ul className="mx-auto flex list-none flex-wrap justify-center gap-3 p-0">
          {bulkOrders.types.map((type) => (
            <li
              key={type}
              className="rounded-full border border-border bg-white px-4 py-2.5 text-small font-semibold text-navy shadow-soft"
            >
              {type}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
