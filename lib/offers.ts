/**
 * Store-wide promotion shown on product pages. Only enter offers the business
 * is actually running; set `active: false` (or remove the entry) when it ends.
 */
export type StoreOffer = {
  active: boolean;
  /** Short title, e.g. "Dussehra Festive Offer". */
  title: string;
  /** One-line offer terms as advertised. */
  terms: string;
  /** Small label on the right of the banner. */
  label: string;
  /** Where the banner's "View offer" link goes. */
  href: string;
};

export const festiveOffer: StoreOffer = {
  active: true,
  title: "Dussehra Festive Offer",
  terms: "Buy up to ₹5,000 & get one premium saree free",
  label: "Offer",
  href: "/sarees",
};

export function getActiveOffer(): StoreOffer | null {
  return festiveOffer.active ? festiveOffer : null;
}
