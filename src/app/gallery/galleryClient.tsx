"use client";

import site from "@/content/site.json";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "@/components/ui/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoveHorizontal, X, ZoomIn } from "lucide-react";
import ScrollReveal, { WordReveal } from "@/components/ui/scrollReveal";

export type GalleryItem = {
  type: "image";
  src: string;
  alt: string;
};

export type GalleryMedia = {
  src: string;
  alt: string;
};

/** One numbered result: before-gallery-NN paired with after-gallery-NN. */
export type BeforeAfterPair = {
  id: string;
  number: string;
  before: GalleryMedia | null;
  after: GalleryMedia | null;
};

type LightItem =
  | { kind: "pair"; pair: BeforeAfterPair }
  | { kind: "image"; item: GalleryItem };

const GRID_SIZES = "(max-width: 640px) 100vw, 50vw";

/* ---------------- Before / After slider ---------------- */

function BeforeAfterSlider({
  pair,
  sizes = GRID_SIZES,
}: {
  pair: BeforeAfterPair;
  sizes?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  const { before, after, number } = pair;

  // Incomplete pair — show the single image we have.
  if (!before || !after) {
    const only = (before ?? after)!;
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-gray-100">
        <Image src={only.src} alt={only.alt} fill draggable={false} sizes={sizes} className="object-cover" />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
          {before ? "Before" : "After"}
        </span>
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-[#0b4255] px-3 py-1.5 text-[12px] font-bold text-white">
          No. {number}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label={`Before and after comparison ${number}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) moveTo(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
      className="relative aspect-[4/5] max-h-[74vh] w-full touch-pan-y select-none overflow-hidden rounded-[16px] bg-gray-100"
    >
      {/* After — full image underneath */}
      <Image src={after.src} alt={after.alt} fill draggable={false} sizes={sizes} className="object-cover" />

      {/* Before — clipped to the left of the divider */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={before.src} alt={before.alt} fill draggable={false} sizes={sizes} className="object-cover" />
      </div>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 -left-px w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)]" />
        <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white shadow-[0_6px_18px_rgba(0,0,0,0.3)]">
          <ChevronLeft className="h-4 w-4 -mr-0.5 text-[#0b4255]" />
          <ChevronRight className="h-4 w-4 -ml-0.5 text-[#0b4255]" />
        </div>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-[#0b4255]/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
        After
      </span>
      <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-[#0b4255] px-3 py-1.5 text-[12px] font-bold text-white">
        No. {number}
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#171206] opacity-90 shadow-md">
        <MoveHorizontal className="h-4 w-4" />
      </span>
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function GalleryClient({
  pairs,
  extras,
}: {
  pairs: BeforeAfterPair[];
  extras: GalleryItem[];
}) {
  const items = useMemo<LightItem[]>(
    () => [
      ...pairs.map((pair) => ({ kind: "pair" as const, pair })),
      ...extras.map((item) => ({ kind: "image" as const, item })),
    ],
    [pairs, extras]
  );

  const [open, setOpen] = useState<number | null>(null);
  const isOpen = open !== null;

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length]
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

  const active = open !== null ? items[open] : null;

  return (
    <section className="w-full py-14 sm:py-16 px-4 sm:px-8 bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1272px] mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-[750px] mb-8 sm:mb-10">
          <WordReveal className="text-[40px] sm:text-[54px] lg:text-[72px] font-bold text-[#171206] tracking-[-2px] leading-[1.1] mb-5">
            Our Gallery
          </WordReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium text-[#5B5955] leading-[30px]">
              Real results from homes and businesses across Sydney — every photo
              is a numbered before &amp; after from our team.
            </p>
          </ScrollReveal>
        </div>

        {/* Before / After grid */}
        {items.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-5 sm:gap-7 sm:grid-cols-2">
            {items.map((item, index) => (
              <ScrollReveal
                key={item.kind === "pair" ? item.pair.id : item.item.src}
                delay={0.05 * (index % 4)}
                className="w-full"
              >
                <figure className="group w-full select-none rounded-[22px] border border-gray-100 bg-white p-2.5 sm:p-3 shadow-[0px_20px_50px_rgba(0,0,0,0.07)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0px_24px_60px_rgba(0,0,0,0.13)]">
                  {item.kind === "pair" ? (
                    <BeforeAfterSlider pair={item.pair} />
                  ) : (
      <div className="relative aspect-[4/5] max-h-[74vh] w-full overflow-hidden rounded-[16px] bg-gray-100">
                      <Image
                        src={item.item.src}
                        alt={item.item.alt}
                        fill
                        draggable={false}
                        sizes={GRID_SIZES}
                        className="object-cover"
                      />
                    </div>
                  )}

                  <figcaption className="flex items-center justify-between gap-3 px-1 pb-0.5 pt-3">
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-[15px] sm:text-[16px] font-bold text-[#171206]">
                        {item.kind === "pair"
                          ? `Transformation No. ${item.pair.number}`
                          : item.item.alt}
                      </span>
                      <span className="text-[13px] font-medium text-[#5B5955]">
                        {item.kind === "pair" ? "Before & after" : "Gallery photo"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(index)}
                      aria-label={`Open result ${index + 1} of ${items.length} full size`}
                      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-[#171206] transition-colors duration-300 hover:border-[#0b4255] hover:bg-[#0b4255] hover:text-white"
                    >
                      <ZoomIn className="h-[18px] w-[18px]" />
                    </button>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="text-[16px] font-medium text-[#5B5955]">
            Photos are coming soon — check back shortly.
          </p>
        )}

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
        {isOpen && active && (
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
              {(open ?? 0) + 1} / {items.length}
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
              key={active.kind === "pair" ? active.pair.id : active.item.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[86vh] w-full max-w-[620px] flex flex-col items-center gap-3"
            >
              {active.kind === "pair" ? (
                <>
                  <BeforeAfterSlider
                    pair={active.pair}
                    sizes="(max-width: 640px) 100vw, 620px"
                  />
                  <p className="flex items-center gap-2 text-[13px] font-semibold text-white/75">
                    <MoveHorizontal className="h-4 w-4" />
                    Drag to compare
                  </p>
                </>
              ) : (
                <Image
                  src={active.item.src}
                  alt={active.item.alt}
                  draggable={false}
                  width={1200}
                  height={1500}
                  sizes="(max-width: 640px) 100vw, 620px"
                  className="h-auto max-h-[80vh] w-auto max-w-full rounded-[16px] sm:rounded-[24px] object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
