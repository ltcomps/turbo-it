"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, AlertTriangle, Mail, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { Button } from "@/components/ui/button";

type Stage =
  | "start"
  | "wait_active"
  | "configure_auth"
  | "migrate_0001"
  | "migrate_0002"
  | "seed"
  | "register"
  | "create_admin"
  | "write_kv"
  | "add_dns"
  | "add_route"
  | "finalize"
  | "done"
  | "failed";

interface StatusResponse {
  status: "awaiting_payment" | "provisioning" | "live" | "failed";
  brand?: { brandName: string; domain: string; adminEmail?: string };
  provisioning?: { stage: Stage; pct: number; label: string; error?: string };
  error?: string;
  note?: string;
}

const STAGE_ORDER: { id: Stage; label: string }[] = [
  { id: "start", label: "Creating your database" },
  { id: "wait_active", label: "Database coming online" },
  { id: "configure_auth", label: "Enabling sign-ups" },
  { id: "migrate_0001", label: "Applying schema" },
  { id: "migrate_0002", label: "Adding payment hooks" },
  { id: "seed", label: "Seeding demo competitions" },
  { id: "register", label: "Registering on payment system" },
  { id: "create_admin", label: "Creating your admin account" },
  { id: "write_kv", label: "Wiring brand config" },
  { id: "add_dns", label: "Adding DNS record" },
  { id: "add_route", label: "Routing your domain" },
  { id: "finalize", label: "Sending login email" },
];

export function LaunchWelcomeClient() {
  const params = useSearchParams();
  const sessionId = params.get("session");

  const [data, setData] = useState<StatusResponse | null>(null);
  const [pollingError, setPollingError] = useState<string>("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    async function tick() {
      try {
        const res = await fetch(`/api/launch-status?session=${encodeURIComponent(sessionId!)}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const d = (await res.json()) as StatusResponse;
        if (cancelled) return;
        setData(d);
        setPollingError("");
        if (d.status === "live" || d.status === "failed") {
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch (err) {
        if (cancelled) return;
        setPollingError(err instanceof Error ? err.message : "Network error");
      }
    }
    tick();
    pollRef.current = setInterval(tick, 2500);
    return () => {
      cancelled = true;
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [sessionId]);

  if (!sessionId) {
    return <NoSessionState />;
  }
  if (!data) {
    return <LoadingState />;
  }
  if (data.status === "failed") {
    return <FailedState error={data.provisioning?.error || data.error} brand={data.brand} />;
  }
  if (data.status === "live") {
    return <LiveState brand={data.brand} />;
  }
  return (
    <ProvisioningState
      data={data}
      pollingError={pollingError}
    />
  );
}

/* --------------------------------------------------------------------- */
/*  States                                                                */
/* --------------------------------------------------------------------- */

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <section className={cn(sectionPadding)}>
      <div className={cn(containerClass)}>
        <div className="mx-auto max-w-2xl">{children}</div>
      </div>
    </section>
  );
}

function NoSessionState() {
  return (
    <Wrap>
      <div className="rounded-2xl border bg-card/50 p-8 text-center">
        <h1 className={cn(tokens.typography.h2)}>Missing session reference</h1>
        <p className="mt-3 text-base text-muted-foreground">
          We couldn't find your Stripe session in this URL. If you've just paid
          and got here by accident, check your email — your login link will
          arrive within ~2 minutes.
        </p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </Wrap>
  );
}

function LoadingState() {
  return (
    <Wrap>
      <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card/50 p-12 text-center">
        <Loader2 className="size-10 animate-spin text-electric" />
        <p className="text-base text-muted-foreground">Starting up…</p>
      </div>
    </Wrap>
  );
}

function ProvisioningState({
  data,
  pollingError,
}: {
  data: StatusResponse;
  pollingError: string;
}) {
  const prov = data.provisioning;
  const currentIdx = prov ? STAGE_ORDER.findIndex((s) => s.id === prov.stage) : 0;
  const pct = prov?.pct ?? 0;

  return (
    <Wrap>
      <div className="text-center">
        <span className={cn(tokens.typography.caption, "text-electric")}>
          {data.status === "awaiting_payment" ? "Confirming payment" : "Provisioning"}
        </span>
        <h1 className={cn(tokens.typography.h1, "mt-2")}>
          {data.brand?.brandName ? `Building ${data.brand.brandName}` : "Building your site"}…
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          {data.status === "awaiting_payment"
            ? "Waiting for the payment confirmation to come through. This usually takes a few seconds."
            : "Your site auto-deploys in ~90 seconds. Don't close this tab — we'll redirect you the moment it's ready."}
        </p>
      </div>

      <div className="mt-8 rounded-2xl border bg-card/50 p-6 sm:p-8">
        <div className="flex items-center justify-between text-sm font-medium">
          <span>{prov?.label ?? "Confirming payment…"}</span>
          <span className="tabular-nums text-muted-foreground">{pct}%</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-electric transition-all duration-700 ease-out"
            style={{ width: `${Math.max(pct, 5)}%` }}
          />
        </div>
        <ol className="mt-6 space-y-2.5 text-sm">
          {STAGE_ORDER.map((s, i) => {
            const done = currentIdx > i;
            const active = currentIdx === i;
            return (
              <li key={s.id} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                    done && "bg-emerald-500 text-white",
                    active && "bg-electric text-white animate-pulse",
                    !done && !active && "bg-muted text-muted-foreground",
                  )}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span
                  className={cn(
                    done && "text-foreground line-through opacity-60",
                    active && "text-foreground font-medium",
                    !done && !active && "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>
        {pollingError && (
          <p className="mt-4 text-xs text-amber-500">
            (Briefly couldn't reach status: {pollingError}. Will retry — your site is still building.)
          </p>
        )}
      </div>
    </Wrap>
  );
}

function LiveState({
  brand,
}: {
  brand?: StatusResponse["brand"];
}) {
  return (
    <Wrap>
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="size-8 text-emerald-500" />
        </div>
        <h1 className={cn(tokens.typography.h1, "mt-6")}>
          Your site is live
        </h1>
        {brand?.brandName && (
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            <strong className="text-foreground">{brand.brandName}</strong> is up
            and running on{" "}
            {brand.domain ? (
              <a href={brand.domain} className="text-electric underline">
                {brand.domain.replace(/^https?:\/\//, "")}
              </a>
            ) : (
              "your subdomain"
            )}
            .
          </p>
        )}
      </div>

      <div className="mt-8 rounded-2xl border bg-card/50 p-6 sm:p-8">
        <h2 className="text-lg font-semibold">Next steps</h2>
        <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric/10 text-xs font-semibold text-electric">
              1
            </span>
            <span>
              <strong className="text-foreground">Check your email</strong> —
              we've sent {brand?.adminEmail ? <code>{brand.adminEmail}</code> : "you"} a
              one-click login link. Valid for 1 hour.
              <br />
              <span className="text-muted-foreground/80">
                If it's not there in 2 minutes, check spam and search for "Turbo IT".
              </span>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric/10 text-xs font-semibold text-electric">
              2
            </span>
            <span>
              <strong className="text-foreground">Visit your site</strong> — see
              the 8 demo competitions we've seeded for you. Edit them or create
              your own from the admin panel.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric/10 text-xs font-semibold text-electric">
              3
            </span>
            <span>
              <strong className="text-foreground">Apply for Cashflows</strong>{" "}
              when you're ready to take live payments. Your admin panel has a
              guided application form. Until then, your site is in demo mode.
            </span>
          </li>
        </ol>

        {brand?.domain && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <a href={brand.domain} target="_blank" rel="noopener noreferrer">
                Visit {brand.brandName ?? "site"}
                <ExternalLink className="ml-1.5 size-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={`${brand.domain}/sign-in`} target="_blank" rel="noopener noreferrer">
                Go to sign in
              </a>
            </Button>
          </div>
        )}
      </div>
    </Wrap>
  );
}

function FailedState({
  error,
  brand,
}: {
  error?: string;
  brand?: StatusResponse["brand"];
}) {
  return (
    <Wrap>
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="size-8 text-destructive" />
        </div>
        <h1 className={cn(tokens.typography.h1, "mt-6")}>
          Something went wrong
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          We hit an error provisioning {brand?.brandName ?? "your site"}.
          Your payment is safe — we'll either fix it or refund you.
        </p>
        {error && (
          <p className="mt-4 rounded-md bg-background/60 px-4 py-3 text-left text-xs font-mono text-muted-foreground">
            {error}
          </p>
        )}
        <p className="mt-6 text-sm text-muted-foreground">
          Reply to your Stripe receipt email or message us — we read every one.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild variant="outline">
            <a href="mailto:info@turboit.uk">
              <Mail className="mr-1.5 size-4" />
              info@turboit.uk
            </a>
          </Button>
        </div>
      </div>
    </Wrap>
  );
}
