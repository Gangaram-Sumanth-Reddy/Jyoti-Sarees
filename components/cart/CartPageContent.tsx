"use client";

import Image from "next/image";
import Link from "next/link";
import { EmptyCartIllustration } from "@/components/cart/EmptyCartIllustration";
import { Button, ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PriceOffer } from "@/components/ui/PriceOffer";
import { Section } from "@/components/ui/Section";
import {
  clearEnquiryCart,
  getCartItemKey,
  getEnquiryCartCount,
  getEnquiryCartTotal,
  getEnquiryCartTotalLabel,
  openEnquirySentModal,
  removeFromEnquiryCart,
  setEnquiryQuantity,
  useEnquiryCart,
  type EnquiryCartItem,
} from "@/lib/enquiry-cart";
import {
  cartItemHref,
  formatPrice,
  getProductBySlug,
  productHref,
  whatsappOrderUrl,
} from "@/lib/products";
import { cn } from "@/lib/cn";
import { useProductShare } from "@/components/product/ProductShareButton";
import { site } from "@/lib/site";

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M10 11v6M14 11v6M5.5 7l1 12a2 2 0 0 0 2 1.8h7a2 2 0 0 0 2-1.8l1-12M9 7V4.8A.8.8 0 0 1 9.8 4h4.4a.8.8 0 0 1 .8.8V7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Catalogue MRP for a cart line, when it is higher than the enquiry price. */
function cartItemOriginalPrice(item: EnquiryCartItem) {
  const original = getProductBySlug(item.slug)?.originalPrice;
  return original !== undefined && original > item.price ? original : undefined;
}

function CartItemCard({ item }: { item: EnquiryCartItem }) {
  const href = cartItemHref(item);
  const product = getProductBySlug(item.slug);
  const photo = product?.gallery.find((entry) => entry.src)?.src;
  const sharePath = product
    ? product.colourOptions.length > 1
      ? productHref(product, item.colourId)
      : productHref(product)
    : href;
  const { share, copied } = useProductShare(sharePath);

  return (
    <Card className="overflow-hidden p-0 shadow-soft">
      <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3.5 p-3.5 min-[400px]:grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5 sm:p-5">
        <Link href={href} className="block min-w-0">
          <ImageFrame aspect={photo ? "saree" : "card"} radius="md" className="shadow-none">
            {photo ? (
              <Image
                src={photo}
                alt={`${item.name} saree`}
                fill
                sizes="(min-width: 640px) 9rem, 6.5rem"
              />
            ) : (
              <ImagePlaceholder label={item.name} />
            )}
          </ImageFrame>
        </Link>

        <div className="flex min-w-0 flex-col">
          <div>
            <div className="min-w-0">
              <Link
                href={href}
                className="text-[0.975rem] font-semibold leading-snug text-rich-black transition-colors hover:text-accent sm:text-[1.05rem]"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-small text-muted">
                {item.productId} · {item.fabric}
              </p>
              <p className="mt-1 text-small font-medium text-navy">
                Colour: {item.colour}
              </p>
              <PriceOffer
                className="mt-2"
                sellingPrice={item.price}
                originalPrice={cartItemOriginalPrice(item)}
                sellingLabel={item.priceLabel}
              />
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-3 sm:mt-4 sm:pt-0">
            <div className="inline-flex items-center rounded-pill border-2 border-navy bg-white text-navy">
              <button
                type="button"
                className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-l-pill transition-colors hover:bg-cream"
                aria-label={
                  item.quantity === 1
                    ? `Delete ${item.name}`
                    : `Decrease quantity of ${item.name}`
                }
                onClick={() =>
                  setEnquiryQuantity(item.slug, item.quantity - 1, item.colour)
                }
              >
                {item.quantity === 1 ? (
                  <TrashIcon />
                ) : (
                  <span className="text-lg font-semibold leading-none">−</span>
                )}
              </button>
              <span
                className="min-w-7 text-center text-small font-bold tabular-nums text-rich-black"
                aria-label={`Quantity ${item.quantity}`}
              >
                {item.quantity}
              </span>
              <button
                type="button"
                className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-r-pill text-lg font-semibold leading-none transition-colors hover:bg-cream disabled:opacity-40"
                aria-label={`Increase quantity of ${item.name}`}
                disabled={item.quantity >= 99}
                onClick={() =>
                  setEnquiryQuantity(item.slug, item.quantity + 1, item.colour)
                }
              >
                +
              </button>
            </div>

            <div className="flex items-center text-small">
              <button
                type="button"
                className="min-h-9 px-0.5 font-medium text-accent transition-colors hover:text-navy hover:underline"
                onClick={() => removeFromEnquiryCart(item.slug, item.colour)}
              >
                Delete
              </button>
              <span className="mx-2.5 h-4 w-px bg-border-strong" aria-hidden="true" />
              <button
                type="button"
                className="min-h-9 px-0.5 font-medium text-accent transition-colors hover:text-navy hover:underline"
                aria-label={`Share ${item.name}`}
                onClick={share}
              >
                Share
              </button>
              <span
                role="status"
                className={cn(
                  "ml-2 text-[0.75rem] font-semibold text-navy transition-opacity duration-200",
                  copied ? "opacity-100" : "opacity-0",
                )}
              >
                {copied ? "Link copied" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function EmptyCartState() {
  return (
    <div className="mx-auto flex min-h-[min(68dvh,36rem)] max-w-xl items-center justify-center px-1 py-6 sm:min-h-[min(62dvh,34rem)] sm:py-10">
      <div className="w-full rounded-lg border border-border bg-white px-6 py-10 text-center shadow-soft sm:px-10 sm:py-12">
        <EmptyCartIllustration />

        <p className="mt-7 text-small font-semibold uppercase tracking-[0.16em] text-accent">
          Enquiry cart
        </p>
        <h1 className="mt-2.5 text-balance text-[clamp(1.45rem,1.15rem+1vw,1.85rem)] font-semibold leading-tight text-rich-black">
          Your enquiry cart is empty
        </h1>
        <p className="mx-auto mt-3 max-w-md text-body leading-relaxed text-muted">
          This is an enquiry list — not online checkout or payment. Add sarees
          you love, then send your selection on WhatsApp so our team can confirm
          availability.
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/sarees" className="w-full sm:w-auto sm:min-w-[11rem]">
            Browse Sarees
          </ButtonLink>
          <ButtonLink
            href="/new-arrivals"
            variant="secondary"
            className="w-full sm:w-auto sm:min-w-[11rem]"
          >
            New Arrivals
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export function CartPageContent() {
  const { items } = useEnquiryCart();
  const count = getEnquiryCartCount(items);
  const totalLabel = getEnquiryCartTotalLabel(items);
  const mrpTotal = items.reduce(
    (sum, item) =>
      sum + (cartItemOriginalPrice(item) ?? item.price) * item.quantity,
    0,
  );
  const savings = mrpTotal - getEnquiryCartTotal(items);

  function handleSendEnquiry() {
    if (items.length === 0) return;
    const url = whatsappOrderUrl(site.whatsappUrl, items, site.name);
    window.open(url, "_blank", "noopener,noreferrer");
    clearEnquiryCart();
    openEnquirySentModal();
  }

  if (items.length === 0) {
    return (
      <Section className="pt-6 sm:pt-8 lg:pt-10">
        <Container className="max-w-[40rem]">
          <EmptyCartState />
        </Container>
      </Section>
    );
  }

  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container className="max-w-[72rem]">
        <div className="max-w-2xl">
          <p className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
            Enquiry cart
          </p>
          <h1 className="mt-2 text-h1 text-balance">Your enquiry list</h1>
          <p className="mt-3 text-body text-muted">
            Review your sarees below, adjust quantities, then send an enquiry on
            WhatsApp. No payment is taken on this website.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,20rem)] lg:gap-10">
          <ul className="flex list-none flex-col gap-4 p-0">
            {items.map((item) => (
              <li key={getCartItemKey(item)}>
                <CartItemCard item={item} />
              </li>
            ))}
          </ul>

          <aside className="rounded-lg border border-border bg-white p-5 shadow-soft lg:sticky lg:top-[calc(var(--site-header-height)+1rem)]">
            <h2 className="text-body font-semibold text-rich-black">
              Enquiry summary
            </h2>
            <dl className="mt-4 flex flex-col gap-2.5 border-b border-border pb-4 text-small">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">
                  Price ({count} {count === 1 ? "item" : "items"})
                </dt>
                <dd className="text-rich-black">{formatPrice(mrpTotal)}</dd>
              </div>
              {savings > 0 ? (
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">Discount</dt>
                  <dd className="deal-save font-semibold">
                    −{formatPrice(savings)}
                  </dd>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-3 border-t border-dashed border-border pt-2.5">
                <dt className="text-body font-semibold text-rich-black">
                  Total
                </dt>
                <dd className="text-body font-bold text-rich-black">
                  {totalLabel}
                </dd>
              </div>
            </dl>
            {savings > 0 ? (
              <p className="deal-save mt-3 rounded-md bg-[rgb(22_128_61/0.08)] px-3 py-2 text-small font-semibold">
                You save {formatPrice(savings)} on this enquiry
              </p>
            ) : null}
            <p className="mt-4 text-small leading-relaxed text-muted">
              Enquiry value only — we confirm stock and details with you on
              WhatsApp.
            </p>
            <ExternalButtonLink
              href={whatsappOrderUrl(site.whatsappUrl, items, site.name)}
              className="mt-5 w-full"
              onClick={(event) => {
                event.preventDefault();
                handleSendEnquiry();
              }}
            >
              Send Enquiry on WhatsApp
            </ExternalButtonLink>
            <Button
              type="button"
              variant="secondary"
              className="mt-3 w-full"
              onClick={() => clearEnquiryCart()}
            >
              Clear cart
            </Button>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
