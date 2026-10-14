import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { RatingChip } from "@/components/reviews/Stars";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getProductBySlug, productHref } from "@/lib/products";
import { isAdmin, isAdminConfigured } from "@/lib/server/admin-auth";
import {
  getReviewsForModeration,
  isReviewStoreConfigured,
  reviewBackend,
  type ReviewStatus,
  type StoredReview,
} from "@/lib/server/review-store";
import { logoutAction, moderateReviewAction } from "./actions";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Review moderation",
  robots: { index: false, follow: false },
};

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

function SetupNotice({ missing }: { missing: string[] }) {
  return (
    <div className="mt-6 max-w-2xl rounded-lg border border-border bg-white p-5 text-body leading-relaxed text-rich-black shadow-soft">
      <p className="font-semibold text-navy">Reviews are not set up yet.</p>
      <p className="mt-2">
        Add the following to <code>.env</code> (or your host&apos;s environment
        settings) and restart the site:
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {missing.includes("REVIEWS_DATA_DIR") ? (
          <li>
            <code>REVIEWS_DATA_DIR=.data/reviews</code> — a private folder on the server
            (never inside <code>public/</code>) where submitted reviews are kept. It must
            persist between deploys.
          </li>
        ) : null}
        {missing.includes("REVIEWS_ADMIN_PASSWORD") ? (
          <li>
            <code>REVIEWS_ADMIN_PASSWORD</code> — a password of at least 12 characters
            for this moderation page.
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function DecisionButton({
  id,
  decision,
  label,
  variant,
}: {
  id: string;
  decision: Exclude<ReviewStatus, "pending">;
  label: string;
  variant: "primary" | "secondary";
}) {
  return (
    <form action={moderateReviewAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="decision" value={decision} />
      <Button type="submit" size="sm" variant={variant}>
        {label}
      </Button>
    </form>
  );
}

function ReviewRow({ review }: { review: StoredReview }) {
  const product = getProductBySlug(review.productSlug);
  return (
    <li className="rounded-lg border border-border bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-muted">
        <RatingChip rating={review.rating} />
        {product ? (
          <Link
            href={productHref(product)}
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            {review.productName}
          </Link>
        ) : (
          <span className="font-semibold text-navy">{review.productName}</span>
        )}
        <span>Ref {review.reference}</span>
        <span>Submitted {dateFormat.format(new Date(review.submittedAt))}</span>
      </div>
      <p className="mt-3 font-semibold text-rich-black">{review.title}</p>
      <p className="mt-1 whitespace-pre-line text-body leading-relaxed text-rich-black/85">
        {review.body}
      </p>
      <p className="mt-2 text-small text-muted">— {review.name}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {review.status !== "approved" ? (
          <DecisionButton id={review.id} decision="approved" label="Approve & publish" variant="primary" />
        ) : null}
        {review.status !== "rejected" ? (
          <DecisionButton
            id={review.id}
            decision="rejected"
            label={review.status === "approved" ? "Unpublish" : "Reject"}
            variant="secondary"
          />
        ) : null}
      </div>
    </li>
  );
}

function ReviewGroup({
  title,
  reviews,
  empty,
}: {
  title: string;
  reviews: StoredReview[];
  empty: string;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-h3 font-semibold text-rich-black">
        {title} <span className="text-muted">({reviews.length})</span>
      </h2>
      {reviews.length === 0 ? (
        <p className="mt-3 text-body text-muted">{empty}</p>
      ) : (
        <ul className="mt-4 grid list-none gap-3 p-0">
          {reviews.map((review) => (
            <ReviewRow key={review.id} review={review} />
          ))}
        </ul>
      )}
    </section>
  );
}

function SheetsNotice() {
  return (
    <div className="mt-6 max-w-2xl rounded-lg border border-border bg-white p-5 text-body leading-relaxed text-rich-black shadow-soft">
      <p className="font-semibold text-navy">Reviews are moderated in Google Sheets.</p>
      <p className="mt-2">
        New reviews arrive in the <strong>Reviews</strong> tab of the connected Google
        Sheet with Status <strong>Pending</strong>. Change a review&apos;s Status to{" "}
        <strong>Approved</strong> to publish it, or <strong>Rejected</strong> to keep it
        hidden. The site picks up changes within about a minute.
      </p>
    </div>
  );
}

export default async function ReviewModerationPage() {
  await connection();
  if (reviewBackend() === "sheets") {
    return (
      <Section className="pt-8 sm:pt-10">
        <Container className="max-w-4xl">
          <h1 className="text-h2 font-semibold text-rich-black">Review moderation</h1>
          <SheetsNotice />
        </Container>
      </Section>
    );
  }
  const missing = [
    isReviewStoreConfigured() ? null : "REVIEWS_DATA_DIR",
    isAdminConfigured() ? null : "REVIEWS_ADMIN_PASSWORD",
  ].filter((entry): entry is string => Boolean(entry));
  const signedIn = missing.length === 0 && (await isAdmin());
  const reviews = signedIn ? await getReviewsForModeration() : [];
  const byStatus = (status: ReviewStatus) =>
    reviews.filter((review) => review.status === status);

  return (
    <Section className="pt-8 sm:pt-10">
      <Container className="max-w-4xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-h2 font-semibold text-rich-black">Review moderation</h1>
            <p className="mt-2 text-body text-muted">
              Reviews stay private until you approve them. Only approved reviews count
              towards a saree&apos;s rating.
            </p>
          </div>
          {signedIn ? (
            <form action={logoutAction}>
              <Button type="submit" size="sm" variant="secondary">
                Sign out
              </Button>
            </form>
          ) : null}
        </div>

        {missing.length > 0 ? (
          <SetupNotice missing={missing} />
        ) : !signedIn ? (
          <LoginForm />
        ) : (
          <>
            <ReviewGroup
              title="Pending approval"
              reviews={byStatus("pending")}
              empty="No reviews are waiting for approval."
            />
            <ReviewGroup
              title="Published"
              reviews={byStatus("approved")}
              empty="No reviews have been approved yet."
            />
            <ReviewGroup
              title="Rejected"
              reviews={byStatus("rejected")}
              empty="No reviews have been rejected."
            />
          </>
        )}
      </Container>
    </Section>
  );
}
