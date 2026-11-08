import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";

const COOKIE_NAME = "jyoti_review_admin";
const SESSION_SECONDS = 8 * 60 * 60;
const MIN_PASSWORD_LENGTH = 12;
const LOGIN_LIMIT = { windowMs: 15 * 60 * 1000, max: 5 };

const failedLogins = new Map<string, number[]>();

/**
 * Password for the review moderation page, from REVIEWS_ADMIN_PASSWORD.
 * Shorter than 12 characters counts as not configured.
 */
function adminPassword() {
  const value = process.env.REVIEWS_ADMIN_PASSWORD ?? "";
  return value.length >= MIN_PASSWORD_LENGTH ? value : null;
}

export function isAdminConfigured() {
  return adminPassword() !== null;
}

function sign(password: string, expires: number) {
  return createHmac("sha256", password)
    .update(`jyoti-review-admin:${expires}`)
    .digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function isAdmin() {
  const password = adminPassword();
  if (!password) return false;
  const value = (await cookies()).get(COOKIE_NAME)?.value ?? "";
  const [expiresRaw, signature] = value.split(".");
  const expires = Number(expiresRaw);
  if (!signature || !Number.isFinite(expires) || expires < Date.now()) return false;
  return safeEqual(signature, sign(password, expires));
}

async function clientKey() {
  const forwarded = (await headers()).get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export type LoginResult = "ok" | "invalid" | "locked" | "not_configured";

export async function logIn(attempt: string): Promise<LoginResult> {
  const password = adminPassword();
  if (!password) return "not_configured";

  const key = await clientKey();
  const now = Date.now();
  const recent = (failedLogins.get(key) ?? []).filter(
    (time) => now - time < LOGIN_LIMIT.windowMs,
  );
  if (recent.length >= LOGIN_LIMIT.max) return "locked";

  if (!safeEqual(attempt, password)) {
    recent.push(now);
    failedLogins.set(key, recent);
    if (failedLogins.size > 5000) failedLogins.clear();
    return "invalid";
  }

  failedLogins.delete(key);
  const expires = now + SESSION_SECONDS * 1000;
  (await cookies()).set(COOKIE_NAME, `${expires}.${sign(password, expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
  return "ok";
}

export async function logOut() {
  (await cookies()).set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 0,
  });
}
