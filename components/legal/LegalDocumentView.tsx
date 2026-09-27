import { Fragment } from "react";
import type { LegalDocument, LegalSection } from "@/lib/legal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { pendingPattern } from "@/lib/privacy-config";

type LegalDocumentViewProps = {
  document: LegalDocument;
};

/** Renders text, visibly flagging config values the business has not confirmed yet. */
function RichText({ text }: { text: string }) {
  const parts = text.split(new RegExp(`(${pendingPattern.source})`, "g"));
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark
            key={index}
            className="rounded border border-dashed border-border-strong bg-cream px-1 font-medium text-navy [box-decoration-break:clone]"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function sectionTitle(section: LegalSection, index: number) {
  return /^\d/.test(section.title) ? section.title : `${index + 1}. ${section.title}`;
}

function sectionAnchor(section: LegalSection, index: number) {
  return section.id ?? `section-${index + 1}`;
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="mt-3 space-y-3 text-body leading-relaxed text-rich-black">
      {items.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>
          <RichText text={paragraph} />
        </p>
      ))}
    </div>
  );
}

function ContentsList({ document }: LegalDocumentViewProps) {
  return (
    <ol className="grid gap-1 text-small">
      {document.sections.map((section, index) => (
        <li key={section.title}>
          <a
            href={`#${sectionAnchor(section, index)}`}
            className="block rounded-md px-2.5 py-1.5 font-medium text-muted transition-colors hover:bg-cream hover:text-navy"
          >
            {sectionTitle(section, index)}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function LegalDocumentView({ document }: LegalDocumentViewProps) {
  const withContents = Boolean(document.summary);

  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container className={withContents ? "max-w-6xl" : "max-w-3xl"}>
        <header className={cn("border-b border-border pb-8", withContents && "lg:max-w-3xl")}>
          <p className="text-small font-semibold uppercase tracking-[0.16em] text-navy">
            Legal
          </p>
          <h1 className="mt-2.5 text-balance text-[clamp(1.7rem,1.2rem+1.5vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-rich-black">
            {document.title}
          </h1>
          <p className="mt-3 text-small font-medium text-navy">
            Last updated: {document.lastUpdated}
            {document.version ? (
              <span className="text-muted"> · Version {document.version}</span>
            ) : null}
          </p>
          <p className="mt-5 text-body leading-relaxed text-rich-black">
            <RichText text={document.introduction} />
          </p>
        </header>

        {document.summary ? (
          <section
            aria-labelledby="legal-summary"
            className="mt-8 rounded-xl border border-border bg-cream p-5 sm:p-6 lg:max-w-3xl"
          >
            <h2 id="legal-summary" className="text-small font-semibold uppercase tracking-[0.14em] text-navy">
              At a glance
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-x-6">
              {document.summary.map((point) => (
                <li key={point} className="flex gap-2.5 text-small leading-relaxed text-rich-black">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-px shrink-0 text-navy">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path d="m8.5 12.2 2.4 2.4 4.6-4.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className={cn(withContents && "lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14")}>
          <div className="min-w-0 lg:max-w-3xl">
            {withContents ? (
              <details className="group mt-8 rounded-xl border border-border lg:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-small font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  On this page
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-open:rotate-180">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="border-t border-border p-2">
                  <ContentsList document={document} />
                </div>
              </details>
            ) : null}

            <div className="mt-10 space-y-10">
              {document.sections.map((section, index) => (
                <section
                  key={section.title}
                  id={sectionAnchor(section, index)}
                  className="scroll-mt-24"
                >
                  <h2 className="text-h3 font-semibold text-rich-black">
                    {sectionTitle(section, index)}
                  </h2>
                  <Paragraphs items={section.paragraphs} />

                  {section.items ? (
                    <dl className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border">
                      {section.items.map((item) => (
                        <div
                          key={item.term}
                          className="grid gap-1 px-4 py-3 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4"
                        >
                          <dt className="text-small font-semibold text-navy">
                            <RichText text={item.term} />
                          </dt>
                          <dd className="text-small leading-relaxed text-rich-black">
                            <RichText text={item.detail} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {section.bullets ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-body leading-relaxed text-rich-black marker:text-navy">
                      {section.bullets.map((item) => (
                        <li key={item.slice(0, 48)}>
                          <RichText text={item} />
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.afterParagraphs ? (
                    <Paragraphs items={section.afterParagraphs} />
                  ) : null}

                  {section.links ? (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {section.links.map((link) => (
                        <ButtonLink key={link.href} href={link.href} variant="secondary" size="sm">
                          {link.label}
                        </ButtonLink>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-12 border-t border-border pt-8 max-sm:text-center">
              <p className="text-body leading-relaxed text-rich-black">
                <RichText text={document.contactNote} />
              </p>
              {document.contactLink ? (
                <div className="mt-5 max-sm:flex max-sm:justify-center">
                  <ButtonLink href={document.contactLink.href} size="sm">
                    {document.contactLink.label}
                  </ButtonLink>
                </div>
              ) : null}
            </div>
          </div>

          {withContents ? (
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-28 mt-10">
                <p className="mb-2 px-2.5 text-small font-semibold uppercase tracking-[0.14em] text-navy">
                  On this page
                </p>
                <ContentsList document={document} />
              </div>
            </nav>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
