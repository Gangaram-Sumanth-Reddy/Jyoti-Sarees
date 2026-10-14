"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginAction, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <form action={action} className="mt-6 grid max-w-sm gap-4">
      <Input
        name="password"
        type="password"
        label="Admin password"
        autoComplete="current-password"
        error={state.error}
        required
      />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Checking…" : "Sign in"}
      </Button>
    </form>
  );
}
