"use client";

import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// useReducedMotion – respects the user's OS-level motion preference
// ---------------------------------------------------------------------------

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// ---------------------------------------------------------------------------
// Helpers – every variant set ships a "reduced" alternative so consumers
// can pick the right one with `useReducedMotion()`.
// ---------------------------------------------------------------------------

function withReduced(full: Variants, fallback: Variants): {
  variants: Variants;
  reducedVariants: Variants;
} {
  return { variants: full, reducedVariants: fallback };
}

const noMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

// ---------------------------------------------------------------------------
// fadeIn
// ---------------------------------------------------------------------------
export const fadeIn = withReduced(
  {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  noMotion,
);

// ---------------------------------------------------------------------------
// fadeInUp
// ---------------------------------------------------------------------------
export const fadeInUp = withReduced(
  {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  noMotion,
);

// ---------------------------------------------------------------------------
// fadeInDown
// ---------------------------------------------------------------------------
export const fadeInDown = withReduced(
  {
    hidden: { opacity: 0, y: -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  noMotion,
);

// ---------------------------------------------------------------------------
// staggerContainer
// ---------------------------------------------------------------------------
export const staggerContainer = withReduced(
  {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0,
        delayChildren: 0,
      },
    },
  },
);

// ---------------------------------------------------------------------------
// staggerItem
// ---------------------------------------------------------------------------
export const staggerItem = withReduced(
  {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  noMotion,
);

// ---------------------------------------------------------------------------
// scaleIn
// ---------------------------------------------------------------------------
export const scaleIn = withReduced(
  {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  noMotion,
);

// ---------------------------------------------------------------------------
// slideInLeft
// ---------------------------------------------------------------------------
export const slideInLeft = withReduced(
  {
    hidden: { opacity: 0, x: -48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  noMotion,
);

// ---------------------------------------------------------------------------
// slideInRight
// ---------------------------------------------------------------------------
export const slideInRight = withReduced(
  {
    hidden: { opacity: 0, x: 48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  noMotion,
);

// ---------------------------------------------------------------------------
// Convenience helper – pick the right variant set at runtime
// ---------------------------------------------------------------------------
export function pickVariants(
  set: { variants: Variants; reducedVariants: Variants },
  prefersReduced: boolean,
): Variants {
  return prefersReduced ? set.reducedVariants : set.variants;
}
