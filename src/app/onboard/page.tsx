import { OnboardForm } from "@/components/onboard-form";
import Link from "next/link";

export const metadata = {
  title: "Onboard a new customer · Turbo IT",
  robots: { index: false, follow: false },
};

export default function OnboardPage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-xs uppercase tracking-widest text-electric">Internal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Onboard a new customer</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Provisions a Supabase project, applies migrations, registers the tenant
          on the payment worker, and emails the runbook for the remaining manual
          steps (CF Pages project + DNS).
        </p>

        <OnboardForm />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">← Back to turboit.uk</Link>
        </p>
      </div>
    </main>
  );
}
