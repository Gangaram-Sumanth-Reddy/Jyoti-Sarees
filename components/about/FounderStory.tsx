"use client";

import { useEffect, useId, useRef, useState } from "react";
import { aboutContent } from "@/lib/about";
import { Button } from "@/components/ui/Button";

export function FounderStory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="mt-7"
      >
        {aboutContent.hero.founder}
      </Button>
      <FounderStoryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function FounderStoryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;

    const root = document.documentElement;
    const body = document.body;
    const previousRoot = root.style.overflow;
    const previousBody = body.style.overflow;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousRoot;
      body.style.overflow = previousBody;
    };
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="story-dialog fixed inset-0 z-[70] m-auto max-h-[min(92dvh,44rem)] w-[min(100%-1.5rem,42rem)] overflow-y-auto overscroll-contain rounded-xl border border-border bg-white p-0 text-rich-black shadow-card backdrop:bg-navy-deep/50 backdrop:backdrop-blur-[3px]"
    >
      <div className="relative px-5 pb-7 pt-8 sm:px-8 sm:pb-9 sm:pt-9">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-2.5 top-2.5 inline-flex size-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-navy sm:right-4 sm:top-4 sm:size-10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <p className="text-small font-semibold uppercase tracking-[0.16em] text-accent">
          {aboutContent.hero.eyebrow}
        </p>
        <h2 id={titleId} className="mt-2 pr-10 text-h2 text-balance text-rich-black">
          {aboutContent.hero.founder}
        </h2>

        <blockquote className="mt-5 border-l-2 border-navy bg-cream px-4 py-4 sm:px-5">
          <p className="text-balance text-[1.05rem] font-semibold leading-snug text-rich-black">
            {aboutContent.highlight}
          </p>
        </blockquote>

        <div className="mt-6 space-y-5">
          {aboutContent.chapters.map((chapter) => (
            <section key={chapter.title}>
              <h3 className="text-body font-semibold text-navy">{chapter.title}</h3>
              <p className="mt-1.5 text-body leading-relaxed text-muted">{chapter.body}</p>
            </section>
          ))}
        </div>
      </div>
    </dialog>
  );
}
