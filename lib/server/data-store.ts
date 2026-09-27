import "server-only";

export type PrivateTable = "enquiries" | "testimonial_submissions" | "privacy_requests";

export type InsertOutcome = "stored" | "not_configured";

export class DataStoreError extends Error {
  constructor(
    readonly table: PrivateTable,
    readonly status: number,
  ) {
    super(`Insert into ${table} failed with status ${status}`);
  }
}

/**
 * Write-only access to the private Supabase tables through the REST API.
 *
 * The service-role key is read from a non-public env var, so it never reaches
 * the browser bundle. RLS is enabled on every table with no anon/authenticated
 * policies (see supabase/migrations), so public keys cannot read or write them.
 * Only inserts are exposed here — nothing in the app reads submissions back.
 */
export async function insertPrivateRecord(
  table: PrivateTable,
  row: Record<string, unknown>,
): Promise<InsertOutcome> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return "not_configured";

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (!response.ok) throw new DataStoreError(table, response.status);
  return "stored";
}
