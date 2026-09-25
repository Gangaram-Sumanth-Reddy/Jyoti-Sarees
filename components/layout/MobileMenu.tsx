"use client";

import { useEffect, type RefObject } from "react";
import Link from "next/link";
import { navigation, site } from "@/lib/site";
import { BrandMark } from "@/components/layout/BrandMark";
import { ExternalButtonLink } from "@/components/ui/Button";
import { isNavActive } from "@/lib/nav";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  dialogRef: RefObject<HTMLDialogElement | null>;
  activeHref: string;
};

export function MobileMenu({
  open,
  onClose,
  dialogRef,
  activeHref,
}: MobileMenuProps) {
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, dialogRef]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-white p-0 text-rich-black open:flex open:flex-col backdrop:bg-navy-deep/50"
      aria-labelledby="mobile-nav-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-gutter py-4">
          <BrandMark onNavigate={onClose} />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill text-navy transition-colors hover:bg-cream"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-2 px-gutter py-8" aria-label="Mobile">
          <h2 id="mobile-nav-title" className="sr-only">
            Site menu
          </h2>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              data-active={isNavActive(activeHref, item.href) ? "true" : undefined}
              className="flex min-h-12 items-center border-b border-border text-h3 font-semibold tracking-[0.04em] text-rich-black data-[active=true]:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-8">
            <ExternalButtonLink
              href={site.whatsappUrl}
              size="lg"
              className="w-full"
              onClick={onClose}
            >
              WhatsApp Us
            </ExternalButtonLink>
          </div>
        </nav>
      </div>
    </dialog>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 4l12 12M16 4L4 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
