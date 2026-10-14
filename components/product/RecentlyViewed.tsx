"use client";

import { useEffect, useMemo } from "react";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getProductBySlug, type Product } from "@/lib/products";
import {
  parseRecentlyViewed,
  recordRecentlyViewed,
  useRecentlyViewedRaw,
} from "@/lib/recently-viewed";

/** Records the current saree and lists the others this visitor opened before. */
export function RecentlyViewed({ currentSlug }: { currentSlug: string }) {
  const raw = useRecentlyViewedRaw();

  const products = useMemo(
    () =>
      parseRecentlyViewed(raw)
        .filter((slug) => slug !== currentSlug)
        .map((slug) => getProductBySlug(slug))
        .filter((product): product is Product => Boolean(product)),
    [raw, currentSlug],
  );

  useEffect(() => {
    recordRecentlyViewed(currentSlug);
  }, [currentSlug]);

  if (products.length === 0) return null;

  return (
    <Section className="!pt-0">
      <Container className="max-w-[82.5rem]">
        <ProductCarousel title="Recently Viewed" products={products} />
      </Container>
    </Section>
  );
}
