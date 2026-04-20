"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeRowProps {
  items: string[];
  duration: number; // seconds per full loop
  reverse?: boolean;
  className?: string;
}

function MarqueeRow({ items, duration, reverse = false, className }: MarqueeRowProps) {
  // Duplicate the items so the loop is seamless.
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className={cn("flex shrink-0 gap-12 pr-12", className)}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 text-sm font-medium uppercase tracking-wider text-muted-foreground/60 transition-colors duration-200 hover:text-foreground sm:text-base"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface MarqueeStripProps {
  rows: { label: string; items: string[]; reverse?: boolean }[];
  title?: string;
  className?: string;
}

export function MarqueeStrip({ rows, title, className }: MarqueeStripProps) {
  return (
    <section
      className={cn(
        "noise relative overflow-hidden border-y border-white/[0.04] bg-white/[0.01]",
        className,
      )}
    >
      <div className="relative z-10 py-10 sm:py-14">
        {title && (
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/70">
            {title}
          </p>
        )}
        <div className="flex flex-col gap-4 sm:gap-6">
          {rows.map((row, i) => (
            <div key={row.label} className="flex items-center gap-4">
              <span className="hidden shrink-0 pl-6 text-[10px] font-semibold uppercase tracking-widest text-electric/70 sm:block sm:w-32">
                {row.label}
              </span>
              <MarqueeRow
                items={row.items}
                duration={50 + i * 10}
                reverse={row.reverse}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
