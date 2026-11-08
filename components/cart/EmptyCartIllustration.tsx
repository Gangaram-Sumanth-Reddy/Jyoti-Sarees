type EmptyCartIllustrationProps = {
  className?: string;
};

/** Soft shopping-bag illustration for the empty enquiry cart. */
export function EmptyCartIllustration({ className }: EmptyCartIllustrationProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
    >
      <div className="cart-empty-float relative mx-auto flex size-[9.5rem] items-center justify-center sm:size-[11rem]">
        <div className="absolute inset-[8%] rounded-full bg-cream" />
        <div className="absolute inset-[18%] rounded-full border border-border/70 bg-white/80 shadow-soft" />

        <svg
          className="relative z-10 w-[4.75rem] text-navy sm:w-[5.5rem]"
          viewBox="0 0 88 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bag body */}
          <path
            d="M18 30.5h52l-3.2 48.2A8 8 0 0 1 58.85 86H29.15a8 8 0 0 1-7.95-7.3L18 30.5Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Bag opening */}
          <path
            d="M16 30.5h56"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Handles */}
          <path
            d="M32 30.5c0-9.5 5.2-15.5 12-15.5s12 6 12 15.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Soft accent fold */}
          <path
            d="M28 46h32M30 58h28"
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>

        {/* Gentle accent spark — soft bounce */}
        <span className="cart-empty-accent absolute right-[1.15rem] top-[1.35rem] size-2.5 rounded-full bg-accent sm:right-[1.35rem] sm:top-[1.55rem]" />
        <span className="cart-empty-accent-delay absolute left-[1.4rem] top-[2.4rem] size-1.5 rounded-full bg-navy/35 sm:left-[1.6rem]" />
      </div>
    </div>
  );
}
