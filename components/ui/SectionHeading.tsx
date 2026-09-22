import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const aligns = {
  left: "items-start text-left",
  center: "items-center text-center mx-auto",
} as const;

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: keyof typeof aligns;
  tone?: "default" | "inverse";
  as?: "h1" | "h2" | "h3";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  as: TitleTag = "h2",
  className,
  children,
}: SectionHeadingProps) {
  const inverse = tone === "inverse";

  return (
    <div
      className={cn(
        "mb-8 flex max-w-prose flex-col gap-3 sm:mb-10 lg:mb-12",
        aligns[align],
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-small font-semibold uppercase tracking-[0.16em]",
            inverse ? "text-white/80" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <TitleTag
        className={cn(
          "text-balance",
          TitleTag === "h1" && "text-h1",
          TitleTag === "h2" && "text-h2",
          TitleTag === "h3" && "text-h3",
          inverse && "text-inverse",
        )}
      >
        {title}
      </TitleTag>
      {description ? (
        <p
          className={cn(
            "max-w-prose text-body",
            inverse ? "text-white/80" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
