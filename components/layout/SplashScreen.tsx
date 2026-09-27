"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const STORAGE_KEY = "jyoti-splash-seen";

/** Milliseconds; mirrors the CSS timeline in globals.css (`.splash`). */
const TIMELINE = {
  full: { release: 3400, end: 4000 },
  reduced: { release: 900, end: 1300 },
  skip: 350,
} as const;

/**
 * Runs in <head> before first paint. The splash only plays on a first visit to
 * the homepage in this browser session, for real browsers. Everywhere else the
 * markup stays `display: none`, so there is no flash and no layout shift.
 */
export const splashBootScript = `(function(){try{if(location.pathname!=="/")return;if(sessionStorage.getItem("${STORAGE_KEY}"))return;if(/bot|crawl|spider|slurp|lighthouse|pagespeed|headless/i.test(navigator.userAgent))return;document.documentElement.dataset.splash="play";}catch(e){}})();`;

type SplashState = "play" | "release" | "skip" | "done";

function setSplashState(state: SplashState) {
  document.documentElement.dataset.splash = state;
}

/**
 * Brand intro: a silk ribbon flows across a white screen and reveals the logo,
 * then the overlay fades into the page and is removed from the DOM.
 */
export function SplashScreen() {
  const [mounted, setMounted] = useState(true);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const finish = useCallback(() => {
    clearTimers();
    setSplashState("done");
    setMounted(false);
  }, []);

  const skip = useCallback(() => {
    if (document.documentElement.dataset.splash !== "play") return;
    clearTimers();
    setSplashState("skip");
    timers.current.push(window.setTimeout(finish, TIMELINE.skip));
  }, [finish]);

  useEffect(() => {
    if (document.documentElement.dataset.splash !== "play") {
      const id = window.setTimeout(() => setMounted(false), 0);
      return () => window.clearTimeout(id);
    }

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timing = reduced ? TIMELINE.reduced : TIMELINE.full;

    timers.current.push(
      window.setTimeout(() => setSplashState("release"), timing.release),
      window.setTimeout(finish, timing.end),
    );
    window.addEventListener("keydown", skip);

    return () => {
      clearTimers();
      window.removeEventListener("keydown", skip);
    };
  }, [finish, skip]);

  if (!mounted) return null;

  return (
    <div className="splash" aria-hidden="true" onPointerDown={skip}>
      <div className="splash-logo">
        <Image
          src="/assets/Logo.png"
          alt=""
          width={1098}
          height={1098}
          sizes="(min-width: 640px) 84px, 60px"
          className="splash-mark"
        />
        <span className="splash-wordmark" role="img" aria-label={site.name} />
      </div>

      {/* A tapered silk panel that glides over the logo like a lifting veil. */}
      <svg
        className="splash-silk"
        viewBox="0 0 2000 480"
        preserveAspectRatio="none"
        focusable="false"
      >
        <g className="splash-silk-flow">
          <path
            className="splash-silk-body"
            d="M0,310 C260,280 520,120 860,130 C1180,140 1300,300 1600,280 C1800,268 1920,215 2000,200 C1920,235 1800,330 1600,345 C1290,370 1160,280 860,275 C540,270 280,320 0,310 Z"
          />
          <path
            className="splash-silk-fold"
            d="M220,300 C470,238 610,168 860,182 C1110,196 1260,298 1560,298 C1400,322 1160,244 860,230 C610,218 430,282 220,300 Z"
          />
          <path
            className="splash-silk-edge"
            pathLength={1}
            d="M0,310 C260,280 520,120 860,130 C1180,140 1300,300 1600,280 C1800,268 1920,215 2000,200"
          />
          <path
            className="splash-silk-edge splash-silk-border"
            pathLength={1}
            d="M0,310 C280,306 540,252 860,257 C1160,262 1290,350 1600,327 C1800,312 1920,228 2000,202"
          />
          <path
            className="splash-silk-edge"
            pathLength={1}
            d="M0,310 C280,320 540,270 860,275 C1160,280 1290,370 1600,345 C1800,330 1920,235 2000,200"
          />
        </g>
      </svg>
    </div>
  );
}
