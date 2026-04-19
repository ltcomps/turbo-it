"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  Circle,
  Box,
  PieChart,
  Layers,
  Bird,
  Candy,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { containerClass } from "@/lib/tokens";
import { gameModes } from "@/lib/content";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, LucideIcon> = {
  CreditCard, Circle, Box, PieChart, Layers, Bird, Candy,
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function PlatformPlayground() {
  return (
    <section className="noise relative overflow-hidden border-t border-white/[0.04]">
      {/* Background — violet gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, oklch(0.65 0.22 250 / 0.08), transparent 60%), radial-gradient(ellipse at 70% 100%, oklch(0.55 0.24 305 / 0.06), transparent 55%)",
        }}
      />

      <div className={cn(containerClass, "relative z-10 py-24 sm:py-32")}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-electric">
            Play the platform
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Seven game modes.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-electric to-cyan-400 bg-clip-text text-transparent">
              All playable.
            </span>{" "}
            Right here.
          </h2>
          <p className="mt-5 text-muted-foreground sm:text-lg">
            Every instant-win game on Lucky Turbo is on the platform you'd licence — scratch
            cards, spin wheels, plinko, even Flappy Bird. Click any of these to play the live demo.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {gameModes.map((g) => {
            const Icon = iconMap[g.icon] ?? Circle;
            return (
              <motion.div key={g.slug} variants={fadeUp}>
                <Link
                  href={`/demo#${g.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-electric/30 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_-15px_var(--glow)]"
                >
                  {/* subtle gradient overlay */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.22 250 / 0.08) 0%, transparent 60%)",
                    }}
                  />

                  <div className="relative flex size-10 items-center justify-center rounded-xl border border-electric/15 bg-electric/5 text-electric transition-colors group-hover:border-electric/30 group-hover:bg-electric/10">
                    <Icon className="size-4" />
                  </div>

                  <h3 className="relative mt-4 text-base font-semibold leading-tight">
                    {g.title}
                  </h3>
                  <p className="relative mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {g.tagline}
                  </p>

                  <div className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-electric opacity-80 transition-all group-hover:opacity-100 group-hover:gap-2">
                    Play demo
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            size="lg"
            className="h-12 bg-electric px-8 text-white shadow-[0_0_40px_-8px_var(--glow)] hover:bg-electric/90 hover:shadow-[0_0_60px_-5px_var(--glow)]"
          >
            <Link href="/demo">
              Open the full platform demo
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
