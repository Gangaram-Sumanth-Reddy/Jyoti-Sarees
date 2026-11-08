import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  default: "border-border bg-cream text-navy",
  accent: "border-accent/30 bg-white text-accent",
  inverse: "border-transparent bg-navy text-white",
} as const;

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
};

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-pill border px-3 py-1 text-small font-semibold tracking-[0.08em] uppercase",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
