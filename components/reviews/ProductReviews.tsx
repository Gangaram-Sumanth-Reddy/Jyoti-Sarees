"use client";

import { useEffect, useState } from "react";
import { ReviewModal } from "@/components/reviews/ReviewModal";
import { RatingChip, STAR_PATH, StarIcon, StarRow } from "@/components/reviews/Stars";
import { Button } from "@/components/ui/Button";
import {
  formatReviewCount,
  type ProductReviewsResponse,
  type PublicReview,
  type RatingSummary,
} from "@/lib/reviews";

const INITIAL_VISIBLE = 5;

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | ({ status: "ready" } & ProductReviewsResponse);

function Distribution({ summary }: { summary: RatingSummary }) {
  return (
    <ul className="mt-5 grid list-none gap-1.5 p-0" aria-label="Rating breakdown">
      {summary.distribution.map((count, index) => {
        const stars = 5 - index;
        const share = summary.count ? (count / summary.count) * 100 : 0;
        return (
          <li key={stars} className="flex items-center gap-2 text-small text-rich-black">
            <span className="inline-flex w-7 items-center gap-0.5 font-semibold">
              {stars}
              <StarIcon size={10} className="text-muted" />
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-border" aria-hidden="true">
              <span
                className="block h-full rounded-full bg-navy"
                style={{ width: `${share}%` }}
              />
            </span>
            <span className="w-8 text-right tabular-nums text-muted">
              <span className="sr-only">{stars} stars: </span>
              {count}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function ReviewItem({ review }: { review: PublicReview }) {
  return (
    <li className="border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex items-start gap-2.5">
        <RatingChip rating={review.rating} className="mt-0.5" />
        <p className="font-semibold text-rich-black">{review.title}</p>
      </div>
      <p className="mt-2 whitespace-pre-line text-body leading-relaxed text-rich-black/85">
        {review.body}
      </p>
      <p className="mt-2.5 text-small text-muted">
        <span className="font-semibold text-rich-black/80">{review.name}</span>
        <span aria-hidden="true"> · </span>
        <time dateTime={review.publishedAt}>
          {dateFormat.format(new Date(review.publishedAt))}
        </time>
      </p>
    </li>
  );
}

export function ProductReviews({
  productSlug,
  productName,
}: {
  productSlug: string;
  productName: string;
}) {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [modalOpen, setModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/reviews?product=${encodeURIComponent(productSlug)}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<ProductReviewsResponse>;
      })
      .then((data) => setState({ status: "ready", ...data }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ status: "error" });
      });
    return () => controller.abort();
  }, [productSlug]);

  const summary = state.status === "ready" ? state.summary : null;
  const reviews = state.status === "ready" ? state.reviews : [];
  const visible = showAll ? reviews : reviews.slice(0, INITIAL_VISIBLE);
  const writeButton = (
    <Button
      type="button"
      onClick={() => setModalOpen(true)}
      disabled={state.status === "loading"}
      className="gap-1.5"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 20h4L19 9l-4-4L4 16v4Z M13.5 6.5l4 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      Write a Review
    </Button>
  );

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-[calc(var(--site-header-height)+1rem)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="reviews-heading" className="text-h3 font-semibold text-rich-black">
          Ratings &amp; Reviews
        </h2>
        {summary ? writeButton : null}
      </div>

      {state.status === "loading" ? (
        <div className="mt-5 h-32 animate-pulse rounded-lg bg-border/50" aria-hidden="true" />
      ) : state.status === "error" ? (
        <p className="mt-4 text-body text-muted">
          Reviews couldn&apos;t be loaded right now. Please refresh the page to try again.
        </p>
      ) : summary ? (
        <div className="mt-5 grid gap-6 rounded-lg border border-border bg-white p-5 shadow-soft sm:p-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
          <div className="lg:border-r lg:border-border lg:pr-10">
            <p className="flex items-center gap-2">
              <span className="text-[2.5rem] font-semibold leading-none text-rich-black">
                {summary.average.toFixed(1)}
              </span>
              <StarIcon size={26} className="text-[#f2a20c]" />
            </p>
            <StarRow value={summary.average} className="mt-2" />
            <p className="mt-2 text-small text-muted">
              Based on {formatReviewCount(summary.count)}
            </p>
            <Distribution summary={summary} />
          </div>
          <div className="min-w-0">
            <ul className="list-none p-0">
              {visible.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </ul>
            {reviews.length > INITIAL_VISIBLE ? (
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                className="mt-4 text-small font-semibold text-navy underline-offset-2 hover:underline"
              >
                {showAll ? "Show fewer reviews" : `Show all ${formatReviewCount(reviews.length)}`}
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-start gap-4 rounded-lg border border-border bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream text-navy" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d={STAR_PATH}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-rich-black">Be the first to review</p>
              <p className="mt-0.5 text-small text-muted">
                No reviews yet for this saree. Bought it? Tell others what you think.
              </p>
            </div>
          </div>
          {writeButton}
        </div>
      )}

      <ReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productSlug={productSlug}
        productName={productName}
        configured={state.status === "ready" ? state.configured : true}
      />
    </section>
  );
}
