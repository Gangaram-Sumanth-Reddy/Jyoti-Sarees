"use server";

import { revalidatePath } from "next/cache";
import { isAdmin, logIn, logOut } from "@/lib/server/admin-auth";
import { setReviewStatus } from "@/lib/server/review-store";

export type LoginState = { error?: string };

const loginMessages = {
  invalid: "That password is not correct.",
  locked: "Too many attempts. Please wait 15 minutes and try again.",
  not_configured: "Admin access has not been set up.",
} as const;

export async function loginAction(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = formData.get("password");
  const result = await logIn(typeof password === "string" ? password : "");
  if (result !== "ok") return { error: loginMessages[result] };
  revalidatePath("/admin/reviews");
  return {};
}

export async function logoutAction() {
  await logOut();
  revalidatePath("/admin/reviews");
}

export async function moderateReviewAction(formData: FormData) {
  if (!(await isAdmin())) throw new Error("Not authorised.");

  const id = formData.get("id");
  const decision = formData.get("decision");
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/.test(id)) {
    throw new Error("Invalid review.");
  }
  if (decision !== "approved" && decision !== "rejected") {
    throw new Error("Invalid decision.");
  }

  await setReviewStatus(id, decision);
  revalidatePath("/admin/reviews");
}
