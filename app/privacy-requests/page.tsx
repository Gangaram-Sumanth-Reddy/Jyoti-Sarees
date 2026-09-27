import Link from "next/link";
import { PrivacyRequestForm } from "@/components/privacy/PrivacyRequestForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { privacyConfig, privacyContactEmail, privacyRoutes } from "@/lib/privacy-config";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Requests",
  description:
    "Ask Jyoti Sarees to access, correct or delete your personal data, withdraw consent, or raise a privacy grievance.",
  path: "/privacy-requests",
  noIndex: true,
});

const steps = [
  {
    title: "Tell us what you need",
    body: "Choose a request type and share enough detail for us to find your records.",
  },
  {
    title: "We confirm it’s you",
    body: "We may contact you on the email or number you provide to verify your identity before acting.",
  },
  {
    title: "We respond",
    body: "We act on your request and let you know the outcome, or explain if the law requires us to keep something.",
  },
];

export default function PrivacyRequestsPage() {
  const email = privacyContactEmail();

  return (
    <Section className="overflow-x-clip pt-8 sm:pt-10 lg:pt-12">
      <Container className="max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <aside className="min-w-0">
            <p className="text-small font-semibold uppercase tracking-[0.16em] text-accent">
              Your data, your choice
            </p>
            <h1 className="mt-2.5 text-balance text-[clamp(1.7rem,1.2rem+1.5vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-rich-black">
              Privacy Requests
            </h1>
            <p className="mt-3 text-body leading-relaxed text-muted">
              You can ask us to access, correct or delete the personal data you
              have shared with {privacyConfig.businessName}, withdraw consent, or
              raise a concern.
            </p>

            <ol className="mt-8 grid gap-5">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-3.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-small font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-body font-semibold text-rich-black">
                      {step.title}
                    </span>
                    <span className="mt-0.5 block text-small leading-relaxed text-muted">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-xl border border-border bg-cream p-5 text-small leading-relaxed text-rich-black">
              <p className="font-semibold text-navy">Prefer to write to us?</p>
              <p className="mt-1.5">
                Email{" "}
                <a
                  href={`mailto:${email}`}
                  className="break-all font-semibold text-navy underline decoration-border-strong underline-offset-2 hover:text-accent"
                >
                  {email}
                </a>{" "}
                or message us on{" "}
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline decoration-border-strong underline-offset-2 hover:text-accent"
                >
                  WhatsApp
                </a>
                . To stop marketing messages, you can also reply “STOP” on
                WhatsApp.
              </p>
              <p className="mt-3">
                Read our{" "}
                <Link
                  href={privacyRoutes.policy}
                  className="font-semibold text-navy underline decoration-border-strong underline-offset-2 hover:text-accent"
                >
                  Privacy Policy
                </Link>{" "}
                for full details of your rights.
              </p>
            </div>
          </aside>

          <Card className="min-w-0 overflow-hidden p-4 shadow-soft sm:p-6 lg:p-8">
            <PrivacyRequestForm title="Submit a request" />
          </Card>
        </div>
      </Container>
    </Section>
  );
}
