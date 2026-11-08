"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type ProductShareButtonProps = {
  productName: string;
  /** Site-relative product path, e.g. `/sarees/elegant-red-silk-saree`. */
  path: string;
  className?: string;
};

/** Production origin when configured, so links shared from previews still open the live site. */
function shareOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  return configured || window.location.origin;
}

/** Opens the native share sheet for a product link, falling back to copying it. */
export function useProductShare(path: string) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function share() {
    const url = new URL(path, shareOrigin()).toString();

    if (typeof navigator.share === "function") {
      try {
        /* URL only: share sheets then show the product link itself, "Copy"
           copies just the link, and apps build the preview from its OG tags. */
        await navigator.share({ url });
        return;
      } catch (error) {
        if ((error as DOMException).name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy this link to share", url);
    }
  }

  return { share, copied };
}

export function ShareIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 15V3.5M7.5 8 12 3.5 16.5 8M8.5 11H6.5a1 1 0 0 0-1 1v7.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V12a1 1 0 0 0-1-1h-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductShareButton({
  productName,
  path,
  className,
}: ProductShareButtonProps) {
  const { share, copied } = useProductShare(path);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        role="status"
        className={cn(
          "pointer-events-none rounded-pill bg-navy px-2.5 py-1 text-[0.68rem] font-semibold text-white shadow-soft transition-opacity duration-200",
          copied ? "opacity-100" : "opacity-0",
        )}
      >
        {copied ? "Link copied" : ""}
      </span>
      <button
        type="button"
        onClick={share}
        aria-label={`Share ${productName}`}
        title="Share"
        className="inline-flex size-10 items-center justify-center rounded-full bg-white text-rich-black shadow-soft ring-1 ring-black/5 transition-[color,transform] duration-200 hover:text-navy active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:size-11"
      >
        <ShareIcon />
      </button>
    </div>
  );
}
