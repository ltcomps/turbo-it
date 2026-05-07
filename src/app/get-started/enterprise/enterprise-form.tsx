"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { fadeInUp, pickVariants, useReducedMotion } from "@/lib/motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const audiencePlatformOptions = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Twitch",
  "Email list",
  "Mixed / multi-platform",
  "Brand / no personal platform",
] as const;

const budgetOptions = [
  "£5,000 – £15,000",
  "£15,000 – £50,000",
  "£50,000 – £150,000",
  "£150,000+",
  "Open to discussion",
] as const;

const timelineOptions = [
  "This month",
  "Next 1–3 months",
  "3–6 months",
  "Exploring / no fixed date",
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
  company: string;
  audienceSize: string;
  audiencePlatform: string;
  goals: string;
  budget: string;
  timeline: string;
  website: string; // honeypot
}

export function EnterpriseForm() {
  const reduced = useReducedMotion();
  const fadeUp = pickVariants(fadeInUp, reduced);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    audienceSize: "",
    audiencePlatform: "",
    goals: "",
    budget: "",
    timeline: "",
    website: "",
  });

  const updateField = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const allFilled =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.company.trim() &&
    form.audiencePlatform &&
    form.goals.trim() &&
    form.budget &&
    form.timeline;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allFilled) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/enterprise-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          audienceSize: form.audienceSize.trim(),
          audiencePlatform: form.audiencePlatform,
          goals: form.goals.trim(),
          budget: form.budget,
          timeline: form.timeline,
          source: "get-started-enterprise",
          website: form.website,
        }),
      });
      if (!res.ok) throw new Error("Send failed");
      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        audienceSize: "",
        audiencePlatform: "",
        goals: "",
        budget: "",
        timeline: "",
        website: "",
      });
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
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
            Enterprise / Influencer
          </span>
          <h1 className={cn(tokens.typography.h1, "mt-2")}>
            Let&rsquo;s talk about something bespoke
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
            Custom builds for influencers, high-volume operators and brands that
            need something unmistakable. Founder-led, fully tailored, commercial
            terms shaped to the deal.
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            We&rsquo;ll come back to you within 24 hours.
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
          {status === "sent" ? (
            <div className="flex flex-col items-center gap-4 rounded-xl border bg-card/50 p-10 text-center shadow-sm sm:rounded-2xl sm:p-16">
              <div className="flex size-16 items-center justify-center rounded-full bg-green-500/10">
                <Send className="size-7 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold">Got it — thanks</h2>
              <p className="text-muted-foreground">
                We&rsquo;ll be in touch within 24 hours to schedule a call.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border bg-card/50 p-5 shadow-sm sm:rounded-2xl sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name & Email */}
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="ent-name" className="text-sm font-medium">
                      Your name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="ent-name"
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => updateField("name")(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ent-email" className="text-sm font-medium">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="ent-email"
                      type="email"
                      placeholder="john@yourbrand.co.uk"
                      value={form.email}
                      onChange={(e) => updateField("email")(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="ent-phone" className="text-sm font-medium">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="ent-phone"
                      type="tel"
                      placeholder="+44 7123 456789"
                      value={form.phone}
                      onChange={(e) => updateField("phone")(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ent-company" className="text-sm font-medium">
                      Company / personal brand{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="ent-company"
                      type="text"
                      placeholder="Your brand or company"
                      value={form.company}
                      onChange={(e) => updateField("company")(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Audience size & platform */}
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="ent-audience-size" className="text-sm font-medium">
                      Audience size{" "}
                      <span className="text-muted-foreground text-xs font-normal">
                        (optional)
                      </span>
                    </label>
                    <Input
                      id="ent-audience-size"
                      type="text"
                      placeholder="e.g. 250k IG followers, 80k email list"
                      value={form.audienceSize}
                      onChange={(e) => updateField("audienceSize")(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ent-platform" className="text-sm font-medium">
                      Main platform <span className="text-destructive">*</span>
                    </label>
                    <StyledSelect
                      id="ent-platform"
                      value={form.audiencePlatform}
                      onChange={updateField("audiencePlatform")}
                      options={audiencePlatformOptions}
                      placeholder="Where your audience lives"
                    />
                  </div>
                </div>

                {/* Goals */}
                <div className="space-y-2">
                  <label htmlFor="ent-goals" className="text-sm font-medium">
                    What you&rsquo;re looking to do{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="ent-goals"
                    rows={4}
                    placeholder="Co-branded raffle? Influencer-led launches? Custom game mechanic? Multi-brand operation? The more concrete the better."
                    value={form.goals}
                    onChange={(e) => updateField("goals")(e.target.value)}
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

                {/* Budget & Timeline */}
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="ent-budget" className="text-sm font-medium">
                      Rough budget <span className="text-destructive">*</span>
                    </label>
                    <StyledSelect
                      id="ent-budget"
                      value={form.budget}
                      onChange={updateField("budget")}
                      options={budgetOptions}
                      placeholder="What you'd consider"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ent-timeline" className="text-sm font-medium">
                      Timeline <span className="text-destructive">*</span>
                    </label>
                    <StyledSelect
                      id="ent-timeline"
                      value={form.timeline}
                      onChange={updateField("timeline")}
                      options={timelineOptions}
                      placeholder="When you want this live"
                    />
                  </div>
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
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4 sm:pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!allFilled || status === "sending"}
                    className="w-full bg-electric text-white hover:bg-electric/90 disabled:opacity-50 sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : status === "error" ? (
                      "Something went wrong — try again"
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send enquiry
                      </>
                    )}
                  </Button>
                  <span className="text-center text-xs text-muted-foreground sm:text-left">
                    We&rsquo;ll respond within 24 hours.
                  </span>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
