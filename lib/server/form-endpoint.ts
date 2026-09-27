import "server-only";

import type { FieldErrors, ParseResult } from "@/lib/form-validation";
import { honeypotFieldName, type FormSubmissionResponse } from "@/lib/form-submission";
import {
  DataStoreError,
  insertPrivateRecord,
  type PrivateTable,
} from "@/lib/server/data-store";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 8 };

const recentRequests = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const hits = (recentRequests.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT.windowMs,
  );
  hits.push(now);
  recentRequests.set(key, hits);
  if (recentRequests.size > 5000) recentRequests.clear();
  return hits.length > RATE_LIMIT.max;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function json(body: FormSubmissionResponse, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

type FormEndpointOptions<T> = {
  table: PrivateTable;
  parse: (body: unknown) => ParseResult<T>;
  toRow: (data: T, reference: string) => Record<string, unknown>;
  referencePrefix: string;
};

/**
 * Shared POST handler for public forms: same-origin check, size cap, basic
 * rate limiting, honeypot, server-side validation, then a write-only insert.
 * Personal data is never logged — only the table name and status code.
 */
export async function handleFormSubmission<T>(
  request: Request,
  { table, parse, toRow, referencePrefix }: FormEndpointOptions<T>,
) {
  if (!isSameOrigin(request)) {
    return json({ ok: false, message: "Request not allowed." }, 403);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, message: "Submission is too large." }, 413);
  }

  const clientKey =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`${table}:${clientKey}`)) {
    return json(
      { ok: false, message: "Too many submissions. Please try again later." },
      429,
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ ok: false, message: "Submission is too large." }, 413);
    }
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "Invalid submission." }, 400);
  }

  const reference = `${referencePrefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  const honeypot = (body as Record<string, unknown> | null)?.[honeypotFieldName];
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return json({ ok: true, stored: true, reference });
  }

  const parsed = parse(body);
  if (!parsed.ok) {
    return json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        errors: parsed.errors as FieldErrors<Record<string, unknown>>,
      },
      400,
    );
  }

  try {
    const outcome = await insertPrivateRecord(table, toRow(parsed.data, reference));
    if (outcome === "not_configured" && process.env.NODE_ENV === "production") {
      console.warn(`[forms] ${table}: storage is not configured; submission was not saved.`);
    }
    return json({ ok: true, stored: outcome === "stored", reference });
  } catch (error) {
    const status = error instanceof DataStoreError ? error.status : "network";
    console.error(`[forms] ${table}: insert failed (status ${status}).`);
    return json(
      { ok: false, message: "We could not save your submission. Please try again." },
      502,
    );
  }
}
