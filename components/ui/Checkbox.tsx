import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<ComponentProps<"input">, "type" | "children"> & {
  id: string;
  children: ReactNode;
  error?: string;
};

export function Checkbox({ id, children, error, className, ...props }: CheckboxProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 text-small leading-relaxed text-rich-black"
      >
        <input
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={errorId}
          className="mt-0.5 size-[1.125rem] shrink-0 cursor-pointer rounded border-border-strong accent-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          {...props}
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p id={errorId} role="alert" className="pl-[1.875rem] text-small font-semibold text-navy-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
