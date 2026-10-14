import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  summarizeRatings,
  type PublicReview,
  type RatingSummary,
  type ReviewSubmission,
} from "@/lib/reviews";
import {
  appendSubmission,
  isAppsScriptConfigured,
  listApprovedReviews,
  type InsertOutcome,
} from "@/lib/server/google-apps-script";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type StoredReview = {
  id: string;
  reference: string;
  productSlug: string;
  productName: string;
  name: string;
  rating: number;
  title: string;
  body: string;
  status: ReviewStatus;
  submittedAt: string;
  moderatedAt?: string;
  publicationConsentText: string;
  policyVersion: string;
};

type ReviewFile = { version: 1; reviews: StoredReview[] };

/**
 * Where submitted reviews wait for approval:
 *
 * - "sheets": the "Reviews" tab of the Google Sheet, used whenever the Google
 *   Apps Script integration is configured. New rows get Status "Pending";
 *   only rows the owner changes to "Approved" are published.
 * - "file": a private JSON file on the server's disk (REVIEWS_DATA_DIR),
 *   moderated at /admin/reviews. Needs a persistent disk, so it suits a VPS,
 *   not serverless hosting.
 *
 * With neither, review submission reports a setup error instead of succeeding.
 */
export type ReviewBackend = "sheets" | "file";

export function reviewBackend(): ReviewBackend | null {
  if (isAppsScriptConfigured()) return "sheets";
  if (reviewStoreDir()) return "file";
  return null;
}

export function isReviewStoreConfigured() {
  return reviewBackend() !== null;
}

/** Folder for the "file" backend, outside `public/`, e.g. `.data/reviews`. */
export function reviewStoreDir() {
  const raw = process.env.REVIEWS_DATA_DIR?.trim();
  if (!raw) return null;
  const dir = path.resolve(/* turbopackIgnore: true */ process.cwd(), raw);
  const publicDir = path.resolve(/* turbopackIgnore: true */ process.cwd(), "public");
  const relative = path.relative(publicDir, dir);
  if (!relative.startsWith("..") && !path.isAbsolute(relative)) {
    console.error("[reviews] REVIEWS_DATA_DIR must not be inside public/.");
    return null;
  }
  return dir;
}

function storeFile(dir: string) {
  return path.join(dir, "reviews.json");
}

async function readAll(dir: string): Promise<StoredReview[]> {
  try {
    const raw = await readFile(storeFile(dir), "utf8");
    const parsed = JSON.parse(raw) as Partial<ReviewFile>;
    return Array.isArray(parsed.reviews) ? parsed.reviews : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

let writeQueue: Promise<unknown> = Promise.resolve();

/** Serialises read-modify-write cycles and replaces the file atomically. */
function mutate<T>(dir: string, change: (reviews: StoredReview[]) => T): Promise<T> {
  const run = writeQueue.then(async () => {
    const reviews = await readAll(dir);
    const result = change(reviews);
    await mkdir(dir, { recursive: true, mode: 0o700 });
    const target = storeFile(dir);
    const temp = `${target}.${process.pid}.${Date.now()}.tmp`;
    const file: ReviewFile = { version: 1, reviews };
    await writeFile(temp, JSON.stringify(file, null, 2), { mode: 0o600 });
    await rename(temp, target);
    return result;
  });
  writeQueue = run.catch(() => undefined);
  return run;
}

export async function addPendingReview(
  data: ReviewSubmission & { productName: string },
  meta: { reference: string; publicationConsentText: string; policyVersion: string },
): Promise<InsertOutcome> {
  const backend = reviewBackend();
  if (backend === "sheets") {
    return appendSubmission("product_review", meta.reference, {
      productSlug: data.productSlug,
      productName: data.productName,
      rating: data.rating,
      name: data.name,
      title: data.title,
      review: data.body,
      consentText: meta.publicationConsentText,
      policyVersion: meta.policyVersion,
    });
  }
  const dir = reviewStoreDir();
  if (!dir) return "not_configured";
  await mutate(dir, (reviews) => {
    reviews.push({
      id: randomUUID(),
      reference: meta.reference,
      productSlug: data.productSlug,
      productName: data.productName,
      name: data.name,
      rating: data.rating,
      title: data.title,
      body: data.body,
      status: "pending",
      submittedAt: new Date().toISOString(),
      publicationConsentText: meta.publicationConsentText,
      policyVersion: meta.policyVersion,
    });
  });
  return "stored";
}

type ApprovedReview = PublicReview & { productSlug: string };

const SHEET_CACHE_MS = 60_000;
let sheetCache: { at: number; reviews: ApprovedReview[] } | null = null;
let sheetRequest: Promise<ApprovedReview[]> | null = null;

/** Approved rows from the sheet, cached briefly so page views don't each call Google. */
async function approvedFromSheet(): Promise<ApprovedReview[]> {
  if (sheetCache && Date.now() - sheetCache.at < SHEET_CACHE_MS) return sheetCache.reviews;
  sheetRequest ??= listApprovedReviews()
    .then((rows) => {
      const reviews = rows.map((row) => ({
        id: row.reference,
        productSlug: row.productSlug,
        name: row.name,
        rating: row.rating,
        title: row.title,
        body: row.body,
        publishedAt: row.submittedAt,
      }));
      sheetCache = { at: Date.now(), reviews };
      return reviews;
    })
    .catch((error) => {
      if (sheetCache) return sheetCache.reviews;
      throw error;
    })
    .finally(() => {
      sheetRequest = null;
    });
  return sheetRequest;
}

async function approvedReviews(): Promise<ApprovedReview[]> {
  const backend = reviewBackend();
  if (backend === "sheets") return approvedFromSheet();
  const dir = reviewStoreDir();
  if (!dir) return [];
  const reviews = await readAll(dir);
  return reviews
    .filter((review) => review.status === "approved")
    .map((review) => ({
      id: review.id,
      productSlug: review.productSlug,
      name: review.name,
      rating: review.rating,
      title: review.title,
      body: review.body,
      publishedAt: review.moderatedAt ?? review.submittedAt,
    }));
}

/** Approved reviews for one product, newest first. */
export async function getApprovedReviews(productSlug: string) {
  const approved = (await approvedReviews())
    .filter((review) => review.productSlug === productSlug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return {
    summary: summarizeRatings(approved.map((review) => review.rating)),
    reviews: approved.map(
      (review): PublicReview => ({
        id: review.id,
        name: review.name,
        rating: review.rating,
        title: review.title,
        body: review.body,
        publishedAt: review.publishedAt,
      }),
    ),
  };
}

/** Average rating and count per product, from approved reviews only. */
export async function getApprovedSummaries() {
  const bySlug = new Map<string, number[]>();
  for (const review of await approvedReviews()) {
    const ratings = bySlug.get(review.productSlug) ?? [];
    ratings.push(review.rating);
    bySlug.set(review.productSlug, ratings);
  }
  const summaries: Record<string, Pick<RatingSummary, "average" | "count">> = {};
  for (const [slug, ratings] of bySlug) {
    const summary = summarizeRatings(ratings);
    if (summary) summaries[slug] = { average: summary.average, count: summary.count };
  }
  return summaries;
}

/** Every review, for the protected moderation page only. */
export async function getReviewsForModeration() {
  const dir = reviewStoreDir();
  if (!dir) return [];
  const reviews = await readAll(dir);
  return reviews.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export async function setReviewStatus(id: string, status: Exclude<ReviewStatus, "pending">) {
  const dir = reviewStoreDir();
  if (!dir) return false;
  return mutate(dir, (reviews) => {
    const review = reviews.find((entry) => entry.id === id);
    if (!review) return false;
    review.status = status;
    review.moderatedAt = new Date().toISOString();
    return true;
  });
}
