"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";
import { fadeInUp, pickVariants, useReducedMotion } from "@/lib/motion";

interface SectionHeaderProps {
  /** Small uppercase badge / label shown above the title. */
  badge?: string;
  /** The main heading (rendered as h2). */
  title: string;
  /** Optional supporting paragraph beneath the title. */
  subtitle?: string;
  /** Layout alignment. Defaults to "center". */
  align?: "center" | "left";
  /** Extra classes applied to the outer wrapper. */
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  const reduced = useReducedMotion();
  const variants = pickVariants(fadeInUp, reduced);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {badge && (
        <span
          className={cn(
            tokens.typography.caption,
            "mb-4 inline-block text-electric",
          )}
        >
          {badge}
        </span>
      )}

      <h2 className={cn(tokens.typography.h2)}>{title}</h2>

      {subtitle && (
        <p
          className={cn(
            tokens.typography.bodyLg,
            "mt-4 text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
