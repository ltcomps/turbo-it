/**
 * Public-poll endpoint — reads provisioning progress via the worker's
 * /status endpoint. No token required (read-only).
 */

const PROVISION_BASE = "https://raffle-template-provision.frosty-rice-fe5d.workers.dev";

export const onRequestGet: PagesFunction = async (ctx) => {
  const slug = new URL(ctx.request.url).searchParams.get("slug");
  if (!slug) return Response.json({ error: "slug required" }, { status: 400 });
  const res = await fetch(`${PROVISION_BASE}/status?slug=${encodeURIComponent(slug)}`);
  const data = await res.json();
  return Response.json(data, { status: res.status });
};
