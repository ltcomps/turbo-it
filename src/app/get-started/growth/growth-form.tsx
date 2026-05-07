"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { fadeInUp, pickVariants, useReducedMotion } from "@/lib/motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const launchTimingOptions = [
  "ASAP — within a month",
  "Next 1–2 months",
  "Next 2–3 months",
  "3+ months / exploring",
] as const;

const targetRevenueOptions = [
  "Under £10,000 / month",
  "£10,000 – £25,000 / month",
  "£25,000 – £50,000 / month",
  "£50,000 – £100,000 / month",
  "£100,000+ / month",
] as const;

const cashflowsOptions = [
  "Yes — I have a Cashflows MID",
  "No — I'd like help applying",
  "Not sure / need to learn more",
] as const;

function StyledSelect({
  value,
  onChange,
  options,
  placeholder,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
  id: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground dark:bg-input/30 border-input",
        "h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs",
        "transition-[color,box-shadow] outline-none md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "appearance-none cursor-pointer",
        !value && "text-muted-foreground",
      )}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-background text-foreground">
          {opt}
        </option>
      ))}
    </select>
  );
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  business: string;
  currentState: string;
  whatYouNeed: string;
  brandDirection: string;
  launchTiming: string;
  targetRevenue: string;
  cashflows: string;
  termsAccepted: boolean;
  website: string; // honeypot
}

export function GrowthForm() {
  const reduced = useReducedMotion();
  const fadeUp = pickVariants(fadeInUp, reduced);

  const [status, setStatus] = useState<"idle" | "submitting" | "redirecting" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    business: "",
    currentState: "",
    whatYouNeed: "",
    brandDirection: "",
    launchTiming: "",
    targetRevenue: "",
    cashflows: "",
    termsAccepted: false,
    website: "",
  });

  const updateField = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const allFilled =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.business.trim() &&
    form.currentState.trim() &&
    form.whatYouNeed.trim() &&
    form.launchTiming &&
    form.targetRevenue &&
    form.cashflows &&
    form.termsAccepted;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allFilled || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/growth-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          business: form.business.trim(),
          currentState: form.currentState.trim(),
          whatYouNeed: form.whatYouNeed.trim(),
          brandDirection: form.brandDirection.trim(),
          launchTiming: form.launchTiming,
          targetRevenue: form.targetRevenue,
          cashflows: form.cashflows,
          source: "get-started-growth",
          website: form.website,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Submit failed");
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
            Growth Partner
          </span>
          <h1 className={cn(tokens.typography.h1, "mt-2")}>
            Tell us about your raffle business
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
            Two minutes of questions so we know what to build, then £1,000 to kick
            off. After launch, 10% revenue share — drops to 5% above £25,000/month.
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            Reviewed within 24 hours. Full refund if we can&rsquo;t take you on.
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
              {/* Name & Email */}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <div className="space-y-2">
                  <label htmlFor="growth-name" className="text-sm font-medium">
                    Your name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="growth-name"
                    type="text"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(e) => updateField("name")(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="growth-email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="growth-email"
                    type="email"
                    placeholder="john@yourbrand.co.uk"
                    value={form.email}
                    onChange={(e) => updateField("email")(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Phone & Business */}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <div className="space-y-2">
                  <label htmlFor="growth-phone" className="text-sm font-medium">
                    Phone <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="growth-phone"
                    type="tel"
                    placeholder="+44 7123 456789"
                    value={form.phone}
                    onChange={(e) => updateField("phone")(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="growth-business" className="text-sm font-medium">
                    Business / brand name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="growth-business"
                    type="text"
                    placeholder="Lucky Comps Ltd"
                    value={form.business}
                    onChange={(e) => updateField("business")(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Current state */}
              <div className="space-y-2">
                <label htmlFor="growth-current" className="text-sm font-medium">
                  Where you&rsquo;re at right now{" "}
                  <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="growth-current"
                  rows={3}
                  placeholder="What platform are you on? Roughly how much monthly revenue? What&rsquo;s working, what isn&rsquo;t?"
                  value={form.currentState}
                  onChange={(e) => updateField("currentState")(e.target.value)}
                  required
                  className={cn(
                    "placeholder:text-muted-foreground dark:bg-input/30 border-input",
                    "w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs",
                    "transition-[color,box-shadow] outline-none md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "resize-none leading-relaxed",
                  )}
                />
              </div>

              {/* What you need */}
              <div className="space-y-2">
                <label htmlFor="growth-need" className="text-sm font-medium">
                  What you want from us <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="growth-need"
                  rows={3}
                  placeholder="What&rsquo;s missing today, what would unlock real growth, what specific things do you want built or improved?"
                  value={form.whatYouNeed}
                  onChange={(e) => updateField("whatYouNeed")(e.target.value)}
                  required
                  className={cn(
                    "placeholder:text-muted-foreground dark:bg-input/30 border-input",
                    "w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs",
                    "transition-[color,box-shadow] outline-none md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "resize-none leading-relaxed",
                  )}
                />
              </div>

              {/* Brand direction (optional) */}
              <div className="space-y-2">
                <label htmlFor="growth-brand" className="text-sm font-medium">
                  Brand direction{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="growth-brand"
                  rows={2}
                  placeholder="Logo, colours, vibe, sites you like the look of. Skip if you want us to start from scratch."
                  value={form.brandDirection}
                  onChange={(e) => updateField("brandDirection")(e.target.value)}
                  className={cn(
                    "placeholder:text-muted-foreground dark:bg-input/30 border-input",
                    "w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs",
                    "transition-[color,box-shadow] outline-none md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "resize-none leading-relaxed",
                  )}
                />
              </div>

              {/* Timing & Target revenue */}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <div className="space-y-2">
                  <label htmlFor="growth-timing" className="text-sm font-medium">
                    Target launch <span className="text-destructive">*</span>
                  </label>
                  <StyledSelect
                    id="growth-timing"
                    value={form.launchTiming}
                    onChange={updateField("launchTiming")}
                    options={launchTimingOptions}
                    placeholder="When do you want to be live?"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="growth-revenue" className="text-sm font-medium">
                    Target revenue in 6 months{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <StyledSelect
                    id="growth-revenue"
                    value={form.targetRevenue}
                    onChange={updateField("targetRevenue")}
                    options={targetRevenueOptions}
                    placeholder="Honest estimate"
                  />
                </div>
              </div>

              {/* Cashflows */}
              <div className="space-y-2">
                <label htmlFor="growth-cashflows" className="text-sm font-medium">
                  Cashflows merchant ID{" "}
                  <span className="text-destructive">*</span>
                </label>
                <StyledSelect
                  id="growth-cashflows"
                  value={form.cashflows}
                  onChange={updateField("cashflows")}
                  options={cashflowsOptions}
                  placeholder="Where you stand on payments"
                />
                <p className="text-xs text-muted-foreground/80">
                  We work exclusively with Cashflows for UK competition gateways
                  (best rates + KYB-friendly for our category).
                </p>
              </div>

              {/* Terms */}
              <div className="rounded-lg border border-electric/20 bg-electric/[0.03] p-4">
                <label className="flex cursor-pointer items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={form.termsAccepted}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        termsAccepted: e.target.checked,
                      }))
                    }
                    required
                    className="mt-0.5 size-4 cursor-pointer accent-electric"
                  />
                  <span className="leading-relaxed text-muted-foreground">
                    I understand the £1,000 covers setup and the custom build. After
                    launch, I&rsquo;ll pay 10% of paid revenue (5% on revenue above
                    £25,000/month), invoiced monthly. I&rsquo;m responsible for my
                    own Cashflows merchant fees and KYB onboarding.{" "}
                    <span className="text-destructive">*</span>
                  </span>
                </label>
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
                      Continue to payment — £1,000
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
                  Secure checkout via Stripe. Your card statement will show{" "}
                  <span className="font-medium">TURBO IT</span>.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
