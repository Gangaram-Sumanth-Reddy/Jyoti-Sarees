import { ExternalButtonLink } from "@/components/ui/Button";
import type { Product } from "@/lib/products";
import { whatsappEnquiryUrl } from "@/lib/products";
import { site } from "@/lib/site";

type ProductInfoProps = {
  product: Product;
};

function detailRows(product: Product) {
  return [
    { label: "Fabric", value: product.fabric },
    { label: "Colour", value: product.colour },
    { label: "Category", value: product.category },
    { label: "Collection", value: product.collection },
    { label: "Occasion", value: product.occasion },
    { label: "Weave", value: product.weave },
    { label: "Design", value: product.design },
    { label: "Product ID", value: product.productId },
    {
      label: "Availability",
      value: product.available ? "In stock" : "Out of stock",
    },
  ].filter((row) => Boolean(row.value));
}

export function ProductInfo({ product }: ProductInfoProps) {
  const specs = [
    { label: "Fabric", value: product.fabric },
    { label: "Colour", value: product.colour },
    { label: "Category", value: product.category },
    { label: "Product ID", value: product.productId },
  ].filter((spec) => Boolean(spec.value));

  const rows = detailRows(product);

  return (
    <div className="min-w-0">
      <p className="text-small font-semibold uppercase tracking-[0.14em] text-accent">
        {product.collection}
      </p>
      <h1 className="mt-2.5 text-balance text-[clamp(1.65rem,1.15rem+1.4vw,2.35rem)] font-semibold leading-tight tracking-[-0.02em] text-rich-black">
        {product.name}
      </h1>
      <p className="mt-3 text-[1.2rem] font-semibold text-rich-black sm:text-h3">
        {product.priceLabel}
      </p>
      {!product.available ? (
        <p className="mt-2 text-small font-semibold uppercase tracking-[0.1em] text-muted">
          Currently out of stock — enquire for similar options
        </p>
      ) : null}
      <p className="mt-4 max-w-prose text-body leading-relaxed text-muted">
        {product.shortDescription}
      </p>

      <dl className="mt-6 grid gap-x-6 gap-y-3.5 border-y border-border py-5 sm:grid-cols-2">
        {specs.map((spec) => (
          <div key={spec.label} className="min-w-0">
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-subtle">
              {spec.label}
            </dt>
            <dd className="mt-1 text-body text-rich-black">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <ExternalButtonLink
          href={whatsappEnquiryUrl(
            product.name,
            site.whatsappUrl,
            product.productId,
          )}
          size="lg"
          className="w-full sm:w-auto sm:min-w-[16rem]"
        >
          Enquire on WhatsApp
        </ExternalButtonLink>
      </div>

      <div className="mt-10 border-t border-border pt-8">
        <h2 className="text-h3 font-semibold text-rich-black">About This Saree</h2>
        <p className="mt-3 max-w-prose text-body leading-relaxed text-muted">
          {product.about}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-h3 font-semibold text-rich-black">Product Details</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-white shadow-soft">
          <table className="w-full border-collapse text-left">
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.label}
                  className={
                    index < rows.length - 1 ? "border-b border-border" : undefined
                  }
                >
                  <th
                    scope="row"
                    className="w-[38%] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-subtle sm:px-5"
                  >
                    {row.label}
                  </th>
                  <td className="px-4 py-3 text-body text-rich-black sm:px-5">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
