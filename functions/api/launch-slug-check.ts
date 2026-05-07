/**
 * Slug availability check for the Launch tier signup flow.
 *
 * Reads BRAND_CONFIGS KV to see if `<slug>.turboit.uk` already has a tenant.
 * Returns { available: boolean } so the form can render a green-tick / red-cross
 * inline as the user types.
 */

interface Env {
  BRAND_CONFIGS: KVNamespace;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://turboit.uk",
  "Access-Control-Allow-Methods": "GET",
  "Content-Type": "application/json",
};

const SLUG_RE = /^[a-z][a-z0-9-]{2,40}$/;
const RESERVED_SLUGS = new Set([
  "www", "admin", "api", "app", "auth", "blog", "cdn", "demo", "dev", "docs",
  "help", "mail", "onboard", "pricing", "privacy", "shop", "staging", "static",
  "status", "support", "terms", "test", "turboit", "raffle-tenants",
  "test-raffle-2", "template-dev",
]);

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  const url = new URL(ctx.request.url);
  const slug = (url.searchParams.get("slug") ?? "").trim().toLowerCase();

  if (!slug) {
    return Response.json({ valid: false, available: false, reason: "Slug required" }, { headers: corsHeaders });
  }
  if (!SLUG_RE.test(slug)) {
    return Response.json(
      {
        valid: false,
        available: false,
        reason: "3-40 chars, lowercase letters/numbers/dashes, must start with a letter",
      },
      { headers: corsHeaders },
    );
  }
  if (RESERVED_SLUGS.has(slug)) {
    return Response.json(
      { valid: true, available: false, reason: "Reserved subdomain — pick another" },
      { headers: corsHeaders },
    );
  }

  const hostname = `${slug}.turboit.uk`;
  const existing = await ctx.env.BRAND_CONFIGS.get(hostname);
  if (existing) {
    return Response.json(
      { valid: true, available: false, reason: "Already taken" },
      { headers: corsHeaders },
    );
  }

  return Response.json(
    { valid: true, available: true, hostname, url: `https://${hostname}` },
    { headers: corsHeaders },
  );
};
