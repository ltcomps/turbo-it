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
    "Meet the team behind Turbo IT. A Manchester-based digital agency building premium websites, web apps, and IT solutions for ambitious businesses worldwide.",
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
            About Turbo IT
          </h1>

          <p
            className={cn(
              tokens.typography.bodyLg,
              "mx-auto mt-6 max-w-2xl text-muted-foreground"
            )}
          >
            Founded in Manchester by a team of engineers and designers who believed
            digital agencies could do better. Less bloat, more craft. Fewer
            clients, deeper partnerships. That conviction drives every project
            we take on.
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
              We exist to prove that small, focused teams can outperform large
              agencies — by caring more, communicating better, and delivering
              work that actually moves the needle.
            </blockquote>

            <p
              className={cn(
                tokens.typography.bodySm,
                "mt-6 text-muted-foreground"
              )}
            >
              — Alex Morgan, Founder &amp; Technical Director
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Team                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className={cn(sectionPadding)}>
        <div className={containerClass}>
          <SectionHeader
            badge="The Team"
            title="The people behind the pixels"
            subtitle="A tight-knit crew of engineers, designers, and strategists who genuinely love what they do."
          />
          {/* Client component handles animations for team + values */}
          <AboutContent
            teamMembers={teamMembers}
            companyValues={[]}
          />
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
