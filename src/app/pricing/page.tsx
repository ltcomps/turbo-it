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
    "Simple, transparent monthly pricing for web design, development, e-commerce, and digital services. No hidden fees. Get started from £299/month.",
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
      {/* Custom / Enterprise CTA                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className={cn(sectionPadding)}>
        <div className={containerClass}>
          <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-electric/30 bg-electric/[0.03] p-8 text-center sm:p-12">
            <h2 className={cn(tokens.typography.h3)}>
              Need something custom?
            </h2>
            <p
              className={cn(
                tokens.typography.body,
                "mx-auto mt-4 max-w-lg text-muted-foreground"
              )}
            >
              Every business is different. If our standard plans do not quite
              fit, we will build a bespoke package tailored to your exact
              requirements and budget.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-electric text-white hover:bg-electric/90"
              >
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
