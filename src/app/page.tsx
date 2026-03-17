"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  CreditCard,
  Timer,
  ShieldCheck,
  Target,
  Server,
  type LucideIcon,
} from "lucide-react";

import { Hero } from "@/components/hero";
import { PageTransition } from "@/components/page-transition";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { testimonials, processSteps } from "@/lib/content";
import { containerClass } from "@/lib/tokens";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Service cards data                                                         */
/* -------------------------------------------------------------------------- */

const iconMap: Record<string, LucideIcon> = {
  Trophy, CreditCard, Timer, ShieldCheck, Target, Server,
};

const serviceCards = [
  {
    icon: "Trophy",
    title: "Platform Development",
    description: "Custom-built competition websites designed to sell tickets and create excitement.",
    href: "/services#platform-dev",
    gradient: "from-violet-500/20 to-electric/20",
    iconColor: "#8B5CF6",
  },
  {
    icon: "CreditCard",
    title: "Payment & Ticketing",
    description: "Secure checkout with cart functionality, multiple payment methods, and instant confirmation.",
    href: "/services#payments",
    gradient: "from-electric/20 to-cyan-500/20",
    iconColor: "#00B0F0",
  },
  {
    icon: "Timer",
    title: "Draw & Prize Systems",
    description: "Automated, transparent draws with instant wins, countdowns, and winner announcements.",
    href: "/services#draws",
    gradient: "from-cyan-500/20 to-teal-500/20",
    iconColor: "#06B6D4",
  },
  {
    icon: "ShieldCheck",
    title: "Compliance",
    description: "UK competition law compliant from day one. Age verification, T&Cs, responsible gambling.",
    href: "/services#compliance",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "#10B981",
  },
  {
    icon: "Target",
    title: "Marketing & Growth",
    description: "Player acquisition with SEO, paid ads, social media, and retention campaigns.",
    href: "/services#marketing",
    gradient: "from-purple-500/20 to-violet-500/20",
    iconColor: "#A855F7",
  },
  {
    icon: "Server",
    title: "Hosting & Infrastructure",
    description: "99.9% uptime on edge infrastructure. Built to handle traffic spikes on launch day.",
    href: "/services#hosting",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "#F59E0B",
  },
];

/* -------------------------------------------------------------------------- */
/* Animation variants                                                         */
/* -------------------------------------------------------------------------- */

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const testimonial = testimonials[0];

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <Hero />

      {/* ── Services Grid ── */}
      <section className="noise relative overflow-hidden border-t border-white/[0.04]">
        {/* Subtle gradient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-violet-950/[0.03] to-background dark:via-violet-950/[0.08]"
        />

        <div className={cn(containerClass, "relative z-10 py-24 sm:py-32")}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-medium tracking-wider text-electric uppercase">
              What We Build
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Everything you need to run a{" "}
              <span className="bg-gradient-to-r from-violet-400 via-electric to-cyan-400 bg-clip-text text-transparent">
                competition business
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {serviceCards.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div key={service.title} variants={fadeUp}>
                  <Link
                    href={service.href}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-[0_0_40px_-10px_var(--glow)]"
                  >
                    {/* Gradient reveal on hover */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        service.gradient
                      )}
                    />

                    <div className="relative">
                      {/* Icon with glow */}
                      <div className="relative mb-5">
                        <div
                          className="absolute -inset-2 rounded-xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60"
                          style={{ backgroundColor: service.iconColor }}
                        />
                        <div
                          className="relative flex size-12 items-center justify-center rounded-xl border border-white/[0.08]"
                          style={{ backgroundColor: `${service.iconColor}15` }}
                        >
                          {Icon && (
                            <Icon
                              className="size-5"
                              style={{ color: service.iconColor }}
                            />
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-semibold">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-electric opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Learn more
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── How We Work — Process ── */}
      <section className="noise relative overflow-hidden">
        <div className={cn(containerClass, "relative z-10 py-24 sm:py-32")}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-medium tracking-wider text-electric uppercase">
              How It Works
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              From idea to live platform{" "}
              <span className="text-muted-foreground">in weeks</span>
            </h2>
          </motion.div>

          <div className="relative mx-auto max-w-4xl">
            {/* Glowing connecting line */}
            <div className="absolute left-6 top-0 hidden h-full w-px sm:block">
              <div className="h-full w-full bg-gradient-to-b from-electric/60 via-violet-500/40 to-transparent" />
              <div className="absolute inset-0 w-full bg-gradient-to-b from-electric/30 via-violet-500/20 to-transparent blur-sm" />
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4 sm:space-y-6"
            >
              {processSteps.map((step) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="group flex gap-5 sm:gap-8"
                >
                  {/* Step number — glass style */}
                  <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl border border-electric/20 bg-electric/10 text-lg font-bold text-electric backdrop-blur-sm transition-all duration-300 group-hover:border-electric/50 group-hover:bg-electric group-hover:text-white group-hover:shadow-[0_0_25px_-5px_var(--glow)]">
                    {step.step}
                  </div>

                  {/* Content — glass card */}
                  <div className="flex-1 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 group-hover:border-white/[0.08] group-hover:bg-white/[0.04] sm:p-5">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonial — glass card ── */}
      <section className="noise relative overflow-hidden border-y border-white/[0.04]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-950/[0.04] via-transparent to-electric/[0.04] dark:from-violet-950/[0.08] dark:to-electric/[0.06]"
        />

        <div className={cn(containerClass, "relative z-10 py-20 sm:py-28")}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center backdrop-blur-sm sm:p-12">
              {/* Stars */}
              <div className="mb-6 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="size-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-lg font-medium leading-relaxed sm:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaSection />
    </PageTransition>
  );
}
