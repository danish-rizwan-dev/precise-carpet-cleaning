/**
 * One-time (re-runnable) image optimizer for public/.
 *
 * Quality rules (site must never look blurry):
 *   - content images are NEVER downscaled unless wider than 2048px
 *     (no on-page image renders wider than ~1920px, so zero visible change)
 *   - JPEG  : q82, mozjpeg, 4:4:4 chroma (no color bleeding on text/edges)
 *   - WebP  : q82 (q85 for photos converted from PNG)
 *   - a new file only replaces the old one when it is actually smaller
 *   - PNG -> .webp (correct extension), originals deleted; refs to update
 *     are printed so they can be fixed in src/ before committing.
 *
 * Skipped: svg, avif, gif, ico, mp4 and anything under 100 KB.
 *
 * Usage: npm run optimize:images [path-filter]
 *   e.g. npm run optimize:images -- gallery
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const FILTER = process.argv[2] ? process.argv[2].replaceAll("\\", "/") : null;
const SKIP_EXT = new Set([".svg", ".avif", ".gif", ".ico", ".mp4", ".webmanifest"]);
const MIN_BYTES = 100 * 1024;
const MAX_W = 2048;

// og:image — social crawlers want <=1200px and do not reliably support webp.
const OG_IMAGE = "hero/herobackgroundimage.png";

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const rows = [];
const refUpdates = [];
let before = 0;
let after = 0;

for (const file of walk(PUBLIC)) {
  const rel = path.relative(PUBLIC, file).replaceAll("\\", "/");
  if (FILTER && !rel.startsWith(FILTER)) continue;
  const ext = path.extname(file).toLowerCase();
  if (SKIP_EXT.has(ext)) continue;
  const size = fs.statSync(file).size;
  if (size < MIN_BYTES) continue;

  const input = fs.readFileSync(file);
  let output = null;
  let outPath = file;
  let note = "";

  if (rel === OG_IMAGE) {
    output = await sharp(input)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();
    outPath = file.replace(/\.png$/, ".jpg");
    note = "og:image -> jpg 1200w";
  } else if (rel.startsWith("gallery/") && (ext === ".jpeg" || ext === ".jpg")) {
    // gallery page lists files via readdirSync — extension-free, so WebP is safe.
    output = await sharp(input).webp({ quality: 85, effort: 6 }).toBuffer();
    outPath = file.replace(/\.jpe?g$/, ".webp");
    note = "gallery jpeg -> webp q85";
    if (output.length > size * 0.8) output = null; // keep original
  } else if (ext === ".png") {
    const meta = await sharp(input).metadata();
    let pipe = sharp(input);
    if (meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W, withoutEnlargement: true });
    output = await pipe.webp({ quality: 85, effort: 6, alphaQuality: 90 }).toBuffer();
    outPath = file.replace(/\.png$/, ".webp");
    note = "png -> webp q85";
    if (output.length > size * 0.8) output = null; // keep original PNG
  } else if (ext === ".jpg" || ext === ".jpeg") {
    const meta = await sharp(input).metadata();
    let pipe = sharp(input);
    if (meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W, withoutEnlargement: true });
    output = await pipe
      .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();
    note = `jpeg q82 (src ${meta.width}x${meta.height} ${meta.format})`;
    if (output.length > size * 0.95) output = null;
  } else if (ext === ".webp") {
    const meta = await sharp(input).metadata();
    let pipe = sharp(input);
    if (meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W, withoutEnlargement: true });
    output = await pipe.webp({ quality: 82, effort: 6 }).toBuffer();
    note = `webp q82 (src ${meta.width}x${meta.height})`;
    if (output.length > size * 0.95) output = null;
  }

  if (!output) {
    rows.push([rel, kb(size), "kept", note || "already optimal"]);
    before += size;
    after += size;
    continue;
  }

  fs.writeFileSync(outPath, output);
  if (outPath !== file) {
    fs.unlinkSync(file);
    refUpdates.push(`${rel}  ->  ${path.relative(PUBLIC, outPath).replaceAll("\\", "/")}`);
  }
  const pct = Math.round((100 * (size - output.length)) / size);
  rows.push([rel, `${kb(size)} -> ${kb(output.length)}`, `-${pct}%`, note]);
  before += size;
  after += output.length;
}

console.log("\nfile".padEnd(52), "size".padEnd(20), "saved".padEnd(7), "note");
for (const r of rows) {
  console.log(r[0].padEnd(52), r[1].padEnd(20), r[2].padEnd(7), r[3]);
}
console.log(`\nTOTAL: ${kb(before)} -> ${kb(after)}  (saved ${kb(before - after)}, ${Math.round((100 * (before - after)) / before)}%)`);
if (refUpdates.length) {
  console.log("\nREF UPDATES REQUIRED in src/ (old path -> new path):");
  for (const r of refUpdates) console.log("  " + r);
}
