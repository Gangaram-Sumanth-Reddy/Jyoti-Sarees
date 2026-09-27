import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { formatJournalDate, journalArticles, journalHref } from "@/lib/journal";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

const description =
  "Saree guides from Jyoti Sarees — how to choose between silk, brocade, georgette and organza, Kanchipuram vs Banarasi, and how to care for silk sarees.";

export const metadata = buildMetadata({
  title: "Saree Journal — Fabric Guides, Styling & Care",
  description,
  path: "/journal",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Journal", path: "/journal" },
];

export default function JournalPage() {
  const articles = [...journalArticles].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Jyoti Sarees Journal",
            description,
            url: absoluteUrl("/journal"),
            blogPost: articles.map((article) => ({
              "@type": "BlogPosting",
              headline: article.title,
              url: absoluteUrl(journalHref(article.slug)),
              datePublished: article.datePublished,
            })),
          },
          breadcrumbSchema(crumbs),
        ]}
      />
      <Section className="pt-6 sm:pt-8 lg:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <header className="mt-6 max-w-2xl lg:mt-8">
            <p className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
              Journal
            </p>
            <h1 className="mt-3 text-h1 text-balance">Saree guides &amp; care</h1>
            <p className="mt-4 text-body text-muted">
              Practical guides to help you understand saree fabrics and weaves,
              choose the right saree for an occasion and look after it for years.
            </p>
          </header>

          <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.slug}>
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-soft">
                  <Link href={journalHref(article.slug)} className="group flex h-full flex-col">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream">
                      <Image
                        src={article.image.url}
                        alt={article.image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-h3 text-balance text-rich-black group-hover:text-navy">
                        {article.title}
                      </h2>
                      <p className="mt-2 flex-1 text-body text-muted">{article.excerpt}</p>
                      <p className="mt-4 text-small text-muted">
                        <time dateTime={article.datePublished}>
                          {formatJournalDate(article.datePublished)}
                        </time>
                        {" · "}
                        {article.readingMinutes} min read
                      </p>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
