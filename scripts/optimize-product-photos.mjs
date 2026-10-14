/**
 * Converts the supplied product photos (public/assets/Products/*.png, ~3.4 MB
 * each) into web-ready JPEGs in public/assets/sarees/ with URL-safe names:
 *
 *   "Pure Ajreek  red saree 1.png" -> "pure-ajreek-red-saree-1.jpg"
 *
 * Usage: npm run photos
 * Existing outputs that are newer than their source are skipped.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "public/assets/Products";
const OUTPUT_DIR = "public/assets/sarees";
const MAX_WIDTH = 1024;
const QUALITY = 82;

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function isFresh(source, output) {
  try {
    const [src, out] = await Promise.all([stat(source), stat(output)]);
    return out.mtimeMs >= src.mtimeMs;
  } catch {
    return false;
  }
}

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(SOURCE_DIR))
  .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
  .sort();

/**
 * Sets whose names only differ by spacing or punctuation ("rs -4500" vs
 * "rs-4500") would share a slug; later sets in sorted order get "-2", "-3".
 */
const setSlugs = new Map();
const takenSlugs = new Map();
/** Some files are saved as "name 1png.png"; the stray "png" is dropped. */
const baseName = (file) => path.parse(file).name.replace(/(\d)png$/i, "$1");

for (const file of files) {
  const set = baseName(file).replace(/\s*\d+$/, "");
  if (setSlugs.has(set)) continue;
  const base = slugify(set);
  const count = (takenSlugs.get(base) ?? 0) + 1;
  takenSlugs.set(base, count);
  setSlugs.set(set, count === 1 ? base : `${base}-${count}`);
}

let written = 0;
for (const file of files) {
  const name = baseName(file);
  const set = name.replace(/\s*\d+$/, "");
  const number = name.slice(set.length).trim();
  const slug = number ? `${setSlugs.get(set)}-${number}` : setSlugs.get(set);
  const source = path.join(SOURCE_DIR, file);
  const output = path.join(OUTPUT_DIR, `${slug}.jpg`);
  if (await isFresh(source, output)) continue;

  await sharp(source)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(output);
  written += 1;
  console.log(`${file} -> ${output}`);
}

console.log(`${written} written, ${files.length - written} up to date.`);
