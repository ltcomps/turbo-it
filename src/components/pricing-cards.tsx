"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { pricingPlans, type PricingPlan } from "@/lib/content";
import { Button } from "@/components/ui/button";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function PriceLine({
  label,
  value,
  prefix = "£",
  suffix,
  emphasis = "normal",
}: {
  label: string;
  value: string | null;
  prefix?: string;
  suffix?: string;
  emphasis?: "normal" | "headline";
}) {
  const isCustom = value === "Custom";
  const isEmpty = !value;

  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "tabular-nums font-semibold",
          emphasis === "headline" && "text-2xl sm:text-3xl",
          isEmpty && "text-muted-foreground/60",
        )}
      >
        {isEmpty ? (
          "\u2014"
        ) : isCustom ? (
          "Custom"
        ) : (
          <>
            <span
              className={cn(
                emphasis === "headline" ? "text-base text-muted-foreground" : "",
              )}
            >
              {prefix}
            </span>
            {value}
            {suffix && (
              <span
                className={cn(
                  "ml-0.5 font-normal",
                  emphasis === "headline" ? "text-base text-muted-foreground" : "text-muted-foreground",
                )}
              >
                {suffix}
              </span>
            )}
          </>
        )}
      </span>
    </div>
  );
}

function PlanCard({ plan, idx }: { plan: PricingPlan; idx: number }) {
  return (
    <motion.div
      key={plan.name}
      custom={idx}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={cardVariants}
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card/60 p-6 backdrop-blur-sm sm:p-7",
        plan.highlighted &&
          "border-electric shadow-[0_0_50px_-10px_var(--glow)] lg:-mt-4 lg:mb-[-1rem] lg:py-10",
      )}
    >
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-electric px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_20px_-4px_var(--glow)]">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan name + tagline */}
      <div>
        <h3 className={cn(tokens.typography.h4)}>{plan.name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-electric/80">
          {plan.tagline}
        </p>
      </div>

      {/* Price block */}
      <div className="mt-5 space-y-2 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
        <PriceLine
          label="Monthly"
          value={plan.monthly}
          suffix={plan.monthly !== "Custom" ? "/mo" : undefined}
          emphasis="headline"
        />
        <PriceLine
          label="Per paid order"
          value={plan.perOrder}
          suffix={plan.perOrder && plan.perOrder !== "Custom" ? "/order" : undefined}
        />
        <PriceLine
          label="One-off setup"
          value={plan.setup}
          suffix={plan.setup && plan.setup !== "Custom" ? "" : undefined}
        />
      </div>

      {/* Description */}
      <p className={cn(tokens.typography.bodySm, "mt-5 text-muted-foreground")}>
        {plan.description}
      </p>

      {/* Divider */}
      <div className="my-5 h-px bg-border/60" />

      {/* Features */}
      <ul className="flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-snug">
            <Check
              className={cn(
                "mt-0.5 size-4 shrink-0",
                plan.highlighted ? "text-electric" : "text-muted-foreground",
              )}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-7">
        <Button
          asChild
          size="lg"
          className={cn(
            "w-full",
            plan.highlighted ? "bg-electric text-white hover:bg-electric/90" : "",
          )}
          variant={plan.highlighted ? "default" : "outline"}
        >
          <Link href="/contact">{plan.cta}</Link>
        </Button>
      </div>
    </motion.div>
  );
}

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
          <span className={cn(tokens.typography.caption, "text-electric")}>Pricing</span>
          <h2 className={cn(tokens.typography.h2, "mt-4")}>
            Pay for what you sell, not what you fear
          </h2>
          <p className={cn(tokens.typography.bodyLg, "mt-4 text-muted-foreground")}>
            Low monthly base, small per-order fee, no hidden percentages. As you grow, the per-order
            rate drops.
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">All prices exclude VAT. Per-order = paid orders only (refunds excluded).</p>
        </motion.div>

        {/* Cards — 4 across on xl, 2x2 on md, 1 on mobile */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan, idx) => (
            <PlanCard key={plan.name} plan={plan} idx={idx} />
          ))}
        </div>

        {/* Tiny example calculator strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-14 max-w-3xl rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-electric/80">
            What it looks like in real numbers
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Operator tier, 5,000 paid orders / month:</span>{" "}
            £499 setup (one-off) + £299/mo + (5,000 × £0.09) = <span className="font-semibold text-electric">£749/mo</span>.
            That&rsquo;s ~£0.15 per order all-in — and we run the whole platform, payments, draws, SMS,
            and pixels for you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
