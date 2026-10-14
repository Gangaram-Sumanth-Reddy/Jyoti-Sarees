/**
 * Jyoti Sarees Instagram Reels shown on the home page.
 *
 * Instagram's embeds cannot autoplay, loop, or be muted/unmuted by the site
 * (and Reels with licensed music do not play in embeds at all). To play a
 * Reel inline, add the original video to `public/assets/reels/<id>.mp4`
 * (vertical, H.264/AAC) and optionally its cover as `<id>.jpg`. Cards without
 * a video file link to the Reel on Instagram instead.
 */
export type Reel = {
  /** Instagram shortcode, also the file name of the self-hosted video. */
  id: string;
  instagramUrl: string;
  caption: string;
  /** Shown on the card, e.g. a collaborating account. */
  credit?: string;
};

export type ReelMedia = { video?: string; poster?: string };

export const reels: readonly Reel[] = [
  {
    id: "Da2TkEuKOpl",
    instagramUrl: "https://www.instagram.com/reel/Da2TkEuKOpl/",
    caption: "Linen sarees: woven from flax, called woven moonlight",
    credit: "with @visakha_kadhalu",
  },
  {
    id: "DdgpLpgSdBB",
    instagramUrl: "https://www.instagram.com/reel/DdgpLpgSdBB/",
    caption: "Onion pink Fancy Pattu saree with an ink blue border",
  },
  {
    id: "DdZL5c3SPna",
    instagramUrl: "https://www.instagram.com/reel/DdZL5c3SPna/",
    caption: "Saree moments from Jyoti Sarees, Nabrangpur",
  },
];
