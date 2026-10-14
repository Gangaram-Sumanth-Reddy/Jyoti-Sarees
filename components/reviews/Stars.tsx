import { cn } from "@/lib/cn";

export const STAR_PATH =
  "m12 2.5 2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5Z";

export function StarIcon({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="currentColor" d={STAR_PATH} />
    </svg>
  );
}

/** Five stars, filled to the nearest half for `value`. Decorative; pair with text. */
export function StarRow({
  value,
  size = 16,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = rounded >= star ? 1 : rounded >= star - 0.5 ? 0.5 : 0;
        return (
          <span key={star} className="relative inline-block" style={{ width: size, height: size }}>
            <StarIcon size={size} className="absolute inset-0 text-border-strong" />
            {fill > 0 ? (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <StarIcon size={size} className="max-w-none shrink-0 text-[#f2a20c]" />
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}

/** Flipkart-style rating chip: green for 3+, amber for 2, red for 1. */
export function RatingChip({ rating, className }: { rating: number; className?: string }) {
  const tone =
    rating >= 3 ? "bg-[#1a8a3a]" : rating >= 2 ? "bg-[#e08a00]" : "bg-[#d1382f]";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[0.72rem] font-bold leading-none text-white",
        tone,
        className,
      )}
    >
      {rating}
      <StarIcon size={10} />
    </span>
  );
}
