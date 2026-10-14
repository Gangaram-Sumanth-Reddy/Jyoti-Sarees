"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import {
  getColourOption,
  productHref,
  type Product,
  type ProductColourOption,
} from "@/lib/products";

type ProductDetailPanelProps = {
  product: Product;
  /** Colour slug from the URL (`/…/product/peacock-green`). */
  colourSlug?: string;
  /** Rendered above the product information column. */
  offerBanner?: ReactNode;
};

export function ProductDetailPanel({
  product,
  colourSlug,
  offerBanner,
}: ProductDetailPanelProps) {
  const router = useRouter();
  const [selectedColour, setSelectedColour] = useState<ProductColourOption>(
    () => getColourOption(product, colourSlug),
  );
  const [source, setSource] = useState({ product, colourSlug });

  if (source.product !== product || source.colourSlug !== colourSlug) {
    setSource({ product, colourSlug });
    setSelectedColour(getColourOption(product, colourSlug));
  }

  function handleSelectColour(option: ProductColourOption) {
    setSelectedColour(option);
    router.replace(productHref(product, option.id), { scroll: false });
  }

  const defaultColour = getColourOption(product);
  const sharePath =
    product.colourOptions.length > 1 && selectedColour.id !== defaultColour.id
      ? productHref(product, selectedColour.id)
      : productHref(product);

  return (
    <div className="mt-6 grid items-start gap-8 lg:mt-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] xl:gap-10">
      <div className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height)+1rem)] lg:self-start">
        <ProductGallery
          productName={product.name}
          sharePath={sharePath}
          gallery={product.gallery}
          colourHex={selectedColour.hex}
          colourLabel={selectedColour.label}
        />
      </div>

      <div className="min-w-0">
        {offerBanner}
        <ProductInfo
          product={product}
          colourOptions={product.colourOptions}
          selectedColour={selectedColour}
          onSelectColour={handleSelectColour}
        />
      </div>
    </div>
  );
}
