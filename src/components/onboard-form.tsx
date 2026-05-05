"use client";

import { useEffect, useRef, useState } from "react";

type StageId =
  | "idle" | "submitting" | "failed"
  | "start" | "wait_active"
  | "migrate_0001" | "migrate_0002"
  | "seed" | "register" | "done";

type Stage = { id: StageId; pct: number; label: string; ref?: string; error?: string };

export function OnboardForm() {
  const [stage, setStage] = useState<Stage>({ id: "idle", pct: 0, label: "" });
  const [slug, setSlug] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Poll status every 2s while we have an active slug and we're not done/failed.
  useEffect(() => {
    if (!slug) return;
    if (stage.id === "done" || stage.id === "failed") return;

    async function tick() {
      try {
        const res = await fetch(`/api/provision/status?slug=${encodeURIComponent(slug!)}`);
        const data = await res.json() as { stage?: Stage["id"]; pct?: number; label?: string; ref?: string; error?: string };
        if (data.stage && data.label && typeof data.pct === "number") {
          setStage({ id: data.stage, pct: data.pct, label: data.label, ref: data.ref } as Stage);
          if (data.stage === "done") {
            const params = new URLSearchParams();
            params.set("slug", slug!);
            if (data.ref) params.set("ref", data.ref);
            // Give the user a beat to see 100%, then redirect.
            setTimeout(() => {
              window.location.href = `/onboard/success?${params.toString()}`;
            }, 800);
          }
        }
      } catch {
        // ignore transient errors; next tick will retry
      }
    }
    tick();
    pollRef.current = setInterval(tick, 2000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [slug, stage.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStage({ id: "submitting", pct: 5, label: "Submitting…" });
    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/provision", {
        method: "POST",
        // Browser sets the right multipart Content-Type with the boundary.
        body: fd,
      });
      const data = await res.json() as { ok?: boolean; slug?: string; error?: string };
      if (!res.ok || !data.ok || !data.slug) {
        setStage({ id: "failed", pct: 0, label: "", error: data.error ?? `Failed (${res.status})` });
        return;
      }
      setSlug(data.slug);
      setStage({ id: "start", pct: 5, label: "Creating Supabase project" });
    } catch (err) {
      setStage({
        id: "failed", pct: 0, label: "",
        error: err instanceof Error ? err.message : "Network error",
      });
    }
  }

  const inProgress: StageId[] = [
    "submitting", "start", "wait_active",
    "migrate_0001", "migrate_0002", "seed", "register", "done",
  ];
  if (inProgress.includes(stage.id)) {
    return <Progress stage={stage} slug={slug ?? ""} />;
  }

  return (
    <>
      {stage.id === "failed" && stage.error && (
        <p className="mt-6 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          Provisioning failed: {stage.error}
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
        <FileField name="logo_file" label="Logo (upload, optional)" accept="image/png,image/svg+xml,image/jpeg,image/webp" />
        <Field name="logo_url" label="… or paste a Logo URL instead" placeholder="https://your-cdn/acme-logo.svg" />
        <Field name="domain" label="Custom domain (optional)" placeholder="https://acme-raffles.com" />
        <Field name="admin_email" label="Bootstrap admin email" type="email" required />

        <button
          type="submit"
          className="w-full rounded-lg bg-electric px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-6px_var(--glow)] hover:bg-electric/90"
        >
          Provision tenant
        </button>
        <p className="text-center text-[11px] text-muted-foreground/70">
          Takes ~60-90 seconds. You’ll see live progress.
        </p>
      </form>
    </>
  );
}

function Progress({ stage, slug }: { stage: Stage; slug: string }) {
  const STAGES: Array<{ id: StageId; label: string }> = [
    { id: "start", label: "Creating Supabase project" },
    { id: "wait_active", label: "Waiting for project to come online" },
    { id: "migrate_0001", label: "Applying database schema" },
    { id: "migrate_0002", label: "Adding ticket-allocation RPC" },
    { id: "seed", label: "Configuring brand" },
    { id: "register", label: "Registering tenant" },
    { id: "done", label: "Done" },
  ];
  const currentIdx = STAGES.findIndex((s) => s.id === stage.id);

  return (
    <div className="mt-8 rounded-xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-widest text-electric">Provisioning {slug}</p>
      <p className="mt-1 text-sm text-foreground">{stage.label}…</p>

      {/* Bar */}
      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-background/60">
        <div
          className="h-full bg-electric transition-all duration-500 ease-out"
          style={{ width: `${stage.pct}%` }}
        />
      </div>
      <p className="mt-2 text-right text-[11px] text-muted-foreground">{stage.pct}%</p>

      {/* Stage list */}
      <ol className="mt-6 space-y-2 text-sm">
        {STAGES.map((s, i) => {
          const done = currentIdx > i;
          const active = currentIdx === i;
          return (
            <li key={s.id} className="flex items-center gap-3">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  done ? "bg-emerald-500 text-white"
                       : active ? "bg-electric text-white animate-pulse"
                       : "bg-background/60 text-muted-foreground"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <span className={done ? "text-foreground line-through opacity-60" : active ? "text-foreground" : "text-muted-foreground"}>
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="mt-6 text-center text-[11px] text-muted-foreground/70">
        Don&apos;t close this page. Auto-redirect on completion.
      </p>
    </div>
  );
}

function FileField({
  name, label, accept,
}: {
  name: string; label: string; accept?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        name={name}
        type="file"
        accept={accept}
        className="mt-1 w-full rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-electric/20 file:px-3 file:py-1 file:text-electric hover:file:bg-electric/30"
      />
    </label>
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
