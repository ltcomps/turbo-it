/**
 * CF Pages Function — proxies /onboard form submissions to the provisioning
 * worker. Accepts multipart/form-data so the form can include a logo file
 * upload alongside the brand fields. Logo (if present) is written to the
 * shared R2 bucket and the resulting public URL is forwarded to the worker.
 */

interface Env {
  PROVISION_SHARED_TOKEN?: string;
  ASSETS_BUCKET?: R2Bucket;
}

const PROVISION_BASE = "https://raffle-template-provision.frosty-rice-fe5d.workers.dev";
const R2_PUBLIC_HOST = "pub-fac3bdb2b3c245e09aec4b70720af920.r2.dev";

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

function extOf(filename: string, fallback = "png"): string {
  const m = /\.([a-z0-9]{2,5})$/i.exec(filename);
  return m ? m[1].toLowerCase() : fallback;
}

async function uploadLogo(env: Env, slug: string, file: File): Promise<string | null> {
  if (!env.ASSETS_BUCKET) return null;
  if (file.size === 0 || file.size > 5 * 1024 * 1024) return null;  // skip empty / >5MB
  const ext = extOf(file.name, "png");
  const key = `tenants/${slug}/logo-${Date.now()}.${ext}`;
  await env.ASSETS_BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type || "application/octet-stream" },
  });
  return `https://${R2_PUBLIC_HOST}/${key}`;
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const token = ctx.env.PROVISION_SHARED_TOKEN;
  if (!token) {
    return Response.json({ ok: false, error: "Provisioning token not set on this project" }, { status: 500 });
  }

  // Try multipart first; fall back to JSON for backward-compat with old clients.
  const ct = ctx.request.headers.get("content-type") ?? "";
  let fields: Record<string, string> = {};
  let logoFile: File | null = null;

  if (ct.startsWith("multipart/form-data")) {
    const fd = await ctx.request.formData();
    for (const [k, v] of fd.entries()) {
      if (v instanceof File) {
        if (k === "logo_file" && v.size > 0) logoFile = v;
      } else {
        fields[k] = v;
      }
    }
  } else {
    fields = (await ctx.request.json().catch(() => ({}))) as Record<string, string>;
  }

  const brandName = String(fields.brand_name ?? "").trim();
  if (!brandName) return Response.json({ ok: false, error: "brand_name required" }, { status: 400 });
  const slug = String(fields.slug ?? "").trim() || slugify(brandName);

  // Upload logo if provided. The form-supplied logo_url URL still wins if both
  // are sent (lets the rep override with a known-good URL).
  let logoUrl: string | undefined = String(fields.logo_url ?? "").trim() || undefined;
  if (!logoUrl && logoFile) {
    const uploaded = await uploadLogo(ctx.env, slug, logoFile);
    if (uploaded) logoUrl = uploaded;
  }

  const payload = {
    slug,
    brandName,
    brandColor: String(fields.brand_color ?? "#3b6fc4").trim(),
    logoUrl,
    supportEmail: String(fields.support_email ?? "").trim(),
    legalName: String(fields.legal_name ?? "").trim(),
    domain: String(fields.domain ?? "").trim() || undefined,
    adminEmail: String(fields.admin_email ?? "").trim(),
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
