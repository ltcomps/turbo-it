"use client";

import { useState } from "react";

export function OnboardForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/provision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json() as { ok?: boolean; error?: string; supabaseProjectRef?: string; slug?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? `Failed (${res.status})`);
        setSubmitting(false);
        return;
      }
      const params = new URLSearchParams();
      if (data.slug) params.set("slug", data.slug);
      if (data.supabaseProjectRef) params.set("ref", data.supabaseProjectRef);
      window.location.href = `/onboard/success?${params.toString()}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setSubmitting(false);
    }
  }

  return (
    <>
      {error && (
        <p className="mt-6 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          Provisioning failed: {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm">
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

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-electric px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-6px_var(--glow)] hover:bg-electric/90 disabled:opacity-60"
        >
          {submitting ? "Provisioning… (~30s)" : "Provision tenant"}
        </button>
        <p className="text-center text-[11px] text-muted-foreground/70">
          Takes ~30 seconds. You’ll get the env vars + runbook on the next page.
        </p>
      </form>
    </>
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
