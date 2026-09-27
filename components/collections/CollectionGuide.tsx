import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { collectionHref, type Collection } from "@/lib/collections";
import { getJournalArticle, journalHref, type JournalArticle } from "@/lib/journal";

type CollectionGuideProps = {
  collection: Collection;
  related: Collection[];
};

/** Buying guide, FAQs and internal links for a category landing page. */
export function CollectionGuide({ collection, related }: CollectionGuideProps) {
  const articles = collection.journal
    .map((slug) => getJournalArticle(slug))
    .filter((article): article is JournalArticle => Boolean(article));

  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-14">
          <article className="min-w-0 max-w-3xl">
            <h2 className="text-h2 text-balance">
              About {collection.name.toLowerCase().endsWith("sarees") ? collection.name : `${collection.name} sarees`}
            </h2>
            <div className="mt-4 space-y-4 text-body text-muted">
              {collection.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {collection.guide.map((section) => (
              <section key={section.heading} className="mt-8">
                <h3 className="text-h3 text-balance">{section.heading}</h3>
                <div className="mt-3 space-y-3 text-body text-muted">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            {collection.faqs.length > 0 ? (
              <section className="mt-10" aria-labelledby="collection-faqs">
                <h2 id="collection-faqs" className="text-h3">
                  Frequently asked questions
                </h2>
                <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-white">
                  {collection.faqs.map((faq) => (
                    <details key={faq.question} className="group px-5 py-4">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-body font-semibold text-rich-black [&::-webkit-details-marker]:hidden">
                        {faq.question}
                        <span
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-navy transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-body text-muted">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="min-w-0 space-y-8 lg:pt-1">
            {related.length > 0 ? (
              <nav aria-labelledby="related-collections">
                <h2
                  id="related-collections"
                  className="text-small font-semibold uppercase tracking-[0.14em] text-accent"
                >
                  Related collections
                </h2>
                <ul className="mt-3 list-none space-y-2 p-0">
                  {related.map((entry) => (
                    <li key={entry.slug}>
                      <Link
                        href={collectionHref(entry.slug)}
                        className="block rounded-md border border-border bg-white px-4 py-3 transition-colors hover:border-navy"
                      >
                        <span className="block text-body font-semibold text-rich-black">
                          {entry.name}
                        </span>
                        <span className="block text-small text-muted">
                          {entry.shortDescription}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/new-arrivals"
                      className="block rounded-md border border-border bg-white px-4 py-3 transition-colors hover:border-navy"
                    >
                      <span className="block text-body font-semibold text-rich-black">
                        New Arrivals
                      </span>
                      <span className="block text-small text-muted">
                        The latest sarees added to our collection.
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            ) : null}

            {articles.length > 0 ? (
              <nav aria-labelledby="collection-guides">
                <h2
                  id="collection-guides"
                  className="text-small font-semibold uppercase tracking-[0.14em] text-accent"
                >
                  Saree guides
                </h2>
                <ul className="mt-3 list-none space-y-2 p-0">
                  {articles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={journalHref(article.slug)}
                        className="block text-body font-semibold text-navy transition-colors hover:text-accent"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </aside>
        </div>
      </Container>
    </Section>
  );
}
