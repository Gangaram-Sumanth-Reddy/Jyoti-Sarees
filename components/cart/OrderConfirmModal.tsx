"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { SocialIcon } from "@/components/layout/SocialIcons";
import { FormPrivacyNotice, HoneypotField } from "@/components/privacy/FormPrivacyBits";
import { Button, ExternalButtonLink } from "@/components/ui/Button";
import { CountryCodeSelect } from "@/components/ui/CountryCodeSelect";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Input } from "@/components/ui/Input";
import { getPhoneCountry } from "@/lib/contact";
import { cn } from "@/lib/cn";
import {
  buildEnquiryOrderMessage,
  createEnquiryId,
  emptyOrderCustomer,
  validateOrderCustomer,
  type EnquiryLine,
  type EnquirySummary,
  type OrderCustomer,
  type OrderCustomerErrors,
  type OrderEnquiryPayload,
} from "@/lib/enquiry-order";
import { submitForm } from "@/lib/form-submission";
import { formatPrice } from "@/lib/products";
import { site } from "@/lib/site";
import { whatsappMessageUrl } from "@/lib/whatsapp";

export type OrderStage = "closed" | "review" | "opened";

type OrderConfirmModalProps = {
  stage: OrderStage;
  lines: readonly EnquiryLine[];
  summary: EnquirySummary;
  /** Site origin for absolute product links in the WhatsApp message. */
  origin: string;
  onSaved: () => void;
  onClose: () => void;
  onClearCart: () => void;
};

type SaveState =
  | { status: "idle" }
  | { status: "saving" }
  | { status: "failed"; message: string };

type SavedEnquiry = { enquiryId: string; whatsappUrl: string; whatsappOpened: boolean };

/** Missing or invalid fields are marked by their outline only; the reason is announced to screen readers. */
const invalidFieldClass =
  "!border-[#c2410c] ring-4 ring-[#c2410c]/10 focus-visible:!border-[#c2410c] focus-within:!border-[#c2410c]";

const SAVE_FAILED_MESSAGE = "Please check your connection and tap Retry.";

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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

/** Opens WhatsApp in a new tab; returns false when the browser blocked it. */
function openWhatsApp(url: string) {
  const tab = window.open(url, "_blank");
  if (!tab) return false;
  tab.opener = null;
  return true;
}

export function OrderConfirmModal({
  stage,
  lines,
  summary,
  origin,
  onSaved,
  onClose,
  onClearCart,
}: OrderConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const formId = useId();
  const open = stage !== "closed";

  const [customer, setCustomer] = useState<OrderCustomer>(emptyOrderCustomer);
  const [errors, setErrors] = useState<OrderCustomerErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [saveState, setSaveState] = useState<SaveState>({ status: "idle" });
  const [saved, setSaved] = useState<SavedEnquiry | null>(null);
  const enquiryId = useRef<{ id: string; signature: string } | null>(null);
  const saving = useRef(false);

  const phoneCountry = getPhoneCountry(customer.countryIso);
  const busy = saveState.status === "saving";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function close() {
    if (saving.current) return;
    if (saved) {
      enquiryId.current = null;
      setSaved(null);
    }
    setSaveState({ status: "idle" });
    onClose();
  }

  function updateCustomer<K extends keyof OrderCustomer>(key: K, value: string) {
    setCustomer((current) => {
      if (key === "mobile") {
        return { ...current, mobile: value.replace(/\D/g, "").slice(0, getPhoneCountry(current.countryIso).digits) };
      }
      if (key === "countryIso") {
        return { ...current, countryIso: value, mobile: current.mobile.slice(0, getPhoneCountry(value).digits) };
      }
      return { ...current, [key]: value };
    });
    setErrors((current) => {
      const field = key === "countryIso" ? "mobile" : key;
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving.current) return;

    const nextErrors = validateOrderCustomer(customer);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSaveState({ status: "idle" });
      const field = nextErrors.fullName ? "fullName" : "mobile";
      dialogRef.current?.querySelector<HTMLInputElement>(`[name="${field}"]`)?.focus();
      return;
    }

    saving.current = true;
    setSaveState({ status: "saving" });
    if (saved) setSaved(null);
    const details = {
      ...customer,
      fullName: customer.fullName.trim(),
      items: lines.map((line) => ({ slug: line.slug, colour: line.colour, quantity: line.quantity })),
    };
    // A retry of exactly the same details reuses the ID, so the sheet ignores the repeat.
    const signature = JSON.stringify(details);
    if (saved || !enquiryId.current || enquiryId.current.signature !== signature) {
      enquiryId.current = { id: createEnquiryId(), signature };
    }
    const id = enquiryId.current.id;
    const payload: OrderEnquiryPayload = { ...details, enquiryId: id };

    const result = await submitForm("/api/order-enquiries", payload, honeypot);
    saving.current = false;

    if (!result.ok) {
      const fieldErrors = (result.errors ?? {}) as OrderCustomerErrors & { items?: string };
      setErrors({ fullName: fieldErrors.fullName, mobile: fieldErrors.mobile });
      setSaveState({
        status: "failed",
        message: fieldErrors.items ?? (result.errors ? result.message : `${result.message} ${SAVE_FAILED_MESSAGE}`),
      });
      return;
    }

    const whatsappUrl = whatsappMessageUrl(buildEnquiryOrderMessage(lines, origin, customer, id));
    setSaveState({ status: "idle" });
    setSaved({ enquiryId: id, whatsappUrl, whatsappOpened: openWhatsApp(whatsappUrl) });
    onSaved();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-busy={busy || undefined}
      className="fixed inset-0 z-[70] m-auto max-h-[min(92dvh,50rem)] w-[min(100%-1.5rem,40rem)] overflow-hidden rounded-lg border border-border bg-white p-0 text-rich-black shadow-card open:flex open:flex-col backdrop:bg-navy-deep/55 [@media(max-height:34rem)]:overflow-y-auto"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      {stage === "opened" && saved ? (
        <div className="overflow-y-auto px-6 py-7 text-center sm:px-8 sm:py-8">
          <div
            className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-cream text-navy"
            aria-hidden="true"
          >
            <span className="flex scale-125">
              <SocialIcon id="whatsapp" />
            </span>
          </div>
          <h2 id={titleId} className="text-h3 text-rich-black">
            {saved.whatsappOpened ? "Continue in WhatsApp" : "Enquiry saved"}
          </h2>
          <p className="mt-2 text-small text-muted">
            Enquiry ID{" "}
            <strong className="font-semibold tracking-[0.04em] text-rich-black">{saved.enquiryId}</strong>
          </p>
          <p className="mt-3 text-body leading-relaxed text-muted">
            {saved.whatsappOpened ? (
              <>
                Your enquiry is saved and ready in WhatsApp. Tap <strong className="text-rich-black">Send</strong>{" "}
                there to share it with {site.name}.
              </>
            ) : (
              <>
                We have your details. Open WhatsApp and tap <strong className="text-rich-black">Send</strong> to
                share your enquiry with {site.name}.
              </>
            )}{" "}
            Our team will confirm stock, the final price and delivery details with you.
          </p>
          <p className="mt-3 text-small text-muted">
            No order has been placed and no payment has been taken. Your sarees stay in your enquiry list until you
            clear it.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            {saved.whatsappOpened ? (
              <>
                <Button type="button" className="w-full" onClick={close}>
                  Done
                </Button>
                <ExternalButtonLink href={saved.whatsappUrl} variant="secondary" className="w-full">
                  WhatsApp didn&apos;t open? Try again
                </ExternalButtonLink>
              </>
            ) : (
              <>
                <ExternalButtonLink href={saved.whatsappUrl} className="w-full gap-2">
                  <SocialIcon id="whatsapp" />
                  Open WhatsApp
                </ExternalButtonLink>
                <Button type="button" variant="secondary" className="w-full" onClick={close}>
                  Done
                </Button>
              </>
            )}
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
                Check your sarees and add your details. Nothing is ordered or paid for yet.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              disabled={busy}
              className="-mr-2 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-cream hover:text-navy disabled:opacity-40"
              onClick={close}
            >
              <CloseIcon />
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6 [@media(max-height:34rem)]:flex-none [@media(max-height:34rem)]:overflow-visible">
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

            <form id={formId} className="relative mt-5" onSubmit={handleSubmit} noValidate>
              <fieldset disabled={busy} className="m-0 min-w-0 border-0 p-0">
                <legend className="p-0 text-body font-semibold text-rich-black">Your details</legend>
                <p className="mt-0.5 text-small text-muted">So our team can reply to your enquiry on WhatsApp.</p>
                <div className="mt-3 grid gap-x-4 gap-y-3 sm:grid-cols-2">
                  <Input
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={100}
                    value={customer.fullName}
                    onChange={(event) => updateCustomer("fullName", event.target.value)}
                    aria-invalid={Boolean(errors.fullName) || undefined}
                    className={cn(errors.fullName && invalidFieldClass)}
                    required
                  />
                  <div className="flex w-full min-w-0 flex-col gap-2">
                    <label
                      htmlFor={`${formId}-mobile`}
                      className="text-small font-semibold tracking-[0.04em] text-navy"
                    >
                      WhatsApp Number <span className="text-accent">*</span>
                    </label>
                    <div
                      className={cn(
                        "flex min-h-11 min-w-0 overflow-visible rounded-md border border-border bg-surface transition-[border-color,box-shadow] duration-200 hover:border-border-strong focus-within:border-navy focus-within:ring-4 focus-within:ring-navy/10",
                        errors.mobile && invalidFieldClass,
                      )}
                    >
                      <CountryCodeSelect
                        valueIso={customer.countryIso}
                        onChange={(country) => updateCustomer("countryIso", country.iso)}
                      />
                      <input
                        id={`${formId}-mobile`}
                        name="mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder={`${phoneCountry.digits}-digit number`}
                        value={customer.mobile}
                        maxLength={phoneCountry.digits}
                        aria-invalid={Boolean(errors.mobile) || undefined}
                        onChange={(event) => updateCustomer("mobile", event.target.value)}
                        className="min-w-0 flex-1 border-0 bg-transparent px-3 text-body text-navy outline-none placeholder:text-subtle"
                        required
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
              <HoneypotField value={honeypot} onChange={setHoneypot} />
            </form>

            {saveState.status === "failed" ? (
              <div
                role="alert"
                className="mt-4 rounded-md border border-navy-deep/25 bg-cream px-4 py-3 text-small leading-relaxed text-navy-deep"
              >
                <p className="font-semibold">Your enquiry was not saved, so WhatsApp has not been opened.</p>
                <p className="mt-0.5">{saveState.message}</p>
              </div>
            ) : null}

            <FormPrivacyNotice className="mt-4" openInNewTab />
          </div>

          <footer className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 min-[520px]:flex-row min-[520px]:justify-end sm:px-6">
            <Button
              type="button"
              variant="secondary"
              className="w-full min-[520px]:w-auto"
              disabled={busy}
              onClick={close}
            >
              Go Back
            </Button>
            <Button type="submit" form={formId} className="w-full gap-2 min-[520px]:w-auto" disabled={busy}>
              {busy ? <Spinner /> : <SocialIcon id="whatsapp" />}
              {busy
                ? "Saving your enquiry…"
                : saveState.status === "failed"
                  ? "Retry & Continue to WhatsApp"
                  : "Confirm & Continue to WhatsApp"}
            </Button>
          </footer>
          <p className="sr-only" role="status" aria-live="polite">
            {busy ? "Saving your enquiry" : [errors.fullName, errors.mobile].filter(Boolean).join(" ")}
          </p>
        </>
      )}
    </dialog>
  );
}
