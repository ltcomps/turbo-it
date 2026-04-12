"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { containerClass } from "@/lib/tokens";
import { featuredWork } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/grid-background";
import { GradientOrbs } from "@/components/gradient-orbs";

const ROTATE_INTERVAL = 5000;
const CARD_COUNT = featuredWork.length;

function getCardStyle(offset: number, total: number) {
  if (offset === 0) {
    return { x: "0%", rotateY: 0, z: 0, scale: 1, opacity: 1, zIndex: 30 };
  }
  const half = total / 2;
  if (offset <= Math.floor(half)) {
    const factor = Math.min(offset, 2);
    return { x: `${30 * factor}%`, rotateY: -30, z: -120 * factor, scale: 0.88, opacity: 0.5, zIndex: 20 - offset };
  }
  const fromEnd = total - offset;
  const factor = Math.min(fromEnd, 2);
  return { x: `-${30 * factor}%`, rotateY: 30, z: -120 * factor, scale: 0.88, opacity: 0.5, zIndex: 20 - fromEnd };
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % CARD_COUNT);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = setInterval(goToNext, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, reducedMotion, goToNext]);

  const fadeUp = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="noise relative overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-32 lg:pb-32 lg:pt-40">
      <GridBackground variant="dots" />
      <GradientOrbs />

      <div className={cn(containerClass, "relative z-10")}>
        {/* ── Centered headline ── */}
        <div className="mx-auto max-w-6xl text-center">
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

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="block">
              Custom-built{" "}
              <span className="bg-gradient-to-r from-violet-400 via-electric to-cyan-300 bg-clip-text text-transparent">
                competition
              </span>
            </span>
            <span className="block">
              <span className="bg-gradient-to-r from-electric to-cyan-300 bg-clip-text text-transparent">
                platforms
              </span>{" "}
              <span className="text-muted-foreground">that outperform templates.</span>
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg sm:leading-relaxed"
          >
            Not another DIY template. We design and build bespoke raffle platforms
            with edge-hosted performance, custom game modes, and marketing tools
            that template platforms simply can&apos;t offer.
          </motion.p>

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

        {/* ── 3D Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-20 max-w-5xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 3D perspective container */}
          <div
            className="relative mx-auto h-[280px] sm:h-[340px] lg:h-[420px]"
            style={{ perspective: "1200px", width: "100%" }}
          >
            {featuredWork.map((item, i) => {
              const offset = (i - activeIndex + CARD_COUNT) % CARD_COUNT;
              const pos = getCardStyle(offset, CARD_COUNT);
              const hostname = item.liveUrl.replace(/^https?:\/\//, "");
              const isActive = offset === 0;

              return (
                <motion.div
                  key={item.slug}
                  animate={{
                    x: pos.x,
                    rotateY: pos.rotateY,
                    z: pos.z,
                    scale: pos.scale,
                    opacity: pos.opacity,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.7,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute inset-x-0 top-0 mx-auto"
                  style={{
                    zIndex: pos.zIndex,
                    width: "85%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Link
                    href={`/work/${item.slug}`}
                    className="group block h-full"
                    tabIndex={isActive ? 0 : -1}
                  >
                    {/* Animated gradient border */}
                    {isActive && (
                      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-500/50 via-electric/50 to-cyan-400/50 opacity-50 blur-[1px] animate-gradient-shift" />
                    )}

                    {/* Glow */}
                    {isActive && (
                      <div
                        className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
                        style={{
                          background: `radial-gradient(ellipse, ${item.color}30, transparent 70%)`,
                        }}
                      />
                    )}

                    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card/80 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:border-white/[0.15]">
                      {/* Browser bar */}
                      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 py-1.5 sm:px-4 sm:py-2.5">
                        <div className="flex gap-1">
                          <div className="size-2 rounded-full bg-red-500/70 sm:size-2.5" />
                          <div className="size-2 rounded-full bg-yellow-500/70 sm:size-2.5" />
                          <div className="size-2 rounded-full bg-green-500/70 sm:size-2.5" />
                        </div>
                        <div className="ml-2 flex-1 rounded-lg bg-white/[0.05] px-2 py-0.5 text-[10px] text-muted-foreground sm:ml-3 sm:px-3 sm:py-1 sm:text-xs">
                          {hostname}
                        </div>
                      </div>

                      {/* Screenshot preview */}
                      <div className="relative min-h-0 flex-1 overflow-hidden">
                        <img
                          src={`/screenshots/${item.slug === "lucky-turbo" ? "luckyturbo" : "mrxca"}-hero.webp`}
                          alt={`${item.title} Preview`}
                          className="h-full w-full object-cover object-top"
                          loading={isActive ? "eager" : "lazy"}
                        />
                      </div>

                      {/* Label bar */}
                      <div className="flex shrink-0 items-center justify-between border-t border-white/[0.06] bg-white/[0.03] px-3 py-1.5 sm:px-4 sm:py-2.5">
                        <div>
                          <p className="text-xs font-semibold sm:text-sm">{item.title}</p>
                          <p className="text-[10px] text-muted-foreground sm:text-xs">{item.category}</p>
                        </div>
                        {isActive && (
                          <span className="hidden items-center gap-1 rounded-full bg-electric/10 px-2.5 py-1 text-[10px] font-medium text-electric sm:flex sm:text-xs">
                            View
                            <ExternalLink className="size-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {featuredWork.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "w-8 bg-electric shadow-[0_0_10px_var(--glow)]"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to ${featuredWork[i].title}`}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mx-auto mt-14 max-w-2xl"
        >
          <div className="flex items-center justify-center gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-5 backdrop-blur-sm sm:gap-12 sm:px-10">
            {[
              { value: "2", label: "Live platforms" },
              { value: "< 1s", label: "Edge TTFB" },
              { value: "99.9%", label: "Uptime" },
              { value: "White", label: "Label ready" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-bold sm:text-2xl">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
