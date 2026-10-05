"use client";

import site from "@/content/site.json";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "@/components/ui/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X, ZoomIn } from "lucide-react";
import ScrollReveal, { WordReveal } from "@/components/ui/scrollReveal";

export type GalleryItem = {
  type: "image" | "video";
  src: string;
  alt: string;
};

type OpenState = {
  type: "image" | "video";
  index: number;
};

/* Photos and videos are supplied by the server page from public/gallery,
   so adding or removing files there updates the gallery on each build. */

/* Tilted collage layout: white-framed photos at alternating angles and
   heights, staggered like prints tossed on a table. */
const PHOTO_WIDTHS = [
  "w-[calc(50%-6px)] sm:w-[290px] lg:w-[310px]",
  "w-[calc(50%-6px)] sm:w-[360px] lg:w-[380px]",
  "w-[calc(50%-6px)] sm:w-[320px] lg:w-[340px]",
];

const PHOTO_HEIGHTS = [
  "h-[155px] sm:h-[195px] lg:h-[215px]",
  "h-[165px] sm:h-[215px] lg:h-[235px]",
  "h-[150px] sm:h-[185px] lg:h-[205px]",
];

const PHOTO_TILT = [
  "-rotate-[3deg] sm:-rotate-[3.5deg]",
  "rotate-[2.5deg] sm:rotate-[3deg]",
  "-rotate-[2deg] sm:-rotate-[2.5deg]",
  "rotate-[3deg] sm:rotate-[3.5deg]",
  "-rotate-[1.5deg] sm:-rotate-[2deg]",
];

const PHOTO_OFFSET = ["", "sm:mt-5", "sm:mt-2", "sm:mt-6", "sm:mt-3"];

const ZoomIcon = () => (
  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#171206] shadow-lg transition-transform duration-300 group-hover:scale-110">
    <ZoomIn className="h-5 w-5" />
  </span>
);

export default function GalleryClient({
  photos,
  videos,
}: {
  photos: GalleryItem[];
  videos: GalleryItem[];
}) {
  const [open, setOpen] = useState<OpenState | null>(null);
  const isOpen = open !== null;

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () =>
      setOpen((state) => {
        if (!state) return state;
        const list = state.type === "image" ? photos : videos;
        return { ...state, index: (state.index + 1) % list.length };
      }),
    [photos, videos]
  );
  const prev = useCallback(
    () =>
      setOpen((state) => {
        if (!state) return state;
        const list = state.type === "image" ? photos : videos;
        return {
          ...state,
          index: (state.index - 1 + list.length) % list.length,
        };
      }),
    [photos, videos]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, close, next, prev]);

  const activeItem = useMemo(() => {
    if (!open) return null;
    const list = open.type === "image" ? photos : videos;
    return list[open.index] ?? null;
  }, [open, photos, videos]);

  const activeCount = open?.type === "image" ? photos.length : videos.length;

  return (
    <section className="w-full py-14 sm:py-16 px-4 sm:px-8 bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1272px] mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-[750px] mb-12 sm:mb-14">
          <WordReveal className="text-[40px] sm:text-[54px] lg:text-[72px] font-bold text-[#171206] tracking-[-2px] leading-[1.1] mb-5">
            Our Gallery
          </WordReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium text-[#5B5955] leading-[30px]">
              Take a look at our recent work. Real homes and businesses across
              Sydney, cleaned by our professional team.
            </p>
          </ScrollReveal>
        </div>

        {/* Photos - tilted collage rows */}
        <ScrollReveal delay={0.1} className="w-full">
          <div className="flex w-full flex-wrap justify-center gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setOpen({ type: "image", index })}
                aria-label={`Open photo ${index + 1} of ${photos.length}`}
                style={{ zIndex: index % 2 === 0 ? 1 : 2 }}
                className={`group relative shrink-0 bg-white p-2 sm:p-2.5 rounded-[18px] sm:rounded-[22px] shadow-[0_12px_34px_rgba(0,0,0,0.14)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] cursor-pointer ${
                  PHOTO_WIDTHS[index % PHOTO_WIDTHS.length]
                } ${
                  PHOTO_HEIGHTS[index % PHOTO_HEIGHTS.length]
                } ${PHOTO_TILT[index % PHOTO_TILT.length]} ${
                  PHOTO_OFFSET[index % PHOTO_OFFSET.length]
                }`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[12px] sm:rounded-[15px] bg-gray-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 380px"
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/25 group-hover:opacity-100">
                    <ZoomIcon />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Videos */}
        <div className="w-full mt-16 sm:mt-20 flex flex-col items-center">
          <div className="text-center max-w-[720px] mb-8 sm:mb-10">
            <WordReveal
              as="h2"
              className="text-[28px] sm:text-[36px] lg:text-[44px] font-bold text-[#171206] tracking-[-1.5px] leading-tight mb-3"
            >
              Videos
            </WordReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-[15px] sm:text-[17px] font-medium text-[#5B5955] leading-[26px]">
                Watch our team at work — real cleaning results from homes and
                businesses across Sydney.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1} className="w-full">
            <div className="flex w-full flex-wrap justify-center gap-5">
              {videos.map((video, index) => (
                <button
                  key={video.src}
                  type="button"
                  onClick={() => setOpen({ type: "video", index })}
                  aria-label={`Play video ${index + 1} of ${videos.length}`}
                  className="group relative w-full sm:w-[640px] aspect-video shrink-0 overflow-hidden rounded-[18px] sm:rounded-[24px] bg-gray-100 -rotate-[1deg] sm:-rotate-[1.5deg] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-0 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] cursor-pointer"
                >
                  <video
                    src={video.src}
                    muted
                    playsInline
                    preload="none"
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-300 group-hover:bg-black/35">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#171206] shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 fill-current translate-x-[1px]" />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.15}>
          <div className="mt-14 flex flex-col items-center text-center gap-4">
            <p className="text-[16px] sm:text-[18px] font-medium text-[#5B5955] leading-[28px] max-w-[560px]">
              Want results like these for your home or business? Book your
              professional cleaning service today.
            </p>
            <a
              href={`tel:${site.phoneHref}`}
              className="group relative flex items-center bg-[#0b4255] text-white rounded-[12px] h-[61px] min-w-[230px] transition-all duration-300 overflow-hidden"
            >
              <div className="bg-white rounded-[8px] absolute left-[4px] inset-y-[4px] z-0 transition-all duration-700 ease-in-out w-[53px] group-hover:w-[calc(100%-8px)]" />
              <span className="absolute left-[21px] z-10 flex h-5 w-5 items-center justify-center text-[#ffb400]">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </span>
              <span className="relative z-10 ml-[64px] pr-6 font-semibold text-[16px] whitespace-nowrap transition-colors duration-300 group-hover:text-[#0b4255]">
                Call us: {site.phone}
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && activeItem && (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm px-3 sm:px-6"
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#171206] transition-colors duration-300 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[14px] font-semibold text-white/80 tabular-nums">
              {(open?.index ?? 0) + 1} / {activeCount}
            </span>

            {/* Previous */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous item"
              className="absolute left-2 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#171206] transition-colors duration-300 cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next item"
              className="absolute right-2 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#171206] transition-colors duration-300 cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={activeItem.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[1100px] w-full flex items-center justify-center"
            >
              {activeItem.type === "image" ? (
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  width={1600}
                  height={1200}
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  className="w-auto h-auto max-h-[82vh] max-w-full object-contain rounded-[16px] sm:rounded-[24px]"
                />
              ) : (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[82vh] rounded-[16px] sm:rounded-[24px] bg-black"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
