import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Payment received | Turbo IT",
  description: "Your Growth Partner setup payment has been received.",
};

export default function GrowthThanksPage() {
  return (
    <PageTransition>
      <section className={cn(sectionPadding)}>
        <div className={cn(containerClass)}>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-electric/10">
              <CheckCircle2 className="size-8 text-electric" />
            </div>
            <h1 className={cn(tokens.typography.h1, "mt-6")}>
              Payment received — let&rsquo;s build
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Thanks for committing. We&rsquo;ve had your enquiry, your £1,000 is
              in, and we&rsquo;ll be in touch within 24 hours to schedule your
              kickoff call.
            </p>
            <div className="mt-8 rounded-2xl border bg-card/50 p-6 text-left sm:p-8">
              <h2 className="text-lg font-semibold">What happens next</h2>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric/10 text-xs font-semibold text-electric">
                    1
                  </span>
                  <span>
                    <strong className="text-foreground">Within 24 hours</strong> —
                    we&rsquo;ll email you to book a 30-minute kickoff call.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric/10 text-xs font-semibold text-electric">
                    2
                  </span>
                  <span>
                    <strong className="text-foreground">Week 1–3</strong> — we
                    build your semi-custom site, you review, we iterate.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric/10 text-xs font-semibold text-electric">
                    3
                  </span>
                  <span>
                    <strong className="text-foreground">Launch</strong> — your
                    site goes live on your domain. We&rsquo;ll handle the
                    Cashflows handover.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric/10 text-xs font-semibold text-electric">
                    4
                  </span>
                  <span>
                    <strong className="text-foreground">From month one</strong>{" "}
                    — 10% revenue share invoiced monthly (5% above £25k/month).
                  </span>
                </li>
              </ol>
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="outline">
                <Link href="/">Back to home</Link>
              </Button>
              <p className="text-xs text-muted-foreground/80">
                Questions? Reply to your receipt email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
