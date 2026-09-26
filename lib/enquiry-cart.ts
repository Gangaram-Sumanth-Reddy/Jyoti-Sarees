"use client";

import { useSyncExternalStore } from "react";
import { formatPrice, type Product } from "@/lib/products";

export type EnquiryCartItem = {
  slug: string;
  productId: string;
  name: string;
  price: number;
  priceLabel: string;
  colour: string;
  colourId: string;
  fabric: string;
  quantity: number;
  isNewArrival: boolean;
};

type EnquiryCartState = {
  items: EnquiryCartItem[];
  sentOpen: boolean;
};

const STORAGE_KEY = "jyoti-enquiry-cart";

let state: EnquiryCartState = {
  items: [],
  sentOpen: false,
};

const serverSnapshot: EnquiryCartState = {
  items: [],
  sentOpen: false,
};

let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ items: state.items }),
    );
  } catch {
    /* ignore quota / private mode */
  }
}

function normalizeItem(raw: Partial<EnquiryCartItem>): EnquiryCartItem | null {
  if (
    !raw ||
    typeof raw.slug !== "string" ||
    typeof raw.quantity !== "number" ||
    raw.quantity <= 0
  ) {
    return null;
  }

  const colour = typeof raw.colour === "string" ? raw.colour : "Default";
  return {
    slug: raw.slug,
    productId: typeof raw.productId === "string" ? raw.productId : "",
    name: typeof raw.name === "string" ? raw.name : raw.slug,
    price: typeof raw.price === "number" ? raw.price : 0,
    priceLabel: typeof raw.priceLabel === "string" ? raw.priceLabel : "",
    colour,
    colourId:
      typeof raw.colourId === "string"
        ? raw.colourId
        : colour.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    fabric: typeof raw.fabric === "string" ? raw.fabric : "",
    quantity: Math.min(99, Math.floor(raw.quantity)),
    isNewArrival: Boolean(raw.isNewArrival),
  };
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { items?: Partial<EnquiryCartItem>[] };
    if (Array.isArray(parsed.items)) {
      state = {
        ...state,
        items: parsed.items
          .map(normalizeItem)
          .filter((item): item is EnquiryCartItem => item !== null),
      };
    }
  } catch {
    /* ignore corrupt storage */
  }
}

function setState(next: EnquiryCartState) {
  state = next;
  persist();
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!hydrated) {
    hydrate();
    queueMicrotask(() => emit());
  }
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return serverSnapshot;
}

export function useEnquiryCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function openEnquirySentModal() {
  setState({ ...state, sentOpen: true });
}

export function closeEnquirySentModal() {
  setState({ ...state, sentOpen: false });
}

function itemKey(slug: string, colour: string) {
  return `${slug}::${colour}`;
}

export function addToEnquiryCart(
  product: Product,
  options?: { colour?: string; colourId?: string },
) {
  if (!product.available) return;

  const colour = options?.colour ?? product.colour;
  const colourId =
    options?.colourId ??
    product.colourOptions.find((option) => option.label === colour)?.id ??
    colour.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const existing = state.items.find(
    (item) => item.slug === product.slug && item.colour === colour,
  );
  const items = existing
    ? state.items.map((item) =>
        item.slug === product.slug && item.colour === colour
          ? { ...item, quantity: Math.min(99, item.quantity + 1) }
          : item,
      )
    : [
        ...state.items,
        {
          slug: product.slug,
          productId: product.productId,
          name: product.name,
          price: product.price,
          priceLabel: product.priceLabel,
          colour,
          colourId,
          fabric: product.fabric,
          quantity: 1,
          isNewArrival: product.isNewArrival,
        },
      ];

  setState({ ...state, items });
}

export function setEnquiryQuantity(
  slug: string,
  quantity: number,
  colour?: string,
) {
  const nextQty = Math.max(0, Math.min(99, Math.floor(quantity)));
  const items =
    nextQty === 0
      ? state.items.filter((item) =>
          colour
            ? !(item.slug === slug && item.colour === colour)
            : item.slug !== slug,
        )
      : state.items.map((item) => {
          const match = colour
            ? item.slug === slug && item.colour === colour
            : item.slug === slug;
          return match ? { ...item, quantity: nextQty } : item;
        });
  setState({ ...state, items });
}

export function removeFromEnquiryCart(slug: string, colour?: string) {
  setState({
    ...state,
    items: state.items.filter((item) =>
      colour
        ? !(item.slug === slug && item.colour === colour)
        : item.slug !== slug,
    ),
  });
}

export function clearEnquiryCart() {
  setState({ ...state, items: [] });
}

export function getEnquiryCartCount(items: EnquiryCartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getEnquiryCartTotal(items: EnquiryCartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getEnquiryCartTotalLabel(items: EnquiryCartItem[]) {
  return formatPrice(getEnquiryCartTotal(items));
}

export function getCartItemKey(item: Pick<EnquiryCartItem, "slug" | "colour">) {
  return itemKey(item.slug, item.colour);
}
