"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  addToEnquiryCart,
  setEnquiryQuantity,
  useEnquiryCart,
} from "@/lib/enquiry-cart";
import type { Product } from "@/lib/products";

type AddToCartControlProps = {
  product: Product;
  colour?: string;
  colourId?: string;
  size?: "sm" | "lg";
  className?: string;
};

export function AddToCartControl({
  product,
  colour,
  colourId,
  size = "sm",
  className,
}: AddToCartControlProps) {
  const { items } = useEnquiryCart();
  const selectedColour = colour ?? product.colour;
  const cartItem = items.find(
    (item) => item.slug === product.slug && item.colour === selectedColour,
  );
  const quantity = cartItem?.quantity ?? 0;
  const large = size === "lg";

  if (quantity > 0) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-between overflow-hidden rounded-pill border border-navy bg-navy text-white",
          large
            ? "h-12 w-full sm:w-auto sm:min-w-[11rem]"
            : "h-9 min-w-0 flex-1",
          className,
        )}
        role="group"
        aria-label="Cart quantity"
      >
        <button
          type="button"
          className={cn(
            "inline-flex h-full items-center justify-center font-semibold transition-colors hover:bg-navy-mid",
            large ? "min-w-11 text-lg" : "min-w-9 text-base",
          )}
          aria-label="Decrease quantity"
          onClick={() =>
            setEnquiryQuantity(product.slug, quantity - 1, selectedColour)
          }
        >
          −
        </button>
        <span
          className={cn(
            "min-w-8 px-1 text-center font-semibold tabular-nums",
            large ? "text-body" : "text-[0.75rem]",
          )}
        >
          {quantity}
        </span>
        <button
          type="button"
          className={cn(
            "inline-flex h-full items-center justify-center font-semibold transition-colors hover:bg-navy-mid disabled:opacity-40",
            large ? "min-w-11 text-lg" : "min-w-9 text-base",
          )}
          aria-label="Increase quantity"
          disabled={quantity >= 99}
          onClick={() =>
            addToEnquiryCart(product, { colour: selectedColour, colourId })
          }
        >
          +
        </button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      size={large ? "lg" : "sm"}
      disabled={!product.available}
      className={cn(
        large
          ? "w-full bg-navy text-white hover:bg-navy-mid sm:w-auto sm:min-w-[14rem]"
          : "min-h-9 min-w-0 flex-1 whitespace-nowrap px-2.5 text-[0.7rem] tracking-[0.02em]",
        className,
      )}
      onClick={() =>
        addToEnquiryCart(product, { colour: selectedColour, colourId })
      }
    >
      Add to Cart
    </Button>
  );
}
