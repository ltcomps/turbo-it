"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientOrbsProps {
  className?: string;
}

export function GradientOrbs({ className }: GradientOrbsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* Primary electric orb — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full blur-[150px] will-change-transform"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.22 250 / 0.15), transparent 70%)" }}
      />

      {/* Purple/violet orb — top left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.8, 0.8],
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute -left-20 -top-10 h-[500px] w-[500px] rounded-full blur-[140px] will-change-transform"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.25 290 / 0.12), transparent 70%)" }}
      />

      {/* Cyan/teal orb — center floating */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.6, 0.6],
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full blur-[130px] will-change-transform"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.18 195 / 0.1), transparent 70%)" }}
      />

      {/* Pink/magenta orb — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.5, 0.5],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute -bottom-20 -right-10 h-[400px] w-[500px] rounded-full blur-[130px] will-change-transform"
        style={{ background: "radial-gradient(circle, oklch(0.6 0.2 330 / 0.08), transparent 70%)" }}
      />

      {/* Large bottom glow — electric spread */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.4, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full blur-[150px] will-change-transform"
        style={{ background: "radial-gradient(ellipse, oklch(0.65 0.22 250 / 0.1), transparent 70%)" }}
      />
    </div>
  );
}
