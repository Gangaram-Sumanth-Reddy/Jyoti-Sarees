import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";
import { whatsappEnquiryUrl } from "@/lib/products";
import { site } from "@/lib/site";

type ProductCardProps = {
  name: string;
  category: string;
  fabric?: string;
  price: string;
  href: string;
  productId?: string;
  className?: string;
  showWhatsApp?: boolean;
  badge?: string;
};

export function ProductCard({
  name,
  category,
  fabric,
  price,
  href,
  productId,
  className,
  showWhatsApp = false,
  badge,
}: ProductCardProps) {
  const meta = fabric ? `${category} · ${fabric}` : category;

  return (
    <Card
      as="li"
      className={cn("flex flex-col overflow-hidden p-0 shadow-soft", className)}
    >
      <Link href={href} className="group relative block min-w-0">
        <ImageFrame aspect="card" radius="none" className="rounded-t-md">
          <ImagePlaceholder label={name} />
        </ImageFrame>
        {badge ? (
          <Badge
            variant="inverse"
            className="absolute left-3 top-3 z-10 shadow-soft"
          >
            {badge}
          </Badge>
        ) : null}
      </Link>
      <div className="flex flex-col gap-2.5 px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="space-y-1">
          <p className="text-small font-semibold uppercase tracking-[0.12em] text-accent">
            {meta}
          </p>
          <h3 className="text-h3 leading-snug">
            <Link href={href} className="transition-colors hover:text-accent">
              {name}
            </Link>
          </h3>
          <p className="text-body font-semibold leading-snug text-rich-black">{price}</p>
        </div>
        <div className="flex flex-col gap-2">
          <ButtonLink
            href={href}
            variant="primary"
            size="sm"
            className="w-fit max-w-full self-start"
          >
            View Saree
          </ButtonLink>
          {showWhatsApp ? (
            <ExternalButtonLink
              href={whatsappEnquiryUrl(name, site.whatsappUrl, productId)}
              variant="secondary"
              size="sm"
              className="w-fit max-w-full self-start border-accent/40 text-accent hover:border-accent hover:bg-accent hover:text-white"
            >
              WhatsApp Enquiry
            </ExternalButtonLink>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
