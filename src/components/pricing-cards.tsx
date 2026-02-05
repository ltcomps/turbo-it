"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { pricingPlans } from "@/lib/content";
import { Button } from "@/components/ui/button";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 * i,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function PricingCards() {
  return (
    <section className={cn(sectionPadding)}>
      <div className={cn(containerClass)}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className={cn(tokens.typography.caption, "text-electric")}>
            Pricing
          </span>
          <h2 className={cn(tokens.typography.h2, "mt-4")}>
            Transparent pricing, no surprises
          </h2>
          <p
            className={cn(
              tokens.typography.bodyLg,
              "mt-4 text-muted-foreground"
            )}
          >
            Choose the plan that fits your ambition. All prices exclude VAT.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-8",
                plan.highlighted &&
                  "border-electric shadow-[0_0_40px_-10px_var(--glow)] md:-mt-4 md:mb-[-1rem] md:py-12"
              )}
            >
              {/* Highlighted badge */}
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-electric px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className={cn(tokens.typography.h4)}>{plan.name}</h3>

              {/* Price */}
              <div className="mt-4">
                {plan.price !== "Custom" && (
                  <span className="text-sm text-muted-foreground">from </span>
                )}
                <div className="flex items-baseline gap-1">
                  {plan.price !== "Custom" && (
                    <span className="text-lg text-muted-foreground">&pound;</span>
                  )}
                  <span className={cn(tokens.typography.h1)}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p
                className={cn(
                  tokens.typography.bodySm,
                  "mt-3 text-muted-foreground"
                )}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Features */}
              <ul className="flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        plan.highlighted
                          ? "text-electric"
                          : "text-muted-foreground"
                      )}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "w-full",
                    plan.highlighted
                      ? "bg-electric text-white hover:bg-electric/90"
                      : ""
                  )}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  <Link href="/contact">{plan.cta}</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
