import "server-only";

/**
 * Server-only client for the Google Apps Script web app in
 * `google-apps-script/Code.gs`, which writes each form to its own sheet tab.
 *
 * NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL is the deployed web app's `/exec` URL.
 * It is only read here, in server code, so forms post to the site's own API
 * routes and the server forwards validated data to the script.
 *
 * A submission only counts as saved when the script answers `{ ok: true }`.
 */

export type SheetFormType =
  | "enquiry"
  | "testimonial"
  | "product_review"
  | "privacy_request"
  | "order_enquiry";

export type SheetValue = string | number | boolean | null;

/** One submission. `items` (order enquiries only) becomes one sheet row per entry. */
export type SheetRow = Record<string, SheetValue | Record<string, SheetValue>[]>;

export type InsertOutcome = "stored" | "not_configured";

export const appsScriptSetupHint = "NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL";

export class AppsScriptError extends Error {
  constructor(
    readonly action: string,
    readonly status: number | "invalid_response" | "rejected",
  ) {
    super(`Google Apps Script ${action} failed (${status})`);
  }
}

const TIMEOUT_MS = 20_000;

function appsScriptUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL?.trim();
  if (!rawUrl) return null;
  try {
    const url = new URL(rawUrl);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "script.google.com" ||
      !url.pathname.endsWith("/exec")
    ) {
      console.error(
        "[forms] NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL must be the web app URL ending in /exec (https://script.google.com/macros/s/…/exec).",
      );
      return null;
    }
    return url.toString();
  } catch {
    console.error("[forms] NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL is not a valid URL.");
    return null;
  }
}

export function isAppsScriptConfigured() {
  return appsScriptUrl() !== null;
}

type ScriptResponse = { ok: boolean; error?: string; [key: string]: unknown };

async function callAppsScript(
  url: string,
  action: string,
  payload: Record<string, unknown>,
): Promise<ScriptResponse> {
  // Apps Script answers a POST with a redirect to the result; following it
  // (as a GET) returns the JSON written by doPost.
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload }),
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new AppsScriptError(action, response.status);

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new AppsScriptError(action, "invalid_response");
  }
  if (!body || typeof body !== "object" || !("ok" in body)) {
    throw new AppsScriptError(action, "invalid_response");
  }
  const result = body as ScriptResponse;
  if (result.ok !== true) throw new AppsScriptError(action, "rejected");
  return result;
}

/**
 * Appends one validated submission to the sheet tab for `formType`.
 * The reference doubles as an idempotency key: the script ignores a repeat
 * of a reference it has already saved.
 */
export async function appendSubmission(
  formType: SheetFormType,
  reference: string,
  data: SheetRow,
): Promise<InsertOutcome> {
  const url = appsScriptUrl();
  if (!url) return "not_configured";
  await callAppsScript(url, "append", {
    formType,
    reference,
    submittedAt: new Date().toISOString(),
    data,
  });
  return "stored";
}

export type SheetApprovedReview = {
  reference: string;
  productSlug: string;
  name: string;
  rating: number;
  title: string;
  body: string;
  submittedAt: string;
};

function toApprovedReview(value: unknown): SheetApprovedReview | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const text = (key: string) => (typeof row[key] === "string" ? (row[key] as string) : "");
  const rating = Number(row.rating);
  if (!text("reference") || !text("productSlug") || !Number.isInteger(rating)) return null;
  if (rating < 1 || rating > 5) return null;
  return {
    reference: text("reference"),
    productSlug: text("productSlug"),
    name: text("name"),
    rating,
    title: text("title"),
    body: text("body"),
    submittedAt: text("submittedAt"),
  };
}

/** Reviews whose Status cell in the "Reviews" tab is set to Approved. */
export async function listApprovedReviews(): Promise<SheetApprovedReview[]> {
  const url = appsScriptUrl();
  if (!url) return [];
  const result = await callAppsScript(url, "listApprovedReviews", {});
  const rows = Array.isArray(result.reviews) ? result.reviews : [];
  return rows.map(toApprovedReview).filter((row) => row !== null);
}
