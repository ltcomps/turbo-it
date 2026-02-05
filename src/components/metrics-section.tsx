"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";

interface Metric {
  value: string;
  label: string;
  description: string;
}

interface MetricsSectionProps {
  metrics: Metric[];
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

function MetricCard({ value, label, description }: Metric) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = React.useState(value);

  React.useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !isInView) return;

    // Try to animate numeric portion
    const numericMatch = value.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)$/);
    if (!numericMatch) return;

    const prefix = numericMatch[1];
    const target = parseFloat(numericMatch[2]);
    const suffix = numericMatch[3];
    const isDecimal = numericMatch[2].includes(".");
    const duration = 1200;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      setDisplayValue(
        `${prefix}${isDecimal ? current.toFixed(1) : Math.round(current)}${suffix}`
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className={cn(
        "flex flex-col items-center gap-1 rounded-xl border bg-card p-6 text-center shadow-sm",
        "motion-reduce:transform-none"
      )}
    >
      <span className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {isInView ? displayValue : value}
      </span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className={cn(tokens.typography.bodySm, "text-muted-foreground")}>
        {description}
      </span>
    </motion.div>
  );
}

export function MetricsSection({ metrics, className }: MetricsSectionProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4",
        className
      )}
    >
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </motion.div>
  );
}
