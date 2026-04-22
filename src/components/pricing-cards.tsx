"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  Gamepad2,
  Zap,
  MessageSquare,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import {
  pricingPlans,
  pricingAddOns,
  type PricingPlan,
  type PricingAddOn,
} from "@/lib/content";
import { Button } from "@/components/ui/button";

const addOnIconMap: Record<string, LucideIcon> = {
  Gamepad2,
  Zap,
  MessageSquare,
  ShieldCheck,
};

type BillingFrequency = "annual" | "monthly";

const ANNUAL_DISCOUNT = 0.1; // 10% off monthly recurring when billed annually

function annualMonthlyEquivalent(monthly: string): string {
  if (monthly === "Custom") return "Custom";
  const n = parseFloat(monthly.replace(/,/g, ""));
  if (!Number.isFinite(n)) return monthly;
  return Math.round(n * (1 - ANNUAL_DISCOUNT)).toLocaleString("en-GB");
}

function annualTotal(monthly: string): string | null {
  if (monthly === "Custom") return null;
  const n = parseFloat(monthly.replace(/,/g, ""));
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 12 * (1 - ANNUAL_DISCOUNT)).toLocaleString("en-GB");
}

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

function AddOnCard({ addOn, idx }: { addOn: PricingAddOn; idx: number }) {
  const Icon = addOnIconMap[addOn.icon];
  return (
    <motion.div
      custom={idx}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg border border-electric/20 bg-electric/10 text-electric">
          {Icon && <Icon className="size-4" />}
        </div>
        <div>
          <h4 className="text-sm font-semibold leading-tight">{addOn.name}</h4>
          <p className="mt-0.5 text-[11px] uppercase tracking-wider text-electric/70">
            {addOn.tagline}
          </p>
        </div>
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {addOn.description}
      </p>
      <div className="flex items-baseline justify-between border-t border-white/[0.04] pt-3">
        <span className="text-xs uppercase tracking-wider text-muted-foreground/70">
          {addOn.billing}
        </span>
        <span className="text-xl font-bold tracking-tight tabular-nums">
          <span className="text-sm font-normal text-muted-foreground">£</span>
          {addOn.price}
        </span>
      </div>
    </motion.div>
  );
}

function PlanCard({
  plan,
  idx,
  billing,
}: {
  plan: PricingPlan;
  idx: number;
  billing: BillingFrequency;
}) {
  const isAnnual = billing === "annual";
  const displayMonthly = isAnnual ? annualMonthlyEquivalent(plan.monthly) : plan.monthly;
  const yearTotal = isAnnual ? annualTotal(plan.monthly) : null;

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
          label={isAnnual ? "Equivalent monthly" : "Monthly"}
          value={displayMonthly}
          suffix={displayMonthly !== "Custom" ? "/mo" : undefined}
          emphasis="headline"
        />
        {isAnnual && yearTotal && (
          <p className="-mt-0.5 text-[11px] leading-snug text-emerald-300/80">
            Billed as £{yearTotal}/year · save 10% on monthly recurring
          </p>
        )}
        <PriceLine
          label="Per paid order"
          value={plan.perOrder}
          suffix={plan.perOrder && plan.perOrder !== "Custom" ? "/order" : undefined}
        />
        {plan.perOrderNote && (
          <p className="pl-[1px] text-[11px] leading-snug text-electric/80">{plan.perOrderNote}</p>
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

function BillingToggle({
  value,
  onChange,
}: {
  value: BillingFrequency;
  onChange: (v: BillingFrequency) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Billing frequency"
      className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-sm"
    >
      <button
        role="tab"
        aria-selected={value === "annual"}
        onClick={() => onChange("annual")}
        className={cn(
          "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
          value === "annual"
            ? "bg-electric text-white shadow-[0_0_20px_-6px_var(--glow)]"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Annual
        <span
          className={cn(
            "ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            value === "annual"
              ? "bg-white/20 text-white"
              : "bg-emerald-500/15 text-emerald-300",
          )}
        >
          Save 10%
        </span>
      </button>
      <button
        role="tab"
        aria-selected={value === "monthly"}
        onClick={() => onChange("monthly")}
        className={cn(
          "rounded-full px-5 py-2 text-sm font-medium transition-colors",
          value === "monthly"
            ? "bg-electric text-white shadow-[0_0_20px_-6px_var(--glow)]"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Monthly
      </button>
    </div>
  );
}

export function PricingCards() {
  const [billing, setBilling] = useState<BillingFrequency>("annual");

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
          <p className="mt-3 text-xs text-muted-foreground/70">
            All prices exclude VAT. Per-order = paid orders only (refunds excluded).
          </p>
        </motion.div>

        {/* Billing-frequency toggle */}
        <div className="mt-10 flex justify-center">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>

        {/* Cards — 3 across on lg, stack on mobile */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, idx) => (
            <PlanCard key={plan.name} plan={plan} idx={idx} billing={billing} />
          ))}
        </div>

        {/* Head-to-head comparison — Launchpad vs the UK raffle-platform alternatives */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-electric">
              How we compare
            </span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Launchpad vs the alternatives
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              We pulled pricing directly from rafflex.io. No spin, no marketing fluff &mdash; just
              the numbers you&rsquo;d pay for the nearest UK raffle-platform alternatives.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-muted-foreground/80">
                  <tr>
                    <th className="px-4 py-4 sm:px-6">&nbsp;</th>
                    <th className="px-4 py-4 text-electric sm:px-6">Turbo IT Launchpad</th>
                    <th className="px-4 py-4 sm:px-6">RaffleX DIY</th>
                    <th className="hidden px-4 py-4 sm:table-cell sm:px-6">RaffleXpert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr>
                    <td className="px-4 py-4 align-top font-medium sm:px-6">Platform setup fee</td>
                    <td className="px-4 py-4 align-top text-electric sm:px-6">
                      <span className="font-semibold">£0</span>
                      <span className="block text-xs font-normal text-muted-foreground">we build it for you</span>
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground sm:px-6">
                      £0
                      <span className="block text-xs">you build it yourself</span>
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-6">
                      <span className="font-semibold text-foreground">£1,999</span>
                      <span className="block text-xs">they build it</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 align-top font-medium sm:px-6">Monthly</td>
                    <td className="px-4 py-4 align-top sm:px-6">£99</td>
                    <td className="px-4 py-4 align-top text-muted-foreground sm:px-6">
                      £74.17
                      <span className="block text-xs">(£89 inc VAT)</span>
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-6">
                      £74.17
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 align-top font-medium sm:px-6">Per paid order</td>
                    <td className="px-4 py-4 align-top sm:px-6">£0.19</td>
                    <td className="px-4 py-4 align-top text-muted-foreground sm:px-6">£0.17</td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-6">
                      £0.17
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 align-top font-medium sm:px-6">
                      We handle your build
                    </td>
                    <td className="px-4 py-4 align-top text-electric sm:px-6">
                      <Check className="size-5" />
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground/60 sm:px-6">
                      <span className="inline-block">&mdash;</span>
                    </td>
                    <td className="hidden px-4 py-4 align-top text-electric sm:table-cell sm:px-6">
                      <Check className="size-5" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 align-top font-medium sm:px-6">
                      Cashflows KYB + legal T&amp;Cs included
                    </td>
                    <td className="px-4 py-4 align-top text-electric sm:px-6">
                      <Check className="size-5" />
                    </td>
                    <td className="px-4 py-4 align-top text-muted-foreground/60 sm:px-6">
                      <span className="inline-block">&mdash;</span>
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground/60 sm:table-cell sm:px-6">
                      <span className="inline-block">&mdash;</span>
                    </td>
                  </tr>
                  <tr className="bg-electric/[0.04]">
                    <td className="px-4 py-5 align-top font-semibold sm:px-6">
                      2-year cost
                      <span className="block text-xs font-normal text-muted-foreground">at 500 paid orders/month</span>
                    </td>
                    <td className="px-4 py-5 align-top sm:px-6">
                      <span className="font-semibold text-electric">£4,656</span>
                    </td>
                    <td className="px-4 py-5 align-top text-muted-foreground sm:px-6">
                      £3,820
                      <span className="block text-xs">+ your 30+ hrs DIY build time</span>
                    </td>
                    <td className="hidden px-4 py-5 align-top text-muted-foreground sm:table-cell sm:px-6">
                      <span className="font-semibold text-foreground">£5,819</span>
                      <span className="block text-xs text-electric/80">Launchpad saves £1,163</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            <span className="font-semibold text-foreground">RaffleXpert charges £1,999 to build your raffle site. RaffleX DIY makes you build it yourself.</span>{" "}
            Launchpad does the build for you &mdash; <span className="font-semibold text-electric">£0 upfront</span>.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[11px] leading-relaxed text-muted-foreground/60">
            Pricing verified from rafflex.io. All figures ex VAT unless noted. Comparison reflects
            public pricing at time of writing &mdash; we refresh it periodically.
          </p>
        </motion.div>

        {/* Worked examples — three real-world scenarios across tiers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-7">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground/80">
              Launchpad · solo operator
            </p>
            <p className="text-xs text-muted-foreground/70">~400 paid orders / month</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              £0 setup + £99/mo + (400 × £0.19) ={" "}
              <span className="font-semibold text-electric">£175/mo</span>
            </p>
          </div>
          <div className="rounded-2xl border border-electric/25 bg-electric/[0.03] p-6 backdrop-blur-sm sm:p-7">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-electric/80">
              Operator · established brand
            </p>
            <p className="text-xs text-muted-foreground/70">6,000 paid orders / month</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              £1,999 setup (one-off) + £999/mo + (6,000 × £0.12) ={" "}
              <span className="font-semibold text-electric">£1,719/mo</span>{" "}
              <span className="text-muted-foreground/70">(~£0.29 per order all-in)</span>
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-7">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground/80">
              Operator · growing (breakpoint)
            </p>
            <p className="text-xs text-muted-foreground/70">15,000 paid orders / month</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              £999/mo + (10k × £0.12) + (5k × £0.07) ={" "}
              <span className="font-semibold text-electric">£2,549/mo</span>
            </p>
          </div>
        </motion.div>

        {/* Startup-costs transparency section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-electric">
                Startup costs, unvarnished
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              What you&rsquo;ll actually spend to launch
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Raffle platforms love hiding the third-party fees. Here&rsquo;s every cost we know
              about — ours, the payment processor&rsquo;s (paid direct to them, not through us),
              and the legal one you&rsquo;d pay anyone.
            </p>
            <p className="mt-2 text-xs font-medium text-electric/90">
              We never touch your payment-processor money. Funds settle from Cashflows straight
              into your bank — we don&rsquo;t bill you for their fees, and we don&rsquo;t mark them up.
            </p>

            <div className="mt-8 overflow-hidden rounded-xl border border-white/[0.06]">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-muted-foreground/80">
                  <tr>
                    <th className="px-4 py-3 sm:px-5">Cost</th>
                    <th className="px-4 py-3 sm:px-5">Turbo IT</th>
                    <th className="hidden px-4 py-3 sm:table-cell sm:px-5">Template platforms (typical)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr>
                    <td className="px-4 py-4 align-top sm:px-5">
                      <p className="font-semibold">Platform setup</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">One-off to our team</p>
                    </td>
                    <td className="px-4 py-4 align-top sm:px-5">
                      £0 on Launchpad · £1,999 on Operator (full custom design + migration)
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-5">
                      Up to £1,999 on mid-tier plans — template only, no migration
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 align-top sm:px-5">
                      <p className="font-semibold">Cashflows KYB check</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Paid by you to Cashflows &mdash; not to us
                      </p>
                    </td>
                    <td className="px-4 py-4 align-top sm:px-5">
                      <span className="text-foreground">~£500 one-off</span>{" "}
                      <span className="text-muted-foreground">(industry standard · we handle the liaison free of charge)</span>
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-5">
                      ~£500 one-off &mdash; you organise it yourself
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 align-top sm:px-5">
                      <p className="font-semibold">Cashflows transaction fees</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Ongoing &mdash; settled direct from your merchant account
                      </p>
                    </td>
                    <td className="px-4 py-4 align-top sm:px-5">
                      <span className="text-foreground">Typically ~1.4%&ndash;2.5% + 20p per transaction</span>{" "}
                      <span className="text-muted-foreground">
                        &mdash; paid directly to Cashflows on your own merchant contract. We never
                        mark these up and we never see this money.
                      </span>
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-5">
                      Same rates &mdash; but some platforms route funds through themselves and add a
                      hidden spread
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 align-top sm:px-5">
                      <p className="font-semibold">Legal T&amp;Cs</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        UK competition-law compliant
                      </p>
                    </td>
                    <td className="px-4 py-4 align-top sm:px-5">
                      <span className="font-semibold text-electric">£0</span>{" "}
                      <span className="text-muted-foreground">
                        — battle-tested T&amp;Cs from luckyturbo.co.uk included. Optional solicitor
                        review for edge cases ~£150.
                      </span>
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-5">
                      £700+ VAT from specialist solicitor
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 align-top sm:px-5">
                      <p className="font-semibold">Domain + SSL + hosting</p>
                    </td>
                    <td className="px-4 py-4 align-top sm:px-5">
                      <span className="font-semibold text-electric">£0</span>{" "}
                      <span className="text-muted-foreground">— included on every tier (edge-hosted on Cloudflare)</span>
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-5">
                      Usually bundled
                    </td>
                  </tr>
                  <tr className="bg-electric/[0.05]">
                    <td className="px-4 py-4 align-top sm:px-5 font-semibold">Total to go live</td>
                    <td className="px-4 py-4 align-top sm:px-5">
                      <span className="font-semibold text-electric">£500 (Launchpad) &ndash; £2,649 (Operator)</span>{" "}
                      <span className="text-muted-foreground">&mdash; Operator includes full custom build + migration</span>
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-5">
                      £1,200&ndash;£3,200 &mdash; template-only, no migration
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground/70">
              Our T&amp;Cs template reflects current UK competition law and is derived from the
              documents we operate Lucky Turbo under every day. We strongly recommend an independent
              solicitor review your final public-facing T&amp;Cs for your specific prize structure —
              that&rsquo;s typically ~£150 for a review (much cheaper than drafting from scratch).
            </p>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* Optional add-ons                                                    */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-24 max-w-6xl"
        >
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-electric">
              Optional add-ons
            </span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Stack what your business needs
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Everything on the main tiers is a complete running platform. These add-ons exist for
              the moments when you want a bit more — a custom game mechanic, a founder&rsquo;s phone
              number, or a cohort of SMS credits sitting ready for your next campaign.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pricingAddOns.map((addOn, i) => (
              <AddOnCard key={addOn.name} addOn={addOn} idx={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
