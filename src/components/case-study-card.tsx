"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TagChip } from "@/components/tag-chip";
import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  color: string;
  liveUrl?: string;
  screenshot?: string;
  className?: string;
}

export function CaseStudyCard({
  slug,
  title,
  category,
  blurb,
  metric,
  metricLabel,
  tags,
  color,
  liveUrl,
  screenshot,
  className,
}: CaseStudyCardProps) {
  const reducedMotion = useReducedMotion();
  const displayUrl = liveUrl ? new URL(liveUrl).hostname : "";

  const cardVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn("group relative rounded-xl", className)}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-px rounded-xl opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${color}40, transparent)` }}
        aria-hidden="true"
      />

      <Link
        href={`/work/${slug}`}
        className="relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
      >
        <Card className="relative overflow-hidden border-border/50 bg-card transition-all duration-300 group-hover:border-border group-hover:shadow-xl">
          {/* Browser mockup */}
          <div className="relative overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b bg-muted/30 px-3 py-2.5">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-[#ff5f57] transition-transform duration-200 group-hover:scale-110" />
                <div className="size-2.5 rounded-full bg-[#febc2e] transition-transform duration-200 group-hover:scale-110" style={{ transitionDelay: "50ms" }} />
                <div className="size-2.5 rounded-full bg-[#28c840] transition-transform duration-200 group-hover:scale-110" style={{ transitionDelay: "100ms" }} />
              </div>
              {displayUrl && (
                <div className="ml-3 flex-1 rounded-md bg-background/50 px-3 py-1 text-[10px] text-muted-foreground font-medium">
                  {displayUrl}
                </div>
              )}
            </div>

            {/* Preview container */}
            <div className="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.02]">
                {screenshot ? (
                  <img
                    src={screenshot}
                    alt={`${title} Preview`}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                ) : liveUrl ? (
                  <iframe
                    src={liveUrl}
                    title={`${title} Preview`}
                    className="h-[200%] w-[200%] origin-top-left scale-50 border-0 pointer-events-none"
                    loading="lazy"
                    scrolling="no"
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{
                      background: `linear-gradient(135deg, ${color}20, ${color}40)`,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Category badge */}
            <div className="absolute left-3 top-12">
              <Badge
                variant="secondary"
                className="bg-background/90 backdrop-blur-md text-xs font-medium shadow-sm"
              >
                {category}
              </Badge>
            </div>
          </div>

          <CardContent className="space-y-4 p-5">
            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <h3
                className={cn(
                  tokens.typography.h4,
                  "transition-colors duration-200"
                )}
                style={{
                  color: "var(--foreground)",
                }}
              >
                <span className="group-hover:text-electric transition-colors duration-200">
                  {title}
                </span>
              </h3>
              <div className="relative mt-1 size-6 shrink-0">
                <ArrowUpRight
                  className="absolute inset-0 size-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-electric"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Blurb */}
            <p className={cn(tokens.typography.bodySm, "text-muted-foreground line-clamp-2")}>
              {blurb}
            </p>

            {/* Metric highlight */}
            <div className="inline-flex items-baseline gap-2 rounded-lg bg-muted/50 px-3 py-2 transition-colors duration-200 group-hover:bg-muted">
              <span
                className="text-xl font-bold tracking-tight transition-transform duration-200 group-hover:scale-105"
                style={{ color }}
              >
                {metric}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {metricLabel}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <div
                  key={tag}
                  style={{ transitionDelay: `${i * 30}ms` }}
                  className="transition-transform duration-200 group-hover:translate-y-[-2px]"
                >
                  <TagChip label={tag} color={color} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
