"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { containerClass } from "@/lib/tokens";
import { featuredWork } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/grid-background";
import { GradientOrbs } from "@/components/gradient-orbs";

const ROTATE_INTERVAL = 5000;
const CARD_COUNT = featuredWork.length;

// Circular carousel positions: front center, back-right, back-left
function getCardStyle(offset: number) {
  if (offset === 0) {
    // Front and center
    return { x: "0%", rotateY: 0, z: 0, scale: 1, opacity: 1, zIndex: 30 };
  }
  if (offset === 1) {
    // Behind, fanned to the right
    return { x: "30%", rotateY: -35, z: -120, scale: 0.85, opacity: 0.6, zIndex: 20 };
  }
  // Behind, fanned to the left
  return { x: "-30%", rotateY: 35, z: -120, scale: 0.85, opacity: 0.6, zIndex: 10 };
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % CARD_COUNT);
  }, []);

  // Auto-rotate timer
  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = setInterval(goToNext, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, reducedMotion, goToNext]);

  const fadeUp = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background layers */}
      <GridBackground variant="dots" />
      <GradientOrbs />

      <div className={cn(containerClass, "relative z-10 pt-20 sm:pt-32 lg:pt-40")}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left column - main content */}
          <div className="lg:col-span-7">
            {/* Small intro line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium text-muted-foreground"
            >
              Manchester-based · Worldwide reach
            </motion.p>

            {/* Main headline */}
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              We make websites
              <br />
              <span className="text-muted-foreground">that actually work.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg text-muted-foreground"
            >
              No fluff. No jargon. Just fast, good-looking sites that bring in customers.
              We&apos;ve been doing this for 8 years.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="group bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
              >
                <Link href="/contact">
                  Start a project
                  <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Link href="/work" className="flex items-center gap-2">
                  <span className="relative flex size-8 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-electric">
                    <Play className="size-3 fill-current" />
                  </span>
                  See our work
                </Link>
              </Button>
            </motion.div>

            {/* Quick proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 flex items-center gap-6 sm:gap-8 border-t border-border pt-8"
            >
              {[
                { value: "50+", label: "Projects shipped" },
                { value: "8 yrs", label: "In business" },
                { value: "4.9★", label: "Client rating" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
                  {i > 0 && <div className="h-8 w-px bg-border" />}
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - 3D circular carousel */}
          <motion.div
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:col-span-5 lg:block"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Glow effect behind carousel */}
            <div className="absolute -inset-4 rounded-2xl bg-electric/10 blur-2xl" />

            {/* 3D perspective container */}
            <div
              className="relative mx-auto"
              style={{ perspective: "1200px", height: "420px", width: "100%" }}
            >
              {featuredWork.map((item, i) => {
                const offset = (i - activeIndex + CARD_COUNT) % CARD_COUNT;
                const pos = getCardStyle(offset);
                const hostname = item.liveUrl.replace(/^https?:\/\//, "");

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
                      width: "88%",
                      height: "100%",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-2xl">
                      {/* Browser bar */}
                      <div className="flex shrink-0 items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
                        <div className="flex gap-1.5">
                          <div className="size-2.5 rounded-full bg-red-500/80" />
                          <div className="size-2.5 rounded-full bg-yellow-500/80" />
                          <div className="size-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="ml-3 flex-1 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
                          {hostname}
                        </div>
                      </div>

                      {/* Website preview */}
                      <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
                        <iframe
                          src={item.liveUrl}
                          title={`${item.title} Preview`}
                          className="w-[200%] origin-top-left scale-50 border-0 pointer-events-none"
                          style={{ height: item.slug === "lucky-turbo" ? "250%" : "200%" }}
                          loading="lazy"
                          scrolling="no"
                        />
                      </div>

                      {/* Project label */}
                      <div className="shrink-0 border-t bg-muted/30 px-4 py-2">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
