import type { FieldErrors } from "@/lib/form-validation";

export type FormSubmissionResponse =
  | { ok: true; stored: boolean; reference: string }
  | {
      ok: false;
      message: string;
      errors?: FieldErrors<Record<string, unknown>>;
    };

/** Hidden field that real visitors never fill in; bots often do. */
export const honeypotFieldName = "website";

export async function submitForm(
  endpoint: string,
  payload: Record<string, unknown>,
  honeypot = "",
): Promise<FormSubmissionResponse> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, [honeypotFieldName]: honeypot }),
    });
    return (await response.json()) as FormSubmissionResponse;
  } catch {
    return {
      ok: false,
      message: "We could not reach our server. Please check your connection and try again.",
    };
  }
}
