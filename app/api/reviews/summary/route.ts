import type { ReviewSummariesResponse } from "@/lib/reviews";
import {
  getApprovedSummaries,
  isReviewStoreConfigured,
} from "@/lib/server/review-store";

/** Average rating and count per saree, from approved reviews only. */
export async function GET() {
  const configured = isReviewStoreConfigured();
  let body: ReviewSummariesResponse = { configured, summaries: {} };
  if (configured) {
    try {
      body = { configured, summaries: await getApprovedSummaries() };
    } catch {
      console.error("[reviews] Could not read the review store.");
    }
  }
  return Response.json(body, { headers: { "Cache-Control": "no-store" } });
}
