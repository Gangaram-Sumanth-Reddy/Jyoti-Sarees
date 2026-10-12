"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type LegalContentsItem = {
  id: string;
  title: string;
};

function readingLine() {
  const header = getComputedStyle(document.documentElement)
    .getPropertyValue("--site-header-height")
    .trim();
  const headerHeight = Number.parseFloat(header);
  return (Number.isFinite(headerHeight) ? headerHeight : 72) + 24;
}

export function LegalContents({
  items,
  className,
}: {
  items: LegalContentsItem[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLOListElement>(null);
  const idKey = items.map((item) => item.id).join("|");

  useEffect(() => {
    const ids = idKey.split("|").filter(Boolean);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);
    if (nodes.length === 0) return;

    let frame = 0;
    const update = () => {
      const line = readingLine();
      let current = nodes[0].id;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = nodes[nodes.length - 1].id;
      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, [idKey]);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLAnchorElement>('[aria-current="location"]');
    if (!list || !link || list.scrollHeight <= list.clientHeight) return;
    const listRect = list.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    if (linkRect.top < listRect.top) {
      list.scrollTop -= listRect.top - linkRect.top;
    } else if (linkRect.bottom > listRect.bottom) {
      list.scrollTop += linkRect.bottom - listRect.bottom;
    }
  }, [activeId]);

  return (
    <ol ref={listRef} className={cn("grid gap-1 text-small", className)}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active ? "location" : undefined}
              className={cn(
                "block rounded-md px-2.5 py-1.5 transition-colors",
                active
                  ? "bg-cream font-semibold text-navy ring-1 ring-inset ring-navy/20"
                  : "font-medium text-muted hover:bg-cream hover:text-navy",
              )}
              onClick={() => setActiveId(item.id)}
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
