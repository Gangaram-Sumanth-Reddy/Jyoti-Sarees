"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartNavButton } from "@/components/cart/CartNavButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLogo } from "@/components/layout/NavLogo";
import { Container } from "@/components/ui/Container";
import { ExternalButtonLink } from "@/components/ui/Button";
import { isNavActive } from "@/lib/nav";
import { navigation, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();

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

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-transparent bg-navy/95 shadow-soft backdrop-blur-sm max-md:border-b-0 max-md:bg-navy max-md:shadow-[0_-2px_0_var(--jyoti-navy),0_2px_12px_rgb(2_6_14/0.08)] max-md:backdrop-blur-none"
    >
      <Container className="flex items-center justify-between gap-4 py-2.5 max-md:h-16 max-md:gap-3 max-md:px-4 max-md:py-0 lg:py-3">
        <NavLogo />
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {navigation.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active ? "true" : undefined}
                className="nav-link nav-link--inverse px-2.5 xl:px-3"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <CartNavButton inverse />
          <div className="hidden xl:block">
            <ExternalButtonLink
              href={site.whatsappUrl}
              variant="secondary"
              size="sm"
              className="border-white text-white hover:!border-white hover:!bg-white hover:!text-navy"
            >
              WhatsApp Us
            </ExternalButtonLink>
          </div>
          <button
            type="button"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-pill text-white transition-colors duration-300 hover:bg-white/15 md:inline-flex xl:hidden"
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
