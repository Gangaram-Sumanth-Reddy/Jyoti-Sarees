"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  FormPrivacyNotice,
  HoneypotField,
} from "@/components/privacy/FormPrivacyBits";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input, Textarea } from "@/components/ui/Input";
import { SearchableField } from "@/components/ui/SearchableField";
import { submitForm } from "@/lib/form-submission";
import { privacyConfig } from "@/lib/privacy-config";
import {
  emptyTestimonialSubmission,
  testimonialSareeOptions,
  validateTestimonial,
  type TestimonialErrors,
  type TestimonialSubmission,
} from "@/lib/testimonial-submissions";

type Status = "idle" | "submitting" | "success" | "error";

type TestimonialModalProps = {
  open: boolean;
  onClose: () => void;
};

export function TestimonialModal({ open, onClose }: TestimonialModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [form, setForm] = useState<TestimonialSubmission>(emptyTestimonialSubmission);
  const [errors, setErrors] = useState<TestimonialErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

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
      setForm(emptyTestimonialSubmission);
      setStatus("idle");
    }
  }

  function updateField<K extends keyof TestimonialSubmission>(
    key: K,
    value: TestimonialSubmission[K],
  ) {
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
    const nextErrors = validateTestimonial(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    const result = await submitForm("/api/testimonials", form, honeypot);
    if (result.ok) {
      setStatus("success");
      return;
    }
    if (result.errors) setErrors(result.errors as TestimonialErrors);
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
          className="absolute right-2.5 top-2.5 inline-flex size-11 items-center sm:size-10 justify-center rounded-full text-navy transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-navy sm:right-4 sm:top-4"
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
              Thank you for sharing your experience.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-body leading-relaxed text-muted">
              We appreciate your feedback. Our team reviews every testimonial
              before anything is published, so it may not appear on the website
              straight away, or at all.
            </p>
            <Button type="button" size="lg" className="mt-7 w-full sm:w-auto" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="pr-10">
              <h2 id={titleId} className="text-h3 text-rich-black">
                Share Your Experience
              </h2>
              <p className="mt-2 text-body leading-relaxed text-muted">
                We&apos;d love to hear about your Jyoti Sarees experience.
              </p>
            </div>

            <form className="relative mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  name="testimonial-name"
                  label="Name"
                  placeholder="First name is fine"
                  autoComplete="given-name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  error={errors.name}
                  required
                />
                <Input
                  name="testimonial-city"
                  label="City"
                  placeholder="Enter your city"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  error={errors.city}
                  optional
                />
              </div>
              <SearchableField
                name="testimonial-saree"
                label="Saree"
                placeholder="Select or enter the saree you purchased"
                value={form.saree}
                onChange={(value) => updateField("saree", value)}
                options={testimonialSareeOptions}
                error={errors.saree}
                optional
                minChars={0}
              />
              <Textarea
                name="testimonial-message"
                label="Your Testimonial"
                placeholder="Tell us about your experience..."
                rows={5}
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                error={errors.message}
                required
              />

              <HoneypotField value={honeypot} onChange={setHoneypot} />

              <div className="rounded-lg bg-cream px-4 py-3.5 text-small leading-relaxed text-rich-black">
                <p className="font-semibold text-navy">Before you submit</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 marker:text-navy">
                  <li>Every testimonial is reviewed by our team before it is published.</li>
                  <li>Submitting does not guarantee that your testimonial will be published.</li>
                  <li>
                    If published, your testimonial, name and any city or saree you
                    mention may appear publicly on our website.
                  </li>
                </ul>
              </div>

              <Checkbox
                id="testimonial-publication-consent"
                name="publicationConsent"
                checked={form.publicationConsent}
                onChange={(event) =>
                  updateField("publicationConsent", event.target.checked)
                }
                error={errors.publicationConsent}
                required
              >
                {privacyConfig.consentText.testimonialPublication}{" "}
                <span className="text-muted">
                  You can ask us to remove it at any time.
                </span>
              </Checkbox>

              {status === "error" ? (
                <p role="alert" className="text-small font-semibold text-navy-deep">
                  {errorMessage ||
                    "Something went wrong while sending your testimonial. Please try again."}
                </p>
              ) : null}

              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="mt-1 w-full"
              >
                {status === "submitting" ? "Submitting…" : "Submit Testimonial"}
              </Button>

              <FormPrivacyNotice openInNewTab>
                We use these details only to review and, with your consent,
                publish your testimonial. See our
              </FormPrivacyNotice>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
