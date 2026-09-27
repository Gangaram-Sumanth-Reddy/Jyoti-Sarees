import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { SocialIcons } from "@/components/layout/SocialIcons";
import { Container } from "@/components/ui/Container";
import { footerNav, legalLinks, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-cream">
      <Container className="grid grid-cols-2 gap-x-5 gap-y-9 py-10 sm:gap-x-8 sm:py-12 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-12 lg:py-14">
        <div className="col-span-2 max-w-sm max-lg:mx-auto max-lg:flex max-lg:flex-col max-lg:items-center max-lg:text-center lg:col-span-1">
          <BrandMark className="max-lg:hidden" />
          <Link
            href="/"
            aria-label={`${site.name} — Home`}
            className="inline-flex items-center gap-2.5 rounded-md lg:hidden"
          >
            <Image
              src="/assets/Logo.png"
              alt=""
              width={1098}
              height={1098}
              sizes="48px"
              className="size-12 shrink-0 rounded-full shadow-soft"
            />
            {/* The wordmark asset is white; masking it lets the footer show it in navy. */}
            <span
              aria-hidden="true"
              className="block h-12 aspect-[1749/899] bg-navy [mask-image:url(/assets/Logo-text.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
            />
          </Link>
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

        <div className="min-w-0 max-lg:border-l max-lg:border-border-strong/70 max-lg:pl-5 sm:max-lg:pl-8">
          <p className="mb-4 text-small font-semibold uppercase tracking-[0.14em] text-navy">
            {site.name}
          </p>
          <div className="max-w-xs">
            <p className="text-small leading-relaxed text-rich-black">
              Premium sarees curated with care—for everyday elegance and
              celebrations that matter.
            </p>
            <SocialIcons className="mt-6 max-lg:hidden" align="center" />
          </div>
        </div>

        <SocialIcons className="col-span-2 lg:hidden" align="center" />
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center gap-3 py-5 text-center max-md:pb-[5.5rem] text-small text-rich-black sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-medium">
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-start">
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
