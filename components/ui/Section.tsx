import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  default: "bg-section text-rich-black",
  muted: "bg-section-muted text-rich-black",
  inverse: "bg-section-inverse text-inverse",
} as const;

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
  id?: string;
};

export function Section({
  children,
  className,
  tone = "default",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("w-full py-section", tones[tone], className)}
    >
      {children}
    </section>
  );
}
