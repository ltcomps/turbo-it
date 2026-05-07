import type { Metadata } from "next";

import { PageTransition } from "@/components/page-transition";
import { GrowthForm } from "./growth-form";

export const metadata: Metadata = {
  title: "Apply for Growth Partner | Turbo IT",
  description:
    "Tell us about your raffle business and we'll build you a semi-custom platform. £1,000 setup, then 10% revenue share (drops to 5% above £25k/month).",
};

export default function GrowthGetStartedPage() {
  return (
    <PageTransition>
      <GrowthForm />
    </PageTransition>
  );
}
