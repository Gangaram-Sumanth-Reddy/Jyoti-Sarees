"use client";

import { RatingChip } from "@/components/reviews/Stars";
import { useRatingSummary } from "@/lib/review-summaries";
import { formatReviewCount } from "@/lib/reviews";

/** Compact rating line under the product title; links to the reviews section. */
export function ProductRatingSummary({ slug }: { slug: string }) {
  const summary = useRatingSummary(slug);

  return (
    <a
      href="#reviews"
      className="mt-2.5 inline-flex items-center gap-2 text-small font-semibold text-navy underline-offset-2 hover:underline"
    >
      {summary ? (
        <>
          <RatingChip rating={summary.average} />
          <span className="text-muted">{formatReviewCount(summary.count)}</span>
        </>
      ) : (
        "Be the first to review"
      )}
    </a>
  );
}
