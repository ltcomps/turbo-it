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
        {plan.revShare ? (
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-muted-foreground">Revenue share</span>
            <span className="tabular-nums font-semibold">
              {plan.revShare.percent}%
              <span className="ml-1 font-normal text-muted-foreground">
                of paid GMV
                {plan.revShare.capMonthly && ` · cap £${plan.revShare.capMonthly}/mo`}
              </span>
            </span>
          </div>
        ) : (
          <PriceLine
            label="Per paid order"
            value={plan.perOrder}
            suffix={plan.perOrder && plan.perOrder !== "Custom" ? "/order" : undefined}
          />
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

        {/* Worked examples — two scenarios so both "per-order" and "rev-share" models land */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-7">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-electric/80">
              Operator @ 5,000 orders / month
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              £499 setup (one-off) + £299/mo + (5,000 × £0.09) ={" "}
              <span className="font-semibold text-electric">£749/mo</span>{" "}
              <span className="text-muted-foreground/70">(~£0.15 per order all-in)</span>
            </p>
          </div>
          <div className="rounded-2xl border border-electric/20 bg-electric/[0.03] p-6 backdrop-blur-sm sm:p-7">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-electric/80">
              Scale @ £500k monthly GMV
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              £999 setup + £999/mo + 1% of £500,000 ={" "}
              <span className="font-semibold text-electric">£5,999/mo</span>{" "}
              <span className="text-muted-foreground/70">(cap keeps it at £15k/mo max, even at £2M+ GMV)</span>
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
                      £0 on Launchpad · £499 on Operator · £999 on Scale
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-5">
                      Up to £1,999 on mid-tier plans
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
                      <span className="font-semibold text-electric">£500–£1,650</span>{" "}
                      <span className="text-muted-foreground">(depending on tier)</span>
                    </td>
                    <td className="hidden px-4 py-4 align-top text-muted-foreground sm:table-cell sm:px-5">
                      £1,200–£3,200
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
      </div>
    </section>
  );
}
