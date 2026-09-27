"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** `/sarees/ruby` and `/sarees/ruby/red` are the same page (colour switch keeps its scroll). */
function pageKey(pathname: string) {
  return pathname.split("/").filter(Boolean).slice(0, 2).join("/");
}

/** Every route change starts at the very top of the new page. */
export function RouteScrollReset() {
  const pathname = usePathname();
  const previousKey = useRef<string | null>(null);

  useLayoutEffect(() => {
    const key = pageKey(pathname);
    const previous = previousKey.current;
    previousKey.current = key;

    // Initial load is left to the browser so #anchors and reload restoration still work.
    if (previous === null || previous === key) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
