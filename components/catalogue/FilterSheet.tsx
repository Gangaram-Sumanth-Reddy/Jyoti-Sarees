"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

type FilterSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
};

/** Bottom sheet on phones, right-hand drawer on tablets. */
export function FilterSheet({
  open,
  onClose,
  title = "Filters",
  children,
  footer,
}: FilterSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="filter-sheet fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 open:flex open:justify-end backdrop:bg-navy-deep/45"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mt-auto flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-card md:mt-0 md:h-full md:max-h-none md:max-w-sm md:rounded-none">
        <div className="flex justify-center pt-2.5 md:hidden" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-border-strong" />
        </div>
        <div className="flex items-center justify-between border-b border-border px-5 py-3 md:py-4">
          <h2 id={titleId} className="text-body font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill text-navy hover:bg-cream"
            aria-label="Close filters"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">{children}</div>
        {footer ? (
          <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {footer}
          </div>
        ) : null}
      </div>
    </dialog>
  );
}

export function FilterTriggerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="7" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="10" cy="17" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
