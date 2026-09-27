"use client";

import Link from "next/link";
import { AddToCartControl } from "@/components/cart/AddToCartControl";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";import { cn } from "@/lib/cn";
import { productHref, whatsappEnquiryUrl, type Product } from "@/lib/products";
import { site } from "@/lib/site";

type ProductCardProps = {
  product?: Product;
  name?: string;
  category?: string;
  fabric?: string;
  colour?: string;
  price?: string;
  href?: string;
  productId?: string;
  className?: string;
  showWhatsApp?: boolean;
  showAddToCart?: boolean;
  badge?: string;
  available?: boolean;
  /** Keep both CTAs side by side on phones (for full-width single-column cards). */
  inlineCtas?: boolean;
};

export function ProductCard({
  product,
  name: nameProp,
  category: categoryProp,
  fabric: fabricProp,
  colour: colourProp,
  price: priceProp,
  href: hrefProp,
  productId: productIdProp,
  className,
  showWhatsApp = false,
  showAddToCart = false,
  badge,
  available: availableProp,
  inlineCtas = false,
}: ProductCardProps) {
  const name = product?.name ?? nameProp ?? "";
  const category = product?.category ?? categoryProp ?? "";
  const fabric = product?.fabric ?? fabricProp;
  const colour = product?.colour ?? colourProp;
  const price = product?.priceLabel ?? priceProp ?? "";
  const productId = product?.productId ?? productIdProp;
  const available = product?.available ?? availableProp ?? true;
  const href = hrefProp ?? (product ? productHref(product) : "#");

  const meta = [category, fabric].filter(Boolean).join(" · ");
  const detail = colour || undefined;
  const dualCta = showAddToCart || showWhatsApp;

  return (
    <Card
      as="li"
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden p-0 shadow-soft max-sm:!p-2",
        className,
      )}
    >
      <Link href={href} className="group relative block min-w-0 shrink-0">
        <ImageFrame
          aspect="card"
          radius="none"
          className="rounded-t-md max-sm:[&>div]:rounded-md"
        >
          <ImagePlaceholder label={name} />
        </ImageFrame>
        {badge ? (
          <Badge
            variant="inverse"
            className="absolute left-2.5 top-2.5 z-10 shadow-soft sm:left-3 sm:top-3"
          >
            {badge}
          </Badge>
        ) : null}
        {!available ? (
          <span className="absolute bottom-2.5 left-2.5 rounded-pill sm:bottom-3 sm:left-3 bg-navy/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white">
            Out of stock
          </span>
        ) : null}
      </Link>

      <div className="flex min-h-0 flex-1 flex-col px-1 pb-0.5 pt-2.5 sm:px-4 sm:pb-4 sm:pt-3.5">
        <div className="flex flex-1 flex-col gap-1">
          <p className="min-h-[1.1rem] truncate text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-accent sm:text-[0.68rem] sm:tracking-[0.12em]">
            {meta || "\u00A0"}
          </p>
          <h3 className="line-clamp-2 min-h-[2.4rem] text-[0.95rem] font-semibold leading-snug text-rich-black sm:min-h-[2.6rem] sm:text-[1.05rem]">
            <Link href={href} className="transition-colors hover:text-accent">
              {name}
            </Link>
          </h3>
          <p className="text-body font-semibold leading-snug text-rich-black">
            {price}
          </p>
          <p className="min-h-[1.25rem] truncate text-[0.8125rem] text-muted sm:text-small">
            {detail || "\u00A0"}
          </p>
        </div>

        <div
          className={cn(
            "mt-3 flex shrink-0 gap-2",
            dualCta && "w-full",
            dualCta && !inlineCtas && "max-sm:grid max-sm:grid-cols-1",
          )}
        >
          <ButtonLink
            href={href}
            variant={showAddToCart ? "secondary" : "primary"}
            size="sm"
            className={cn(
              "h-10 min-h-10 whitespace-nowrap px-2.5 text-[0.8rem] !font-bold tracking-[0.02em]",
              dualCta ? "min-w-0 flex-1" : "w-fit max-w-full",
            )}
          >
            View Saree
          </ButtonLink>
          {showAddToCart && product ? (
            <AddToCartControl product={product} size="sm" />
          ) : null}
          {showWhatsApp && !showAddToCart ? (
            <ExternalButtonLink
              href={whatsappEnquiryUrl(name, site.whatsappUrl, productId)}
              variant="secondary"
              size="sm"
              className="h-10 min-h-10 min-w-0 flex-1 whitespace-nowrap border-accent/40 px-2.5 text-[0.8rem] !font-bold tracking-[0.02em] text-accent hover:border-accent hover:bg-accent hover:text-white"
            >
              WhatsApp
            </ExternalButtonLink>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
