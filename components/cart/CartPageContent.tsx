"use client";

import Link from "next/link";
import { EmptyCartIllustration } from "@/components/cart/EmptyCartIllustration";
import { Button, ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import {
  clearEnquiryCart,
  getCartItemKey,
  getEnquiryCartCount,
  getEnquiryCartTotalLabel,
  openEnquirySentModal,
  removeFromEnquiryCart,
  setEnquiryQuantity,
  useEnquiryCart,
  type EnquiryCartItem,
} from "@/lib/enquiry-cart";
import { cartItemHref, whatsappOrderUrl } from "@/lib/products";
import { site } from "@/lib/site";

function CartItemCard({ item }: { item: EnquiryCartItem }) {
  const href = cartItemHref(item);

  return (
    <Card className="overflow-hidden p-0 shadow-soft">
      <div className="grid gap-4 p-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5 sm:p-5">
        <Link href={href} className="block min-w-0">
          <ImageFrame aspect="card" radius="md" className="shadow-none">
            <ImagePlaceholder label={item.name} />
          </ImageFrame>
        </Link>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={href}
                className="text-[1.05rem] font-semibold text-rich-black transition-colors hover:text-accent"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-small text-muted">
                {item.productId} · {item.fabric}
              </p>
              <p className="mt-1 text-small font-medium text-navy">
                Colour: {item.colour}
              </p>
              <p className="mt-2 text-body font-semibold text-rich-black">
                {item.priceLabel}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 text-small font-semibold text-muted transition-colors hover:text-navy"
              onClick={() => removeFromEnquiryCart(item.slug, item.colour)}
            >
              Remove
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-small text-muted">Qty</span>
            <div className="inline-flex items-center overflow-hidden rounded-pill border border-navy bg-navy text-white">
              <button
                type="button"
                className="inline-flex min-h-9 min-w-9 items-center justify-center text-lg font-semibold transition-colors hover:bg-navy-mid"
                aria-label={`Decrease quantity of ${item.name}`}
                onClick={() =>
                  setEnquiryQuantity(item.slug, item.quantity - 1, item.colour)
                }
              >
                −
              </button>
              <span className="min-w-8 text-center text-small font-semibold tabular-nums">
                {item.quantity}
              </span>
              <button
                type="button"
                className="inline-flex min-h-9 min-w-9 items-center justify-center text-lg font-semibold transition-colors hover:bg-navy-mid disabled:opacity-40"
                aria-label={`Increase quantity of ${item.name}`}
                disabled={item.quantity >= 99}
                onClick={() =>
                  setEnquiryQuantity(item.slug, item.quantity + 1, item.colour)
                }
              >
                +
              </button>
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

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,20rem)] lg:gap-10">
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
            <div className="mt-4 flex items-center justify-between gap-3 border-b border-border pb-4">
              <p className="text-small text-muted">
                {count} {count === 1 ? "item" : "items"}
              </p>
              <p className="text-body font-semibold text-rich-black">
                {totalLabel}
              </p>
            </div>
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
