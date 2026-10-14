import {
  ProductOfferSlider,
  type OfferSlide,
} from "@/components/product/ProductOfferSlider";
import { getActiveOffer } from "@/lib/offers";
import {
  discountPercent,
  getNewArrivals,
  productHref,
  type Product,
} from "@/lib/products";

const SLIDE_COUNT = 2;

/** Discounted new-arrival sarees other than the one being viewed, stable per page. */
function featuredSareesFor(current: Product): Product[] {
  const candidates = getNewArrivals(12).filter(
    (item) =>
      item.slug !== current.slug &&
      item.gallery.some((entry) => entry.src) &&
      discountPercent(item.sellingPrice ?? item.price, item.originalPrice) !== null,
  );
  if (candidates.length === 0) return [];
  const hash = [...current.slug].reduce(
    (sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0,
    7,
  );
  const count = Math.min(SLIDE_COUNT, candidates.length);
  return Array.from(
    { length: count },
    (_, index) => candidates[(hash + index) % candidates.length],
  );
}

export function ProductOfferBanner({ product }: { product: Product }) {
  const offer = getActiveOffer();
  if (!offer) return null;

  const slides: OfferSlide[] = featuredSareesFor(product).map((item) => ({
    slug: item.slug,
    name: item.name,
    href: productHref(item),
    photo: item.gallery.find((entry) => entry.src)?.src,
    sellingPrice: item.sellingPrice ?? item.price,
    originalPrice: item.originalPrice,
    priceLabel: item.priceLabel,
  }));
  if (slides.length === 0) return null;

  return <ProductOfferSlider offer={offer} slides={slides} />;
}
