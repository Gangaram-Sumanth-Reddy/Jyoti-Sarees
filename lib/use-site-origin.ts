"use client";

import { useSyncExternalStore } from "react";

const noSubscription = () => () => {};

/** The page's own origin (empty during server rendering), so shared links point at the domain in use. */
export function useSiteOrigin() {
  return useSyncExternalStore(
    noSubscription,
    () => window.location.origin,
    () => "",
  );
}
