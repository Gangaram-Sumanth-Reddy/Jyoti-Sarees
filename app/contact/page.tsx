import type { Metadata } from "next";
import { BulkEnquiryForm, GeneralEnquiryForm } from "@/components/contact/ContactForms";
import { ContactFinalCta } from "@/components/contact/ContactFinalCta";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactOptions } from "@/components/contact/ContactOptions";
import { StoreLocations } from "@/components/contact/StoreLocations";
import { contactCopy } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: contactCopy.hero.description,
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <StoreLocations />
      <ContactOptions />
      <BulkEnquiryForm />
      <GeneralEnquiryForm />
      <ContactFinalCta />
    </>
  );
}
