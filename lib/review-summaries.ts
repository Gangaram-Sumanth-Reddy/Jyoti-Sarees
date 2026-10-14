"use client";

import { useSyncExternalStore } from "react";
import type { ReviewSummariesResponse } from "@/lib/reviews";

type Summaries = ReviewSummariesResponse["summaries"];

const EMPTY: Summaries = {};
let snapshot: Summaries = EMPTY;
let requested = false;
const listeners = new Set<() => void>();

function load() {
  if (requested) return;
  requested = true;
  fetch("/api/reviews/summary", { cache: "no-store" })
    .then((response) => (response.ok ? response.json() : null))
    .then((data: ReviewSummariesResponse | null) => {
      if (!data) return;
      snapshot = data.summaries;
      listeners.forEach((listener) => listener());
    })
    .catch(() => {
      requested = false;
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  load();
  return () => listeners.delete(listener);
}

/** Approved-review rating for one saree, or undefined when it has none. */
export function useRatingSummary(slug: string) {
  const summaries = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => EMPTY,
  );
  return summaries[slug];
}
