import type { Metadata } from "next";

import { PageTransition } from "@/components/page-transition";
import { LaunchForm } from "./launch-form";

export const metadata: Metadata = {
  title: "Launch your raffle site | Turbo IT",
  description:
    "Tell us about your brand, pay £99/month, and we'll auto-deploy your raffle platform in under two minutes. Branded subdomain, hosting and SSL included.",
};

export default function LaunchGetStartedPage() {
  return (
    <PageTransition>
      <LaunchForm />
    </PageTransition>
  );
}
