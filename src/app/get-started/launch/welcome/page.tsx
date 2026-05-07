import type { Metadata } from "next";
import { Suspense } from "react";

import { PageTransition } from "@/components/page-transition";
import { LaunchWelcomeClient } from "./welcome-client";

export const metadata: Metadata = {
  title: "Building your site… | Turbo IT",
  description: "Your site is provisioning. This takes about 90 seconds.",
  robots: { index: false, follow: false },
};

export default function LaunchWelcomePage() {
  return (
    <PageTransition>
      <Suspense fallback={null}>
        <LaunchWelcomeClient />
      </Suspense>
    </PageTransition>
  );
}
