"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { services } from "@/lib/content";
import {
  fadeInUp,
  pickVariants,
  useReducedMotion,
} from "@/lib/motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwfNsyHnXNKJVWEq3Scn501p-h7BWpVjtFJ67mbWZv63VvlcAzlkqN5PgoZ2Nt4ksU5/exec";

const budgetOptions = [
  "Under \u00a32.5k",
  "\u00a32.5k\u2013\u00a35k",
  "\u00a35k\u2013\u00a310k",
  "\u00a310k\u2013\u00a325k",
  "\u00a325k+",
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
        !value && "text-muted-foreground"
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
  service: string;
  budget: string;
  message: string;
}

export function ContactContent() {
  const reduced = useReducedMotion();
  const fadeUp = pickVariants(fadeInUp, reduced);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const updateField = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const allFilled =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.company.trim() &&
    form.service &&
    form.budget &&
    form.message.trim();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allFilled) return;

    setStatus("sending");
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          service: form.service,
          budget: form.budget,
          message: form.message.trim(),
          source: "contact-page",
        }),
      });
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });
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
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-12 lg:mb-16"
        >
          <span className={cn(tokens.typography.caption, "mb-3 inline-block text-electric sm:mb-4")}>
            Contact
          </span>
          <h1 className={cn(tokens.typography.h1, "mt-2")}>
            Let&rsquo;s Start Something Great
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
            Fill in the form below and we&rsquo;ll get back to you within 24 hours.
            All fields are required.
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
              <h2 className="text-xl font-semibold">Message sent!</h2>
              <p className="text-muted-foreground">
                Thanks for getting in touch. We&rsquo;ll respond within 24 hours.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border bg-card/50 p-5 shadow-sm sm:rounded-2xl sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name & Email */}
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-medium">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => updateField("name")(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-medium">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="john@company.co.uk"
                      value={form.email}
                      onChange={(e) => updateField("email")(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-phone" className="text-sm font-medium">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="+44 7123 456789"
                      value={form.phone}
                      onChange={(e) => updateField("phone")(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-company" className="text-sm font-medium">
                      Company <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contact-company"
                      type="text"
                      placeholder="Company Ltd."
                      value={form.company}
                      onChange={(e) => updateField("company")(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Service & Budget */}
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-service" className="text-sm font-medium">
                      Service Interest <span className="text-destructive">*</span>
                    </label>
                    <StyledSelect
                      id="contact-service"
                      value={form.service}
                      onChange={updateField("service")}
                      options={services.map((s) => s.title)}
                      placeholder="Select a service..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-budget" className="text-sm font-medium">
                      Budget Range <span className="text-destructive">*</span>
                    </label>
                    <StyledSelect
                      id="contact-budget"
                      value={form.budget}
                      onChange={updateField("budget")}
                      options={budgetOptions}
                      placeholder="Select budget..."
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) => updateField("message")(e.target.value)}
                    required
                    className={cn(
                      "placeholder:text-muted-foreground dark:bg-input/30 border-input",
                      "w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs",
                      "transition-[color,box-shadow] outline-none md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "resize-none leading-relaxed"
                    )}
                  />
                </div>

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
                        Send Message
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
