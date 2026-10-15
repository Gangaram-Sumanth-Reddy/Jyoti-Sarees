/**
 * Jyoti Sarees Instagram Reels shown on the home page, in display order.
 *
 * Each card links to the original Reel. Instagram does not offer Reel cover
 * images without an authorised API, so every card shows a photo from the
 * store's own catalogue (`public/assets/sarees/`). Adding the real cover as
 * `public/assets/reels/<id>.jpg` (vertical, 9:16) replaces that photo.
 */
const reelEntries = [
  { link: "https://www.instagram.com/reel/Da2TkEuKOpl/", photo: "elegant-red-and-ivory-saree-red-pattu-rs-3500-1" },
  { link: "https://www.instagram.com/reel/DdgpLpgSdBB/", photo: "emerald-silk-saree-in-elegant-rs-6599-1" },
  {
    link: "https://www.instagram.com/reel/DdZL5c3SPna/",
    photo: "banarasi-georgette-peach-saree-colour-with-contrast-ice-blue-1",
  },
  {
    link: "https://www.instagram.com/reel/DdO4xvzSbZQ/",
    photo: "elegant-purple-and-silver-saree-draping-soft-pattu-rs-3500-1",
  },
  { link: "https://www.instagram.com/reel/DcJJkG4phMq/", photo: "elegant-rose-gold-saree-pure-kora-rs-8000-1" },
  { link: "https://www.instagram.com/reel/Db5b4gjKsk9/", photo: "elegant-teal-and-gold-saree-traditional-pattu-rs8500-1" },
  { link: "https://www.instagram.com/reel/DbpRxMYSLDx/", photo: "elegant-lilac-silk-fancy-tissue-rs7500-1" },
  { link: "https://www.instagram.com/reel/DbkgFn7yryS/", photo: "elegant-magenta-banarasi-saree-tissue-pattu-rs-8500-1" },
  { link: "https://www.instagram.com/reel/DZt53AyJr5o/", photo: "elegant-aqua-silk-fancy-saree-rs4000-1" },
];

export type Reel = {
  /** Instagram shortcode, also the file name of an optional real cover. */
  id: string;
  /** Canonical Reel URL without query parameters. */
  url: string;
  /** Catalogue photo shown until a real cover is added. */
  previewImage: string;
};

function toReel({ link, photo }: (typeof reelEntries)[number]): Reel {
  const [, id] = new URL(link).pathname.split("/").filter(Boolean);
  if (!id) throw new Error(`Not an Instagram Reel link: ${link}`);
  return {
    id,
    url: `https://www.instagram.com/reel/${id}/`,
    previewImage: `/assets/sarees/${photo}.jpg`,
  };
}

export const reels: readonly Reel[] = reelEntries.map(toReel);
