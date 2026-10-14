"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "jyoti-recently-viewed";
const CHANGE_EVENT = "jyoti-recently-viewed-change";
const MAX_ITEMS = 12;

function readRaw() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? value.filter((slug): slug is string => typeof slug === "string")
      : [];
  } catch {
    return [];
  }
}

/** Moves `slug` to the front of the recently viewed list. */
export function recordRecentlyViewed(slug: string) {
  const next = [slug, ...parse(readRaw()).filter((item) => item !== slug)].slice(
    0,
    MAX_ITEMS,
  );
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(CHANGE_EVENT, listener);
  };
}

const getServerSnapshot = () => "[]";

/** Raw JSON string of slugs (stable between renders until the list changes). */
export function useRecentlyViewedRaw() {
  return useSyncExternalStore(subscribe, readRaw, getServerSnapshot);
}

export { parse as parseRecentlyViewed };
