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
/* Service cards data (homepage preview)                                      */
/* -------------------------------------------------------------------------- */

const iconMap: Record<string, LucideIcon> = {
  Trophy,
  CreditCard,
  Timer,
  ShieldCheck,
  Target,
  Server,
};

const serviceCards = [
  {
    icon: "Trophy",
    title: "Platform Development",
    description: "Custom-built competition websites designed to sell tickets and create excitement.",
    href: "/services#platform-dev",
    color: "#00B0F0",
  },
  {
    icon: "CreditCard",
    title: "Payment & Ticketing",
    description: "Secure checkout with cart functionality, multiple payment methods, and instant confirmation.",
    href: "/services#payments",
    color: "#38BDF8",
  },
  {
    icon: "Timer",
    title: "Draw & Prize Systems",
    description: "Automated, transparent draws with instant wins, countdowns, and winner announcements.",
    href: "/services#draws",
    color: "#06B6D4",
  },
  {
    icon: "ShieldCheck",
    title: "Compliance",
    description: "UK competition law compliant from day one. Age verification, T&Cs, responsible gambling.",
    href: "/services#compliance",
    color: "#10B981",
  },
  {
    icon: "Target",
    title: "Marketing & Growth",
    description: "Player acquisition with SEO, paid ads, social media, and retention campaigns.",
    href: "/services#marketing",
    color: "#8B5CF6",
  },
  {
    icon: "Server",
    title: "Hosting & Infrastructure",
    description: "99.9% uptime on edge infrastructure. Built to handle traffic spikes on launch day.",
    href: "/services#hosting",
    color: "#F59E0B",
  },
];

/* -------------------------------------------------------------------------- */
/* Animation variants                                                         */
/* -------------------------------------------------------------------------- */

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
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
      <section className="border-t bg-muted/20">
        <div className={cn(containerClass, "py-20 sm:py-28")}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
          >
            <span className="mb-3 inline-block text-sm font-medium text-electric">
              What We Build
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Everything you need to run a{" "}
              <span className="bg-gradient-to-r from-electric to-cyan-400 bg-clip-text text-transparent">
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
                    className="group relative block h-full overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-electric/40 hover:shadow-[0_0_30px_-10px_var(--glow)]"
                  >
                    {/* Subtle gradient on hover */}
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(ellipse at top left, ${service.color}08, transparent 70%)`,
                      }}
                    />

                    <div className="relative">
                      <div
                        className="mb-4 flex size-11 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${service.color}15` }}
                      >
                        {Icon && (
                          <Icon
                            className="size-5"
                            style={{ color: service.color }}
                          />
                        )}
                      </div>

                      <h3 className="text-base font-semibold">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-electric opacity-0 transition-opacity group-hover:opacity-100">
                        Learn more
                        <ArrowRight className="size-3" />
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
      <section>
        <div className={cn(containerClass, "py-20 sm:py-28")}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
          >
            <span className="mb-3 inline-block text-sm font-medium text-electric">
              How It Works
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              From idea to live platform{" "}
              <span className="text-muted-foreground">in weeks</span>
            </h2>
          </motion.div>

          <div className="relative mx-auto max-w-4xl">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-electric/50 via-electric/20 to-transparent sm:block" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-6 sm:space-y-8"
            >
              {processSteps.map((step) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="group flex gap-5 sm:gap-8"
                >
                  {/* Step number */}
                  <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl border border-electric/30 bg-electric/10 text-lg font-bold text-electric transition-colors group-hover:bg-electric group-hover:text-white">
                    {step.step}
                  </div>

                  <div className="pb-2">
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

      {/* ── Testimonial ── */}
      <section className="border-y bg-muted/30">
        <div className={cn(containerClass, "py-16 sm:py-24")}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="size-5 text-yellow-500"
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
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaSection />
    </PageTransition>
  );
}
