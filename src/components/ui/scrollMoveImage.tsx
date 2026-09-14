"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ScrollMoveImageProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  parallaxRange?: [number, number];
}

export default function ScrollMoveImage({
  children,
  className = "",
  y = 40,
  parallaxRange = [24, -24],
}: ScrollMoveImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], parallaxRange);

  return (
    <motion.div
      ref={containerRef}
      initial={reduceMotion ? false : { y, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div style={{ y: reduceMotion ? 0 : parallaxY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
