"use client";

import { useId, useState, type FormEvent } from "react";
import {
  FormPrivacyNotice,
  HoneypotField,
} from "@/components/privacy/FormPrivacyBits";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import { submitForm } from "@/lib/form-submission";
import { privacyContactEmail } from "@/lib/privacy-config";
import {
  emptyPrivacyRequest,
  getPrivacyRequestLabel,
  privacyRequestTypes,
  validatePrivacyRequest,
  type PrivacyRequestErrors,
  type PrivacyRequestInput,
  type PrivacyRequestType,
} from "@/lib/privacy-requests";

type SubmitState =
  | { status: "idle" | "submitting"; message?: string }
  | { status: "sent"; stored: boolean; reference: string };

type PrivacyRequestFormProps = {
  title?: string;
  defaultType?: PrivacyRequestType;
  className?: string;
};

function emailFallbackHref(form: PrivacyRequestInput) {
  const subject = `Privacy request: ${getPrivacyRequestLabel(form.requestType)}`;
  const body = [
    `Name: ${form.name}`,
    `Email / mobile used with Jyoti Sarees: ${form.contact}`,
    `Request type: ${getPrivacyRequestLabel(form.requestType)}`,
    "",
    form.description,
  ].join("\n");
  return `mailto:${privacyContactEmail()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function PrivacyRequestForm({
  title,
  defaultType,
  className,
}: PrivacyRequestFormProps) {
  const groupId = useId();
  const [form, setForm] = useState<PrivacyRequestInput>({
    ...emptyPrivacyRequest,
    requestType: defaultType ?? "",
  });
  const [errors, setErrors] = useState<PrivacyRequestErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [honeypot, setHoneypot] = useState("");

  function updateField<K extends keyof PrivacyRequestInput>(
    key: K,
    value: PrivacyRequestInput[K],
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
    const nextErrors = validatePrivacyRequest(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitState({ status: "submitting" });
    const result = await submitForm("/api/privacy-requests", form, honeypot);
    if (result.ok) {
      setSubmitState({ status: "sent", stored: result.stored, reference: result.reference });
      return;
    }
    if (result.errors) setErrors(result.errors as PrivacyRequestErrors);
    setSubmitState({ status: "idle", message: result.message });
  }

  if (submitState.status === "sent") {
    return (
      <div role="status" className={cn("py-4 text-center sm:py-8", className)}>
        <div
          className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-cream text-navy"
          aria-hidden="true"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 11.5 9 15.5 17 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {submitState.stored ? (
          <>
            <h2 className="text-h3 text-rich-black">Request received</h2>
            <p className="mx-auto mt-3 max-w-md text-body leading-relaxed text-muted">
              Thank you. We will contact you using the details you provided, and
              may first ask you to confirm your identity.
            </p>
            <p className="mx-auto mt-5 inline-flex rounded-pill bg-cream px-4 py-2 text-small font-semibold text-navy">
              Reference: {submitState.reference}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-h3 text-rich-black">One more step</h2>
            <p className="mx-auto mt-3 max-w-md text-body leading-relaxed text-muted">
              Please send your request to us by email so we have a record of it.
              Your email app will open with the details filled in.
            </p>
            <a
              href={emailFallbackHref(form)}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-pill bg-navy px-6 text-button font-semibold tracking-[0.04em] text-white transition-colors hover:bg-navy-mid"
            >
              Email my request
            </a>
          </>
        )}
      </div>
    );
  }

  return (
    <form className={cn("relative grid gap-5", className)} onSubmit={handleSubmit} noValidate>
      {title ? (
        <div className="mb-1">
          <h2 className="text-h3 text-rich-black">{title}</h2>
          <p className="mt-1.5 text-small text-muted">
            Fields marked <span className="text-accent">*</span> are required.
          </p>
        </div>
      ) : null}

      <fieldset
        aria-describedby={errors.requestType ? `${groupId}-error` : undefined}
        className="grid gap-3"
      >
        <legend className="mb-3 text-small font-semibold tracking-[0.04em] text-navy">
          What would you like to do?
          <span className="text-accent" aria-hidden="true"> *</span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {privacyRequestTypes.map((type) => {
            const checked = form.requestType === type.value;
            return (
              <label
                key={type.value}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-lg border bg-surface p-3.5 transition-[border-color,box-shadow] hover:border-border-strong has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-navy/10",
                  checked ? "border-navy shadow-soft" : "border-border",
                  type.value === "grievance" && "sm:col-span-2",
                )}
              >
                <input
                  type="radio"
                  name="requestType"
                  value={type.value}
                  checked={checked}
                  onChange={() => updateField("requestType", type.value)}
                  className="mt-1 size-4 shrink-0 accent-navy"
                />
                <span>
                  <span className="block text-small font-semibold text-rich-black">
                    {type.label}
                  </span>
                  <span className="mt-0.5 block text-small leading-relaxed text-muted">
                    {type.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        {errors.requestType ? (
          <p id={`${groupId}-error`} role="alert" className="text-small font-semibold text-navy-deep">
            {errors.requestType}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="privacy-name"
          label="Name"
          placeholder="Enter your name"
          autoComplete="name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          error={errors.name}
          required
        />
        <Input
          name="privacy-contact"
          label="Email or mobile number"
          placeholder="The one you used with us"
          autoComplete="email"
          value={form.contact}
          onChange={(event) => updateField("contact", event.target.value)}
          error={errors.contact}
          required
        />
      </div>

      <Textarea
        name="privacy-description"
        label="Details of your request"
        placeholder="For example, which enquiry or testimonial this relates to, or what needs correcting."
        rows={4}
        value={form.description}
        onChange={(event) => updateField("description", event.target.value)}
        error={errors.description}
        hint="Please don’t include ID documents or bank details. We will ask for anything we need to verify your identity."
        required
      />

      <HoneypotField value={honeypot} onChange={setHoneypot} />

      {submitState.status === "idle" && submitState.message ? (
        <p role="alert" className="text-small font-semibold text-navy-deep">
          {submitState.message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={submitState.status === "submitting"}
        className="min-h-11 w-full bg-navy text-white hover:bg-navy-mid"
      >
        {submitState.status === "submitting" ? "Sending…" : "Submit Request"}
      </Button>

      <FormPrivacyNotice>
        We use these details only to verify and respond to your request, and to
        keep a record that we did. See our
      </FormPrivacyNotice>
    </form>
  );
}
