import {
  hasErrors,
  readBoolean,
  readString,
  type FieldErrors,
  type ParseResult,
} from "@/lib/form-validation";
import { getProductBySlug } from "@/lib/products";

export type ReviewSubmission = {
  productSlug: string;
  name: string;
  rating: number;
  title: string;
  body: string;
  publicationConsent: boolean;
};

export type ReviewErrors = FieldErrors<ReviewSubmission>;

/** A review that an administrator has approved. Never includes pending data. */
export type PublicReview = {
  id: string;
  name: string;
  rating: number;
  title: string;
  body: string;
  /** ISO date the review was approved. */
  publishedAt: string;
};

export type RatingSummary = {
  /** Average of approved ratings, rounded to one decimal. */
  average: number;
  count: number;
  /** Counts for 5, 4, 3, 2 and 1 stars, in that order. */
  distribution: [number, number, number, number, number];
};

export type ProductReviewsResponse = {
  configured: boolean;
  summary: RatingSummary | null;
  reviews: PublicReview[];
};

export type ReviewSummariesResponse = {
  configured: boolean;
  summaries: Record<string, Pick<RatingSummary, "average" | "count">>;
};

export const reviewLimits = { name: 60, title: 100, body: 1500 } as const;
const MIN_BODY_LENGTH = 10;

export const reviewPublicationConsentText =
  "I agree that Jyoti Sarees may publish this review on its website with my name, after it has been checked by the team.";

export function emptyReviewSubmission(productSlug: string): ReviewSubmission {
  return {
    productSlug,
    name: "",
    rating: 0,
    title: "",
    body: "",
    publicationConsent: false,
  };
}

export function validateReview(data: ReviewSubmission): ReviewErrors {
  const errors: ReviewErrors = {};
  if (!getProductBySlug(data.productSlug)) {
    errors.productSlug = "This saree could not be found.";
  }
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    errors.rating = "Please choose a star rating from 1 to 5.";
  }
  if (!data.title.trim()) errors.title = "Please add a short title for your review.";
  if (data.body.trim().length < MIN_BODY_LENGTH) {
    errors.body = `Please write at least ${MIN_BODY_LENGTH} characters about the saree.`;
  }
  if (!data.publicationConsent) {
    errors.publicationConsent = "Please confirm we may publish your review once approved.";
  }
  return errors;
}

/** Server-side parsing of an untrusted review payload. */
export function parseReview(body: unknown): ParseResult<ReviewSubmission> {
  const rawRating =
    body && typeof body === "object"
      ? (body as Record<string, unknown>).rating
      : undefined;
  const data: ReviewSubmission = {
    productSlug: readString(body, "productSlug", 160),
    name: readString(body, "name", reviewLimits.name),
    rating: typeof rawRating === "number" ? rawRating : 0,
    title: readString(body, "title", reviewLimits.title),
    body: readString(body, "body", reviewLimits.body),
    publicationConsent: readBoolean(body, "publicationConsent"),
  };
  const errors = validateReview(data);
  return hasErrors(errors) ? { ok: false, errors } : { ok: true, data };
}

export function summarizeRatings(ratings: number[]): RatingSummary | null {
  if (ratings.length === 0) return null;
  const distribution: RatingSummary["distribution"] = [0, 0, 0, 0, 0];
  let total = 0;
  for (const rating of ratings) {
    total += rating;
    distribution[5 - rating] += 1;
  }
  return {
    average: Math.round((total / ratings.length) * 10) / 10,
    count: ratings.length,
    distribution,
  };
}

export function formatReviewCount(count: number) {
  return `${count.toLocaleString("en-IN")} ${count === 1 ? "review" : "reviews"}`;
}
