"use client";

import { useSyncExternalStore } from "react";

export type HeroNavTone = "light" | "dark";

let heroTone: HeroNavTone = "light";
const listeners = new Set<() => void>();

export function setHeroNavTone(tone: HeroNavTone) {
  if (heroTone === tone) return;
  heroTone = tone;
  listeners.forEach((listener) => listener());
}

export function getHeroNavTone() {
  return heroTone;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useHeroNavTone() {
  return useSyncExternalStore(subscribe, getHeroNavTone, () => "light" as const);
}
