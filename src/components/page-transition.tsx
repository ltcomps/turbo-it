"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useReducedMotion } from "@/lib/motion";

interface PageTransitionProps {
  children: ReactNode;
  /** Optional key used by AnimatePresence to track page changes. */
  transitionKey?: string;
  /** Extra classes applied to the motion wrapper. */
  className?: string;
}

const fullVariants = {
  hidden: { opacity: 0, y: 12 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const reducedVariants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } },
};

export function PageTransition({
  children,
  transitionKey,
  className,
}: PageTransitionProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedVariants : fullVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
