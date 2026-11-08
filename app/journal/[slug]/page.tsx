import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { collectionHref, getIndexableCollection, type Collection } from "@/lib/collections";
import {
  formatJournalDate,
  getJournalArticle,
  journalArticles,
  journalHref,
} from "@/lib/journal";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";

type JournalArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) return { title: "Article not found", robots: { index: false } };
  return buildMetadata({
    title: article.seoTitle,
    description: article.description,
    path: journalHref(article.slug),
    image: article.image,
    type: "article",
    publishedTime: article.datePublished,
    modifiedTime: article.dateModified,
  });
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) notFound();

  const path = journalHref(article.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
    { name: article.title, path },
  ];
  const related = article.relatedCollections
    .map((entry) => getIndexableCollection(entry))
    .filter((entry): entry is Collection => Boolean(entry));
  const others = journalArticles.filter((entry) => entry.slug !== article.slug);
  const updated = article.dateModified !== article.datePublished;

  return (
    <>
      <JsonLd data={[articleSchema(article, path), breadcrumbSchema(crumbs)]} />
      <Section className="pt-6 sm:pt-8 lg:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <article className="mx-auto mt-6 max-w-3xl lg:mt-8">
            <header>
              <p className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
                Journal
              </p>
              <h1 className="mt-3 text-h1 text-balance">{article.title}</h1>
              <p className="mt-4 text-body text-muted">{article.description}</p>
              <p className="mt-4 text-small text-muted">
                By {article.author} ·{" "}
                <time dateTime={article.datePublished}>
                  {formatJournalDate(article.datePublished)}
                </time>
                {updated ? (
                  <>
                    {" · Updated "}
                    <time dateTime={article.dateModified}>
                      {formatJournalDate(article.dateModified)}
                    </time>
                  </>
                ) : null}
                {" · "}
                {article.readingMinutes} min read
              </p>
            </header>

            <figure className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-cream">
              <Image
                src={article.image.url}
                alt={article.image.alt}
                fill
                preload
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
            </figure>

            <div className="mt-8">
              {article.sections.map((section) => (
                <section key={section.heading} className="mt-8 first:mt-0">
                  <h2 className="text-h3 text-balance">{section.heading}</h2>
                  <div className="mt-3 space-y-3 text-body text-muted">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-body text-muted marker:text-navy">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            {related.length > 0 ? (
              <aside
                className="mt-12 rounded-lg border border-border bg-section-muted p-5 sm:p-6"
                aria-labelledby="article-collections"
              >
                <h2 id="article-collections" className="text-h3">
                  Explore the collections
                </h2>
                <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                  {related.map((collection) => (
                    <li key={collection.slug}>
                      <Link
                        href={collectionHref(collection.slug)}
                        className="inline-flex min-h-9 items-center rounded-pill border border-border bg-white px-3.5 text-small font-semibold text-navy transition-colors hover:border-navy hover:text-accent"
                      >
                        {collection.seoTitle.replace(/\s*\(.*\)$/, "")}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3 max-sm:justify-center">
                  <ButtonLink href="/new-arrivals" size="sm">
                    See New Arrivals
                  </ButtonLink>
                  <ButtonLink href="/contact" size="sm" variant="secondary">
                    Ask our team
                  </ButtonLink>
                </div>
              </aside>
            ) : null}

            {others.length > 0 ? (
              <nav className="mt-12" aria-labelledby="more-guides">
                <h2 id="more-guides" className="text-h3">
                  More saree guides
                </h2>
                <ul className="mt-4 list-none space-y-2 p-0">
                  {others.map((entry) => (
                    <li key={entry.slug}>
                      <Link
                        href={journalHref(entry.slug)}
                        className="text-body font-semibold text-navy transition-colors hover:text-accent"
                      >
                        {entry.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </article>
        </Container>
      </Section>
    </>
  );
}
