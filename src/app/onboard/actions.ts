"use server";

import { redirect } from "next/navigation";

const PROVISION_URL = "https://raffle-template-provision.frosty-rice-fe5d.workers.dev/provision";

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

export async function provisionAction(formData: FormData): Promise<void> {
  const token = process.env.PROVISION_SHARED_TOKEN;
  if (!token) redirect("/onboard?error=server-not-configured");

  const brandName = String(formData.get("brand_name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim() || slugify(brandName);
  const brandColor = String(formData.get("brand_color") ?? "#3b6fc4").trim();
  const logoUrl = String(formData.get("logo_url") ?? "").trim() || undefined;
  const supportEmail = String(formData.get("support_email") ?? "").trim();
  const legalName = String(formData.get("legal_name") ?? "").trim();
  const domain = String(formData.get("domain") ?? "").trim() || undefined;
  const adminEmail = String(formData.get("admin_email") ?? "").trim();

  const res = await fetch(PROVISION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      slug, brandName, brandColor, logoUrl, supportEmail, legalName, domain, adminEmail,
    }),
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; supabaseProjectRef?: string };
  if (!res.ok || !data.ok) {
    redirect(`/onboard?error=${encodeURIComponent(data.error ?? `${res.status}`)}`);
  }
  redirect(`/onboard/success?slug=${encodeURIComponent(slug)}&ref=${encodeURIComponent(data.supabaseProjectRef ?? "")}`);
}
