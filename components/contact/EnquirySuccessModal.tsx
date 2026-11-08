"use client";

import { useEffect, useId, useRef } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export type SentEnquiry = { reference: string; firstName: string };

type EnquirySuccessModalProps = {
  sent: SentEnquiry | null;
  onClose: () => void;
};

/** Shown only after the server confirms the enquiry was saved. */
export function EnquirySuccessModal({ sent, onClose }: EnquirySuccessModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const open = sent !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="testimonial-dialog fixed inset-0 z-[70] m-auto max-h-[min(92dvh,36rem)] w-[min(100%-2rem,28rem)] overflow-y-auto overscroll-contain rounded-xl border border-border bg-white p-0 text-rich-black shadow-card backdrop:bg-navy-deep/50 backdrop:backdrop-blur-[3px]"
    >
      {sent ? (
        <div role="status" className="relative px-6 pb-7 pt-9 text-center sm:px-9 sm:pb-9 sm:pt-10">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-2.5 top-2.5 inline-flex size-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-navy sm:size-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div
            className="success-badge mx-auto flex size-16 items-center justify-center rounded-full bg-navy text-white ring-8 ring-cream"
            aria-hidden="true"
          >
            <svg width="30" height="30" viewBox="0 0 22 22" fill="none" className="success-check">
              <path
                d="M5 11.5 9 15.5 17 6.5"
                pathLength={1}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="mt-6 text-small font-semibold uppercase tracking-[0.16em] text-accent">
            Enquiry received
          </p>
          <h2 id={titleId} className="mt-2 text-h3 text-rich-black">
            Thank you{sent.firstName ? `, ${sent.firstName}` : ""}!
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-body leading-relaxed text-muted">
            Your enquiry has reached the Jyoti Sarees team. We&apos;ll check the
            details and connect with you on your contact number shortly to help
            you find the right saree.
          </p>

          <dl className="mx-auto mt-6 grid max-w-xs gap-1 rounded-lg bg-cream px-4 py-3 text-small">
            <dt className="text-muted">Your reference</dt>
            <dd className="font-semibold tracking-[0.08em] text-navy">{sent.reference}</dd>
          </dl>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <ButtonLink href="/sarees" onClick={onClose} className="w-full">
              Browse sarees
            </ButtonLink>
            <Button type="button" variant="secondary" onClick={onClose} className="w-full">
              Done
            </Button>
          </div>

          <p className="mt-5 text-small leading-relaxed text-muted">
            Need help sooner? Call{" "}
            <a href={site.phones[0].href} className="font-semibold text-navy underline-offset-2 hover:underline">
              {site.phones[0].display}
            </a>{" "}
            ({site.hours.opens} – {site.hours.closes}).
          </p>
        </div>
      ) : null}
    </dialog>
  );
}
