"use client";

import { useState, Suspense, lazy, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { gameModes } from "@/lib/content";
import { Button } from "@/components/ui/button";

/* Lazy-load each demo; many use browser-only APIs (canvas, WebGL, audio). */
const lazyMap = {
  DemoScratchCard:   lazy(() => import("@/components/demos").then(m => ({ default: m.DemoScratchCard }))),
  DemoCoinFlip:      lazy(() => import("@/components/demos").then(m => ({ default: m.DemoCoinFlip }))),
  DemoSpinTheWheel:  lazy(() => import("@/components/demos").then(m => ({ default: m.DemoSpinTheWheel }))),
  DemoTurboDrop:     lazy(() => import("@/components/demos").then(m => ({ default: m.DemoTurboDrop }))),
  DemoFlappyBird:    lazy(() => import("@/components/demos").then(m => ({ default: m.DemoFlappyBird }))),
  DemoSugarRush:     lazy(() => import("@/components/demos").then(m => ({ default: m.DemoSugarRush })),)
} as const;

function LoadingFrame() {
  return (
    <div className="flex size-full items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className="size-4 animate-spin" />
      <span className="text-xs">Loading demo…</span>
    </div>
  );
}

export function DemoContent() {
  const [active, setActive] = useState<string>(gameModes[0].slug);

  // Deep-link support: /demo#scratch-card opens that demo
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && gameModes.some(g => g.slug === hash)) {
      setActive(hash);
    }
  }, []);

  const activeGame = gameModes.find(g => g.slug === active) ?? gameModes[0];
  const ActiveDemo = lazyMap[activeGame.demoComponent as keyof typeof lazyMap];

  return (
    <main className={cn(sectionPadding, "noise relative overflow-hidden")}>
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.65 0.22 250 / 0.1), transparent 50%)",
        }}
      />

      <div className={cn(containerClass, "relative z-10")}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        >
          <span className={cn(tokens.typography.caption, "text-electric")}>
            Play the platform
          </span>
          <h1 className={cn(tokens.typography.h1, "mt-3")}>
            Every{" "}
            <span className="bg-gradient-to-r from-violet-400 via-electric to-cyan-400 bg-clip-text text-transparent">
              instant-win game
            </span>
            . Playable.
          </h1>
          <p className="mt-5 text-muted-foreground sm:text-lg">
            These are the real game modes running on Lucky Turbo. No signup, no checkout —
            just the same UX your players get. Pick one.
          </p>
        </motion.div>

        {/* Game picker tabs */}
        <div className="mx-auto mb-8 flex max-w-5xl flex-wrap justify-center gap-2 sm:mb-12">
          {gameModes.map(g => (
            <button
              key={g.slug}
              onClick={() => {
                setActive(g.slug);
                window.history.replaceState(null, "", `#${g.slug}`);
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active === g.slug
                  ? "border-electric bg-electric/10 text-electric shadow-[0_0_20px_-6px_var(--glow)]"
                  : "border-border/40 bg-white/[0.02] text-muted-foreground hover:border-electric/30 hover:text-foreground"
              )}
            >
              {g.title}
            </button>
          ))}
        </div>

        {/* Active demo frame */}
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-xl"
        >
          <div className="overflow-hidden rounded-2xl border border-border/40 bg-background/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            {/* Browser-chrome bar */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2">
              <div className="flex gap-1">
                <div className="size-2.5 rounded-full bg-red-500/70" />
                <div className="size-2.5 rounded-full bg-yellow-500/70" />
                <div className="size-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="ml-2 flex-1 rounded-md bg-white/[0.05] px-3 py-1 text-xs text-muted-foreground">
                turboit.uk/demo/{activeGame.slug}
              </div>
              <span className="rounded-full bg-electric/15 px-2 py-0.5 text-[10px] font-semibold text-electric">
                LIVE DEMO
              </span>
            </div>

            {/* Demo canvas */}
            <div className="relative aspect-square w-full bg-gradient-to-br from-background via-background to-violet-950/[0.06]">
              <Suspense fallback={<LoadingFrame />}>
                {ActiveDemo ? <ActiveDemo className="size-full" /> : <LoadingFrame />}
              </Suspense>
            </div>

            {/* Bottom info bar */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.03] px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{activeGame.title}</p>
                <p className="text-xs text-muted-foreground">{activeGame.tagline}</p>
              </div>
              <span className={cn(
                "rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                activeGame.difficulty === "easy" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
                activeGame.difficulty === "medium" && "border-amber-500/30 bg-amber-500/10 text-amber-400",
                activeGame.difficulty === "hard" && "border-rose-500/30 bg-rose-500/10 text-rose-400",
              )}>
                {activeGame.difficulty}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl border border-electric/20 bg-gradient-to-br from-electric/5 via-transparent to-violet-500/5 p-8 text-center backdrop-blur-sm sm:mt-20 sm:p-12"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Like what you see?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground sm:text-lg">
            These are the exact game modes running on{" "}
            <Link href="https://luckyturbo.co.uk" className="text-electric hover:underline">
              luckyturbo.co.uk
            </Link>
            . On the Turbo IT licence, they ship to your brand.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 bg-electric px-8 text-white shadow-[0_0_40px_-8px_var(--glow)] hover:bg-electric/90 hover:shadow-[0_0_60px_-5px_var(--glow)]"
            >
              <Link href="/contact">
                Start a project
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-border/40 px-8 hover:border-electric/40 hover:bg-electric/5"
            >
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
