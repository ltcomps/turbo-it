/**
 * Polled by the customer's welcome page after Stripe Checkout redirects back.
 *
 * Resolves their Stripe session_id to our internal reference + slug, then
 * proxies the provisioning worker's /status endpoint so the customer sees
 * live progress through the 12-stage pipeline.
 */

interface Env {
  LAUNCH_PENDING_SIGNUPS: KVNamespace;
  STRIPE_LIVE_SECRET_KEY: string;
}

interface LaunchStash {
  reference: string;
  status: "awaiting_payment" | "provisioning" | "live" | "failed";
  sessionId?: string;
  provisioningError?: string;
  form: {
    slug: string;
    brandName: string;
    brandColor: string;
    domain: string;
    adminEmail: string;
    hostname: string;
  };
}

const PROVISION_BASE = "https://raffle-template-provision.frosty-rice-fe5d.workers.dev";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://turboit.uk",
  "Access-Control-Allow-Methods": "GET",
  "Content-Type": "application/json",
};

async function refForSession(env: Env, sessionId: string): Promise<string | null> {
  // Fast path: webhook already set up the reverse index.
  const cached = await env.LAUNCH_PENDING_SIGNUPS.get(`session:${sessionId}`);
  if (cached) return cached;

  // Fallback: webhook hasn't fired yet (or we're racing it). Look up the
  // session via Stripe API and read client_reference_id.
  if (!env.STRIPE_LIVE_SECRET_KEY) {
    return null;
  }
  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${env.STRIPE_LIVE_SECRET_KEY}` },
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { client_reference_id?: string | null };
  return j.client_reference_id ?? null;
}

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  const url = new URL(ctx.request.url);
  const sessionId = url.searchParams.get("session");
  const directRef = url.searchParams.get("ref");

  let ref: string | null = directRef;
  if (!ref && sessionId) {
    ref = await refForSession(ctx.env, sessionId);
  }
  if (!ref) {
    return Response.json(
      { status: "awaiting_payment", note: "Stripe webhook hasn't fired yet — refresh in a few seconds." },
      { headers: corsHeaders },
    );
  }

  const stashRaw = await ctx.env.LAUNCH_PENDING_SIGNUPS.get(ref);
  if (!stashRaw) {
    return Response.json(
      { error: "Reference not found or expired" },
      { status: 404, headers: corsHeaders },
    );
  }
  const stash = JSON.parse(stashRaw) as LaunchStash;

  if (stash.status === "awaiting_payment") {
    return Response.json(
      { status: "awaiting_payment", brand: { brandName: stash.form.brandName, domain: stash.form.domain } },
      { headers: corsHeaders },
    );
  }

  if (stash.status === "failed") {
    return Response.json(
      {
        status: "failed",
        brand: { brandName: stash.form.brandName, domain: stash.form.domain },
        error: stash.provisioningError ?? "Provisioning failed",
      },
      { headers: corsHeaders },
    );
  }

  // status === "provisioning" or "live" — poll the provisioning worker for live state.
  const provRes = await fetch(
    `${PROVISION_BASE}/status?slug=${encodeURIComponent(stash.form.slug)}`,
  );
  if (!provRes.ok) {
    return Response.json(
      {
        status: "provisioning",
        brand: { brandName: stash.form.brandName, domain: stash.form.domain },
        provisioning: { stage: "unknown", pct: 50, label: "Working..." },
      },
      { headers: corsHeaders },
    );
  }

  const provJson = (await provRes.json()) as {
    stage: string;
    pct: number;
    label: string;
    error?: string;
  };

  // Flip the stash to terminal status (live or failed) on completion so
  // future polls are fast-path and the welcome page sees the right UI.
  // Don't fail the response if the KV write is slow.
  let responseStatus: "provisioning" | "live" | "failed" = "provisioning";
  if (provJson.stage === "done") {
    responseStatus = "live";
    if (stash.status !== "live") {
      stash.status = "live";
      ctx.waitUntil(
        ctx.env.LAUNCH_PENDING_SIGNUPS.put(ref, JSON.stringify(stash), {
          expirationTtl: 24 * 60 * 60,
        }),
      );
    }
  } else if (provJson.stage === "failed") {
    responseStatus = "failed";
    if (stash.status !== "failed") {
      stash.status = "failed";
      stash.provisioningError = provJson.error ?? "Provisioning failed";
      ctx.waitUntil(
        ctx.env.LAUNCH_PENDING_SIGNUPS.put(ref, JSON.stringify(stash), {
          expirationTtl: 24 * 60 * 60,
        }),
      );
    }
  }

  return Response.json(
    {
      status: responseStatus,
      brand: {
        brandName: stash.form.brandName,
        domain: stash.form.domain,
        adminEmail: stash.form.adminEmail,
      },
      provisioning: provJson,
      ...(responseStatus === "failed" ? { error: provJson.error } : {}),
    },
    { headers: corsHeaders },
  );
};
