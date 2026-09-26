import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { SocialIcons } from "@/components/layout/SocialIcons";
import { Container } from "@/components/ui/Container";
import { footerNav, legalLinks, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-cream">
      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-12 lg:py-14">
        <div className="max-w-sm">
          <BrandMark />
          <p className="mt-4 text-small text-rich-black">{site.tagline}</p>
          <address className="mt-6 space-y-2 text-small not-italic text-rich-black">
            <p>{site.address}</p>
            <p>
              <a
                href={site.phoneHref}
                className="font-medium text-navy transition-colors hover:text-accent"
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-navy transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-small font-semibold uppercase tracking-[0.14em] text-navy">
            Explore
          </p>
          <ul className="grid gap-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body font-medium text-rich-black transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-small font-semibold uppercase tracking-[0.14em] text-navy">
            {site.name}
          </p>
          <p className="max-w-xs text-small leading-relaxed text-rich-black">
            Premium sarees curated with care—for everyday elegance and
            celebrations that matter.
          </p>
          <SocialIcons className="mt-6" />
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-5 text-small text-rich-black sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium">
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-navy transition-colors hover:text-accent"
                >
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
