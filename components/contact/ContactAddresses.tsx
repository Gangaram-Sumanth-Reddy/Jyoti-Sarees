import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactAddresses } from "@/lib/contact";

export function ContactAddresses() {
  return (
    <Section tone="muted">
      <Container className="max-w-[84rem]">
        <SectionHeading
          eyebrow="Address"
          title="Visit Our Stores"
          align="center"
          className="max-w-2xl"
        />
        <ul className="mx-auto grid max-w-4xl list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5">
          {contactAddresses.map((store) => (
            <li
              key={store.id}
              className="flex min-w-0 items-start gap-4 rounded-lg border border-border bg-white p-5 shadow-soft sm:p-6"
            >
              <span
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-navy text-white"
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="text-body font-semibold text-navy">{store.label}</p>
                {store.lines.map((line) => (
                  <p key={line} className="mt-1 text-small leading-relaxed text-muted">
                    {line}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
