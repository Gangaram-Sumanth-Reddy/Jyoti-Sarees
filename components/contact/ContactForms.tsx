"use client";

import { useState, type FormEvent } from "react";
import { Button, ExternalButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Input, Textarea } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Select } from "@/components/ui/Select";
import { bulkWhatsAppUrl, contactCopy } from "@/lib/contact";
import { site } from "@/lib/site";

export function BulkEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Section id="bulk-enquiry" tone="muted">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title={contactCopy.bulk.title}
            description={contactCopy.bulk.description}
            align="center"
            className="max-w-2xl"
          />
          <Card className="p-5 sm:p-8">
            {submitted ? (
              <div role="status" className="py-6 text-center">
                <h3 className="text-h3">Enquiry noted</h3>
                <p className="mt-3 text-body text-muted">
                  Form submission is ready for backend wiring. For now, please
                  reach us on WhatsApp for bulk and business enquiries.
                </p>
                <div className="mt-8 flex justify-center">
                  <ExternalButtonLink href={bulkWhatsAppUrl(site.whatsappUrl)}>
                    WhatsApp for Bulk Enquiry
                  </ExternalButtonLink>
                </div>
              </div>
            ) : (
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
                <Input name="name" label="Name" placeholder="Your name" required />
                <Input
                  name="phone"
                  label="Phone / WhatsApp"
                  type="tel"
                  placeholder="+91"
                  required
                />
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  className="sm:col-span-2"
                />
                <Input
                  name="quantity"
                  label="Quantity Required"
                  placeholder="Approximate quantity"
                  required
                />
                <Input
                  name="requirement"
                  label="Saree Type / Requirement"
                  placeholder="e.g. Kanchipuram, Wedding"
                  required
                />
                <div className="sm:col-span-2">
                  <Textarea
                    name="message"
                    label="Message"
                    placeholder="Share colours, budget or delivery preferences"
                    rows={4}
                  />
                </div>
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button type="submit" size="lg">
                    Submit Enquiry
                  </Button>
                  <ExternalButtonLink
                    href={bulkWhatsAppUrl(site.whatsappUrl)}
                    variant="secondary"
                    size="lg"
                  >
                    WhatsApp for Bulk Enquiry
                  </ExternalButtonLink>
                </div>
              </form>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}

export function GeneralEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Section id="general-enquiry">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title={contactCopy.general.title}
            description={contactCopy.general.description}
            align="center"
            className="max-w-2xl"
          />
          <Card className="p-5 sm:p-8">
            {submitted ? (
              <div role="status" className="py-6 text-center">
                <h3 className="text-h3">Message ready</h3>
                <p className="mt-3 text-body text-muted">
                  This form is prepared for future email/CRM integration. Please
                  WhatsApp or call us for an immediate response.
                </p>
              </div>
            ) : (
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
                <div className="sm:col-span-2">
                  <Select
                    label="Enquiry Type"
                    name="enquiryType"
                    defaultValue="general"
                  >
                    <option value="general">General</option>
                    <option value="saree">Saree Enquiry</option>
                    <option value="bulk">Bulk Order</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
                <Input name="name" label="Name" placeholder="Your name" required />
                <Input
                  name="phone"
                  label="Phone"
                  type="tel"
                  placeholder="+91"
                  required
                />
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  className="sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <Textarea
                    name="message"
                    label="Message"
                    placeholder="How can we help?"
                    rows={4}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg">
                    Send Enquiry
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
