/**
 * CF Pages Function — proxies /onboard form submissions to the provisioning
 * worker. Async pattern: POST returns 202 immediately, client polls
 * GET /api/provision/status?slug=<slug> for progress.
 */

interface Env {
  PROVISION_SHARED_TOKEN?: string;
}

const PROVISION_BASE = "https://raffle-template-provision.frosty-rice-fe5d.workers.dev";

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const token = ctx.env.PROVISION_SHARED_TOKEN;
  if (!token) {
    return Response.json({ ok: false, error: "Provisioning token not set on this project" }, { status: 500 });
  }

  const body = await ctx.request.json().catch(() => null) as Record<string, string> | null;
  if (!body) return Response.json({ ok: false, error: "bad json" }, { status: 400 });

  const brandName = String(body.brand_name ?? "").trim();
  if (!brandName) return Response.json({ ok: false, error: "brand_name required" }, { status: 400 });

  const payload = {
    slug: String(body.slug ?? "").trim() || slugify(brandName),
    brandName,
    brandColor: String(body.brand_color ?? "#3b6fc4").trim(),
    logoUrl: String(body.logo_url ?? "").trim() || undefined,
    supportEmail: String(body.support_email ?? "").trim(),
    legalName: String(body.legal_name ?? "").trim(),
    domain: String(body.domain ?? "").trim() || undefined,
    adminEmail: String(body.admin_email ?? "").trim(),
  };

  const res = await fetch(`${PROVISION_BASE}/provision`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json() as Record<string, unknown>;
  return Response.json(data, { status: res.status });
};
