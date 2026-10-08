import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import GalleryClient, {
  type GalleryItem,
  type BeforeAfterPair,
} from "./galleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our before and after gallery of professional carpet, rug, upholstery, leather, tile and mattress cleaning results for homes and businesses across Sydney.",
  alternates: {
    canonical: "/gallery/",
  },
};

const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i;
const BEFORE_RE = /^before-gallery-(\d+)\.[^.]+$/i;
const AFTER_RE = /^after-gallery-(\d+)\.[^.]+$/i;

const extOf = (file: string) => file.slice(file.lastIndexOf(".")).toLowerCase();
const numOf = (file: string) => {
  const m = BEFORE_RE.exec(file) ?? AFTER_RE.exec(file);
  return m ? m[1] : "0";
};

/** Pairs before-gallery-NN.* with after-gallery-NN.* (same extension first). */
function readGalleryMedia() {
  const dir = path.join(process.cwd(), "public", "gallery");

  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    files = [];
  }

  const befores: string[] = [];
  const afters: string[] = [];
  const extras: string[] = [];

  for (const file of files.sort()) {
    if (!IMAGE_RE.test(file)) continue; // videos are no longer shown
    if (BEFORE_RE.test(file)) befores.push(file);
    else if (AFTER_RE.test(file)) afters.push(file);
    else extras.push(file);
  }

  const byNumber = (a: string, b: string) =>
    parseInt(numOf(a), 10) - parseInt(numOf(b), 10) || a.localeCompare(b);
  befores.sort(byNumber);
  afters.sort(byNumber);

  const used = new Set<string>();
  const pairs: BeforeAfterPair[] = [];

  for (const before of befores) {
    const num = numOf(before);
    const ext = extOf(before);
    const after =
      afters.find((f) => !used.has(f) && numOf(f) === num && extOf(f) === ext) ??
      afters.find((f) => !used.has(f) && numOf(f) === num);
    if (after) used.add(after);

    // Only complete pairs are shown — incomplete files (e.g. a before
    // without its after) are skipped until both images exist.
    if (!after) continue;

    pairs.push({
      id: before,
      number: num,
      before: { src: `/gallery/${before}`, alt: `Before cleaning — result ${num}` },
      after: { src: `/gallery/${after}`, alt: `After cleaning — result ${num}` },
    });
  }

  pairs.sort(
    (a, b) => parseInt(a.number, 10) - parseInt(b.number, 10) || a.id.localeCompare(b.id)
  );

  const extraItems: GalleryItem[] = extras.map((file) => ({
    type: "image",
    src: `/gallery/${file}`,
    alt: file
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  }));

  return { pairs, extras: extraItems };
}

export default function GalleryPage() {
  const { pairs, extras } = readGalleryMedia();
  return <GalleryClient pairs={pairs} extras={extras} />;
}
