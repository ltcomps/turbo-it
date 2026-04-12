"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { containerClass } from "@/lib/tokens";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/* Comparison data                                                            */
/* -------------------------------------------------------------------------- */

interface ComparisonRow {
  label: string;
  diy: string;
  custom: string;
}

const comparisons: ComparisonRow[] = [
  {
    label: "Performance",
    diy: "Server-rendered PHP, shared hosting",
    custom: "Edge SSR, sub-100ms load times worldwide",
  },
  {
    label: "Design",
    diy: "Cookie-cutter templates, every site looks the same",
    custom: "Fully custom design built around your brand",
  },
  {
    label: "Game Modes",
    diy: "5 fixed game templates",
    custom:
      "Unlimited custom games \u2014 scratch cards, spin wheels, leaderboard challenges & more",
  },
  {
    label: "Marketing Tools",
    diy: "Basic transactional email only",
    custom:
      "SMS campaigns, email automation, Meta CAPI, referral programmes",
  },
  {
    label: "Scaling Costs",
    diy: "High per-order fees on shared infrastructure (\u00A30.17/order = \u00A3850/month at 5k orders)",
    custom: "Transparent per-transaction pricing. No hidden fees or surprise charges.",
  },
  {
    label: "White-Label",
    diy: "Locked into closed-source SaaS. No code access. Every site looks the same.",
    custom: "White-label platform you own. Prevents copying, protects your brand.",
  },
  {
    label: "Security",
    diy: "\u2018Security through obscurity\u2019 on shared platform",
    custom:
      "Row-level security, CAPTCHA, bot prevention, dedicated infrastructure",
  },
];

/* -------------------------------------------------------------------------- */
/* Animation variants                                                         */
/* -------------------------------------------------------------------------- */

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function WhyCustom() {
  return (
    <section className="noise relative overflow-hidden border-t border-white/[0.04]">
      {/* Subtle gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-violet-950/[0.03] to-background dark:via-violet-950/[0.08]"
      />

      <div className={cn(containerClass, "relative z-10 py-24 sm:py-32")}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-electric">
            Why Custom?
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Stop renting a template.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-electric to-cyan-400 bg-clip-text text-transparent">
              Own your platform.
            </span>
          </h2>
        </motion.div>

        {/* Column headers (desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mb-4 hidden grid-cols-[1fr_1fr_1fr] gap-4 lg:grid"
        >
          {/* Label spacer */}
          <div />
          {/* DIY header */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 text-center backdrop-blur-sm">
            <span className="text-sm font-semibold text-muted-foreground">
              DIY Template Platforms
            </span>
          </div>
          {/* Custom header */}
          <div className="rounded-xl border border-electric/20 bg-electric/5 px-5 py-3 text-center backdrop-blur-sm">
            <span className="text-sm font-semibold text-electric">
              Turbo IT Custom Build
            </span>
          </div>
        </motion.div>

        {/* Comparison rows */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-3"
        >
          {comparisons.map((row) => (
            <motion.div
              key={row.label}
              variants={fadeUp}
              className="group grid grid-cols-1 gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.04] sm:p-5 lg:grid-cols-[1fr_1fr_1fr] lg:gap-4"
            >
              {/* Row label */}
              <div className="flex items-center">
                <h3 className="text-base font-semibold">{row.label}</h3>
              </div>

              {/* DIY column — muted, grey */}
              <div className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] p-3 lg:p-4">
                {/* Mobile column label */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground/60 lg:hidden">
                    DIY Template
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                      <X className="size-3 text-red-400" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {row.diy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Custom column — electric, glowing */}
              <div className="relative flex items-start gap-3 overflow-hidden rounded-xl border border-electric/10 bg-electric/[0.03] p-3 transition-all duration-300 group-hover:border-electric/20 group-hover:bg-electric/[0.06] group-hover:shadow-[0_0_30px_-10px_var(--glow)] lg:p-4">
                {/* Glow accent on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-electric/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative flex flex-col gap-1">
                  <span className="text-xs font-medium text-electric/60 lg:hidden">
                    Turbo IT Custom
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-electric/15">
                      <Check className="size-3 text-electric" />
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      {row.custom}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
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
            <Link href="/work">
              See what we build
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
