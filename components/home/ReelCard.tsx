import Image from "next/image";
import { SocialIcon } from "@/components/layout/SocialIcons";
import { cn } from "@/lib/cn";
import type { Reel } from "@/lib/reels";
import { site } from "@/lib/site";

function ReelsGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 8.5h17M9 3.5l3 5M14.5 3.5l3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.2 12.2v4.6l4-2.3-4-2.3Z" fill="currentColor" />
    </svg>
  );
}

type ReelCardProps = {
  reel: Reel;
  /** Copies used only to make the marquee loop seamless. */
  decorative?: boolean;
  className?: string;
};

export function ReelCard({ reel, decorative = false, className }: ReelCardProps) {
  const href = reel.instagramUrl ?? site.instagramUrl;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={decorative ? undefined : `Watch on Instagram: ${reel.caption}`}
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
      className={cn(
        "group relative block aspect-[9/16] overflow-hidden rounded-[1.0625rem] bg-navy-deep shadow-soft outline-offset-4 focus-visible:outline-2 focus-visible:outline-navy",
        className,
      )}
    >
      <Image
        src={reel.poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 32vw, 70vw"
        style={{ objectPosition: reel.posterPosition }}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      {reel.src ? (
        <video
          src={reel.src}
          poster={reel.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: reel.posterPosition }}
        />
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-navy-deep/5 to-navy-deep/25"
      />
      <span className="absolute right-3 top-3 text-white drop-shadow-sm">
        <ReelsGlyph />
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-end gap-2.5 p-4">
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-sm">
          <SocialIcon id="instagram" />
        </span>
        <p className="line-clamp-2 text-small font-semibold leading-snug text-white">
          {reel.caption}
        </p>
      </div>
    </a>
  );
}
