"use client";

import { formatPrice } from "@/lib/products";

type PriceRangeSliderProps = {
  min: number;
  max: number;
  valueMin: number | null;
  valueMax: number | null;
  onChange: (next: { min: number | null; max: number | null }) => void;
  idPrefix: string;
};

const STEP = 50;
/** Must match the thumb width in `.price-range-input` (globals.css). */
const THUMB_REM = 1.125;

function clamp(value: number, low: number, high: number) {
  return Math.min(Math.max(value, low), high);
}

function thumbLeft(percent: number) {
  return `calc(${THUMB_REM / 2}rem + (100% - ${THUMB_REM}rem) * ${percent / 100})`;
}

export function PriceRangeSlider({
  min,
  max,
  valueMin,
  valueMax,
  onChange,
  idPrefix,
}: PriceRangeSliderProps) {
  const span = max - min;
  const low = clamp(valueMin ?? min, min, max);
  const high = clamp(valueMax ?? max, min, max);
  const atTop = high >= max;

  const lowPercent = span > 0 ? ((low - min) / span) * 100 : 0;
  const highPercent = span > 0 ? ((high - min) / span) * 100 : 100;

  function commit(nextLow: number, nextHigh: number) {
    onChange({
      min: nextLow <= min ? null : nextLow,
      max: nextHigh >= max ? null : nextHigh,
    });
  }

  function handleLow(raw: number) {
    const next = Math.min(raw, high - STEP);
    commit(Math.max(next, min), high);
  }

  function handleHigh(raw: number) {
    // Snap to the true maximum near the top so it's reachable even when
    // the range isn't a multiple of STEP.
    const snapped = raw > max - STEP ? max : raw;
    const next = Math.max(snapped, low + STEP);
    commit(low, Math.min(next, max));
  }

  const label = `${formatPrice(low)} – ${formatPrice(high)}${atTop ? "+" : ""}`;

  if (span <= STEP) {
    return (
      <p className="text-[0.85rem] font-semibold text-rich-black">
        {formatPrice(min)}
      </p>
    );
  }

  return (
    <div className="min-w-0">
      <p
        className="text-[0.85rem] font-semibold tabular-nums text-rich-black"
        aria-live="polite"
      >
        {label}
      </p>

      <div className="relative mt-2 h-6 w-full">
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-pill bg-border"
          style={{ left: thumbLeft(0), right: `${THUMB_REM / 2}rem` }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-pill bg-navy"
          style={{
            left: thumbLeft(lowPercent),
            width: `calc((100% - ${THUMB_REM}rem) * ${(highPercent - lowPercent) / 100})`,
          }}
          aria-hidden="true"
        />

        <input
          id={`${idPrefix}-price-min`}
          type="range"
          min={min}
          max={max}
          step={STEP}
          value={low}
          onChange={(event) => handleLow(Number(event.target.value))}
          aria-label="Minimum price"
          aria-valuetext={formatPrice(low)}
          className="price-range-input"
          // Keep the low thumb grabbable when both handles meet at the top.
          style={{ zIndex: lowPercent > 90 ? 3 : 2 }}
        />
        <input
          id={`${idPrefix}-price-max`}
          type="range"
          min={min}
          max={max}
          step={STEP}
          value={high}
          onChange={(event) => handleHigh(Number(event.target.value))}
          aria-label="Maximum price"
          aria-valuetext={`${formatPrice(high)}${atTop ? " and above" : ""}`}
          className="price-range-input"
          style={{ zIndex: 2 }}
        />
      </div>
    </div>
  );
}
