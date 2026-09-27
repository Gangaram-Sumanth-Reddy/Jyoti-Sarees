export type Reel = {
  id: string;
  /** Vertical MP4/WebM. When omitted the poster is shown as a still reel. */
  src?: string;
  poster: string;
  posterPosition?: string;
  caption: string;
  /** Links to the individual reel; falls back to the Instagram profile. */
  instagramUrl?: string;
};

export const reels: readonly Reel[] = [
  {
    id: "reel-1",
    poster: "/assets/H1.png",
    posterPosition: "78% 50%",
    caption: "Ivory Kanjivaram, styled for the festive season",
  },
  {
    id: "reel-2",
    poster: "/assets/about/hero.jpg",
    posterPosition: "52% 50%",
    caption: "A walk through our saree shelves",
  },
  {
    id: "reel-3",
    poster: "/assets/H2.png",
    posterPosition: "22% 50%",
    caption: "Soft peach drapes for daytime elegance",
  },
  {
    id: "reel-4",
    poster: "/assets/about/craftsmanship.jpg",
    posterPosition: "50% 50%",
    caption: "Behind the weave: zari borders by hand",
  },
  {
    id: "reel-5",
    poster: "/assets/H3.png",
    posterPosition: "30% 50%",
    caption: "Royal blue silk for evening celebrations",
  },
  {
    id: "reel-6",
    poster: "/assets/about/story.jpg",
    posterPosition: "60% 50%",
    caption: "New arrivals, folded and ready",
  },
];
