"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass } from "@/lib/tokens";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="noise relative overflow-hidden py-24 sm:py-32">
      {/* Dark gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[oklch(0.1_0.03_280)] via-[oklch(0.08_0.02_260)] to-[oklch(0.06_0.03_240)]"
      />

      {/* Animated glow orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, oklch(0.65 0.22 250 / 0.15), transparent 70%)" }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.25 290 / 0.1), transparent 70%)" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className={cn(containerClass, "relative z-10")}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to launch your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-electric to-cyan-300 bg-clip-text text-transparent">
              competition platform?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            Let&apos;s talk about your project. Whether you&apos;re starting
            a new raffle business or scaling an existing platform — we&apos;re
            the specialists you need.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-electric px-8 text-white shadow-[0_0_40px_-8px_var(--glow)] hover:bg-electric/90 hover:shadow-[0_0_60px_-5px_var(--glow)]"
            >
              <Link href="/contact">
                Get a Quote
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-white/20 px-8 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/work">View Our Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
