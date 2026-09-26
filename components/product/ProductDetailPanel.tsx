"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
};

export function ProductDetailPanel({
  product,
  colourSlug,
}: ProductDetailPanelProps) {
  const router = useRouter();
  const [selectedColour, setSelectedColour] = useState<ProductColourOption>(
    () => getColourOption(product, colourSlug),
  );

  useEffect(() => {
    setSelectedColour(getColourOption(product, colourSlug));
  }, [product, colourSlug]);

  function handleSelectColour(option: ProductColourOption) {
    setSelectedColour(option);
    router.replace(productHref(product, option.id), { scroll: false });
  }

  return (
    <div className="mt-6 grid items-start gap-8 lg:mt-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] xl:gap-10">
      <div className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height)+1rem)] lg:self-start">
        <ProductGallery
          productName={product.name}
          gallery={product.gallery}
          colourHex={selectedColour.hex}
          colourLabel={selectedColour.label}
        />
      </div>

      <div className="min-w-0">
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
