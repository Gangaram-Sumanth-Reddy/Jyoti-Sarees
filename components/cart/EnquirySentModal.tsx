"use client";

import { useEffect, useId, useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  closeEnquirySentModal,
  useEnquiryCart,
} from "@/lib/enquiry-cart";

export function EnquirySentModal() {
  const { sentOpen } = useEnquiryCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (sentOpen && !dialog.open) dialog.showModal();
    if (!sentOpen && dialog.open) dialog.close();
  }, [sentOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[70] m-auto max-h-[min(90dvh,28rem)] w-[min(100%-2rem,26rem)] rounded-lg border border-border bg-white p-0 text-rich-black shadow-card open:flex open:flex-col backdrop:bg-navy-deep/50"
      aria-labelledby={titleId}
      onClose={closeEnquirySentModal}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeEnquirySentModal();
      }}
    >
      <div className="px-6 py-7 text-center sm:px-8 sm:py-8">
        <div
          className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-cream text-navy"
          aria-hidden="true"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M5 11.5 9 15.5 17 6.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 id={titleId} className="text-h3 text-rich-black">
          Enquiry Sent Successfully
        </h2>
        <p className="mt-3 text-body leading-relaxed text-muted">
          Your saree enquiry has been shared with our team on WhatsApp. Our team
          will contact you to confirm availability and order details.
        </p>
        <div className="mt-7">
          <Button type="button" className="w-full" onClick={closeEnquirySentModal}>
            Continue browsing
          </Button>
        </div>
      </div>
    </dialog>
  );
}
