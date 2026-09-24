import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const aspects = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  card: "aspect-[5/6]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  hero: "aspect-[5/4] sm:aspect-[16/10] lg:aspect-[21/9]",
  feature: "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]",
} as const;

const radii = {
  none: "rounded-none",
  md: "rounded-md",
  lg: "rounded-lg",
} as const;

type ImageFrameProps = {
  children: ReactNode;
  className?: string;
  aspect?: keyof typeof aspects;
  radius?: keyof typeof radii;
  caption?: string;
};

export function ImageFrame({
  children,
  className,
  aspect = "portrait",
  radius = "md",
  caption,
}: ImageFrameProps) {
  return (
    <figure className={cn("w-full min-w-0", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-cream [&_img]:h-full [&_img]:w-full [&_img]:object-cover",
          aspects[aspect],
          radii[radius],
        )}
      >
        {children}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-small text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
