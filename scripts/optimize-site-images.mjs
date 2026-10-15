/**
 * Converts the large site photos and logo PNGs in public/assets/ into WebP
 * copies used by the site. The PNG originals are kept as masters.
 *
 *   node scripts/optimize-site-images.mjs
 */
import { stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS = path.join(process.cwd(), "public", "assets");

const IMAGES = [
  { source: "H1.png", output: "hero-1.webp", width: 1672, quality: 82 },
  { source: "H2.png", output: "hero-2.webp", width: 1672, quality: 82 },
  { source: "H3.png", output: "hero-3.webp", width: 1672, quality: 82 },
  { source: "Jyoti.png", output: "jyoti.webp", width: 1536, quality: 82 },
  { source: "New arrivals.png", output: "new-arrivals.webp", width: 1983, quality: 82 },
  { source: "Logo.png", output: "logo.webp", width: 512, quality: 90, alpha: true },
  { source: "Logo-text.png", output: "logo-text.webp", width: 600, quality: 90, alpha: true },
  { source: "Logo-text.png", output: "logo-text-small.webp", width: 300, quality: 90, alpha: true },
];

async function isFresh(source, output) {
  try {
    const [src, out] = await Promise.all([stat(source), stat(output)]);
    return out.mtimeMs >= src.mtimeMs;
  } catch {
    return false;
  }
}

for (const image of IMAGES) {
  const source = path.join(ASSETS, image.source);
  const output = path.join(ASSETS, image.output);
  if (await isFresh(source, output)) continue;
  const info = await sharp(source)
    .rotate()
    .resize({ width: image.width, withoutEnlargement: true })
    .webp({ quality: image.quality, alphaQuality: image.alpha ? 100 : undefined, effort: 6 })
    .toFile(output);
  const before = (await stat(source)).size;
  console.log(
    `${image.source} (${Math.round(before / 1024)} KB) -> ${image.output} (${Math.round(info.size / 1024)} KB, ${info.width}x${info.height})`,
  );
}
