import Link from "next/link";
import { OnboardSuccessReadout } from "@/components/onboard-success-readout";

export const metadata = {
  title: "Tenant provisioned · Turbo IT",
  robots: { index: false, follow: false },
};

export default function OnboardSuccessPage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-xs uppercase tracking-widest text-emerald-400">✓ Provisioned</p>
        <OnboardSuccessReadout />
        <div className="mt-8 flex gap-3">
          <Link href="/onboard" className="rounded-lg border border-border/40 bg-card/40 px-4 py-2 text-sm hover:border-electric/40">
            Onboard another
          </Link>
          <Link href="/" className="rounded-lg bg-electric px-4 py-2 text-sm text-white">
            Back to turboit.uk
          </Link>
        </div>
      </div>
    </main>
  );
}
