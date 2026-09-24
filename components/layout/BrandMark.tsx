import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type BrandMarkProps = {
  className?: string;
  onNavigate?: () => void;
  tone?: "default" | "inverse";
};

export function BrandMark({
  className,
  onNavigate,
  tone = "default",
}: BrandMarkProps) {
  const inverse = tone === "inverse";

  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn(
        "inline-flex min-h-10 flex-col justify-center transition-colors duration-300",
        inverse ? "text-white" : "text-rich-black",
        className,
      )}
    >
      <span className="text-[1.05rem] font-semibold tracking-[0.28em] sm:text-lg">
        {site.shortName.toUpperCase()}
      </span>
      <span
        className={cn(
          "text-[0.62rem] tracking-[0.42em] transition-colors duration-300",
          inverse ? "text-white/75" : "text-muted",
        )}
      >
        SAREES
      </span>
    </Link>
  );
}
