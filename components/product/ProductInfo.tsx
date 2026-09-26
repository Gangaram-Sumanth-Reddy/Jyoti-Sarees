"use client";

import type { ReactNode } from "react";
import { ExternalButtonLink } from "@/components/ui/Button";
import { AddToCartControl } from "@/components/cart/AddToCartControl";
import { cn } from "@/lib/cn";
import {
  whatsappEnquiryUrl,
  type Product,
  type ProductColourOption,
} from "@/lib/products";
import { site } from "@/lib/site";

type ProductInfoProps = {
  product: Product;
  colourOptions: ProductColourOption[];
  selectedColour: ProductColourOption;
  onSelectColour: (colour: ProductColourOption) => void;
};

function DetailTable({
  rows,
}: {
  rows: { label: string; value: string }[];
}) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-white shadow-soft">
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
                className="w-[40%] px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-navy sm:w-[38%] sm:px-5"
              >
                {row.label}
              </th>
              <td className="px-4 py-3 text-body font-medium text-rich-black sm:px-5">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-8 border-t border-border pt-7">
      <h2 className="text-h3 font-semibold text-rich-black">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ProductInfo({
  product,
  colourOptions,
  selectedColour,
  onSelectColour,
}: ProductInfoProps) {
  const productDetails = [
    { label: "Fabric", value: product.fabric },
    { label: "Weave", value: product.weave },
    { label: "Colour", value: selectedColour.label },
    { label: "Occasion", value: product.occasion },
    { label: "Category", value: product.category },
    {
      label: "Availability",
      value: product.available ? "In stock" : "Out of stock",
    },
  ].filter((row) => Boolean(row.value));

  const aboutItems = [
    `Type: ${product.category} saree`,
    `Colour: ${selectedColour.label}`,
    `Fabric: ${product.fabric}`,
    product.weave ? `Weave: ${product.weave}` : null,
    product.design ? `Design: ${product.design}` : null,
    product.occasion ? `Ideal for: ${product.occasion}` : null,
    `Product ID: ${product.productId}`,
  ].filter((item): item is string => Boolean(item));

  const styleRows = [
    { label: "Colour", value: selectedColour.label },
    { label: "Design", value: product.design },
    { label: "Occasion", value: product.occasion },
    { label: "Weave", value: product.weave },
    { label: "Collection", value: product.collection },
    { label: "Category", value: product.category },
  ].filter((row) => Boolean(row.value));

  const itemDetails = [
    { label: "Product ID", value: product.productId },
    { label: "Fabric", value: product.fabric },
    { label: "Colour", value: selectedColour.label },
    { label: "Collection", value: product.collection },
    { label: "Occasion", value: product.occasion },
    {
      label: "Availability",
      value: product.available ? "In stock" : "Out of stock",
    },
  ].filter((row) => Boolean(row.value));

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
        <p className="mt-2 text-small font-semibold uppercase tracking-[0.1em] text-navy">
          Currently out of stock — enquire for similar options
        </p>
      ) : null}
      <p className="mt-4 max-w-prose text-body leading-relaxed text-rich-black/80">
        {product.shortDescription}
      </p>

      {colourOptions.length > 1 ? (
        <div className="mt-6">
          <p className="text-body text-rich-black">
            Colour:{" "}
            <span className="font-semibold">{selectedColour.label}</span>
          </p>
          <ul className="mt-3 flex list-none flex-wrap gap-2.5 p-0">
            {colourOptions.map((option) => {
              const selected = option.id === selectedColour.id;

              return (
                <li key={option.id} className="w-[5.75rem] sm:w-[6.25rem]">
                  <button
                    type="button"
                    onClick={() => onSelectColour(option)}
                    aria-pressed={selected}
                    className={cn(
                      "flex h-full w-full flex-col overflow-hidden rounded-md border bg-white text-left transition-colors",
                      selected
                        ? "border-navy ring-2 ring-navy/30"
                        : "border-border hover:border-navy/45",
                    )}
                  >
                    <div
                      className="relative aspect-square w-full border-b border-border"
                      style={{ backgroundColor: option.hex }}
                      aria-hidden="true"
                    />
                    <div className="px-1.5 py-1.5 text-center">
                      <p className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.04em] text-navy">
                        {option.label}
                      </p>
                      <p className="mt-0.5 text-[0.72rem] font-semibold text-rich-black">
                        {product.priceLabel}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <ExternalButtonLink
          href={whatsappEnquiryUrl(
            `${product.name} (${selectedColour.label})`,
            site.whatsappUrl,
            product.productId,
          )}
          size="lg"
          className="w-full bg-navy text-white hover:bg-navy-mid sm:w-auto sm:min-w-[14rem]"
        >
          Enquire on WhatsApp
        </ExternalButtonLink>

        <AddToCartControl
          product={product}
          colour={selectedColour.label}
          colourId={selectedColour.id}
          size="lg"
        />
      </div>

      <DetailSection title="Product details">
        <DetailTable rows={productDetails} />
      </DetailSection>

      <DetailSection title="About this item">
        <p className="mb-4 max-w-prose text-body leading-relaxed text-rich-black/80">
          {product.about}
        </p>
        <ul className="list-disc space-y-2 pl-5 text-body text-rich-black">
          {aboutItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection title="Style">
        <DetailTable rows={styleRows} />
      </DetailSection>

      <DetailSection title="Item details">
        <DetailTable rows={itemDetails} />
      </DetailSection>
    </div>
  );
}
