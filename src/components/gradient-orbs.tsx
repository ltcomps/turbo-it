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
      {/* Primary electric orb - top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-electric/10 blur-[120px]"
      />

      {/* Secondary orb - animated float */}
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
        className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-electric/5 blur-[100px]"
      />

      {/* Accent orb - bottom */}
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
        className="absolute -bottom-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-electric/8 blur-[120px]"
      />
    </div>
  );
}
