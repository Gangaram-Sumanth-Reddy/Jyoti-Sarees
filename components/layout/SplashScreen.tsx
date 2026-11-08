"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const STORAGE_KEY = "jyoti-splash-seen";

/**
 * Milliseconds from first paint; mirrors the CSS timeline in globals.css (`.splash`). The CSS fade-out
 * drives the state changes; these are only a backstop if its animation events never arrive.
 */
const TIMELINE = {
  full: { release: 2500, end: 3100 },
  reduced: { release: 750, end: 1100 },
  skip: 350,
} as const;
const BACKSTOP_MS = 300;

/** Hard stop in case the page script never runs (e.g. a hydration error). */
const FAILSAFE_MS = 4500;

/**
 * Runs in <head> before first paint. The splash plays on the first page of a
 * browser session and on reloads, for real browsers only. Client-side
 * navigation never re-runs it. Everywhere else the markup stays
 * `display: none`, so there is no flash and no layout shift.
 */
export const splashBootScript = `(function(){try{var d=document.documentElement;if(/bot|crawl|spider|slurp|lighthouse|pagespeed|headless/i.test(navigator.userAgent))return;var n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];var reload=n&&n.type==="reload";if(sessionStorage.getItem("${STORAGE_KEY}")&&!reload)return;d.dataset.splash="play";setTimeout(function(){if(d.dataset.splash!=="done")d.dataset.splash="done";},${FAILSAFE_MS});}catch(e){}})();`;

type SplashState = "play" | "release" | "skip" | "done";

function setSplashState(state: SplashState) {
  document.documentElement.dataset.splash = state;
}

/**
 * Two silk panels in a 1600×900 scene. Each path is twice the scene's width so it can
 * flow across it; the CSS moves the panels and ripples them.
 */
const SILK = {
  drapeTop:
    "M0,560 C350,430 700,410 1050,485 C1400,560 1750,600 2100,505 C2450,410 2800,385 3200,460",
  drape:
    "M0,560 C350,430 700,410 1050,485 C1400,560 1750,600 2100,505 C2450,410 2800,385 3200,460 L3200,650 C2800,575 2450,605 2100,690 C1750,775 1400,740 1050,665 C700,590 350,610 0,745 Z",
  sweepTop:
    "M0,385 C380,305 760,330 1120,420 C1480,510 1840,525 2200,435 C2560,345 2900,305 3200,350",
  sweep:
    "M0,385 C380,305 760,330 1120,420 C1480,510 1840,525 2200,435 C2560,345 2900,305 3200,350 L3200,440 C2900,392 2560,428 2200,525 C1840,622 1480,606 1120,508 C760,412 380,395 0,478 Z",
  sweepBorder:
    "M0,466 C380,383 760,400 1120,496 C1480,592 1840,608 2200,513 C2560,418 2900,380 3200,428",
};

function SilkLayer({ children }: { children: ReactNode }) {
  return (
    <svg className="splash-silk" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" focusable="false">
      {children}
    </svg>
  );
}

/** A slow drape that stays behind the logo. */
function SilkDrape() {
  return (
    <SilkLayer>
      <defs>
        <linearGradient id="splash-drape-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1b3d9c" stopOpacity="0" />
          <stop offset="0.2" stopColor="#1b3d9c" stopOpacity="0.55" />
          <stop offset="0.38" stopColor="#2c56c4" stopOpacity="0.7" />
          <stop offset="0.55" stopColor="#163485" stopOpacity="0.6" />
          <stop offset="0.72" stopColor="#2a4fb5" stopOpacity="0.65" />
          <stop offset="1" stopColor="#1b3d9c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="splash-drape">
        <g className="splash-ripple">
          <path d={SILK.drape} fill="url(#splash-drape-fill)" />
          <path className="splash-silk-edge" d={SILK.drapeTop} pathLength={1} />
        </g>
      </g>
    </SilkLayer>
  );
}

/** The panel that sweeps across in front of the logo, revealing it in its wake. */
function SilkSweep() {
  return (
    <SilkLayer>
      <defs>
        <linearGradient id="splash-sweep-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#21459f" stopOpacity="0" />
          <stop offset="0.18" stopColor="#21459f" stopOpacity="0.85" />
          <stop offset="0.34" stopColor="#3a63cf" stopOpacity="0.92" />
          <stop offset="0.46" stopColor="#1a3a92" stopOpacity="0.9" />
          <stop offset="0.6" stopColor="#4670d8" stopOpacity="0.92" />
          <stop offset="0.8" stopColor="#21459f" stopOpacity="0.85" />
          <stop offset="1" stopColor="#21459f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="splash-sweep">
        <g className="splash-ripple splash-ripple-alt">
          <path d={SILK.sweep} fill="url(#splash-sweep-fill)" />
          <path className="splash-silk-edge splash-silk-highlight" d={SILK.sweepTop} pathLength={1} />
          <path className="splash-silk-edge splash-silk-zari" d={SILK.sweepBorder} pathLength={1} />
        </g>
      </g>
    </SilkLayer>
  );
}

/**
 * Brand intro: a silk panel sweeps across a royal-navy screen and reveals the
 * emblem, then the wordmark; after a short hold the overlay fades and scales
 * into the page and is removed from the DOM. Click or any key skips it.
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

  const release = useCallback(() => {
    if (document.documentElement.dataset.splash === "play") setSplashState("release");
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
    // The CSS timeline started at first paint, before hydration.
    const elapsed = performance.now();

    timers.current.push(
      window.setTimeout(release, Math.max(0, timing.release + BACKSTOP_MS - elapsed)),
      window.setTimeout(finish, Math.max(0, timing.end + BACKSTOP_MS - elapsed)),
    );
    window.addEventListener("keydown", skip);

    return () => {
      clearTimers();
      window.removeEventListener("keydown", skip);
    };
  }, [finish, release, skip]);

  if (!mounted) return null;

  return (
    <div
      className="splash"
      aria-hidden="true"
      onPointerDown={skip}
      onAnimationStart={(event) => {
        if (event.target === event.currentTarget && event.animationName === "splash-out") release();
      }}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === "splash-out") finish();
      }}
    >
      <div className="splash-stage">
        <SilkDrape />

        <div className="splash-logo">
          <span className="splash-mark" />
          <span className="splash-word">
            <span className="splash-word-sheen" />
          </span>
        </div>

        <SilkSweep />
      </div>
    </div>
  );
}
