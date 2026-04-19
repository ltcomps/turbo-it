"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, X, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { containerClass } from "@/lib/tokens";
import { Button } from "@/components/ui/button";
import { comparisonMatrix } from "@/lib/content";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Cell({ value, variant }: { value: string | boolean; variant: "turbo" | "template" | "agency" }) {
  if (value === true) {
    return (
      <div className={cn(
        "flex size-6 items-center justify-center rounded-full",
        variant === "turbo" ? "bg-electric/20 text-electric" : "bg-emerald-500/15 text-emerald-400"
      )}>
        <Check className="size-3.5" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex size-6 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        <X className="size-3.5" />
      </div>
    );
  }
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 text-xs font-medium leading-snug",
      variant === "turbo" ? "text-electric" : "text-muted-foreground"
    )}>
      {variant !== "turbo" && <Minus className="size-3 opacity-60" />}
      {value}
    </span>
  );
}

export function WhyCustom() {
  return (
    <section className="noise relative overflow-hidden border-t border-white/[0.04]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-violet-950/[0.03] to-background dark:via-violet-950/[0.08]"
      />

      <div className={cn(containerClass, "relative z-10 py-24 sm:py-32")}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-electric">
            Why Turbo IT
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Not a template.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-electric to-cyan-400 bg-clip-text text-transparent">
              Not a one-off build.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground sm:text-lg">
            We sit in the middle — a platform you licence, not a product you rent or a stack you inherit.
            We own and protect the code; you own your brand, your customers, and your data.
          </p>
        </motion.div>

        {/* Column headers */}
        <div className="mb-3 hidden grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 lg:grid">
          <div />
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
            Template SaaS
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
            Traditional agency
          </div>
          <div className="rounded-xl border border-electric/30 bg-electric/5 px-4 py-3 text-center text-sm font-semibold text-electric shadow-[0_0_20px_-8px_var(--glow)]">
            Turbo IT
          </div>
        </div>

        {/* Rows */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-2"
        >
          {comparisonMatrix.map((row) => (
            <motion.div
              key={row.feature}
              variants={fadeUp}
              className="grid grid-cols-2 gap-2 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 backdrop-blur-sm transition-colors hover:border-white/[0.08] hover:bg-white/[0.04] sm:p-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-3"
            >
              <div className="col-span-2 mb-1 flex items-center text-sm font-semibold lg:col-span-1 lg:mb-0">
                {row.feature}
              </div>

              {/* Template SaaS */}
              <div className="flex flex-col gap-1.5 rounded-lg border border-white/[0.03] bg-white/[0.01] p-2.5 lg:items-start lg:justify-center lg:p-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 lg:hidden">
                  Template
                </span>
                <Cell value={row.templateSaas} variant="template" />
              </div>

              {/* Traditional agency */}
              <div className="flex flex-col gap-1.5 rounded-lg border border-white/[0.03] bg-white/[0.01] p-2.5 lg:items-start lg:justify-center lg:p-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 lg:hidden">
                  Agency
                </span>
                <Cell value={row.traditionalAgency} variant="agency" />
              </div>

              {/* Turbo IT */}
              <div className="col-span-2 flex flex-col gap-1.5 rounded-lg border border-electric/20 bg-electric/[0.04] p-2.5 transition-colors lg:col-span-1 lg:items-start lg:justify-center lg:p-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-electric/70 lg:hidden">
                  Turbo IT
                </span>
                <Cell value={row.turboIt} variant="turbo" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <Button
            asChild
            size="lg"
            className="h-12 bg-electric px-8 text-white shadow-[0_0_40px_-8px_var(--glow)] hover:bg-electric/90 hover:shadow-[0_0_60px_-5px_var(--glow)]"
          >
            <Link href="/demo">
              Play the platform
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
