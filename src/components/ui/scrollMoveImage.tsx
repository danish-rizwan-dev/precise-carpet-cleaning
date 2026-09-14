"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollMoveImageProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  scale?: number;
  duration?: number;
}

export default function ScrollMoveImage({
  children,
  className = "",
  y = 40,
  scale = 1.05,
  duration = 0.8,
}: ScrollMoveImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y, opacity: 0, scale }}
      animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
