"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { getEnquiryCartCount, useEnquiryCart } from "@/lib/enquiry-cart";
import { isNavActive } from "@/lib/nav";

type CartNavButtonProps = {
  inverse?: boolean;
  className?: string;
};

export function CartNavButton({ inverse = false, className }: CartNavButtonProps) {
  const pathname = usePathname();
  const active = isNavActive(pathname, "/cart");
  const { items } = useEnquiryCart();
  const count = getEnquiryCartCount(items);

  return (
    <Link
      href="/cart"
      aria-current={active ? "page" : undefined}
      data-active={active ? "true" : undefined}
      className={cn(
        "relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill transition-colors duration-300",
        inverse
          ? active
            ? "bg-white/20 text-white ring-1 ring-white/55"
            : "text-white hover:bg-white/15"
          : active
            ? "bg-cream text-navy ring-1 ring-navy/25"
            : "text-navy hover:bg-cream",
        className,
      )}
      aria-label={
        count > 0
          ? `Enquiry cart, ${count} items`
          : active
            ? "Enquiry cart, current page"
            : "Open enquiry cart"
      }
    >
      <CartIcon />
      {count > 0 ? (
        <span
          className={cn(
            "absolute right-1 top-1 inline-flex min-h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full px-1 text-[0.65rem] font-semibold leading-none",
            inverse ? "bg-white text-navy" : "bg-navy text-white",
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M3.5 5.5h1.4l1.2 9.2a1.5 1.5 0 0 0 1.5 1.3h8.3a1.5 1.5 0 0 0 1.5-1.25l.9-5.75H6.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 18.2a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8ZM15.3 18.2a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
