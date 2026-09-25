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
  fabric: string;
  quantity: number;
};

type EnquiryCartState = {
  items: EnquiryCartItem[];
  open: boolean;
  sentOpen: boolean;
};

const STORAGE_KEY = "jyoti-enquiry-cart";

let state: EnquiryCartState = {
  items: [],
  open: false,
  sentOpen: false,
};

const serverSnapshot: EnquiryCartState = {
  items: [],
  open: false,
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

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { items?: EnquiryCartItem[] };
    if (Array.isArray(parsed.items)) {
      state = {
        ...state,
        items: parsed.items.filter(
          (item) =>
            item &&
            typeof item.slug === "string" &&
            typeof item.quantity === "number" &&
            item.quantity > 0,
        ),
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

export function openEnquiryCart() {
  setState({ ...state, open: true });
}

export function closeEnquiryCart() {
  setState({ ...state, open: false });
}

export function openEnquirySentModal() {
  setState({ ...state, sentOpen: true, open: false });
}

export function closeEnquirySentModal() {
  setState({ ...state, sentOpen: false });
}

export function addToEnquiryCart(product: Product) {
  if (!product.available) return;

  const existing = state.items.find((item) => item.slug === product.slug);
  const items = existing
    ? state.items.map((item) =>
        item.slug === product.slug
          ? { ...item, quantity: item.quantity + 1 }
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
          colour: product.colour,
          fabric: product.fabric,
          quantity: 1,
        },
      ];

  setState({ ...state, items, open: true });
}

export function setEnquiryQuantity(slug: string, quantity: number) {
  const nextQty = Math.max(0, Math.min(99, Math.floor(quantity)));
  const items =
    nextQty === 0
      ? state.items.filter((item) => item.slug !== slug)
      : state.items.map((item) =>
          item.slug === slug ? { ...item, quantity: nextQty } : item,
        );
  setState({ ...state, items });
}

export function removeFromEnquiryCart(slug: string) {
  setState({
    ...state,
    items: state.items.filter((item) => item.slug !== slug),
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
