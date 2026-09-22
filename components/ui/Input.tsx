import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
};

type InputProps = ComponentProps<"input"> & FieldProps;

function FieldShell({
  id,
  label,
  hint,
  error,
  hideLabel,
  children,
}: FieldProps & { id: string; children: ReactNode }) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={id}
        className={cn(
          "text-small font-semibold tracking-[0.04em] text-navy",
          hideLabel && "sr-only",
        )}
      >
        {label}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="text-small text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-small font-semibold text-navy-deep" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClassName =
  "min-h-11 w-full rounded-md border border-border bg-surface px-4 text-body text-navy transition-colors duration-200 placeholder:text-subtle hover:border-border-strong focus-visible:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-invalid:border-navy-deep";

export { controlClassName };

function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ") || undefined;
}

export function Input({
  id,
  label,
  hint,
  error,
  hideLabel,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <FieldShell
      id={inputId}
      label={label}
      hint={hint}
      error={error}
      hideLabel={hideLabel}
    >
      <input
        id={inputId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy(inputId, hint, error)}
        className={cn(controlClassName, className)}
        {...props}
      />
    </FieldShell>
  );
}

type TextareaProps = ComponentProps<"textarea"> & FieldProps;

export function Textarea({
  id,
  label,
  hint,
  error,
  hideLabel,
  className,
  rows = 4,
  ...props
}: TextareaProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <FieldShell
      id={inputId}
      label={label}
      hint={hint}
      error={error}
      hideLabel={hideLabel}
    >
      <textarea
        id={inputId}
        rows={rows}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy(inputId, hint, error)}
        className={cn(controlClassName, "min-h-28 py-3", className)}
        {...props}
      />
    </FieldShell>
  );
}
