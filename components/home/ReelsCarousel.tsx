"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Auto-scroll speed in pixels per second. */
const SPEED = 32;
/** Pause after a swipe or wheel scroll before auto-scrolling again. */
const RESUME_DELAY_MS = 2500;

type ReelsCarouselProps = {
  label: string;
  /** The list items, rendered twice (the second set marked `reels-loop-copy`) so the loop is seamless. */
  children: ReactNode;
};

/**
 * A native horizontal scroller that drifts right to left on its own. Because it really scrolls (rather than
 * animating a transform), visitors can swipe or trackpad-scroll it at any time; auto-scroll pauses on hover,
 * keyboard focus, touch and when off screen, and is off entirely for reduced motion.
 */
export function ReelsCarousel({ label, children }: ReelsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let position = viewport.scrollLeft;
    let lastFrame = 0;
    let frame = 0;
    let onScreen = false;
    let hovered = false;
    let touching = false;
    let resumeAt = 0;

    const loopWidth = () => viewport.scrollWidth / 2;

    const isPaused = (now: number) =>
      reducedMotion.matches ||
      !onScreen ||
      hovered ||
      touching ||
      now < resumeAt ||
      viewport.querySelector(":focus-visible") !== null;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const elapsed = lastFrame ? Math.min(now - lastFrame, 100) : 0;
      lastFrame = now;
      // Something else (keyboard, scrollbar, the loop wrap) moved the scroller; continue from there.
      if (isPaused(now) || Math.abs(viewport.scrollLeft - position) > 2) {
        position = viewport.scrollLeft;
        return;
      }
      position += (SPEED * elapsed) / 1000;
      const half = loopWidth();
      if (position >= half) position -= half;
      viewport.scrollLeft = position;
    };

    // Keep manual scrolling inside the loop as well.
    const onScroll = () => {
      if (reducedMotion.matches) return;
      const half = loopWidth();
      if (viewport.scrollLeft >= half) viewport.scrollLeft -= half;
    };
    const pauseBriefly = () => {
      resumeAt = performance.now() + RESUME_DELAY_MS;
    };
    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovered = true;
    };
    const onPointerLeave = () => {
      hovered = false;
    };
    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      pauseBriefly();
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    observer.observe(viewport);

    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("wheel", pauseBriefly, { passive: true });
    viewport.addEventListener("pointerenter", onPointerEnter);
    viewport.addEventListener("pointerleave", onPointerLeave);
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchend", onTouchEnd, { passive: true });
    viewport.addEventListener("touchcancel", onTouchEnd, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("wheel", pauseBriefly);
      viewport.removeEventListener("pointerenter", onPointerEnter);
      viewport.removeEventListener("pointerleave", onPointerLeave);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div ref={viewportRef} className="reels-marquee @container overflow-x-auto overscroll-x-contain">
      <ul aria-label={label} className="flex w-max list-none px-0 pb-12 pt-2">
        {children}
      </ul>
    </div>
  );
}
