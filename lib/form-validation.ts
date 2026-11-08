export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: FieldErrors<T> };

/** Reads a trimmed string field from untrusted input, capped at `max` characters. */
export function readString(source: unknown, key: string, max: number) {
  if (!source || typeof source !== "object") return "";
  const value = (source as Record<string, unknown>)[key];
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function readBoolean(source: unknown, key: string) {
  if (!source || typeof source !== "object") return false;
  return (source as Record<string, unknown>)[key] === true;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function hasErrors<T>(errors: FieldErrors<T>) {
  return Object.keys(errors).length > 0;
}
