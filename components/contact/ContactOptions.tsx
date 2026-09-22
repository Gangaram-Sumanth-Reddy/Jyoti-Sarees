import { ExternalButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";
import { contactCopy, contactOptions } from "@/lib/contact";
import { site } from "@/lib/site";

export function ContactOptions() {
  return (
    <Section>
      <Container>
        <SectionHeading
          title={contactCopy.options.title}
          description={contactCopy.options.description}
          align="center"
          className="max-w-2xl"
        />
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-3 lg:gap-6">
          {contactOptions.map((option) => (
            <Card as="li" key={option.id} variant="muted" className="shadow-none">
              <h3 className="text-h3">{option.title}</h3>
              <p className="mt-3 text-body text-muted">{option.description}</p>
              <div className="mt-6">
                {option.external ? (
                  <ExternalButtonLink href={option.href} size="sm">
                    {option.cta}
                  </ExternalButtonLink>
                ) : (
                  <a
                    href={option.href}
                    className={buttonClasses("secondary", "sm")}
                  >
                    {option.cta}
                  </a>
                )}
              </div>
            </Card>
          ))}
        </ul>
        <div className="mt-10 flex justify-center sm:mt-12">
          <ExternalButtonLink href={site.whatsappUrl} size="lg">
            WhatsApp Us
          </ExternalButtonLink>
        </div>
      </Container>
    </Section>
  );
}
