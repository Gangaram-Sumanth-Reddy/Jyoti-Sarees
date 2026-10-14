import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";
import type { ReelMedia } from "@/lib/reels";

const REELS_DIR = "assets/reels";

function publicFile(name: string) {
  const file = path.join(/* turbopackIgnore: true */ process.cwd(), "public", REELS_DIR, name);
  return existsSync(file) ? `/${REELS_DIR}/${name}` : undefined;
}

/** Self-hosted video and cover for a Reel, when they have been added to `public/assets/reels/`. */
export function getReelMedia(id: string): ReelMedia {
  return { video: publicFile(`${id}.mp4`), poster: publicFile(`${id}.jpg`) };
}
