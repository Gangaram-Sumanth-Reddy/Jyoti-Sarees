import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/lib/products";

type ProductAboutProps = {
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

export function ProductAbout({ product }: ProductAboutProps) {
  const highlights = [
    { label: "Fabric", value: product.fabric },
    { label: "Weave", value: product.weave },
    { label: "Design", value: product.design },
    { label: "Occasion", value: product.occasion },
  ].filter((item) => Boolean(item.value));

  const rows = detailRows(product);

  return (
    <Section tone="muted">
      <Container className="max-w-[82.5rem]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-14">
          <div className="min-w-0">
            <SectionHeading
              title="About This Saree"
              className="mb-5 sm:mb-6 lg:mb-6"
            />
            <p className="max-w-prose text-body leading-relaxed text-muted">
              {product.about}
            </p>
            {highlights.length > 0 ? (
              <ul className="mt-6 grid list-none gap-3 p-0 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-md border border-border bg-white px-4 py-3"
                  >
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-accent">
                      {item.label}
                    </p>
                    <p className="mt-1 text-body text-rich-black">{item.value}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="min-w-0">
            <SectionHeading
              title="Product Details"
              className="mb-5 sm:mb-6 lg:mb-6"
            />
            <div className="overflow-hidden rounded-lg border border-border bg-white shadow-soft">
              <table className="w-full border-collapse text-left">
                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={row.label}
                      className={
                        index < rows.length - 1
                          ? "border-b border-border"
                          : undefined
                      }
                    >
                      <th
                        scope="row"
                        className="w-[40%] px-4 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-subtle sm:px-5"
                      >
                        {row.label}
                      </th>
                      <td className="px-4 py-3.5 text-body text-rich-black sm:px-5">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
