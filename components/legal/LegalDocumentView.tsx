import type { LegalDocument } from "@/lib/legal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type LegalDocumentViewProps = {
  document: LegalDocument;
};

export function LegalDocumentView({ document }: LegalDocumentViewProps) {
  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container className="max-w-3xl">
        <header className="border-b border-border pb-8">
          <p className="text-small font-semibold uppercase tracking-[0.16em] text-navy">
            Legal
          </p>
          <h1 className="mt-2.5 text-balance text-[clamp(1.7rem,1.2rem+1.5vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-rich-black">
            {document.title}
          </h1>
          <p className="mt-3 text-small font-medium text-navy">
            Last updated: {document.lastUpdated}
          </p>
          <p className="mt-5 text-body leading-relaxed text-rich-black">
            {document.introduction}
          </p>
        </header>

        <div className="mt-10 space-y-9">
          {document.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-h3 font-semibold text-rich-black">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-body leading-relaxed text-rich-black">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-body leading-relaxed text-rich-black">
                  {section.bullets.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-8 text-body leading-relaxed text-rich-black">
          {document.contactNote}
        </p>
      </Container>
    </Section>
  );
}
