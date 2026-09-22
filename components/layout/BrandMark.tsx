import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type BrandMarkProps = {
  className?: string;
  onNavigate?: () => void;
};

export function BrandMark({ className, onNavigate }: BrandMarkProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn(
        "inline-flex min-h-11 flex-col justify-center text-rich-black",
        className,
      )}
    >
      <span className="text-[1.05rem] font-semibold tracking-[0.28em] sm:text-lg">
        {site.shortName.toUpperCase()}
      </span>
      <span className="text-[0.62rem] tracking-[0.42em] text-muted">
        SAREES
      </span>
    </Link>
  );
}
