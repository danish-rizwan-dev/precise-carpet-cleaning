import type { Metadata } from "next";
import GalleryClient from "./galleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our gallery of professional carpet, rug, upholstery, leather, tile and mattress cleaning results for homes and businesses across Sydney.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
