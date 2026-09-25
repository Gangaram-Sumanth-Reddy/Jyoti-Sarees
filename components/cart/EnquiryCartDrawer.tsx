"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { Button, ExternalButtonLink } from "@/components/ui/Button";
import {
  clearEnquiryCart,
  closeEnquiryCart,
  getEnquiryCartCount,
  getEnquiryCartTotalLabel,
  openEnquirySentModal,
  removeFromEnquiryCart,
  setEnquiryQuantity,
  useEnquiryCart,
} from "@/lib/enquiry-cart";
import { productHref, whatsappOrderUrl } from "@/lib/products";
import { site } from "@/lib/site";

export function EnquiryCartDrawer() {
  const { items, open } = useEnquiryCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const count = getEnquiryCartCount(items);
  const totalLabel = getEnquiryCartTotalLabel(items);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleSendOrder() {
    if (items.length === 0) return;
    const url = whatsappOrderUrl(site.whatsappUrl, items, site.name);
    window.open(url, "_blank", "noopener,noreferrer");
    clearEnquiryCart();
    openEnquirySentModal();
  }

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[60] m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 open:flex open:justify-end backdrop:bg-navy-deep/45"
      aria-labelledby={titleId}
      onClose={closeEnquiryCart}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeEnquiryCart();
      }}
    >
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-card">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 id={titleId} className="text-body font-semibold text-rich-black">
              Enquiry Basket
            </h2>
            <p className="mt-1 text-small text-muted">
              This is an enquiry list — not online payment. Send your selection
              on WhatsApp and our team will confirm availability.
            </p>
          </div>
          <button
            type="button"
            onClick={closeEnquiryCart}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-pill text-navy hover:bg-cream"
            aria-label="Close enquiry basket"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center">
              <p className="text-body font-semibold text-rich-black">
                Your enquiry basket is empty
              </p>
              <p className="mt-2 text-small text-muted">
                Add sarees from the catalogue to build your WhatsApp order
                request.
              </p>
              <div className="mt-6">
                <Button type="button" variant="secondary" onClick={closeEnquiryCart}>
                  Continue browsing
                </Button>
              </div>
            </div>
          ) : (
            <ul className="flex list-none flex-col gap-4 p-0">
              {items.map((item) => (
                <li
                  key={item.slug}
                  className="rounded-md border border-border bg-cream/60 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={productHref(item.slug)}
                        className="font-semibold text-rich-black hover:text-accent"
                        onClick={closeEnquiryCart}
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-small text-muted">
                        {item.productId} · {item.colour} · {item.fabric}
                      </p>
                      <p className="mt-1 text-small font-semibold text-navy">
                        {item.priceLabel}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-small font-semibold text-muted hover:text-navy"
                      onClick={() => removeFromEnquiryCart(item.slug)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-small text-muted">Qty</span>
                    <div className="inline-flex items-center rounded-pill border border-border bg-white">
                      <button
                        type="button"
                        className="inline-flex min-h-9 min-w-9 items-center justify-center text-navy"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() =>
                          setEnquiryQuantity(item.slug, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-small font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="inline-flex min-h-9 min-w-9 items-center justify-center text-navy"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() =>
                          setEnquiryQuantity(item.slug, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-border px-5 py-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-small text-muted">
                {count} {count === 1 ? "item" : "items"} · enquiry value
              </p>
              <p className="text-body font-semibold text-rich-black">
                {totalLabel}
              </p>
            </div>
            <ExternalButtonLink
              href={whatsappOrderUrl(site.whatsappUrl, items, site.name)}
              className="w-full"
              onClick={(event) => {
                event.preventDefault();
                handleSendOrder();
              }}
            >
              Send Order on WhatsApp
            </ExternalButtonLink>
            <p className="mt-3 text-center text-[0.75rem] leading-relaxed text-muted">
              No payment is taken online. We will confirm stock and order details
              with you on WhatsApp.
            </p>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
