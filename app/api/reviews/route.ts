import { privacyConfig } from "@/lib/privacy-config";
import { getProductBySlug } from "@/lib/products";
import {
  parseReview,
  reviewPublicationConsentText,
  type ProductReviewsResponse,
} from "@/lib/reviews";
import { handleFormSubmission } from "@/lib/server/form-endpoint";
import {
  addPendingReview,
  getApprovedReviews,
  isReviewStoreConfigured,
} from "@/lib/server/review-store";

/** Approved reviews for one saree. Pending and rejected reviews are never returned. */
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("product") ?? "";
  if (!getProductBySlug(slug)) {
    return Response.json({ message: "Unknown saree." }, { status: 404 });
  }

  const configured = isReviewStoreConfigured();
  let body: ProductReviewsResponse = { configured, summary: null, reviews: [] };
  if (configured) {
    try {
      body = { configured, ...(await getApprovedReviews(slug)) };
    } catch {
      console.error("[reviews] Could not read the review store.");
    }
  }
  return Response.json(body, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    formType: "product_review",
    referencePrefix: "REV",
    parse: parseReview,
    setupHint: "NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL (or REVIEWS_DATA_DIR)",
    notConfiguredMessage:
      "Reviews can't be received yet because the review inbox hasn't been set up. Please share your feedback with us on WhatsApp instead.",
    save: (data, reference) =>
      addPendingReview(
        { ...data, productName: getProductBySlug(data.productSlug)?.name ?? data.productSlug },
        {
          reference,
          publicationConsentText: reviewPublicationConsentText,
          policyVersion: privacyConfig.policyVersion,
        },
      ),
  });
}
