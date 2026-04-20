"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientOrbsProps {
  className?: string;
}

/**
 * Directional ambient glow:
 *   - Top-left   →  cluster of 3 blue orbs at different shades
 *   - Bottom-right → soft warm-white glow
 * Reads as "blue energy on one side, light on the other" instead of
 * the scatter-of-rainbow look.
 */
export function GradientOrbs({ className }: GradientOrbsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Deep navy-blue — top-left, anchor */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -left-32 -top-32 h-[640px] w-[640px] rounded-full blur-[160px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, oklch(0.45 0.22 255 / 0.32), transparent 70%)",
        }}
      />

      {/* Mid electric (brand) blue — top-left, slightly inset, drifting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.85, 0.85],
          y: [0, -20, 0],
          x: [0, 18, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute -left-10 top-10 h-[520px] w-[520px] rounded-full blur-[140px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.24 245 / 0.28), transparent 70%)",
        }}
      />

      {/* Bright cyan-blue highlight — top-left further inset, smallest, brightest */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.7, 0.7],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute left-[8%] top-[6%] h-[340px] w-[340px] rounded-full blur-[110px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.18 220 / 0.25), transparent 70%)",
        }}
      />

      {/* Warm-white glow — bottom-right, the opposite corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.55, 0.55],
          y: [0, 14, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-24 -right-24 h-[600px] w-[600px] rounded-full blur-[160px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, oklch(0.96 0.02 250 / 0.18), transparent 70%)",
        }}
      />

      {/* Faint pale-blue secondary on the white side — keeps the palette cohesive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.35, 0.35],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-[12%] right-[14%] h-[360px] w-[420px] rounded-full blur-[130px] will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.85 0.08 230 / 0.16), transparent 70%)",
        }}
      />
    </div>
  );
}
