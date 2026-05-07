import type { Metadata } from "next";

import { PageTransition } from "@/components/page-transition";
import { EnterpriseForm } from "./enterprise-form";

export const metadata: Metadata = {
  title: "Enterprise & Influencer enquiry | Turbo IT",
  description:
    "For influencers, high-volume operators and brands that need something unmistakable. Tell us what you're after and we'll come back with a bespoke proposal.",
};

export default function EnterpriseGetStartedPage() {
  return (
    <PageTransition>
      <EnterpriseForm />
    </PageTransition>
  );
}
