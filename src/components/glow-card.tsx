"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";

interface GlowCardProps extends React.ComponentProps<"div"> {
  className?: string;
  children: React.ReactNode;
}

const glowTransition = {
  type: "tween" as const,
  duration: 0.3,
  ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
};

export function GlowCard({ className, children, ...props }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.005,
        boxShadow: tokens.shadows.cardHover,
      }}
      initial={{
        y: 0,
        scale: 1,
        boxShadow: tokens.shadows.card,
      }}
      transition={glowTransition}
      className={cn("rounded-xl", className)}
      style={{ willChange: "transform, box-shadow" }}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      <Card
        className={cn(
          "h-full transition-[border-color] duration-300",
          "hover:border-[var(--glow)]/30",
          "motion-reduce:transition-none motion-reduce:hover:transform-none"
        )}
      >
        {children}
      </Card>
    </motion.div>
  );
}
