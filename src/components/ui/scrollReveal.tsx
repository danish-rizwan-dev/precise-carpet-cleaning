"use client";

import { useRef, type HTMLAttributes } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type RevealProps = Omit<HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"> & {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up";
};

/** A calm, one-time entrance used for copy, cards, and section groups. */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const reduceMotion = useReducedMotion();
  const offset = direction === "left" ? { x: -42 } : direction === "right" ? { x: 42 } : { y: 32 };

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type WordRevealProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
};

/** Matches the Framer reference's left-to-right, word-by-word headline reveal. */
export function WordReveal({ children, className = "", as = "h2" }: WordRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {children.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block mr-[0.24em]"
          initial={reduceMotion ? false : { opacity: 0, x: -18 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.48, delay: index * 0.075, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
