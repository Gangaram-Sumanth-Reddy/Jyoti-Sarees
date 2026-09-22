import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { Container } from "@/components/ui/Container";
import { footerNav, legalLinks, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-cream">
      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-12 lg:py-14">
        <div className="max-w-sm">
          <BrandMark />
          <p className="mt-4 text-small text-muted">{site.tagline}</p>
          <address className="mt-6 space-y-2 text-small not-italic text-muted">
            <p>{site.address}</p>
            <p>
              <a href={site.phoneHref} className="transition-colors hover:text-accent">
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-small font-semibold uppercase tracking-[0.14em] text-accent">
            Explore
          </p>
          <ul className="grid gap-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                {"external" in item && item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body text-rich-black transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-body text-rich-black transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-small font-semibold uppercase tracking-[0.14em] text-accent">
            {site.name}
          </p>
          <p className="max-w-xs text-small text-muted">
            Premium sarees curated with care—for everyday elegance and
            celebrations that matter.
          </p>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-5 text-small text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-rich-black">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
