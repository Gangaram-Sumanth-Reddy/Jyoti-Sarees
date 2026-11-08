/**
 * Delivery claims are published only when confirmed. Flip `confirmed` (and
 * fill the details) once the business verifies its delivery policy — the
 * /shipping page, FAQs and sitemap entry switch on automatically.
 *
 * Kept free of imports: next.config.ts reads it to gate the /shipping route.
 */
export const deliveryConfig = {
  india: {
    confirmed: false,
    summary: null as string | null,
    handlingTime: null as string | null,
    method: null as string | null,
  },
  international: {
    confirmed: false,
    /** Countries/regions actually served. Empty = do not claim international delivery. */
    destinations: [] as string[],
    customsNote: null as string | null,
  },
};

export function isShippingPageEnabled() {
  return deliveryConfig.india.confirmed || deliveryConfig.international.confirmed;
}
