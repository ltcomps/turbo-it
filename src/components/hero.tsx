"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { containerClass } from "@/lib/tokens";
import { featuredWork } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/grid-background";
import { GradientOrbs } from "@/components/gradient-orbs";
import { LazyIframe } from "@/components/lazy-iframe";

export function Hero() {
  const reducedMotion = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="noise relative overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-32 lg:pb-32 lg:pt-40">
      {/* Background layers */}
      <GridBackground variant="dots" />
      <GradientOrbs />

      <div className={cn(containerClass, "relative z-10")}>
        {/* ── Centered headline block ── */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/5 px-5 py-2 text-sm font-medium text-electric backdrop-blur-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-electric opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-electric" />
            </span>
            UK Competition Platform Specialists
          </motion.div>

          {/* Main headline — gradient text */}
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="block">We build</span>
            <span className="bg-gradient-to-r from-violet-400 via-electric to-cyan-300 bg-clip-text text-transparent">
              competition platforms
            </span>
            <span className="block text-muted-foreground">that sell.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg sm:leading-relaxed"
          >
            Raffle websites, prize draw platforms, and competition sites — built
            to sell tickets, automate draws, and keep players coming back.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group relative h-12 overflow-hidden bg-electric px-8 text-white shadow-[0_0_40px_-8px_var(--glow)] transition-all hover:bg-electric/90 hover:shadow-[0_0_60px_-5px_var(--glow)]"
            >
              <Link href="/contact">
                Start a project
                <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-border/40 px-8 backdrop-blur-sm hover:border-electric/40 hover:bg-electric/5"
            >
              <Link href="/work">See our work</Link>
            </Button>
          </motion.div>
        </div>

        {/* ── Browser mockups with animated gradient border ── */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-20 grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6"
        >
          {featuredWork.map((item) => {
            const hostname = item.liveUrl.replace(/^https?:\/\//, "");
            return (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="group relative block"
              >
                {/* Animated gradient border wrapper */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-500/50 via-electric/50 to-cyan-400/50 opacity-30 blur-[1px] transition-opacity duration-500 group-hover:opacity-80 animate-gradient-shift" />

                {/* Hover glow spread */}
                <div
                  className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse, ${item.color}25, transparent 70%)`,
                  }}
                />

                {/* Glass card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card/80 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:border-white/[0.15] group-hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <div className="size-2.5 rounded-full bg-red-500/70" />
                      <div className="size-2.5 rounded-full bg-yellow-500/70" />
                      <div className="size-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <div className="ml-3 flex-1 rounded-lg bg-white/[0.05] px-3 py-1 text-xs text-muted-foreground">
                      {hostname}
                    </div>
                  </div>

                  {/* 16:9 iframe preview */}
                  <div className="aspect-[16/9] overflow-hidden">
                    <LazyIframe
                      src={item.liveUrl}
                      title={`${item.title} Preview`}
                      className="origin-top-left border-0 pointer-events-none"
                      style={{
                        width: "200%",
                        height: "200%",
                        transform: "scale(0.5)",
                      }}
                      delay={0}
                      placeholderColor={item.color}
                      scrolling="no"
                    />
                  </div>

                  {/* Label bar */}
                  <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.03] px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-electric/10 px-3 py-1 text-xs font-medium text-electric opacity-0 transition-all duration-300 group-hover:opacity-100">
                      View
                      <ExternalLink className="size-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* ── Stats bar — glass card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <div className="flex items-center justify-center gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-5 backdrop-blur-sm sm:gap-12 sm:px-10">
            {[
              { value: "2", label: "Live platforms" },
              { value: "8 yrs", label: "In business" },
              { value: "99.9%", label: "Uptime" },
              { value: "< 1s", label: "Load time" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-bold sm:text-2xl">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
