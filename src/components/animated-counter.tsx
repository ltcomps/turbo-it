"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedCounterProps {
  /** Original display string e.g. "50,000+", "< 200ms", "7", "8 weeks". */
  value: string;
  /** Animation duration in seconds. Defaults to 1.6. */
  duration?: number;
  className?: string;
}

/**
 * Splits a stat value into [prefix, number, suffix] so we can animate just the
 * digits. Examples:
 *   "50,000+"  → ["", 50000, "+"]
 *   "< 200ms"  → ["< ", 200, "ms"]
 *   "7"        → ["", 7, ""]
 *   "Custom"   → null  (no animation)
 */
function parseValue(s: string): { prefix: string; number: number; suffix: string } | null {
  // Find first run of digits (with optional commas / dot).
  const match = s.match(/(-?[\d,]*\.?\d+)/);
  if (!match) return null;
  const numberStr = match[1];
  const number = parseFloat(numberStr.replace(/,/g, ""));
  if (!Number.isFinite(number)) return null;
  const start = match.index ?? 0;
  return {
    prefix: s.slice(0, start),
    number,
    suffix: s.slice(start + numberStr.length),
  };
}

function formatNumber(n: number, original: number): string {
  // Match the original's thousands-separator style.
  const rounded = Math.round(n);
  if (original >= 1000) return rounded.toLocaleString("en-GB");
  return String(rounded);
}

export function AnimatedCounter({ value, duration = 1.6, className }: AnimatedCounterProps) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) =>
    parsed ? `${parsed.prefix}${formatNumber(latest, parsed.number)}${parsed.suffix}` : value,
  );
  const [text, setText] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    return display.on("change", setText);
  }, [display]);

  useEffect(() => {
    if (!parsed || !inView) return;
    const controls = animate(motionValue, parsed.number, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, parsed, duration, motionValue]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
