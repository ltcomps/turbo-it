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
      {/* Pricing Cards (includes its own header)                             */}
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
