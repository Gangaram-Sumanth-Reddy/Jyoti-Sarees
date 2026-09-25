"use client";

import { cn } from "@/lib/cn";
import {
  getEnquiryCartCount,
  openEnquiryCart,
  useEnquiryCart,
} from "@/lib/enquiry-cart";

type CartNavButtonProps = {
  inverse?: boolean;
  className?: string;
};

export function CartNavButton({ inverse = false, className }: CartNavButtonProps) {
  const { items } = useEnquiryCart();
  const count = getEnquiryCartCount(items);

  return (
    <button
      type="button"
      onClick={openEnquiryCart}
      className={cn(
        "relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill transition-colors duration-300",
        inverse
          ? "text-white hover:bg-white/15"
          : "text-navy hover:bg-cream",
        className,
      )}
      aria-label={
        count > 0
          ? `Open enquiry basket, ${count} items`
          : "Open enquiry basket"
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
    </button>
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
