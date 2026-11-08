import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";

const REELS_DIR = "assets/reels";

/** Real Reel cover, when it has been added as `public/assets/reels/<id>.jpg`. */
export function getReelCover(id: string): string | undefined {
  const name = `${id}.jpg`;
  const file = path.join(/* turbopackIgnore: true */ process.cwd(), "public", REELS_DIR, name);
  return existsSync(file) ? `/${REELS_DIR}/${name}` : undefined;
}
