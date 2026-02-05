"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems } from "@/lib/content";
import { CaseStudyCard } from "@/components/case-study-card";
import { cn } from "@/lib/utils";
import { useReducedMotion, staggerContainer, pickVariants } from "@/lib/motion";

/* -------------------------------------------------------------------------- */
/* Filter categories                                                          */
/* -------------------------------------------------------------------------- */

const filters = [
  { label: "All", value: "All" },
  { label: "Web", value: "Web" },
  { label: "Ecom", value: "Ecom" },
  { label: "SEO", value: "SEO" },
  { label: "IT", value: "IT" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

/* -------------------------------------------------------------------------- */
/* WorkContent                                                                */
/* -------------------------------------------------------------------------- */

export function WorkContent() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const reduced = useReducedMotion();
  const containerVariants = pickVariants(staggerContainer, reduced);

  const filteredItems =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.categoryTag === activeFilter);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Filter Tabs                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        {filters.map(({ label, value }) => {
          const isActive = activeFilter === value;
          return (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {/* Animated pill background */}
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {label}
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Portfolio Grid                                                     */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredItems.map((item) => (
            <CaseStudyCard
              key={item.slug}
              slug={item.slug}
              title={item.title}
              category={item.category}
              blurb={item.blurb}
              metric={item.metric}
              metricLabel={item.metricLabel}
              tags={item.tags}
              color={item.color}
              liveUrl={item.liveUrl}
              screenshot={(item as { screenshot?: string }).screenshot}
            />
          ))}

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center text-muted-foreground"
            >
              No projects found for this category.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
