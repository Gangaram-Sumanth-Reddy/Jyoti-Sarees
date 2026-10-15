"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { aboutContent } from "@/lib/about";
import { copy, site } from "@/lib/site";

type CtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

type PreCtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  primary: CtaLink;
  secondary: CtaLink;
  note?: { lead: string; label: string; href: string };
};

const whatsapp: CtaLink = {
  label: "WhatsApp Us",
  href: site.whatsappUrl,
  external: true,
};

const store: CtaLink = { label: "Visit Our Store", href: "/contact" };
const sarees: CtaLink = { label: "Explore Sarees", href: "/sarees" };

function contentFor(path: string): PreCtaContent {
  if (path === "/") {
    return {
      eyebrow: "Jyoti Sarees",
      title: copy.finalCta.title,
      description: copy.finalCta.description,
      primary: whatsapp,
      secondary: store,
      note: {
        lead: "Planning a larger order?",
        label: "Bulk Enquiry",
        href: "/contact#bulk-enquiry",
      },
    };
  }

  if (path.startsWith("/about")) {
    return {
      eyebrow: "The collection",
      title: aboutContent.finalCta.lines[0],
      description: aboutContent.finalCta.description,
      primary: sarees,
      secondary: whatsapp,
    };
  }

  if (path.startsWith("/new-arrivals")) {
    return {
      eyebrow: "New arrivals",
      title: "Looking for a new drape?",
      description:
        "Tell us the colour or weave you have in mind and we will help you find it.",
      primary: whatsapp,
      secondary: store,
    };
  }

  if (path.startsWith("/sarees")) {
    return {
      eyebrow: "The collection",
      title: "Looking for something specific?",
      description: "Our team can help you find the right saree for your occasion.",
      primary: whatsapp,
      secondary: store,
    };
  }

  if (path.startsWith("/contact")) {
    return {
      eyebrow: "Still deciding",
      title: "Browse the sarees first?",
      description:
        "See the collection, or message us on WhatsApp if you already know what you need.",
      primary: sarees,
      secondary: whatsapp,
    };
  }

  if (path.startsWith("/cart")) {
    return {
      eyebrow: "Your enquiry list",
      title: "Ready when you are.",
      description:
        "Questions before you order? Message us on WhatsApp. There is no online payment — our team confirms the details with you.",
      primary: whatsapp,
      secondary: sarees,
    };
  }

  if (path.startsWith("/journal")) {
    return {
      eyebrow: "From the journal",
      title: "Want help choosing a saree?",
      description: "Tell us the occasion or weave and we will help you find it.",
      primary: whatsapp,
      secondary: sarees,
    };
  }

  return {
    eyebrow: "Jyoti Sarees",
    title: "Questions about a saree?",
    description:
      "Message us on WhatsApp or visit the store. Our team will help you from there.",
    primary: whatsapp,
    secondary: store,
  };
}

function CtaButton({
  link,
  tone,
}: {
  link: CtaLink;
  tone: "primary" | "secondary";
}) {
  const className =
    tone === "primary"
      ? "page-pre-cta-primary max-sm:min-w-0"
      : "page-pre-cta-secondary max-sm:min-w-0";

  if (link.external) {
    return (
      <ExternalButtonLink href={link.href} size="md" className={className}>
        {link.label}
      </ExternalButtonLink>
    );
  }

  return (
    <ButtonLink href={link.href} size="md" className={className}>
      {link.label}
    </ButtonLink>
  );
}

export function PagePreCta() {
  const pathname = usePathname() || "/";
  const content = contentFor(pathname);

  return (
    <section className="page-pre-cta w-full px-gutter py-12 sm:py-16">
      <Container>
        <div className="page-pre-cta-card mx-auto max-w-3xl rounded-[1.75rem] border px-6 py-10 text-center sm:px-12 sm:py-14">
          <p className="page-pre-cta-eyebrow text-[0.72rem] font-semibold uppercase tracking-[0.22em]">
            {content.eyebrow}
          </p>
          <h2 className="page-pre-cta-title mx-auto mt-4 max-w-[18ch] text-balance text-[clamp(1.75rem,1.15rem+1.8vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
            {content.title}
          </h2>
          <p className="page-pre-cta-copy mx-auto mt-4 max-w-xl text-body leading-relaxed">
            {content.description}
          </p>
          <div className="mt-8 flex flex-nowrap items-center justify-center gap-2 sm:gap-3">
            <CtaButton link={content.primary} tone="primary" />
            <CtaButton link={content.secondary} tone="secondary" />
          </div>
          {content.note ? (
            <p className="page-pre-cta-note mt-6 text-small">
              {content.note.lead}{" "}
              <Link
                href={content.note.href}
                className="page-pre-cta-link font-semibold underline decoration-current/30 underline-offset-4 hover:decoration-current"
              >
                {content.note.label}
              </Link>
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
