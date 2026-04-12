"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
  Zap,
  Lock,
  TrendingUp,
  Server,
  Shield,
  Code,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { containerClass } from "@/lib/tokens";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/* WordPress pain points                                                      */
/* -------------------------------------------------------------------------- */

const painPoints = [
  {
    icon: Lock,
    title: "You don't own your code",
    description:
      "Most WordPress competition agencies retain all IP rights. You leave, you leave empty-handed — no code, no plugins, start from scratch.",
  },
  {
    icon: Server,
    title: "Expensive at scale",
    description:
      "WordPress needs Redis, Varnish, and CDN caching layers just to keep up. Hosting costs can hit thousands per month as you grow.",
  },
  {
    icon: AlertTriangle,
    title: "Plugin dependency",
    description:
      "Your business runs on a stack of third-party plugins. One update breaks your checkout, one vulnerability exposes your customers.",
  },
  {
    icon: TrendingUp,
    title: "Performance ceiling",
    description:
      "Server-rendered PHP with database queries on every page load. No amount of caching matches purpose-built edge architecture.",
  },
  {
    icon: Shield,
    title: "Security is bolted on",
    description:
      "WordPress is the most attacked software in the world. Security is an afterthought, not built into the platform core.",
  },
  {
    icon: Code,
    title: "Locked into contracts",
    description:
      "12-month minimums, 3-month notice periods, mandatory support packages. You're paying whether you want to or not.",
  },
];

/* -------------------------------------------------------------------------- */
/* Animation                                                                  */
/* -------------------------------------------------------------------------- */

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
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

export function WordPressMigration() {
  return (
    <section className="noise relative overflow-hidden border-t border-white/[0.04]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-red-950/[0.03] to-background dark:via-red-950/[0.06]"
      />

      <div className={cn(containerClass, "relative z-10 py-24 sm:py-32")}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-amber-400">
            WordPress Migration
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Outgrowing{" "}
            <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
              WordPress?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg sm:leading-relaxed">
            WordPress competition sites hit a ceiling fast. Slow page loads,
            plugin conflicts, expensive hosting, and no code ownership.
            We build the platform you actually need — purpose-built, edge-hosted,
            and yours to keep.
          </p>
        </motion.div>

        {/* Pain point grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/20 hover:bg-white/[0.04]"
              >
                <div className="relative mb-4 flex size-11 items-center justify-center rounded-xl border border-amber-500/10 bg-amber-500/5">
                  <Icon className="size-5 text-amber-400" />
                </div>
                <h3 className="text-base font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Migration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-14 max-w-2xl"
        >
          <div className="rounded-2xl border border-electric/10 bg-electric/[0.03] p-6 text-center backdrop-blur-sm sm:p-10">
            <Zap className="mx-auto mb-4 size-8 text-electric" />
            <h3 className="text-xl font-bold sm:text-2xl">
              We handle the migration
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
              We&apos;ll rebuild your competition site on modern infrastructure —
              edge-hosted Next.js with real-time data, custom game modes, and
              white-label branding. You keep your domain, your customers, and
              your brand. This time, you own the platform.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 bg-electric px-8 text-white shadow-[0_0_40px_-8px_var(--glow)] hover:bg-electric/90"
              >
                <Link href="/contact">
                  Discuss your migration
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
