"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SocialIcon } from "@/components/layout/SocialIcons";
import { cn } from "@/lib/cn";
import type { Reel, ReelMedia } from "@/lib/reels";

const SOUND_EVENT = "jyoti:reel-sound";

/** The one Reel currently playing with sound, if any. */
let soundOwner: HTMLVideoElement | null = null;

function setMarqueeHeld(video: HTMLVideoElement, held: boolean) {
  const marquee = video.closest<HTMLElement>(".reels-marquee");
  if (!marquee) return;
  if (held) marquee.dataset.sound = "on";
  else delete marquee.dataset.sound;
}

function ReelsGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 8.5h17M9 3.5l3 5M14.5 3.5l3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.2 12.2v4.6l4-2.3-4-2.3Z" fill="currentColor" />
    </svg>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9.5h3.2L12 5.5v13l-4.8-4H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z"
        fill="currentColor"
      />
      {muted ? (
        <path d="m16 9.5 5 5m0-5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      ) : (
        <path
          d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ReelCardProps = {
  reel: Reel;
  media: ReelMedia;
  /** Copies used only to make the marquee loop seamless. */
  decorative?: boolean;
  className?: string;
};

export function ReelCard({ reel, media, decorative = false, className }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const hasVideo = Boolean(media.video);

  // Play muted while on screen (unless reduced motion is preferred); pause off screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!prefersReducedMotion() || !video.muted) video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Only one Reel plays sound at a time: another card taking the sound mutes this one.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function onOtherSound(event: Event) {
      if (!video || (event as CustomEvent<HTMLVideoElement>).detail === video) return;
      video.muted = true;
      if (soundOwner === video) soundOwner = null;
      if (prefersReducedMotion()) video.pause();
    }
    function syncMuted() {
      if (video) setMuted(video.muted);
    }
    window.addEventListener(SOUND_EVENT, onOtherSound);
    video.addEventListener("volumechange", syncMuted);
    return () => {
      window.removeEventListener(SOUND_EVENT, onOtherSound);
      video.removeEventListener("volumechange", syncMuted);
      if (soundOwner === video) {
        soundOwner = null;
        setMarqueeHeld(video, false);
      }
    };
  }, []);

  async function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: video }));
      video.muted = false;
      try {
        await video.play();
        soundOwner = video;
        setMarqueeHeld(video, true);
      } catch {
        video.muted = true;
      }
    } else {
      video.muted = true;
      if (soundOwner === video) {
        soundOwner = null;
        setMarqueeHeld(video, false);
      }
      if (prefersReducedMotion()) video.pause();
    }
  }

  return (
    <div
      className={cn(
        "group relative aspect-[9/16] overflow-hidden rounded-[1.0625rem] bg-navy-deep shadow-soft",
        className,
      )}
    >
      {media.poster ? (
        <Image
          src={media.poster}
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 32vw, 70vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_20%,rgb(255_255_255/0.14),transparent_60%),linear-gradient(160deg,var(--color-navy-mid),var(--color-navy-deep))]"
        />
      )}

      {hasVideo ? (
        <video
          ref={videoRef}
          src={media.video}
          poster={media.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white"
        >
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
            <ReelsGlyph size={28} />
          </span>
          <span className="rounded-full bg-white px-3.5 py-1.5 text-small font-semibold text-navy shadow-soft">
            Watch on Instagram
          </span>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-deep/80 via-navy-deep/5 to-navy-deep/30"
      />

      <a
        href={reel.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={decorative ? undefined : `Watch on Instagram: ${reel.caption}`}
        tabIndex={decorative ? -1 : undefined}
        className="absolute inset-0 z-10 rounded-[1.0625rem] outline-offset-4 focus-visible:outline-2 focus-visible:outline-navy"
      />

      {hasVideo ? (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? `Turn sound on: ${reel.caption}` : `Turn sound off: ${reel.caption}`}
          tabIndex={decorative ? -1 : undefined}
          className="absolute left-3 top-3 z-20 inline-flex size-10 items-center justify-center rounded-full bg-navy-deep/55 text-white ring-1 ring-white/35 backdrop-blur-sm transition-colors hover:bg-navy-deep/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <SpeakerIcon muted={muted} />
        </button>
      ) : null}

      <span className="pointer-events-none absolute right-3 top-3 text-white drop-shadow-sm">
        <ReelsGlyph />
      </span>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end gap-2.5 p-4">
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-sm">
          <SocialIcon id="instagram" />
        </span>
        <div className="min-w-0">
          <p className="line-clamp-2 text-small font-semibold leading-snug text-white">
            {reel.caption}
          </p>
          {reel.credit ? (
            <p className="mt-0.5 truncate text-[0.75rem] text-white/75">{reel.credit}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
