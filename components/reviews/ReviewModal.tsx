"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  FormPrivacyNotice,
  HoneypotField,
} from "@/components/privacy/FormPrivacyBits";
import { STAR_PATH } from "@/components/reviews/Stars";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { FieldMarker, Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import { submitForm } from "@/lib/form-submission";
import {
  emptyReviewSubmission,
  reviewLimits,
  reviewPublicationConsentText,
  validateReview,
  type ReviewErrors,
  type ReviewSubmission,
} from "@/lib/reviews";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const ratingWords = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

type ReviewModalProps = {
  open: boolean;
  onClose: () => void;
  productSlug: string;
  productName: string;
  /** False when the server has no review storage configured. */
  configured: boolean;
};

function StarInput({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}) {
  const [hover, setHover] = useState(0);
  const name = useId();
  const errorId = `${name}-error`;
  const shown = hover || value;

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-small font-semibold tracking-[0.04em] text-navy">
        Your rating
        <FieldMarker required />
      </legend>
      <div className="mt-2 flex items-center gap-3">
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={star}
              onMouseEnter={() => setHover(star)}
              className="cursor-pointer rounded-md p-0.5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-navy"
            >
              <input
                type="radio"
                name={name}
                value={star}
                checked={value === star}
                onChange={() => onChange(star)}
                className="sr-only"
                aria-label={`${star} star${star === 1 ? "" : "s"} – ${ratingWords[star]}`}
              />
              <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d={STAR_PATH}
                  className={cn(
                    "transition-colors",
                    star <= shown
                      ? "fill-[#f2a20c] stroke-[#f2a20c]"
                      : "fill-transparent stroke-border-strong",
                  )}
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
          ))}
        </div>
        <span className="text-small font-semibold text-rich-black" aria-hidden="true">
          {ratingWords[shown]}
        </span>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-small font-semibold text-navy-deep">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function ReviewModal({
  open,
  onClose,
  productSlug,
  productName,
  configured,
}: ReviewModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [form, setForm] = useState<ReviewSubmission>(() => emptyReviewSubmission(productSlug));
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [reference, setReference] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const pending = useRef(false);

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

  function handleClose() {
    onClose();
    if (status === "success") {
      setForm(emptyReviewSubmission(productSlug));
      setStatus("idle");
      setReference("");
      pending.current = false;
    }
  }

  function updateField<K extends keyof ReviewSubmission>(key: K, value: ReviewSubmission[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const nextErrors = validateReview(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    pending.current = true;
    setStatus("submitting");
    const result = await submitForm("/api/reviews", form, honeypot);
    if (result.ok) {
      setReference(result.reference);
      setStatus("success");
      return;
    }
    pending.current = false;
    if (result.errors) setErrors(result.errors as ReviewErrors);
    setErrorMessage(result.message);
    setStatus("error");
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={handleClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
      className="testimonial-dialog fixed inset-0 z-[70] m-auto max-h-[min(92dvh,46rem)] w-[min(100%-2rem,35rem)] overflow-y-auto overscroll-contain rounded-xl border border-border bg-white p-0 text-rich-black shadow-card backdrop:bg-navy-deep/50 backdrop:backdrop-blur-[3px]"
    >
      <div className="relative px-5 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-8">
        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          className="absolute right-2.5 top-2.5 inline-flex size-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-navy sm:right-4 sm:top-4 sm:size-10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {status === "success" ? (
          <div role="status" className="py-4 text-center sm:py-6">
            <div
              className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-cream text-navy"
              aria-hidden="true"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5 11.5 9 15.5 17 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 id={titleId} className="text-h3 text-rich-black">
              Thank you for your review!
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-body leading-relaxed text-muted">
              Your review is <span className="font-semibold text-navy">pending approval</span>.
              Our team checks every review before it is published, so it won&apos;t
              appear on this page straight away.
            </p>
            {reference ? (
              <p className="mt-2 text-small text-muted">Reference: {reference}</p>
            ) : null}
            <Button type="button" size="lg" className="mt-7 w-full sm:w-auto" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="pr-10">
              <h2 id={titleId} className="text-h3 text-rich-black">
                Write a Review
              </h2>
              <p className="mt-2 text-body leading-relaxed text-muted">{productName}</p>
            </div>

            {!configured ? (
              <div role="alert" className="mt-6 rounded-lg bg-cream px-4 py-4 text-body leading-relaxed text-rich-black">
                <p className="font-semibold text-navy">Reviews aren&apos;t open yet</p>
                <p className="mt-1.5">
                  Our review inbox hasn&apos;t been set up, so we can&apos;t receive
                  reviews on the website right now. We&apos;d still love to hear from
                  you on WhatsApp.
                </p>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-semibold text-navy underline underline-offset-2 hover:text-accent"
                >
                  Share feedback on WhatsApp
                </a>
              </div>
            ) : (
              <form className="relative mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
                <StarInput
                  value={form.rating}
                  onChange={(value) => updateField("rating", value)}
                  error={errors.rating}
                />
                <Input
                  name="review-name"
                  label="Your name"
                  placeholder="First name is fine"
                  autoComplete="given-name"
                  maxLength={reviewLimits.name}
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  error={errors.name}
                  required
                />
                <Input
                  name="review-title"
                  label="Review title"
                  placeholder="e.g. Beautiful drape and rich colour"
                  maxLength={reviewLimits.title}
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  error={errors.title}
                  required
                />
                <Textarea
                  name="review-body"
                  label="Your review"
                  placeholder="What did you like about the fabric, colour and finish?"
                  rows={5}
                  maxLength={reviewLimits.body}
                  value={form.body}
                  onChange={(event) => updateField("body", event.target.value)}
                  error={errors.body}
                  required
                />

                <HoneypotField value={honeypot} onChange={setHoneypot} />

                <Checkbox
                  id="review-publication-consent"
                  name="publicationConsent"
                  checked={form.publicationConsent}
                  onChange={(event) => updateField("publicationConsent", event.target.checked)}
                  error={errors.publicationConsent}
                  required
                >
                  {reviewPublicationConsentText}
                </Checkbox>

                {errors.productSlug ? (
                  <p role="alert" className="text-small font-semibold text-navy-deep">
                    {errors.productSlug}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p role="alert" className="text-small font-semibold text-navy-deep">
                    {errorMessage || "Something went wrong while sending your review. Please try again."}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="mt-1 w-full"
                >
                  {status === "submitting" ? "Submitting…" : "Submit Review"}
                </Button>

                <FormPrivacyNotice openInNewTab>
                  Reviews are checked by our team before they are published. We use
                  these details only for that. See our
                </FormPrivacyNotice>
              </form>
            )}
          </>
        )}
      </div>
    </dialog>
  );
}
