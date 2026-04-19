import type { Metadata } from "next";

import { teamMembers, companyValues, metrics } from "@/lib/content";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { cn } from "@/lib/utils";

import { PageTransition } from "@/components/page-transition";
import { SectionHeader } from "@/components/section-header";
import { MetricsSection } from "@/components/metrics-section";
import { CtaSection } from "@/components/cta-section";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About | Turbo IT",
  description:
    "Meet the team behind Turbo IT. UK specialists in competition, raffle, and prize draw platform development for ambitious operators.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className={cn(sectionPadding, "relative overflow-hidden")}>
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-electric/5 blur-[120px]"
        />

        <div className={cn(containerClass, "relative z-10 text-center")}>
          <span
            className={cn(
              tokens.typography.caption,
              "mb-4 inline-block text-electric"
            )}
          >
            Our Story
          </span>

          <h1 className={cn(tokens.typography.h1, "mx-auto max-w-3xl")}>
            We built the raffle platform <span className="bg-gradient-to-r from-violet-400 via-electric to-cyan-300 bg-clip-text text-transparent">we needed.</span>{" "}
            Then we started licensing it.
          </h1>

          <p
            className={cn(
              tokens.typography.bodyLg,
              "mx-auto mt-6 max-w-2xl text-muted-foreground"
            )}
          >
            Turbo IT is the licensing arm of <strong className="text-foreground">Lucky Turbo Ltd</strong> —
            a UK competition business based in Manchester. We run{" "}
            <a href="https://luckyturbo.co.uk" className="text-electric hover:underline">luckyturbo.co.uk</a>{" "}
            ourselves, on the same platform we license to other operators.
            Every feature on the Turbo IT licence exists because we needed it
            to run our own business. No guessing, no theory — just the stack
            that sells tickets for us, rebranded for you.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Mission Statement                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className={cn(sectionPadding, "bg-muted/40")}>
        <div className={containerClass}>
          <div className="mx-auto max-w-3xl text-center">
            {/* Decorative quote mark */}
            <span
              aria-hidden="true"
              className="mb-4 inline-block text-6xl font-bold leading-none text-electric/20 sm:text-8xl"
            >
              &ldquo;
            </span>

            <blockquote
              className={cn(
                tokens.typography.h3,
                "text-foreground"
              )}
            >
              Every feature we ship hits our own revenue first. If it breaks
              Lucky Turbo on a Monday, it doesn&rsquo;t ship to clients on
              Tuesday. That&rsquo;s the only quality bar we need.
            </blockquote>

            <p
              className={cn(
                tokens.typography.bodySm,
                "mt-6 text-muted-foreground"
              )}
            >
              — Lucky Turbo Ltd, Manchester
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Values                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className={cn(sectionPadding, "bg-muted/40")}>
        <div className={containerClass}>
          <SectionHeader
            badge="Our Values"
            title="What we stand for"
            subtitle="Four principles that guide every decision — from the first call to long after launch."
          />
          <AboutContent
            teamMembers={[]}
            companyValues={companyValues}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Metrics                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className={cn(sectionPadding)}>
        <div className={containerClass}>
          <SectionHeader
            badge="By the Numbers"
            title="Results that speak for themselves"
            subtitle="We let the data do the talking."
          />
          <MetricsSection metrics={metrics} />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <CtaSection />
    </PageTransition>
  );
}
