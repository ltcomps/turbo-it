import Link from "next/link";

export const metadata = {
  title: "Tenant provisioned · Turbo IT",
  robots: { index: false, follow: false },
};

type SP = Promise<{ slug?: string; ref?: string }>;

export default async function OnboardSuccessPage({ searchParams }: { searchParams: SP }) {
  const { slug, ref } = await searchParams;
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-xs uppercase tracking-widest text-emerald-400">✓ Provisioned</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{slug} is ready</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Supabase project <code>{ref}</code> created, migrations applied, payment
          worker registered. Check the onboarding email for the runbook to finish
          the CF Pages + DNS bits.
        </p>
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
