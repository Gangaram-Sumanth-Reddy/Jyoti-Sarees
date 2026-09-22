import { ExternalButtonLink } from "@/components/ui/Button";
import type { Product } from "@/lib/products";
import { whatsappEnquiryUrl } from "@/lib/products";
import { site } from "@/lib/site";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const specs = [
    { label: "Fabric", value: product.fabric },
    { label: "Colour", value: product.colour },
    { label: "Category", value: product.category },
    { label: "Product ID", value: product.productId },
  ];

  return (
    <div className="min-w-0">
      <p className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
        {product.collection} Collection
      </p>
      <h1 className="mt-3 text-h1 text-balance">{product.name}</h1>
      <p className="mt-4 text-h3 font-semibold text-rich-black">{product.priceLabel}</p>
      <p className="mt-5 max-w-prose text-body text-muted">{product.shortDescription}</p>

      <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2">
        {specs.map((spec) => (
          <div key={spec.label}>
            <dt className="text-small font-semibold uppercase tracking-[0.12em] text-subtle">
              {spec.label}
            </dt>
            <dd className="mt-1 text-body text-rich-black">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <ExternalButtonLink
          href={whatsappEnquiryUrl(product.name, site.whatsappUrl, product.productId)}
          size="lg"
          className="w-full sm:w-auto sm:min-w-[18rem]"
        >
          Enquire on WhatsApp
        </ExternalButtonLink>
      </div>
    </div>
  );
}
