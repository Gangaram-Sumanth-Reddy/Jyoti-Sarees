"use client";

import { useMemo, useState, type FormEvent } from "react";
import { SocialIcons } from "@/components/layout/SocialIcons";
import { Button, ExternalButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CountryCodeSelect } from "@/components/ui/CountryCodeSelect";
import { Input } from "@/components/ui/Input";
import { SearchableField } from "@/components/ui/SearchableField";
import { cn } from "@/lib/cn";
import {
  contactAddresses,
  contactEnquiryWhatsAppUrl,
  getPhoneCountry,
  getSareeRequirementSuggestions,
  isValidMobileForCountry,
} from "@/lib/contact";
import {
  getCitiesForState,
  getStateNames,
  indiaStates,
} from "@/lib/india-locations";
import {
  findPincodeEntry,
  getPincodeSuggestions,
  isValidIndianPincode,
} from "@/lib/india-pincodes";
import { site } from "@/lib/site";

type FormState = {
  fullName: string;
  countryIso: string;
  mobile: string;
  email: string;
  address: string;
  pincode: string;
  state: string;
  city: string;
  requirement: string;
  quantity: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  fullName: "",
  countryIso: "IN",
  mobile: "",
  email: "",
  address: "",
  pincode: "",
  state: "",
  city: "",
  requirement: "",
  quantity: "1",
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  const country = getPhoneCountry(form.countryIso);

  if (!form.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!isValidMobileForCountry(form.countryIso, form.mobile)) {
    errors.mobile = `Enter a valid ${country.digits}-digit number for ${country.code}.`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.address.trim()) errors.address = "Please enter your address.";
  if (!isValidIndianPincode(form.pincode)) {
    errors.pincode = "Enter a valid 6-digit PIN code.";
  }
  if (!form.state.trim()) errors.state = "Please select or enter your state.";
  if (!form.city.trim()) errors.city = "Please select or enter your city.";
  if (!form.requirement.trim()) {
    errors.requirement = "Tell us the saree type or requirement.";
  }
  const qty = Number(form.quantity);
  if (!Number.isFinite(qty) || qty < 1 || qty > 999) {
    errors.quantity = "Enter a quantity between 1 and 999.";
  }

  return errors;
}

export function ContactEnquiryPanel() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const stateOptions = useMemo(() => getStateNames(), []);
  const cityOptions = useMemo(() => {
    const forState = getCitiesForState(form.state);
    if (forState.length > 0) return forState;
    return indiaStates.flatMap((entry) => entry.cities);
  }, [form.state]);
  const sareeOptions = useMemo(() => getSareeRequirementSuggestions(), []);
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  }

  const fullMobile = `${phoneCountry.code} ${form.mobile}`.trim();

  return (
    <div className="mx-auto grid min-w-0 max-w-[78rem] items-start gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,42rem)] lg:justify-center lg:gap-12 xl:grid-cols-[minmax(0,22rem)_minmax(0,46rem)] xl:gap-14">
      <aside className="mx-auto w-full min-w-0 max-w-md text-center lg:mx-0 lg:max-w-none lg:text-left">
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

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <a
            href={site.phoneHref}
            aria-label="Call Jyoti Sarees"
            className="inline-flex size-11 shrink-0 items-center justify-center overflow-visible rounded-full border border-border bg-white text-navy shadow-soft transition-colors hover:border-navy hover:bg-cream"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0 overflow-visible"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 max-w-full items-center gap-2.5 truncate rounded-full border border-border bg-white px-3.5 text-small font-semibold text-rich-black shadow-soft transition-colors hover:border-navy hover:bg-cream sm:text-body"
          >
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-white">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect
                  x="3.5"
                  y="5.5"
                  width="17"
                  height="13"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m5.5 8 6.5 4.5L18.5 8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="truncate">{site.email}</span>
          </a>
        </div>

        <div className="mt-8">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-navy/70">
            Address
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 text-left min-[420px]:grid-cols-2 sm:gap-3">
            {contactAddresses.map((store) => (
              <div
                key={store.id}
                className="rounded-md border border-border bg-white px-3.5 py-3 shadow-soft"
              >
                <p className="text-small font-semibold text-navy">{store.label}</p>
                {store.lines.map((line) => (
                  <p key={line} className="mt-0.5 text-small leading-snug text-muted">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <SocialIcons className="mt-8" align="center" />
      </aside>

      <Card className="min-w-0 overflow-hidden p-4 shadow-soft sm:p-6 lg:p-7">
        {submitted ? (
          <div role="status" className="py-4 text-center sm:py-8">
            <div
              className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-cream text-navy"
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
            <h2 className="text-h3 text-rich-black">Enquiry received</h2>
            <p className="mx-auto mt-3 max-w-md text-body leading-relaxed text-muted">
              Thank you. Our team will review your request and get back to you
              shortly. For a quicker response, you can also message us on
              WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ExternalButtonLink
                href={contactEnquiryWhatsAppUrl(site.whatsappUrl, {
                  name: form.fullName,
                  mobile: fullMobile,
                  email: form.email,
                  address: form.address,
                  pincode: form.pincode,
                  state: form.state,
                  city: form.city,
                  requirement: form.requirement,
                  quantity: form.quantity,
                })}
              >
                Continue on WhatsApp
              </ExternalButtonLink>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setSubmitted(false);
                  setForm(initialForm);
                  setErrors({});
                }}
              >
                Send another enquiry
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-h3 text-rich-black">Send an enquiry</h2>
            </div>

            <form
              className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2"
              onSubmit={handleSubmit}
              noValidate
            >
              <Input
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                value={form.fullName}
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
                    "flex min-h-11 min-w-0 overflow-visible rounded-md border border-border bg-surface transition-colors focus-within:border-navy focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent",
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

              <div className="sm:col-span-2">
                <Input
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  error={errors.email}
                  required
                />
              </div>

              <div className="min-w-0 sm:col-span-1">
                <Input
                  name="address"
                  label="Address"
                  placeholder="Street, area, landmark"
                  value={form.address}
                  onChange={(event) => updateField("address", event.target.value)}
                  error={errors.address}
                  required
                />
              </div>
              <SearchableField
                name="pincode"
                label="PIN code"
                placeholder="Start typing PIN"
                value={form.pincode}
                onChange={(value) => updateField("pincode", value)}
                options={pincodeOptions}
                error={errors.pincode}
                required
                minChars={1}
              />

              <SearchableField
                name="state"
                label="State"
                placeholder="Start typing state"
                value={form.state}
                onChange={(value) => updateField("state", value)}
                options={stateOptions}
                error={errors.state}
                required
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
                required
                minChars={1}
              />

              <div className="min-w-0 sm:col-span-1">
                <SearchableField
                  name="requirement"
                  label="Saree Type / Requirement"
                  placeholder="e.g. Ruby Kanjivaram, Soft Silk"
                  value={form.requirement}
                  onChange={(value) => updateField("requirement", value)}
                  options={sareeOptions}
                  error={errors.requirement}
                  required
                  minChars={1}
                />
              </div>
              <Input
                name="quantity"
                label="Quantity"
                type="number"
                min={1}
                max={999}
                inputMode="numeric"
                placeholder="1"
                value={form.quantity}
                onChange={(event) =>
                  updateField("quantity", event.target.value)
                }
                error={errors.quantity}
                required
              />

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  className="min-h-11 w-full bg-navy text-white hover:bg-navy-mid"
                >
                  Send Enquiry
                </Button>
              </div>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
