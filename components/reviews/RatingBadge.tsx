"use client";

import { StarIcon } from "@/components/reviews/Stars";
import { cn } from "@/lib/cn";
import { useRatingSummary } from "@/lib/review-summaries";
import { formatReviewCount } from "@/lib/reviews";

/** Card overlay with the approved average rating. Renders nothing without approved reviews. */
export function RatingBadge({ slug, className }: { slug: string; className?: string }) {
  const summary = useRatingSummary(slug);
  if (!summary) return null;

  return (
    <span
      className={cn(
        "absolute z-10 inline-flex items-center gap-0.5 rounded-md bg-white/95 px-1.5 py-0.5 text-[0.7rem] font-semibold text-[#1a1a1a] shadow-soft",
        className,
      )}
      role="img"
      aria-label={`Rated ${summary.average.toFixed(1)} out of 5 from ${formatReviewCount(summary.count)}`}
    >
      {summary.average.toFixed(1)}
      <StarIcon size={10} className="text-[#1a8a3a]" />
    </span>
  );
}
