"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";
import { addToEnquiryCart } from "@/lib/enquiry-cart";
import { whatsappEnquiryUrl, type Product } from "@/lib/products";
import { site } from "@/lib/site";

type ProductCardProps = {
  product?: Product;
  name?: string;
  category?: string;
  fabric?: string;
  colour?: string;
  price?: string;
  href: string;
  productId?: string;
  className?: string;
  showWhatsApp?: boolean;
  showAddToCart?: boolean;
  badge?: string;
  available?: boolean;
};

export function ProductCard({
  product,
  name: nameProp,
  category: categoryProp,
  fabric: fabricProp,
  colour: colourProp,
  price: priceProp,
  href,
  productId: productIdProp,
  className,
  showWhatsApp = false,
  showAddToCart = false,
  badge,
  available: availableProp,
}: ProductCardProps) {
  const name = product?.name ?? nameProp ?? "";
  const category = product?.category ?? categoryProp ?? "";
  const fabric = product?.fabric ?? fabricProp;
  const colour = product?.colour ?? colourProp;
  const price = product?.priceLabel ?? priceProp ?? "";
  const productId = product?.productId ?? productIdProp;
  const available = product?.available ?? availableProp ?? true;

  const meta = [category, fabric].filter(Boolean).join(" · ");
  const detail = colour || undefined;
  const dualCta = showAddToCart || showWhatsApp;

  return (
    <Card
      as="li"
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden p-0 shadow-soft",
        className,
      )}
    >
      <Link href={href} className="group relative block min-w-0 shrink-0">
        <ImageFrame aspect="card" radius="none" className="rounded-t-md">
          <ImagePlaceholder label={name} />
        </ImageFrame>
        {badge ? (
          <Badge
            variant="inverse"
            className="absolute left-3 top-3 z-10 shadow-soft"
          >
            {badge}
          </Badge>
        ) : null}
        {!available ? (
          <span className="absolute bottom-3 left-3 rounded-pill bg-navy/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white">
            Out of stock
          </span>
        ) : null}
      </Link>

      <div className="flex min-h-0 flex-1 flex-col px-3.5 pb-3.5 pt-3 sm:px-4 sm:pb-4 sm:pt-3.5">
        <div className="flex flex-1 flex-col gap-1">
          <p className="min-h-[1.1rem] truncate text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-accent">
            {meta || "\u00A0"}
          </p>
          <h3 className="line-clamp-2 min-h-[2.6rem] text-[1.05rem] font-semibold leading-snug text-rich-black">
            <Link href={href} className="transition-colors hover:text-accent">
              {name}
            </Link>
          </h3>
          <p className="text-body font-semibold leading-snug text-rich-black">
            {price}
          </p>
          <p className="min-h-[1.25rem] truncate text-small text-muted">
            {detail || "\u00A0"}
          </p>
        </div>

        <div className={cn("mt-3 flex shrink-0 gap-2", dualCta && "w-full")}>
          <ButtonLink
            href={href}
            variant={showAddToCart ? "secondary" : "primary"}
            size="sm"
            className={cn(
              "min-h-9 whitespace-nowrap px-2.5 text-[0.7rem] tracking-[0.02em]",
              dualCta ? "min-w-0 flex-1" : "w-fit max-w-full",
            )}
          >
            View Saree
          </ButtonLink>
          {showAddToCart ? (
            <Button
              type="button"
              size="sm"
              disabled={!available}
              className="min-h-9 min-w-0 flex-1 whitespace-nowrap px-2.5 text-[0.7rem] tracking-[0.02em]"
              onClick={() => {
                if (product) addToEnquiryCart(product);
              }}
            >
              Add to Cart
            </Button>
          ) : null}
          {showWhatsApp && !showAddToCart ? (
            <ExternalButtonLink
              href={whatsappEnquiryUrl(name, site.whatsappUrl, productId)}
              variant="secondary"
              size="sm"
              className="min-h-9 min-w-0 flex-1 whitespace-nowrap border-accent/40 px-2.5 text-[0.7rem] tracking-[0.02em] text-accent hover:border-accent hover:bg-accent hover:text-white"
            >
              WhatsApp
            </ExternalButtonLink>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
