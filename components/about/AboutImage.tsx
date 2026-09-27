import Image from "next/image";
import { cn } from "@/lib/cn";

type AboutImageProps = {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio classes for the rounded card. */
  aspectClassName: string;
  sizes: string;
  objectPosition?: string;
  preload?: boolean;
  className?: string;
};

export function AboutImage({
  src,
  alt,
  aspectClassName,
  sizes,
  objectPosition = "50% 50%",
  preload = false,
  className,
}: AboutImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg bg-cream shadow-soft",
        aspectClassName,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload={preload}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}
