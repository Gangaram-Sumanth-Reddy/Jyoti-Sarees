import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  default: "border-border bg-card text-rich-black",
  muted: "border-transparent bg-cream text-rich-black",
  inverse: "border-transparent bg-navy text-inverse",
} as const;

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  as?: "div" | "article" | "li";
};

export function Card({
  children,
  className,
  variant = "default",
  as: Tag = "article",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-md border p-5 shadow-soft sm:p-6",
        variants[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
