import Link from "next/link";
import { provisionAction } from "./actions";

export const metadata = {
  title: "Onboard a new customer · Turbo IT",
  robots: { index: false, follow: false },
};

type SP = Promise<{ error?: string }>;

export default async function OnboardPage({ searchParams }: { searchParams: SP }) {
  const params = await searchParams;
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

        {params?.error && (
          <p className="mt-6 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            Provisioning failed: {params.error}
          </p>
        )}

        <form action={provisionAction} className="mt-8 space-y-5 rounded-xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm">
          <Field name="brand_name" label="Brand name" placeholder="Acme Raffles" required />
          <Field name="slug" label="Slug (subdomain)" placeholder="acme  —  becomes acme.turboit.uk" />
          <Field name="legal_name" label="Legal entity name" placeholder="Acme Raffles Ltd" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="brand_color" label="Brand colour (hex)" defaultValue="#3b6fc4" required />
            <Field name="support_email" label="Support email" type="email" placeholder="hello@acme.com" required />
          </div>
          <Field name="logo_url" label="Logo URL (optional)" placeholder="https://r2.../acme-logo.svg" />
          <Field name="domain" label="Custom domain (optional)" placeholder="https://acme-raffles.com" />
          <Field name="admin_email" label="Bootstrap admin email" type="email" required />

          <button type="submit" className="w-full rounded-lg bg-electric px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-6px_var(--glow)] hover:bg-electric/90">
            Provision tenant
          </button>
          <p className="text-center text-[11px] text-muted-foreground/70">
            Takes ~30 seconds. You’ll get an email with the env vars and the runbook for CF Pages + DNS.
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">← Back to turboit.uk</Link>
        </p>
      </div>
    </main>
  );
}

function Field({
  name, label, placeholder, type = "text", defaultValue, required,
}: {
  name: string; label: string; placeholder?: string; type?: string; defaultValue?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-electric focus:outline-none"
      />
    </label>
  );
}
