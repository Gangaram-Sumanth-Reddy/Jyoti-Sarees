"use client";

import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  EnquirySuccessModal,
  type SentEnquiry,
} from "@/components/contact/EnquirySuccessModal";
import { SocialIcons } from "@/components/layout/SocialIcons";
import {
  FormPrivacyNotice,
  HoneypotField,
} from "@/components/privacy/FormPrivacyBits";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CountryCodeSelect } from "@/components/ui/CountryCodeSelect";
import { Input, Textarea } from "@/components/ui/Input";
import { SearchableField } from "@/components/ui/SearchableField";
import { cn } from "@/lib/cn";
import { getPhoneCountry } from "@/lib/contact";
import {
  emptyEnquiry,
  enquiryMessageLimit,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
} from "@/lib/enquiry";
import { submitForm } from "@/lib/form-submission";
import {
  getCitiesForState,
  getStateNames,
  indiaStates,
} from "@/lib/india-locations";
import {
  findPincodeEntry,
  getPincodeSuggestions,
} from "@/lib/india-pincodes";
import { site } from "@/lib/site";

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex min-w-0 items-start gap-3.5 rounded-lg border border-border bg-white px-4 py-3.5 shadow-soft">
      <span
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-white"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1 space-y-0.5 text-body">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
          {label}
        </p>
        {children}
      </div>
    </li>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m5.5 8 6.5 4.5L18.5 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

type FormState = EnquiryInput;
type FormErrors = EnquiryErrors;

const initialForm = emptyEnquiry;

type SubmitState = { status: "idle" | "submitting"; message?: string };

export function ContactEnquiryPanel() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [sent, setSent] = useState<SentEnquiry | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const pending = useRef(false);

  const stateOptions = useMemo(() => getStateNames(), []);
  const cityOptions = useMemo(() => {
    const forState = getCitiesForState(form.state);
    if (forState.length > 0) return forState;
    return indiaStates.flatMap((entry) => entry.cities);
  }, [form.state]);
  const pincodeOptions = useMemo(
    () => getPincodeSuggestions(form.pincode, 10),
    [form.pincode],
  );
  const phoneCountry = getPhoneCountry(form.countryIso);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => {
      if (key === "mobile") {
        const digits = String(value).replace(/\D/g, "");
        const max = getPhoneCountry(current.countryIso).digits;
        return { ...current, mobile: digits.slice(0, max) };
      }

      if (key === "countryIso") {
        const nextIso = String(value);
        const max = getPhoneCountry(nextIso).digits;
        return {
          ...current,
          countryIso: nextIso,
          mobile: current.mobile.slice(0, max),
        };
      }

      if (key === "pincode") {
        const raw = String(value);
        const matched = findPincodeEntry(raw);
        const pin = raw.replace(/\D/g, "").slice(0, 6);
        if (matched) {
          return {
            ...current,
            pincode: matched.pin,
            city: matched.city,
            state: matched.state,
          };
        }
        return { ...current, pincode: pin };
      }

      const next = { ...current, [key]: value };
      if (key === "state" && value !== current.state) next.city = "";
      return next;
    });

    setErrors((current) => {
      if (!current[key] && key !== "countryIso" && key !== "pincode") {
        return current;
      }
      const next = { ...current };
      delete next[key];
      if (key === "countryIso") delete next.mobile;
      if (key === "pincode") {
        delete next.city;
        delete next.state;
      }
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const nextErrors = validateEnquiry(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    pending.current = true;
    setSubmitState({ status: "submitting" });
    const result = await submitForm("/api/enquiries", form, honeypot);
    pending.current = false;
    if (result.ok) {
      setSent({
        reference: result.reference,
        firstName: form.fullName.trim().split(/\s+/)[0] ?? "",
      });
      setForm(initialForm);
      setErrors({});
      setSubmitState({ status: "idle" });
      return;
    }
    if (result.errors) setErrors(result.errors as FormErrors);
    setSubmitState({ status: "idle", message: result.message });
  }

  return (
    <div className="mx-auto grid min-w-0 max-w-[78rem] items-start gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,42rem)] lg:items-stretch lg:justify-center lg:gap-12 xl:grid-cols-[minmax(0,22rem)_minmax(0,46rem)] xl:gap-14">
      <aside className="mx-auto w-full min-w-0 max-w-md lg:mx-0 lg:flex lg:max-w-none lg:flex-col">
        <p className="text-small font-semibold uppercase tracking-[0.16em] text-accent">
          Contact
        </p>
        <h1 className="mt-2.5 text-balance text-[clamp(1.7rem,1.2rem+1.5vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-rich-black">
          Get in Touch
        </h1>
        <p className="mt-3 text-body leading-relaxed text-muted lg:max-w-sm">
          Have a question or looking for a specific saree? Reach us directly, or
          send an enquiry and our team will help you.
        </p>

        <ul className="mt-8 grid list-none gap-3 p-0 text-left">
          <ContactRow icon={<PhoneIcon />} label="Call us">
            {site.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                aria-label={`Call Jyoti Sarees, ${phone.display}`}
                className="block font-semibold text-rich-black transition-colors hover:text-accent"
              >
                {phone.display}
              </a>
            ))}
          </ContactRow>
          <ContactRow icon={<MailIcon />} label="Email">
            <a
              href={`mailto:${site.email}`}
              className="block truncate font-semibold text-rich-black transition-colors hover:text-accent"
            >
              {site.email}
            </a>
          </ContactRow>
          <ContactRow icon={<ClockIcon />} label="Store hours">
            <p className="font-semibold text-rich-black">
              {site.hours.opens} – {site.hours.closes}
            </p>
          </ContactRow>
        </ul>

        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <p className="text-small font-semibold uppercase tracking-[0.12em] text-muted">
            Follow us
          </p>
          <SocialIcons align="center" />
        </div>
      </aside>

      <Card className="min-w-0 overflow-hidden p-4 shadow-soft sm:p-6 lg:px-6 lg:py-5">
        <>
            <div className="text-center">
              <h2 className="text-h3 text-rich-black">Send an enquiry</h2>
            </div>

            <form
              className="relative mt-4 grid min-w-0 gap-x-4 gap-y-3 sm:grid-cols-2"
              onSubmit={handleSubmit}
              noValidate
            >
              <Input
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                value={form.fullName}
                autoComplete="name"
                onChange={(event) => updateField("fullName", event.target.value)}
                error={errors.fullName}
                required
              />

              <div className="flex w-full min-w-0 flex-col gap-2">
                <label
                  htmlFor="contact-mobile"
                  className="text-small font-semibold tracking-[0.04em] text-navy"
                >
                  Contact Number <span className="text-accent">*</span>
                </label>
                <div
                  className={cn(
                    "flex min-h-11 min-w-0 overflow-visible rounded-md border border-border bg-surface transition-[border-color,box-shadow] duration-200 hover:border-border-strong focus-within:border-navy focus-within:ring-4 focus-within:ring-navy/10",
                    errors.mobile && "border-navy-deep",
                  )}
                >
                  <CountryCodeSelect
                    valueIso={form.countryIso}
                    onChange={(country) =>
                      updateField("countryIso", country.iso)
                    }
                  />
                  <input
                    id="contact-mobile"
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder={`${phoneCountry.digits}-digit mobile number`}
                    value={form.mobile}
                    maxLength={phoneCountry.digits}
                    aria-invalid={Boolean(errors.mobile) || undefined}
                    onChange={(event) =>
                      updateField("mobile", event.target.value)
                    }
                    className="min-w-0 flex-1 border-0 bg-transparent px-3 text-body text-navy outline-none placeholder:text-subtle"
                    required
                  />
                </div>
                {errors.mobile ? (
                  <p className="text-small font-semibold text-navy-deep" role="alert">
                    {errors.mobile}
                  </p>
                ) : null}
              </div>

              <Input
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                error={errors.email}
                optional
              />
              <SearchableField
                name="state"
                label="State"
                placeholder="Start typing state"
                value={form.state}
                onChange={(value) => updateField("state", value)}
                options={stateOptions}
                error={errors.state}
                optional
                minChars={1}
              />

              <SearchableField
                name="city"
                label="City"
                placeholder={
                  form.state ? "Start typing city" : "Select state first"
                }
                value={form.city}
                onChange={(value) => updateField("city", value)}
                options={cityOptions}
                error={errors.city}
                optional
                minChars={1}
              />
              <SearchableField
                name="pincode"
                label="PIN code"
                placeholder="Start typing PIN"
                value={form.pincode}
                onChange={(value) => updateField("pincode", value)}
                options={pincodeOptions}
                error={errors.pincode}
                optional
                minChars={1}
              />

              <div className="min-w-0 sm:col-span-2">
                <Input
                  name="address"
                  label="Address"
                  placeholder="Street, area, landmark"
                  value={form.address}
                  autoComplete="street-address"
                  onChange={(event) => updateField("address", event.target.value)}
                  error={errors.address}
                  optional
                />
              </div>

              <div className="min-w-0 sm:col-span-2">
                <Textarea
                  name="message"
                  label="Message"
                  placeholder="Tell us which saree you are looking for, the occasion, colours, quantity or any other details."
                  rows={2}
                  className="!min-h-16"
                  maxLength={enquiryMessageLimit}
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  error={errors.message}
                  required
                />
              </div>

              <HoneypotField value={honeypot} onChange={setHoneypot} />

              <div className="grid gap-3 sm:col-span-2">
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
                  {submitState.status === "submitting" ? "Sending…" : "Send Enquiry"}
                </Button>

                <FormPrivacyNotice className="!text-xs">
                  We use your name, contact number and enquiry details only to
                  respond to this enquiry and help with any order that follows.
                  Email and location details are optional and help us check
                  availability and delivery. See our
                </FormPrivacyNotice>
              </div>
            </form>
          </>
      </Card>

      <EnquirySuccessModal sent={sent} onClose={() => setSent(null)} />
    </div>
  );
}
