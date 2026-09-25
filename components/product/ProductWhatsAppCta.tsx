import { ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappEnquiryUrl } from "@/lib/products";
import { site } from "@/lib/site";

type ProductWhatsAppCtaProps = {
  productName: string;
  productId: string;
};

export function ProductWhatsAppCta({
  productName,
  productId,
}: ProductWhatsAppCtaProps) {
  return (
    <Section tone="inverse" className="bg-midnight-gradient">
      <Container className="max-w-[82.5rem]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title="Interested in this Saree?"
            description="Talk to our team for availability and details."
            align="center"
            tone="inverse"
            className="mb-8 sm:mb-10"
          />
          <ExternalButtonLink
            href={whatsappEnquiryUrl(productName, site.whatsappUrl, productId)}
            size="lg"
            className="border-transparent bg-white text-rich-black hover:bg-cream"
          >
            Enquire on WhatsApp
          </ExternalButtonLink>
        </div>
      </Container>
    </Section>
  );
}
