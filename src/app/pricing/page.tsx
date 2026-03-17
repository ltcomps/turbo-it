import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { cn } from "@/lib/utils";

import { PageTransition } from "@/components/page-transition";
import { SectionHeader } from "@/components/section-header";
import { PricingCards } from "@/components/pricing-cards";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing | Turbo IT",
  description:
    "Simple, transparent monthly pricing for competition and raffle platform development. No hidden fees. Get started from £499/month.",
};

export default function PricingPage() {
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
            Pricing
          </span>

          <h1 className={cn(tokens.typography.h1, "mx-auto max-w-3xl")}>
            Simple, Transparent Pricing
          </h1>

          <p
            className={cn(
              tokens.typography.bodyLg,
              "mx-auto mt-6 max-w-2xl text-muted-foreground"
            )}
          >
            No hidden fees, no scope creep surprises. Choose a plan that matches
            your ambition and let us handle the rest.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Pricing Cards (self-contained section)                              */}
      {/* ------------------------------------------------------------------ */}
      <PricingCards />

      {/* ------------------------------------------------------------------ */}
      {/* FAQ (self-contained section)                                        */}
      {/* ------------------------------------------------------------------ */}
      <FaqAccordion />

      {/* ------------------------------------------------------------------ */}
      {/* CTA (self-contained section)                                        */}
      {/* ------------------------------------------------------------------ */}
      <CtaSection />
    </PageTransition>
  );
}
