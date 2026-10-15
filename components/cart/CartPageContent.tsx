"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EmptyCartIllustration } from "@/components/cart/EmptyCartIllustration";
import { OrderConfirmModal, type OrderStage } from "@/components/cart/OrderConfirmModal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PriceOffer } from "@/components/ui/PriceOffer";
import { Section } from "@/components/ui/Section";
import {
  clearEnquiryCart,
  ENQUIRY_MAX_QUANTITY,
  removeFromEnquiryCart,
  setEnquiryQuantity,
  useEnquiryCart,
} from "@/lib/enquiry-cart";
import {
  buildEnquiryOrderMessage,
  getEnquiryLines,
  summarizeEnquiry,
  type EnquiryLine,
} from "@/lib/enquiry-order";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/cn";
import { useProductShare } from "@/components/product/ProductShareButton";
import { useSiteOrigin } from "@/lib/use-site-origin";
import { whatsappMessageUrl } from "@/lib/whatsapp";

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

function CartItemCard({ line }: { line: EnquiryLine }) {
  const { share, copied } = useProductShare(line.href);
  const lineSavings = line.lineOriginalTotal - line.lineTotal;

  return (
    <Card className="overflow-hidden p-0 shadow-soft">
      <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3.5 p-3.5 min-[400px]:grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5 sm:p-5">
        <Link href={line.href} className="block min-w-0">
          <ImageFrame aspect={line.image ? "saree" : "card"} radius="md" className="shadow-none">
            {line.image ? (
              <Image
                src={line.image}
                alt={`${line.name} saree`}
                fill
                sizes="(min-width: 640px) 9rem, 6.5rem"
              />
            ) : (
              <ImagePlaceholder label={line.name} />
            )}
          </ImageFrame>
        </Link>

        <div className="flex min-w-0 flex-col">
          <Link
            href={line.href}
            className="text-[0.975rem] font-semibold leading-snug text-rich-black transition-colors hover:text-accent sm:text-[1.05rem]"
          >
            {line.name}
          </Link>
          <p className="mt-1 text-small text-muted">
            SKU {line.productId}
            {line.fabric ? ` · ${line.fabric}` : ""}
          </p>
          <p className="mt-1 text-small font-medium text-navy">Colour: {line.colour}</p>
          <PriceOffer
            className="mt-2"
            sellingPrice={line.unitPrice}
            originalPrice={line.originalPrice}
            sellingLabel={formatPrice(line.unitPrice)}
          />

          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2.5 pt-3 sm:mt-4 sm:pt-0">
            <div
              role="group"
              aria-label={`Quantity of ${line.name}`}
              className="inline-flex items-center rounded-pill border-2 border-navy bg-white text-navy"
            >
              <button
                type="button"
                className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-l-pill transition-colors hover:bg-cream"
                aria-label={
                  line.quantity === 1 ? `Remove ${line.name}` : `Decrease quantity of ${line.name}`
                }
                onClick={() => setEnquiryQuantity(line.slug, line.quantity - 1, line.colour)}
              >
                {line.quantity === 1 ? (
                  <TrashIcon />
                ) : (
                  <span className="text-lg font-semibold leading-none">−</span>
                )}
              </button>
              <span
                className="min-w-7 text-center text-small font-bold tabular-nums text-rich-black"
                aria-live="polite"
              >
                {line.quantity}
              </span>
              <button
                type="button"
                className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-r-pill text-lg font-semibold leading-none transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`Increase quantity of ${line.name}`}
                disabled={line.quantity >= ENQUIRY_MAX_QUANTITY}
                onClick={() => setEnquiryQuantity(line.slug, line.quantity + 1, line.colour)}
              >
                +
              </button>
            </div>

            <div className="flex items-center text-small">
              <button
                type="button"
                className="min-h-9 px-0.5 font-medium text-accent transition-colors hover:text-navy hover:underline"
                aria-label={`Remove ${line.name}`}
                onClick={() => removeFromEnquiryCart(line.slug, line.colour)}
              >
                Remove
              </button>
              <span className="mx-2.5 h-4 w-px bg-border-strong" aria-hidden="true" />
              <button
                type="button"
                className="min-h-9 px-0.5 font-medium text-accent transition-colors hover:text-navy hover:underline"
                aria-label={`Share ${line.name}`}
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

            <div className="w-full text-small sm:ml-auto sm:w-auto sm:text-right">
              <span className="text-muted">Item total{line.quantity > 1 ? ` (${line.quantity})` : ""}: </span>
              <span className="font-bold tabular-nums text-rich-black">{formatPrice(line.lineTotal)}</span>
              {lineSavings > 0 ? (
                <span className="deal-save block text-[0.78rem] font-semibold">
                  You save {formatPrice(lineSavings)}
                </span>
              ) : null}
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
  const origin = useSiteOrigin();
  const [stage, setStage] = useState<OrderStage>("closed");
  const lines = getEnquiryLines(items);
  const summary = summarizeEnquiry(lines);
  const whatsappUrl = whatsappMessageUrl(buildEnquiryOrderMessage(lines, origin));

  function clearCart() {
    if (window.confirm("Remove all sarees from your enquiry list?")) {
      setStage("closed");
      clearEnquiryCart();
    }
  }

  if (lines.length === 0) {
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
            Review your sarees, adjust quantities, then proceed to order. We
            confirm stock and final details with you on WhatsApp — no payment is
            taken on this website.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,20rem)] lg:gap-10">
          <ul className="flex list-none flex-col gap-4 p-0">
            {lines.map((line) => (
              <li key={line.key}>
                <CartItemCard line={line} />
              </li>
            ))}
          </ul>

          <aside className="rounded-lg border border-border bg-white p-5 shadow-soft lg:sticky lg:top-[calc(var(--site-header-height)+1rem)]">
            <h2 className="text-body font-semibold text-rich-black">Order summary</h2>
            <dl className="mt-4 flex flex-col gap-2.5 border-b border-border pb-4 text-small">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Sarees</dt>
                <dd className="text-rich-black">
                  {summary.uniqueCount} {summary.uniqueCount === 1 ? "design" : "designs"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Total quantity</dt>
                <dd className="tabular-nums text-rich-black">{summary.totalQuantity}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Price (MRP)</dt>
                <dd className="tabular-nums text-rich-black">{formatPrice(summary.mrpTotal)}</dd>
              </div>
              {summary.savings > 0 ? (
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">Discount</dt>
                  <dd className="deal-save font-semibold tabular-nums">
                    −{formatPrice(summary.savings)}
                  </dd>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-3 border-t border-dashed border-border pt-2.5">
                <dt className="text-body font-semibold text-rich-black">Enquiry total</dt>
                <dd className="text-body font-bold tabular-nums text-rich-black">
                  {formatPrice(summary.total)}
                </dd>
              </div>
            </dl>
            {summary.savings > 0 ? (
              <p className="deal-save mt-3 rounded-md bg-[rgb(22_128_61/0.08)] px-3 py-2 text-small font-semibold">
                You save {formatPrice(summary.savings)} on this enquiry
              </p>
            ) : null}
            <p className="mt-4 text-small leading-relaxed text-muted">
              Enquiry value only — we confirm stock, the final price and delivery
              with you on WhatsApp.
            </p>
            <Button type="button" className="mt-5 w-full" onClick={() => setStage("review")}>
              Proceed to Order
            </Button>
            <Button type="button" variant="secondary" className="mt-3 w-full" onClick={clearCart}>
              Clear cart
            </Button>
          </aside>
        </div>
      </Container>

      <OrderConfirmModal
        stage={stage}
        lines={lines}
        summary={summary}
        whatsappUrl={whatsappUrl}
        onConfirm={() => setStage("opened")}
        onClose={() => setStage("closed")}
        onClearCart={clearCart}
      />
    </Section>
  );
}
