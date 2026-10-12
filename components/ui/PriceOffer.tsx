import { cn } from "@/lib/cn";
import { discountPercent, formatPrice } from "@/lib/products";

type PriceOfferProps = {
  sellingPrice?: number;
  originalPrice?: number;
  sellingLabel: string;
  size?: "card" | "detail";
  className?: string;
};

export function PriceOffer({
  sellingPrice,
  originalPrice,
  sellingLabel,
  size = "card",
  className,
}: PriceOfferProps) {
  const discount =
    sellingPrice !== undefined ? discountPercent(sellingPrice, originalPrice) : null;
  const showOriginal = discount !== null && originalPrice !== undefined;
  const detail = size === "detail";

  return (
    <p
      className={cn(
        "product-price-row flex flex-wrap items-center",
        detail ? "gap-x-2 gap-y-1" : "gap-x-1.5 gap-y-0.5",
        className,
      )}
    >
      {discount !== null ? (
        <span
          className={cn(
            "deal-save inline-flex items-center gap-0.5 font-semibold leading-none",
            detail ? "text-[1.05rem]" : "text-[0.84rem] sm:text-[0.92rem]",
          )}
        >
          <svg viewBox="0 0 16 16" className={detail ? "h-4 w-4" : "h-3.5 w-3.5"} aria-hidden="true">
            <path
              fill="currentColor"
              d="M8 13.4 2.2 6.2h3.1V2.6h5.4v3.6h3.1L8 13.4Z"
            />
          </svg>
          {discount}%
        </span>
      ) : null}
      {showOriginal ? (
        <span
          className={cn(
            "price-was font-normal leading-none line-through",
            detail ? "text-[1.05rem]" : "text-[0.84rem] sm:text-[0.92rem]",
          )}
        >
          {formatPrice(originalPrice)}
        </span>
      ) : null}
      <span
        className={cn(
          "font-bold leading-none text-rich-black",
          detail ? "text-[1.45rem] sm:text-[1.65rem]" : "text-[0.98rem] sm:text-[1.05rem]",
        )}
      >
        {sellingLabel}
      </span>
    </p>
  );
}
