import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactCopy } from "@/lib/contact";

export function ContactHero() {
  return (
    <Section className="pt-8 sm:pt-10 lg:pt-12">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-h1 text-balance">{contactCopy.hero.title}</h1>
          <p className="mt-4 text-body text-muted sm:mt-5">
            {contactCopy.hero.description}
          </p>
        </div>
      </Container>
    </Section>
  );
}
