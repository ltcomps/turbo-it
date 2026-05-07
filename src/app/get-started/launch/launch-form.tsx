"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { fadeInUp, pickVariants, useReducedMotion } from "@/lib/motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormState {
  brand_name: string;
  slug: string;
  brand_color: string;
  logo_url: string;
  admin_email: string;
  website: string; // honeypot
}

type SlugStatus =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "ok"; url: string }
  | { kind: "bad"; reason: string };

const SLUG_RE = /^[a-z][a-z0-9-]{2,40}$/;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function slugify(brand: string): string {
  return brand
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

export function LaunchForm() {
  const reduced = useReducedMotion();
  const fadeUp = pickVariants(fadeInUp, reduced);

  const [status, setStatus] = useState<"idle" | "submitting" | "redirecting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [slugStatus, setSlugStatus] = useState<SlugStatus>({ kind: "idle" });

  const [form, setForm] = useState<FormState>({
    brand_name: "",
    slug: "",
    brand_color: "#3b6fc4",
    logo_url: "",
    admin_email: "",
    website: "",
  });

  // Auto-suggest a slug from the brand name until the user manually edits it.
  useEffect(() => {
    if (slugTouched) return;
    setForm((prev) => ({ ...prev, slug: slugify(prev.brand_name) }));
  }, [form.brand_name, slugTouched]);

  // Debounced slug-availability probe.
  useEffect(() => {
    const slug = form.slug.trim().toLowerCase();
    if (!slug) {
      setSlugStatus({ kind: "idle" });
      return;
    }
    if (!SLUG_RE.test(slug)) {
      setSlugStatus({ kind: "bad", reason: "3-40 chars, letters/numbers/dashes" });
      return;
    }
    setSlugStatus({ kind: "checking" });
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/launch-slug-check?slug=${encodeURIComponent(slug)}`);
        const data = (await res.json()) as
          | { valid: false; reason: string }
          | { valid: true; available: false; reason: string }
          | { valid: true; available: true; url: string };
        if (!data.valid) {
          setSlugStatus({ kind: "bad", reason: data.reason });
        } else if (!data.available) {
          setSlugStatus({ kind: "bad", reason: data.reason });
        } else {
          setSlugStatus({ kind: "ok", url: data.url });
        }
      } catch {
        setSlugStatus({ kind: "idle" });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [form.slug]);

  const updateField = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const allFilled =
    form.brand_name.trim() &&
    form.slug.trim() &&
    HEX_RE.test(form.brand_color) &&
    form.admin_email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.admin_email) &&
    slugStatus.kind === "ok";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allFilled || status === "submitting" || status === "redirecting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/launch-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: form.brand_name.trim(),
          slug: form.slug.trim().toLowerCase(),
          brand_color: form.brand_color.trim(),
          logo_url: form.logo_url.trim(),
          admin_email: form.admin_email.trim().toLowerCase(),
          website: form.website,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Submit failed (${res.status})`);
      }
      const body = (await res.json()) as { redirectUrl?: string };
      if (!body.redirectUrl) throw new Error("No payment URL returned");

      setStatus("redirecting");
      window.location.href = body.redirectUrl;
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <section className={cn(sectionPadding)}>
      <div className={cn(containerClass)}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-12"
        >
          <span className={cn(tokens.typography.caption, "mb-3 inline-block text-electric")}>
            Launch
          </span>
          <h1 className={cn(tokens.typography.h1, "mt-2")}>
            Your raffle site, live in 90 seconds
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
            Five fields, then £99/month. Your branded site goes live on
            <span className="text-foreground"> &lt;your-name&gt;.turboit.uk</span>{" "}
            with hosting, SSL, and 8 demo competitions you can edit straight away.
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            Plus 19p per paid order, billed monthly. Cashflows merchant fees
            settle directly between you and Cashflows.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-xl border bg-card/50 p-5 shadow-sm sm:rounded-2xl sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Brand name */}
              <div className="space-y-2">
                <label htmlFor="launch-brand-name" className="text-sm font-medium">
                  Brand name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="launch-brand-name"
                  type="text"
                  placeholder="Acme Raffles"
                  value={form.brand_name}
                  onChange={(e) => updateField("brand_name")(e.target.value)}
                  required
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <label htmlFor="launch-slug" className="text-sm font-medium">
                  Subdomain <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="launch-slug"
                    type="text"
                    placeholder="acme"
                    value={form.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      updateField("slug")(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                    }}
                    required
                    className="pr-32"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    .turboit.uk
                  </span>
                </div>
                <SlugStatusLine status={slugStatus} />
              </div>

              {/* Brand colour + Admin email */}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <div className="space-y-2">
                  <label htmlFor="launch-color" className="text-sm font-medium">
                    Brand colour <span className="text-destructive">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="launch-color"
                      type="color"
                      value={form.brand_color}
                      onChange={(e) => updateField("brand_color")(e.target.value)}
                      className="h-10 w-14 cursor-pointer rounded-md border bg-transparent"
                    />
                    <Input
                      type="text"
                      placeholder="#3b6fc4"
                      value={form.brand_color}
                      onChange={(e) => updateField("brand_color")(e.target.value)}
                      className="flex-1 font-mono text-sm uppercase"
                    />
                  </div>
                  {!HEX_RE.test(form.brand_color) && form.brand_color.length > 0 && (
                    <p className="text-xs text-destructive">Use a 6-digit hex colour like #FF6B35</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="launch-email" className="text-sm font-medium">
                    Admin email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="launch-email"
                    type="email"
                    placeholder="you@yourbrand.co.uk"
                    value={form.admin_email}
                    onChange={(e) => updateField("admin_email")(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground/80">
                    We'll email you a one-click login link as soon as your site is live.
                  </p>
                </div>
              </div>

              {/* Logo URL (optional) */}
              <div className="space-y-2">
                <label htmlFor="launch-logo" className="text-sm font-medium">
                  Logo URL{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (optional — paste in later via admin if you don't have one yet)
                  </span>
                </label>
                <Input
                  id="launch-logo"
                  type="url"
                  placeholder="https://your-cdn.com/logo.png"
                  value={form.logo_url}
                  onChange={(e) => updateField("logo_url")(e.target.value)}
                />
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => updateField("website")(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              />

              {/* Submit */}
              <div className="flex flex-col gap-3 pt-1 sm:pt-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!allFilled || status === "submitting" || status === "redirecting"}
                  className="w-full bg-electric text-white hover:bg-electric/90 disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Submitting...
                    </>
                  ) : status === "redirecting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Taking you to checkout...
                    </>
                  ) : (
                    <>
                      Continue to payment — £99/month
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
                {status === "error" && errorMessage && (
                  <p className="text-center text-sm text-destructive">
                    {errorMessage}. Please try again.
                  </p>
                )}
                <p className="text-center text-xs text-muted-foreground">
                  Secure checkout via Stripe. Your card statement shows{" "}
                  <span className="font-medium">TURBO IT</span>. After payment,
                  your site auto-deploys in ~90 seconds and we'll email you a
                  one-click login.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SlugStatusLine({ status }: { status: SlugStatus }) {
  if (status.kind === "idle") {
    return (
      <p className="text-xs text-muted-foreground/80">
        3-40 characters, lowercase letters/numbers/dashes. Must start with a letter.
      </p>
    );
  }
  if (status.kind === "checking") {
    return (
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="size-3 animate-spin" /> Checking availability…
      </p>
    );
  }
  if (status.kind === "ok") {
    return (
      <p className="flex items-center gap-1.5 text-xs text-emerald-500">
        <Check className="size-3" /> Available — your site will be at{" "}
        <span className="font-medium">{status.url}</span>
      </p>
    );
  }
  return (
    <p className="flex items-center gap-1.5 text-xs text-destructive">
      <X className="size-3" /> {status.reason}
    </p>
  );
}
