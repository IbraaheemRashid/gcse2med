/**
 * Downscales the supplied Unsplash originals into web-sized JPEGs under
 * public/images, renamed to say what they are rather than who shot them.
 *
 * next/image handles format negotiation (WebP/AVIF) and responsive sizes at
 * request time, so this only needs to cap the source resolution and weight —
 * originals are 2-4 MB and have no business being committed at that size.
 *
 *   node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE_DIR = "_brief/photos";
const OUT_DIR = "public/images";
const MAX_WIDTH = 1800;
const QUALITY = 78;

/** source file -> [output name, alt text, photographer] */
const MAP = [
  ["christin-hume-Hcfwew744z4-unsplash.jpg", "hero-study", "A student working through notes at a laptop", "Christin Hume"],
  ["unseen-studio-s9CC2SKySJM-unsplash.jpg", "writing", "A student writing out an answer by hand", "Unseen Studio"],
  ["jeshoots-com-pUAM5hPaCRI-unsplash.jpg", "resources", "Study notes, a laptop and glasses laid out on a desk", "JESHOOTS.COM"],
  ["patrick-perkins-ETRPjvb0KM0-unsplash.jpg", "mistake-bank", "Sticky notes grouped on a wall", "Patrick Perkins"],
  ["md-duran-1VqHRwxcCCw-unsplash.jpg", "graduation", "A graduate in cap and gown facing the ceremony", "MD Duran"],
  ["aaron-burden-QJDzYT_K8Xg-unsplash.jpg", "assessment", "An open notebook and pen on a desk", "Aaron Burden"],
  ["nic-rosenau-J_galDuu4kc-unsplash.jpg", "subjects", "Maths equipment and stationery on a desk", "Nic Rosenau"],
  ["susan-q-yin-2JIvboGLeho-unsplash.jpg", "library", "Curved shelves of a library", "Susan Q Yin"],
];

await mkdir(OUT_DIR, { recursive: true });

const credits = [];

for (const [source, name, alt, photographer] of MAP) {
  const out = path.join(OUT_DIR, `${name}.jpg`);
  const info = await sharp(path.join(SOURCE_DIR, source))
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(out);

  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  credits.push({ file: `${name}.jpg`, alt, photographer, source });
}

await writeFile(
  path.join(OUT_DIR, "credits.md"),
  [
    "# Image credits",
    "",
    "Placeholder photography from Unsplash, supplied by the client. The Unsplash",
    "licence does not require attribution, but recording provenance here means the",
    "originals can always be traced — and makes it obvious which images still need",
    "replacing with real photographs of GCSE2MED lessons and tutors.",
    "",
    "Regenerate with `node scripts/optimize-images.mjs` after changing the map in",
    "that script. Originals live in `_brief/photos/`.",
    "",
    "| File | Photographer | Alt text |",
    "| --- | --- | --- |",
    ...credits.map((c) => `| \`${c.file}\` | ${c.photographer} | ${c.alt} |`),
    "",
  ].join("\n"),
  "utf8",
);

console.log(`\nWrote ${credits.length} images + credits.md`);
