"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isNavActive } from "@/lib/nav";

type BottomNavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  /** Extra sections that belong to this tab (e.g. collection pages under Sarees). */
  also?: readonly string[];
};

const items: readonly BottomNavItem[] = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/sarees", label: "Sarees", icon: <SareeIcon /> },
  { href: "/new-arrivals", label: "New Arrivals", icon: <SparkleIcon /> },
  { href: "/contact", label: "Contact", icon: <ContactIcon /> },
];

function isTextEntry(element: Element | null) {
  if (!element) return false;
  if (element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
    return true;
  }
  if (!(element instanceof HTMLInputElement)) return false;
  return !["button", "checkbox", "radio", "range", "submit", "reset"].includes(element.type);
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);

  // The on-screen keyboard shrinks the viewport; stepping aside keeps suggestion lists visible.
  useEffect(() => {
    const sync = () => setTyping(isTextEntry(document.activeElement));
    document.addEventListener("focusin", sync);
    document.addEventListener("focusout", sync);
    return () => {
      document.removeEventListener("focusin", sync);
      document.removeEventListener("focusout", sync);
    };
  }, []);

  return (
    <nav
      aria-label="Mobile primary"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_20px_rgb(2_6_14/0.06)] transition-transform duration-200 ease-out md:hidden",
        typing && "translate-y-full",
      )}
    >
      <ul className="mx-auto grid h-(--mobile-nav-height) max-w-lg list-none grid-cols-4 p-0">
        {items.map((item) => {
          const active =
            isNavActive(pathname, item.href) ||
            Boolean(item.also?.some((href) => isNavActive(pathname, href)));
          return (
            <li key={item.href} className="min-w-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex h-full flex-col items-center justify-center gap-1 px-1 text-[0.6875rem] font-semibold tracking-[0.02em] transition-colors duration-200",
                  active ? "text-accent" : "text-navy/60 hover:text-navy",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-1/2 top-0 h-0.5 -translate-x-1/2 rounded-full bg-accent transition-[width] duration-300 ease-out",
                    active ? "w-8" : "w-0",
                  )}
                />
                <span
                  className={cn(
                    "inline-flex h-7 w-12 items-center justify-center rounded-pill transition-colors duration-200",
                    active && "bg-accent/10",
                  )}
                >
                  {item.icon}
                </span>
                <span className="max-w-full truncate leading-none">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SareeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.5 3.5h7l1 3.5-2 2.5 3.5 11h-12l2.5-9L7.5 7l1-3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.5 11.5c2.5 1.2 5 3.6 6.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 3.5c.5 4 2 5.5 6 6-4 .5-5.5 2-6 6-.5-4-2-5.5-6-6 4-.5 5.5-2 6-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M18 15v5M15.5 17.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 11.5a7.5 7.5 0 0 1-11.1 6.6L4.5 19.5l1.4-4.2A7.5 7.5 0 1 1 20 11.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
