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
        "-my-1 inline-flex min-w-0 shrink-0 items-center gap-2 rounded-md min-[360px]:gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:gap-3",
        className,
      )}
    >
      <Image
        src="/assets/logo.webp"
        alt=""
        width={512}
        height={512}
        preload
        sizes="44px"
        className="size-10 shrink-0 rounded-full min-[360px]:size-11"
      />
      <Image
        src="/assets/logo-text.webp"
        alt={site.name}
        width={600}
        height={308}
        preload
        sizes="(min-width: 768px) 94px, (min-width: 360px) 86px, 78px"
        className="h-10 w-auto min-[360px]:h-11 md:h-12"
      />
    </Link>
  );
}
