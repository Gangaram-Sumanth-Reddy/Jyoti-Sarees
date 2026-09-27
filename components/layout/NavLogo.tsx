import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type NavLogoProps = {
  className?: string;
};

export function NavLogo({ className }: NavLogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — Home`}
      className={cn(
        "-my-1 inline-flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:gap-3",
        className,
      )}
    >
      <Image
        src="/assets/Logo.png"
        alt=""
        width={1098}
        height={1098}
        preload
        sizes="(min-width: 640px) 44px, 40px"
        className="size-10 shrink-0 rounded-full sm:size-11"
      />
      {/* Served at full resolution so the script stays crisp at any zoom level. */}
      <Image
        src="/assets/Logo-text.png"
        alt={site.name}
        width={1749}
        height={899}
        unoptimized
        preload
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  );
}
