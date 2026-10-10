import "server-only";

export type PrivateTable =
  | "enquiries"
  | "testimonial_submissions"
  | "privacy_requests";

export type InsertOutcome = "stored" | "not_configured";

export class DataStoreError extends Error {
  constructor(
    readonly table: PrivateTable,
    readonly status: number,
  ) {
    super(`Sheet append for ${table} failed with status ${status}`);
  }
}

/**
 * Server-only writer for the Google Apps Script web app.
 *
 * Set NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL when the script is deployed. This
 * module is server-only, so the site posts from the route handler after
 * validation — the browser never calls the script itself.
 *
 * The script should accept a POST body:
 * `{ form, submittedAt, ...fields }`
 * where `form` is `enquiries`, `testimonial_submissions`, or `privacy_requests`.
 * A 2xx response, or the 302 redirect Apps Script returns after `doPost`,
 * counts as saved.
 */
function appsScriptUrl() {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export async function insertPrivateRecord(
  table: PrivateTable,
  row: Record<string, unknown>,
): Promise<InsertOutcome> {
  const url = appsScriptUrl();
  if (!url) return "not_configured";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      form: table,
      submittedAt: new Date().toISOString(),
      ...row,
    }),
    redirect: "manual",
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  const accepted =
    response.ok || response.status === 302 || response.status === 303;
  if (!accepted) throw new DataStoreError(table, response.status);
  return "stored";
}
