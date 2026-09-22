"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/layout/BrandMark";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/ui/Container";
import { ExternalButtonLink } from "@/components/ui/Button";
import { navigation, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuId = useId();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-4 py-3 lg:py-4">
        <BrandMark />
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={pathname === item.href}
              className="nav-link px-2.5 xl:px-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden xl:block">
          <ExternalButtonLink href={site.whatsappUrl} size="sm">
            WhatsApp Us
          </ExternalButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill text-navy transition-colors hover:bg-cream xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </button>
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
