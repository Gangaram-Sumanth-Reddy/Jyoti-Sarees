"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartNavButton } from "@/components/cart/CartNavButton";
import { BrandMark } from "@/components/layout/BrandMark";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/ui/Container";
import { ExternalButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useHeroNavTone } from "@/lib/hero-nav-tone";
import { isNavActive } from "@/lib/nav";
import { navigation, site } from "@/lib/site";

const SCROLL_THRESHOLD = 16;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const heroTone = useHeroNavTone();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();

  const overlayNav = isHome && !scrolled;
  const solidNav = !overlayNav;
  const overlayOnDark = overlayNav && heroTone === "dark";
  const overlayOnLight = overlayNav && heroTone === "light";
  const inverseChrome = solidNav || overlayOnDark;

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.offsetHeight}px`,
      );
    };

    syncHeaderHeight();

    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      ref={headerRef}
      data-overlay={overlayNav ? "true" : undefined}
      data-hero-tone={overlayNav ? heroTone : undefined}
      data-solid={solidNav ? "true" : undefined}
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,color] duration-300 ease-out",
        overlayNav && "border-transparent bg-transparent shadow-none",
        solidNav &&
          "border-transparent bg-navy/95 shadow-soft backdrop-blur-sm",
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-2.5 lg:py-3">
        <BrandMark tone={inverseChrome ? "inverse" : "default"} />
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {navigation.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active ? "true" : undefined}
                className={cn(
                  "nav-link px-2.5 xl:px-3",
                  inverseChrome && "nav-link--inverse",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <CartNavButton inverse={inverseChrome} />
          <div className="hidden xl:block">
            {overlayOnLight ? (
              <ExternalButtonLink
                href={site.whatsappUrl}
                variant="primary"
                size="sm"
                className="bg-navy text-white hover:bg-navy-mid"
              >
                WhatsApp Us
              </ExternalButtonLink>
            ) : inverseChrome ? (
              <ExternalButtonLink
                href={site.whatsappUrl}
                variant="secondary"
                size="sm"
                className="border-white text-white hover:border-white hover:bg-white hover:text-navy"
              >
                WhatsApp Us
              </ExternalButtonLink>
            ) : (
              <ExternalButtonLink href={site.whatsappUrl} size="sm">
                WhatsApp Us
              </ExternalButtonLink>
            )}
          </div>
          <button
            type="button"
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill transition-colors duration-300 xl:hidden",
              inverseChrome
                ? "text-white hover:bg-white/15"
                : "text-navy hover:bg-cream",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </Container>
      <div id={menuId}>
        <MobileMenu
          open={open}
          onClose={() => setOpen(false)}
          dialogRef={dialogRef}
          activeHref={pathname}
        />
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <path
        d="M1 1.5h20M1 8h20M1 14.5h20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
