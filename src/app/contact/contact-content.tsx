"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { siteConfig, services } from "@/lib/content";
import { fadeInUp, staggerContainer, staggerItem, pickVariants, useReducedMotion } from "@/lib/motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const budgetOptions = [
  "Under \u00a32.5k",
  "\u00a32.5k\u2013\u00a35k",
  "\u00a35k\u2013\u00a310k",
  "\u00a310k\u2013\u00a325k",
  "\u00a325k+",
] as const;

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.address,
    href: undefined,
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Styled select wrapper (matching shadcn Input styling)                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  ContactContent                                                             */
/* -------------------------------------------------------------------------- */

export function ContactContent() {
  const reduced = useReducedMotion();
  const containerVariants = pickVariants(staggerContainer, reduced);
  const itemVariants = pickVariants(staggerItem, reduced);
  const fadeUp = pickVariants(fadeInUp, reduced);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const updateField = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <section className={cn(sectionPadding)}>
      <div className={cn(containerClass)}>
        {/* ----- Page Header ----- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className={cn(tokens.typography.caption, "mb-4 inline-block text-electric")}>
            Contact
          </span>
          <h1 className={cn(tokens.typography.h1, "mt-2")}>
            Let&rsquo;s Start Something Great
          </h1>
          <p className={cn(tokens.typography.bodyLg, "mt-4 text-muted-foreground")}>
            Ready to accelerate your digital presence? Get in touch and
            we&rsquo;ll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* ----- Two-column layout ----- */}
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* ---- Left Column: Contact info ---- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <motion.div variants={itemVariants}>
              <h2 className={cn(tokens.typography.h3)}>Get in Touch</h2>
              <p className={cn(tokens.typography.body, "mt-3 text-muted-foreground")}>
                Whether you have a project in mind or just want to explore how
                we can help, we&rsquo;d love to hear from you. No pressure, no
                jargon &mdash; just a friendly chat about your goals.
              </p>
            </motion.div>

            <div className="mt-10 space-y-6">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <motion.div
                    key={detail.label}
                    variants={itemVariants}
                    className="flex items-start gap-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {detail.label}
                      </p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="text-sm font-semibold transition-colors hover:text-electric"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold">{detail.value}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative divider on large screens */}
            <motion.div
              variants={itemVariants}
              className="mt-10 hidden lg:block"
            >
              <div className="h-px w-full bg-border" />
              <p className={cn(tokens.typography.bodySm, "mt-6 text-muted-foreground")}>
                Prefer a call? Book a free 30-minute discovery session and
                we&rsquo;ll discuss your project requirements in detail.
              </p>
            </motion.div>
          </motion.div>

          {/* ---- Right Column: Form ---- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6"
                noValidate
              >
                {/* Name & Email */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-medium"
                    >
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
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium"
                    >
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

                {/* Company */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-company"
                    className="text-sm font-medium"
                  >
                    Company
                  </label>
                  <Input
                    id="contact-company"
                    type="text"
                    placeholder="Company Ltd."
                    value={form.company}
                    onChange={(e) => updateField("company")(e.target.value)}
                  />
                </div>

                {/* Service & Budget */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-service"
                      className="text-sm font-medium"
                    >
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
                    <label
                      htmlFor="contact-budget"
                      className="text-sm font-medium"
                    >
                      Budget Range
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
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us about your project, goals, and timeline..."
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
                <div className="flex items-center gap-4 pt-2">
                  <Button
                    type="button"
                    size="lg"
                    className="bg-electric text-white hover:bg-electric/90"
                  >
                    <Send className="size-4" />
                    Send Message
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    We&rsquo;ll respond within 24 hours.
                  </span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
