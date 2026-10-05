import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import GalleryClient, { type GalleryItem } from "./galleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our gallery of professional carpet, rug, upholstery, leather, tile and mattress cleaning results for homes and businesses across Sydney.",
  alternates: {
    canonical: "/gallery/",
  },
};

function readGalleryMedia() {
  const dir = path.join(process.cwd(), "public", "gallery");

  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    files = [];
  }

  const photoFiles = files
    .filter((file) => /^gallery-\d+\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort();

  const videoFiles = files
    .filter((file) => /\.(mp4|webm|mov)$/i.test(file))
    .sort();

  const photos: GalleryItem[] = photoFiles.map((file, index) => ({
    type: "image",
    src: `/gallery/${file}`,
    alt: `Precise Carpet Cleaning result ${index + 1}`,
  }));

  const videos: GalleryItem[] = videoFiles.map((file) => ({
    type: "video",
    src: `/gallery/${file}`,
    alt: "Precise Carpet Cleaning work in progress video",
  }));

  return { photos, videos };
}

export default function GalleryPage() {
  const { photos, videos } = readGalleryMedia();
  return <GalleryClient photos={photos} videos={videos} />;
}
