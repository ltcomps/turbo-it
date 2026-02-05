"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass } from "@/lib/tokens";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Dark gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[oklch(0.12_0.02_260)] via-[oklch(0.1_0.015_260)] to-[oklch(0.08_0.02_260)]"
      />

      {/* Glow accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -right-24 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-electric/10 blur-[120px]"
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
          className="absolute -left-24 bottom-0 h-[300px] w-[300px] rounded-full bg-electric/8 blur-[100px]"
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

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="grid-overlay pointer-events-none absolute inset-0 opacity-10"
      />

      {/* Content */}
      <div className={cn(containerClass, "relative z-10")}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            className={cn(
              tokens.typography.h1,
              "text-white"
            )}
          >
            Ready to accelerate your digital growth?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Let&apos;s talk about your project. Whether you need a new website,
            an e-commerce platform, or reliable IT support — we&apos;re here to
            help.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-electric text-white hover:bg-electric/90"
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
              className="border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/work">View Our Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
