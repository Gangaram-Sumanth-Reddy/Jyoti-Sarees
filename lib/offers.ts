/**
 * Store-wide promotion shown on the sarees catalogue and product pages.
 *
 * - `offerActive` gates whether the commercial terms are shown at all.
 * - Festival title + wish update automatically from the calendar below.
 * - Lunar festivals use year-specific windows; fixed dates use MM-DD ranges.
 */

export type StoreOffer = {
  active: boolean;
  /** Short title, e.g. "Diwali Festive Offer". */
  title: string;
  /** Small eyebrow above the wish. */
  eyebrow: string;
  /** Warm greeting for the active festival / special day. */
  wish: string;
  /** One-line offer terms as advertised. */
  terms: string;
  /** Small label on product-page banners. */
  label: string;
  /** Where the banner's "View offer" / CTA goes. */
  href: string;
};

/** Commercial terms — only keep this true while the business is running the deal. */
const OFFER_ACTIVE = true;
const OFFER_TERMS = "Buy up to ₹5,000 & get one premium saree free";
const OFFER_HREF = "/sarees";

type FestivalWindow = {
  id: string;
  title: string;
  eyebrow: string;
  wish: string;
  /**
   * Inclusive windows. Prefer ISO `YYYY-MM-DD` for lunar festivals.
   * Use `MM-DD` for fixed annual dates (repeats every year).
   */
  windows: Array<{ start: string; end: string }>;
};

/**
 * Priority order: first matching window wins. Keep lunar dates updated yearly.
 * Sources: common Indian festival calendars (approx. observance windows).
 */
const FESTIVAL_WINDOWS: FestivalWindow[] = [
  {
    id: "new-year",
    title: "New Year Festive Offer",
    eyebrow: "New year special",
    wish: "Happy New Year",
    windows: [
      { start: "12-28", end: "12-31" },
      { start: "01-01", end: "01-05" },
    ],
  },
  {
    id: "pongal",
    title: "Pongal Festive Offer",
    eyebrow: "Harvest celebrations",
    wish: "Happy Pongal",
    windows: [{ start: "01-13", end: "01-17" }],
  },
  {
    id: "republic-day",
    title: "Republic Day Offer",
    eyebrow: "National day special",
    wish: "Happy Republic Day",
    windows: [{ start: "01-24", end: "01-27" }],
  },
  {
    id: "valentines",
    title: "Valentine's Day Offer",
    eyebrow: "Celebrate with a saree",
    wish: "Happy Valentine's Day",
    windows: [{ start: "02-10", end: "02-15" }],
  },
  {
    id: "holi",
    title: "Holi Festive Offer",
    eyebrow: "Festival of colours",
    wish: "Happy Holi",
    windows: [
      { start: "2025-03-12", end: "2025-03-16" },
      { start: "2026-03-02", end: "2026-03-06" },
      { start: "2027-03-21", end: "2027-03-25" },
    ],
  },
  {
    id: "womens-day",
    title: "Women's Day Offer",
    eyebrow: "For every woman",
    wish: "Happy Women's Day",
    windows: [{ start: "03-06", end: "03-09" }],
  },
  {
    id: "ugadi",
    title: "Ugadi Festive Offer",
    eyebrow: "New year blessings",
    wish: "Happy Ugadi",
    windows: [
      { start: "2025-03-29", end: "2025-04-01" },
      { start: "2026-03-18", end: "2026-03-21" },
      { start: "2027-04-06", end: "2027-04-09" },
    ],
  },
  {
    id: "eid-ul-fitr",
    title: "Eid Festive Offer",
    eyebrow: "Eid mubarak",
    wish: "Eid Mubarak",
    windows: [
      { start: "2025-03-30", end: "2025-04-01" },
      { start: "2026-03-19", end: "2026-03-21" },
      { start: "2027-03-09", end: "2027-03-11" },
    ],
  },
  {
    id: "akshaya-tritiya",
    title: "Akshaya Tritiya Offer",
    eyebrow: "Auspicious shopping",
    wish: "Happy Akshaya Tritiya",
    windows: [
      { start: "2025-04-29", end: "2025-05-01" },
      { start: "2026-04-18", end: "2026-04-20" },
      { start: "2027-05-07", end: "2027-05-09" },
    ],
  },
  {
    id: "mothers-day",
    title: "Mother's Day Offer",
    eyebrow: "Gift her a saree",
    wish: "Happy Mother's Day",
    windows: [{ start: "05-08", end: "05-12" }],
  },
  {
    id: "eid-ul-adha",
    title: "Bakrid Festive Offer",
    eyebrow: "Eid mubarak",
    wish: "Eid Mubarak",
    windows: [
      { start: "2025-06-06", end: "2025-06-08" },
      { start: "2026-05-26", end: "2026-05-28" },
      { start: "2027-05-16", end: "2027-05-18" },
    ],
  },
  {
    id: "independence-day",
    title: "Independence Day Offer",
    eyebrow: "National day special",
    wish: "Happy Independence Day",
    windows: [{ start: "08-13", end: "08-16" }],
  },
  {
    id: "raksha-bandhan",
    title: "Raksha Bandhan Offer",
    eyebrow: "For sisters",
    wish: "Happy Raksha Bandhan",
    windows: [
      { start: "2025-08-07", end: "2025-08-10" },
      { start: "2026-08-26", end: "2026-08-29" },
      { start: "2027-08-15", end: "2027-08-18" },
    ],
  },
  {
    id: "onam",
    title: "Onam Festive Offer",
    eyebrow: "Harvest celebrations",
    wish: "Happy Onam",
    windows: [
      { start: "2025-08-25", end: "2025-09-05" },
      { start: "2026-08-17", end: "2026-08-26" },
      { start: "2027-09-03", end: "2027-09-14" },
    ],
  },
  {
    id: "ganesh-chaturthi",
    title: "Ganesh Chaturthi Offer",
    eyebrow: "Festive blessings",
    wish: "Happy Ganesh Chaturthi",
    windows: [
      { start: "2025-08-26", end: "2025-09-06" },
      { start: "2026-09-14", end: "2026-09-24" },
      { start: "2027-09-03", end: "2027-09-13" },
    ],
  },
  {
    id: "gandhi-jayanti",
    title: "Gandhi Jayanti Offer",
    eyebrow: "National day special",
    wish: "Happy Gandhi Jayanti",
    windows: [{ start: "10-01", end: "10-03" }],
  },
  {
    id: "navratri-dussehra",
    title: "Navratri & Dussehra Offer",
    eyebrow: "Festive season",
    wish: "Happy Navratri & Dussehra",
    windows: [
      { start: "2025-09-22", end: "2025-10-02" },
      { start: "2026-10-11", end: "2026-10-20" },
      { start: "2027-09-30", end: "2027-10-10" },
    ],
  },
  {
    id: "karva-chauth",
    title: "Karva Chauth Offer",
    eyebrow: "For her",
    wish: "Happy Karva Chauth",
    windows: [
      { start: "2025-10-09", end: "2025-10-11" },
      { start: "2026-10-28", end: "2026-10-30" },
      { start: "2027-10-18", end: "2027-10-20" },
    ],
  },
  {
    id: "diwali",
    title: "Diwali Festive Offer",
    eyebrow: "Limited festive offer",
    wish: "Happy Diwali",
    windows: [
      { start: "2025-10-18", end: "2025-10-28" },
      { start: "2026-11-05", end: "2026-11-15" },
      { start: "2027-10-25", end: "2027-11-05" },
    ],
  },
  {
    id: "christmas",
    title: "Christmas Festive Offer",
    eyebrow: "Holiday special",
    wish: "Merry Christmas",
    windows: [{ start: "12-20", end: "12-27" }],
  },
];

const FALLBACK_FESTIVAL = {
  id: "festive",
  title: "Festive Offer",
  eyebrow: "Limited festive offer",
  wish: "Season's greetings",
} as const;

/** Calendar day in India — keeps festival titles correct on Vercel (UTC). */
function indiaParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value ?? "1970";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";
  return { dayKey: `${year}-${month}-${day}`, monthDay: `${month}-${day}` };
}

function inWindow(today: Date, start: string, end: string) {
  const { dayKey, monthDay } = indiaParts(today);
  if (start.length === 10) {
    return dayKey >= start && dayKey <= end;
  }
  // Fixed annual MM-DD window (may wrap year-end, e.g. Dec 28 → Jan 05).
  if (start <= end) return monthDay >= start && monthDay <= end;
  return monthDay >= start || monthDay <= end;
}

/** Picks the festival label for a given day (defaults to a generic festive title). */
export function getFestivalForDate(date = new Date()) {
  for (const festival of FESTIVAL_WINDOWS) {
    if (festival.windows.some((window) => inWindow(date, window.start, window.end))) {
      return {
        id: festival.id,
        title: festival.title,
        eyebrow: festival.eyebrow,
        wish: festival.wish,
      };
    }
  }
  return FALLBACK_FESTIVAL;
}

/**
 * Active store offer for today. Returns null when the commercial deal is off.
 * Festival naming updates automatically from the calendar (Asia/Kolkata).
 */
export function getActiveOffer(date = new Date()): StoreOffer | null {
  if (!OFFER_ACTIVE) return null;
  const festival = getFestivalForDate(date);
  return {
    active: true,
    title: festival.title,
    eyebrow: festival.eyebrow,
    wish: festival.wish,
    terms: OFFER_TERMS,
    label: "Offer",
    href: OFFER_HREF,
  };
}

/** @deprecated Prefer `getActiveOffer()` — kept for any direct imports during transition. */
export const festiveOffer: StoreOffer = getActiveOffer() ?? {
  active: false,
  title: FALLBACK_FESTIVAL.title,
  eyebrow: FALLBACK_FESTIVAL.eyebrow,
  wish: FALLBACK_FESTIVAL.wish,
  terms: OFFER_TERMS,
  label: "Offer",
  href: OFFER_HREF,
};
