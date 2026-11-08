import Image from "next/image";
import { SocialIcon } from "@/components/layout/SocialIcons";
import type { Reel } from "@/lib/reels";

type ReelCardProps = {
  reel: Reel;
  image: string;
  /** e.g. "Reel 3 of 9" — part of the link's accessible name. */
  label: string;
  /** Copies used only to make the carousel loop seamless. */
  decorative?: boolean;
};

export function ReelCard({ reel, image, label, decorative = false }: ReelCardProps) {
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch Jyoti Sarees ${label} on Instagram (opens in a new tab)`}
      tabIndex={decorative ? -1 : undefined}
      draggable={false}
      className="group relative block aspect-[9/16] overflow-hidden rounded-[1.25rem] bg-navy-deep shadow-[0_18px_40px_-26px_rgba(9,22,52,0.55)] ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-[0_26px_50px_-24px_rgba(9,22,52,0.6)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-navy"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 38vw, 66vw"
        draggable={false}
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-deep/55 via-navy-deep/5 to-transparent transition-opacity duration-500 group-hover:opacity-90"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-navy-deep/0 transition-colors duration-500 group-hover:bg-navy-deep/20 group-focus-visible:bg-navy-deep/20"
      />

      <span
        aria-hidden="true"
        className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-black/25 text-white/95 ring-1 ring-white/25 backdrop-blur-sm"
      >
        <SocialIcon id="instagram" />
      </span>

      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/60 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-navy-deep group-focus-visible:scale-110 group-focus-visible:bg-white group-focus-visible:text-navy-deep motion-reduce:transition-none"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" className="ml-0.5" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" fill="currentColor" />
        </svg>
      </span>
    </a>
  );
}
