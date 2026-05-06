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
  value: string | null | undefined;
  prefix?: string;
  suffix?: string;
  emphasis?: "normal" | "headline";
}) {
  const isCustom = value === "Custom";
  const isEmpty = value === null || value === undefined || value === "";

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
          "—"
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
                  emphasis === "headline"
                    ? "text-base text-muted-foreground"
                    : "text-muted-foreground",
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
            Recommended
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
          label={plan.monthlyNote ? `Monthly ${plan.monthlyNote}` : "Monthly"}
          value={plan.monthly}
          suffix={plan.monthly !== "Custom" ? "/mo" : undefined}
          emphasis="headline"
        />

        {plan.revShare ? (
          <PriceLine
            label="Revenue share"
            value={plan.revShare}
            prefix=""
            suffix="of paid revenue"
          />
        ) : plan.perOrder ? (
          <PriceLine
            label="Per paid order"
            value={plan.perOrder}
            suffix="/order"
          />
        ) : null}

        {plan.rateNote && (
          <p className="pl-[1px] text-[11px] leading-snug text-electric/80">
            {plan.rateNote}
          </p>
        )}

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
          <span className={cn(tokens.typography.caption, "text-electric")}>
            Pricing
          </span>
          <h2 className={cn(tokens.typography.h2, "mt-4")}>
            A platform and a growth partner
          </h2>
          <p className={cn(tokens.typography.bodyLg, "mt-4 text-muted-foreground")}>
            Three ways to run on Turbo IT — from a templated launch in days to a
            fully bespoke build. Pick the level of partnership that matches your
            ambition.
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            All prices exclude VAT.
          </p>
        </motion.div>

        {/* Cards — 3 tiers: 1 on mobile, stacked on tablet, 3 on desktop */}
        <div className="mt-12 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {pricingPlans.map((plan, idx) => (
            <PlanCard key={plan.name} plan={plan} idx={idx} />
          ))}
        </div>

        {/* Worked examples — one per tier */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-electric">
              Worked examples
            </span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              What you&rsquo;d actually pay
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-7">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground/80">
                Launch · solo operator
              </p>
              <p className="text-xs text-muted-foreground/70">
                ~400 paid orders / month
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                £99/mo + (400 × £0.19) ={" "}
                <span className="font-semibold text-electric">£175/mo</span>
              </p>
            </div>

            <div className="rounded-2xl border border-electric/25 bg-electric/[0.03] p-6 backdrop-blur-sm sm:p-7">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-electric/80">
                Growth Partner · launching
              </p>
              <p className="text-xs text-muted-foreground/70">
                £15,000 / month revenue
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                £1,000 setup (one-off) + 10% × £15k ={" "}
                <span className="font-semibold text-electric">£1,500/mo</span>
              </p>
            </div>

            <div className="rounded-2xl border border-electric/25 bg-electric/[0.03] p-6 backdrop-blur-sm sm:p-7">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-electric/80">
                Growth Partner · scaling
              </p>
              <p className="text-xs text-muted-foreground/70">
                £50,000 / month revenue (past breakpoint)
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                10% × £25k + 5% × £25k ={" "}
                <span className="font-semibold text-electric">£3,750/mo</span>{" "}
                <span className="text-muted-foreground/70">
                  (effective 7.5%)
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* What's included / what's separate — short trust callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="grid gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-10 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Included on every tier
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                  <span>Hosting, SSL, CDN — all on the house</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                  <span>
                    Battle-tested UK competition T&amp;Cs template (saves £700+ in
                    legal drafting)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                  <span>Cashflows liaison — we set up your gateway free</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                  <span>
                    Continuous platform upgrades — every improvement we ship to
                    Lucky Turbo, you get
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Paid direct, never to us
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 size-4 shrink-0 text-muted-foreground/60">
                    &mdash;
                  </span>
                  <span>
                    Cashflows KYB onboarding (~£500 one-off) and ongoing
                    transaction fees (~1.4%–2.5% + 20p) settle directly between
                    you and Cashflows
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 size-4 shrink-0 text-muted-foreground/60">
                    &mdash;
                  </span>
                  <span>
                    We never route your payment-processor money through Turbo IT
                    and we never mark up Cashflows&rsquo; rates
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 size-4 shrink-0 text-muted-foreground/60">
                    &mdash;
                  </span>
                  <span>
                    Optional independent solicitor review of your final T&amp;Cs
                    (~£150 if you want it)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
