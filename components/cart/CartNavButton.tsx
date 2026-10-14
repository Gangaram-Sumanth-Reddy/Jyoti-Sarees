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
            ? "bg-[rgb(255_255_255/0.2)] text-[var(--jyoti-header-text)] ring-1 ring-white/55"
            : "text-[var(--jyoti-header-text)] hover:bg-[rgb(255_255_255/0.15)]"
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
            "cart-count absolute right-0.5 top-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full px-1 text-[0.65rem] font-bold leading-none ring-2 ring-navy",
            inverse ? "bg-[#ffffff] text-[#0a2472]" : "bg-navy text-white",
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
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2ZM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20 4H5.21l-.94-2H1Zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2Z"
      />
    </svg>
  );
}
