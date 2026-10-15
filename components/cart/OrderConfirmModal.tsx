"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { SocialIcon } from "@/components/layout/SocialIcons";
import { Button, ExternalButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { EnquiryLine, EnquirySummary } from "@/lib/enquiry-order";
import { formatPrice } from "@/lib/products";
import { site } from "@/lib/site";

export type OrderStage = "closed" | "review" | "opened";

type OrderConfirmModalProps = {
  stage: OrderStage;
  lines: readonly EnquiryLine[];
  summary: EnquirySummary;
  /** Pre-filled WhatsApp link; only followed when the visitor confirms. */
  whatsappUrl: string;
  onConfirm: () => void;
  onClose: () => void;
  onClearCart: () => void;
};

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SummaryRow({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className={className ?? "text-rich-black"}>{value}</dd>
    </div>
  );
}

export function OrderConfirmModal({
  stage,
  lines,
  summary,
  whatsappUrl,
  onConfirm,
  onClose,
  onClearCart,
}: OrderConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const open = stage !== "closed";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="fixed inset-0 z-[70] m-auto max-h-[min(92dvh,46rem)] w-[min(100%-1.5rem,34rem)] overflow-hidden rounded-lg border border-border bg-white p-0 text-rich-black shadow-card open:flex open:flex-col backdrop:bg-navy-deep/55"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {stage === "opened" ? (
        <div className="px-6 py-7 text-center sm:px-8 sm:py-8">
          <div
            className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-cream text-navy"
            aria-hidden="true"
          >
            <span className="flex scale-125">
              <SocialIcon id="whatsapp" />
            </span>
          </div>
          <h2 id={titleId} className="text-h3 text-rich-black">
            Continue in WhatsApp
          </h2>
          <p className="mt-3 text-body leading-relaxed text-muted">
            Your order enquiry is ready in WhatsApp. Tap <strong className="text-rich-black">Send</strong> there
            to share it with {site.name}. Our team will confirm stock, the final price and delivery details with you.
          </p>
          <p className="mt-3 text-small text-muted">
            No order has been placed and no payment has been taken. Your sarees stay in your enquiry list until you
            clear it.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            <Button type="button" className="w-full" onClick={onClose}>
              Done
            </Button>
            <ExternalButtonLink href={whatsappUrl} variant="secondary" className="w-full">
              WhatsApp didn&apos;t open? Try again
            </ExternalButtonLink>
            <button
              type="button"
              className="mx-auto min-h-9 px-2 text-small font-medium text-accent transition-colors hover:text-navy hover:underline"
              onClick={onClearCart}
            >
              Clear enquiry list
            </button>
          </div>
        </div>
      ) : (
        <>
          <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div>
              <h2 id={titleId} className="text-[1.15rem] font-semibold leading-snug text-rich-black">
                Review your order enquiry
              </h2>
              <p className="mt-1 text-small text-muted">
                Check your sarees before we open WhatsApp. Nothing is ordered or paid for yet.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              className="-mr-2 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-cream hover:text-navy"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
            <ul className="flex list-none flex-col divide-y divide-border p-0">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3.5 py-3.5 first:pt-0">
                  <div className="relative aspect-[2/3] w-14 shrink-0 overflow-hidden rounded-md bg-cream sm:w-16">
                    {line.image ? (
                      <Image src={line.image} alt="" fill sizes="4rem" className="object-cover" />
                    ) : (
                      <ImagePlaceholder label={line.name} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-small font-semibold leading-snug text-rich-black">{line.name}</p>
                    <p className="mt-0.5 text-[0.78rem] text-muted">
                      SKU {line.productId} · {line.colour}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
                      <div className="text-[0.82rem] leading-snug">
                        <p className="text-rich-black">
                          Qty {line.quantity} × {formatPrice(line.unitPrice)}
                        </p>
                        {line.originalPrice !== undefined && line.discountPercent !== null ? (
                          <p className="text-muted">
                            <span className="price-was line-through">{formatPrice(line.originalPrice)}</span>{" "}
                            <span className="deal-save font-semibold">{line.discountPercent}% off</span>
                          </p>
                        ) : null}
                      </div>
                      <p className="text-small font-bold tabular-nums text-rich-black">
                        {formatPrice(line.lineTotal)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-2 flex flex-col gap-2 rounded-md bg-cream/60 px-4 py-3.5 text-small">
              <SummaryRow
                label="Sarees"
                value={`${summary.uniqueCount} ${summary.uniqueCount === 1 ? "design" : "designs"}`}
              />
              <SummaryRow label="Total quantity" value={String(summary.totalQuantity)} />
              {summary.savings > 0 ? (
                <>
                  <SummaryRow label="Price (MRP)" value={formatPrice(summary.mrpTotal)} />
                  <SummaryRow
                    label="Discount"
                    value={`−${formatPrice(summary.savings)}`}
                    className="deal-save font-semibold"
                  />
                </>
              ) : null}
              <div className="mt-1 flex items-center justify-between gap-3 border-t border-dashed border-border-strong pt-2.5">
                <dt className="text-body font-semibold text-rich-black">Enquiry total</dt>
                <dd className="text-body font-bold text-rich-black">{formatPrice(summary.total)}</dd>
              </div>
            </dl>

            <p className="mt-3 text-[0.8rem] leading-relaxed text-muted">
              {site.name} confirms stock, the final price and delivery details on WhatsApp. No payment is taken on
              this website.
            </p>
          </div>

          <footer className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={onClose}>
              Go Back
            </Button>
            <ExternalButtonLink href={whatsappUrl} className="w-full gap-2 sm:w-auto" onClick={onConfirm}>
              <SocialIcon id="whatsapp" />
              Confirm &amp; Continue to WhatsApp
            </ExternalButtonLink>
          </footer>
        </>
      )}
    </dialog>
  );
}
