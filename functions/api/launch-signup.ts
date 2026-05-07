/**
 * Launch tier pre-payment signup.
 *
 * Accepts the form (5 fields), validates, stashes everything in
 * LAUNCH_PENDING_SIGNUPS KV keyed by a generated reference, then returns the
 * Stripe Payment Link URL with `client_reference_id=ref` + prefilled email
 * so the customer goes straight to Checkout.
 *
 * The Stripe webhook (functions/api/stripe/webhook.ts) reads the reference
 * after payment and triggers provisioning on raffle-template-provision.
 */

interface Env {
  BRAND_CONFIGS: KVNamespace;
  LAUNCH_PENDING_SIGNUPS: KVNamespace;
  STRIPE_LAUNCH_PAYMENT_LINK: string;
}

interface Body {
  brand_name: string;
  slug: string;
  brand_color: string;
  logo_url?: string;
  admin_email: string;
  legal_name?: string;
  support_email?: string;
  website?: string; // honeypot
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://turboit.uk",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const SLUG_RE = /^[a-z][a-z0-9-]{2,40}$/;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function makeReference(): string {
  const ts = Date.now().toString(36);
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `launch-${ts}-${rand}`;
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  let body: Body;
  try {
    body = (await ctx.request.json()) as Body;
  } catch {
    return Response.json({ error: "Bad JSON" }, { status: 400, headers: corsHeaders });
  }

  // Honeypot — silent success on bots
  if (body.website) {
    return Response.json({ success: true, redirectUrl: "https://turboit.uk/" }, { headers: corsHeaders });
  }

  const brandName = body.brand_name?.trim();
  const slug = body.slug?.trim().toLowerCase();
  const brandColor = body.brand_color?.trim();
  const logoUrl = body.logo_url?.trim() || "";
  const adminEmail = body.admin_email?.trim().toLowerCase();
  const legalName = body.legal_name?.trim() || `${brandName} Ltd`;
  const supportEmail = body.support_email?.trim().toLowerCase() || adminEmail;

  if (!brandName) return Response.json({ error: "Brand name required" }, { status: 400, headers: corsHeaders });
  if (!SLUG_RE.test(slug ?? "")) {
    return Response.json({ error: "Invalid slug — 3-40 chars, lowercase letters/numbers/dashes, must start with a letter" }, { status: 400, headers: corsHeaders });
  }
  if (!HEX_RE.test(brandColor ?? "")) {
    return Response.json({ error: "Brand colour must be a 6-digit hex like #FF6B35" }, { status: 400, headers: corsHeaders });
  }
  if (!adminEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
    return Response.json({ error: "Valid admin email required" }, { status: 400, headers: corsHeaders });
  }
  if (!ctx.env.STRIPE_LAUNCH_PAYMENT_LINK) {
    console.error("STRIPE_LAUNCH_PAYMENT_LINK not set");
    return Response.json({ error: "Payment link not configured" }, { status: 500, headers: corsHeaders });
  }

  // Slug uniqueness — re-check at submit time even though the form did so
  // earlier. Race-safe against two customers picking the same slug.
  const hostname = `${slug}.turboit.uk`;
  const existing = await ctx.env.BRAND_CONFIGS.get(hostname);
  if (existing) {
    return Response.json({ error: `Slug "${slug}" was just taken — please pick another` }, { status: 409, headers: corsHeaders });
  }

  const reference = makeReference();
  const stash = {
    reference,
    createdAt: Date.now(),
    status: "awaiting_payment",
    form: {
      slug,
      brandName,
      brandColor,
      logoUrl,
      supportEmail,
      legalName,
      adminEmail,
      hostname,
      domain: `https://${hostname}`,
    },
  };

  // Keep for 24h — long enough for any reasonable abandoned-checkout window.
  await ctx.env.LAUNCH_PENDING_SIGNUPS.put(reference, JSON.stringify(stash), {
    expirationTtl: 24 * 60 * 60,
  });

  const params = new URLSearchParams({
    prefilled_email: adminEmail,
    client_reference_id: reference,
  });
  const redirectUrl = `${ctx.env.STRIPE_LAUNCH_PAYMENT_LINK}?${params.toString()}`;

  return Response.json({ success: true, redirectUrl, reference }, { headers: corsHeaders });
};
