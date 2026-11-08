"use client";

import { useLinkStatus } from "next/link";
import { createPortal } from "react-dom";

/**
 * Render inside a `<Link>`. Shows the header sweep while a click waits on a
 * route that has not finished prefetching. Portalled to <body> because the
 * header and bottom nav create containing blocks for fixed children.
 */
export function NavPendingBar() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return createPortal(
    <div className="route-loading-bar" aria-hidden="true" />,
    document.body,
  );
}
