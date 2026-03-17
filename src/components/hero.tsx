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
    <section className="relative overflow-hidden pb-12 pt-24 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-40">
      {/* Background layers */}
      <GridBackground variant="dots" />
      <GradientOrbs />

      {/* Extra glow behind mockups area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[60%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/8 blur-[150px]"
      />

      <div className={cn(containerClass, "relative z-10")}>
        {/* ── Centered headline block ── */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-sm font-medium text-electric"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-electric opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-electric" />
            </span>
            UK Competition Platform Specialists
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            We build competition{" "}
            <span className="bg-gradient-to-r from-electric via-sky-400 to-cyan-300 bg-clip-text text-transparent">
              platforms that sell.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            Raffle websites, prize draw platforms, and competition sites — built
            to sell tickets, automate draws, and keep players coming back.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-electric text-white hover:bg-electric/90 shadow-[0_0_30px_-5px_var(--glow)]"
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
              className="border-border/60 hover:border-electric/50 hover:bg-electric/5"
            >
              <Link href="/work">See our work</Link>
            </Button>
          </motion.div>
        </div>

        {/* ── Two browser mockups side by side ── */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6"
        >
          {featuredWork.map((item) => {
            const hostname = item.liveUrl.replace(/^https?:\/\//, "");
            return (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="group relative block"
              >
                {/* Hover glow */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}40, ${item.color}10)`,
                  }}
                />

                <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl transition-all duration-300 group-hover:border-electric/40 group-hover:shadow-[0_0_40px_-10px_var(--glow)]">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <div className="size-2.5 rounded-full bg-red-500/80" />
                      <div className="size-2.5 rounded-full bg-yellow-500/80" />
                      <div className="size-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="ml-3 flex-1 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
                      {hostname}
                    </div>
                  </div>

                  {/* 16:9 iframe preview */}
                  <div className="aspect-[16/9] overflow-hidden bg-white">
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
                  <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-2.5">
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-electric opacity-0 transition-opacity group-hover:opacity-100">
                      View
                      <ExternalLink className="size-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mx-auto mt-14 flex max-w-2xl items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { value: "2", label: "Live platforms" },
            { value: "8 yrs", label: "In business" },
            { value: "99.9%", label: "Uptime" },
            { value: "< 1s", label: "Load time" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold sm:text-2xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
