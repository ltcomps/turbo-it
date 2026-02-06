"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  MessageCircle,
  Calendar,
  Mail,
  Phone,
  Send,
  ArrowRight,
  Clock,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { services } from "@/lib/content";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  pickVariants,
  useReducedMotion,
} from "@/lib/motion";
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

/* -------------------------------------------------------------------------- */
/*  Styled select wrapper                                                      */
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
/*  Contact option cards data                                                  */
/* -------------------------------------------------------------------------- */

const contactOptions = [
  {
    id: "quote",
    icon: Zap,
    title: "Get an Instant Project Quote",
    subtext: "Answer a few quick questions and get a tailored estimate. Takes under 60 seconds.",
    cta: "Get Instant Quote",
    href: "/quote",
    tier: "primary" as const,
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "Chat on WhatsApp",
    subtext: "Fastest response \u2014 usually within minutes",
    cta: "Chat on WhatsApp",
    href: "https://wa.me/441611234567",
    external: true,
    tier: "secondary" as const,
  },
  {
    id: "call",
    icon: Calendar,
    title: "Book a Free 15-Minute Call",
    subtext: "Ideal for websites, ads, and ongoing work",
    cta: "Book a Call",
    href: "https://cal.com",
    external: true,
    tier: "secondary" as const,
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Us",
    subtext: "For proposals, partnerships, or detailed enquiries",
    value: "hello@turboit.uk",
    href: "mailto:hello@turboit.uk",
    tier: "tertiary" as const,
  },
  {
    id: "phone",
    icon: Phone,
    title: "Call Us",
    subtext: "Mon\u2013Fri, 9am\u20136pm",
    value: "+44 161 123 4567",
    href: "tel:+441611234567",
    tier: "tertiary" as const,
  },
];

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

  const primary = contactOptions.find((o) => o.tier === "primary")!;
  const secondary = contactOptions.filter((o) => o.tier === "secondary");
  const tertiary = contactOptions.filter((o) => o.tier === "tertiary");

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
            Choose how you&rsquo;d like to get in touch. We&rsquo;re fast,
            friendly, and ready to help.
          </p>
        </motion.div>

        {/* ----- Contact Options ----- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* === 1. Primary — Instant Quote === */}
          <motion.div variants={itemVariants}>
            <Link
              href={primary.href}
              className="group relative block overflow-hidden rounded-2xl border border-electric/30 bg-electric/5 p-8 transition-all duration-300 hover:border-electric/60 hover:bg-electric/10 sm:p-10"
            >
              <div className="absolute -right-12 -top-12 size-40 rounded-full bg-electric/10 blur-3xl transition-all duration-500 group-hover:bg-electric/20" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-electric/15 text-electric transition-colors group-hover:bg-electric/25">
                    <Zap className="size-7" />
                  </div>
                  <div>
                    <h2 className={cn(tokens.typography.h4)}>{primary.title}</h2>
                    <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                      {primary.subtext}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-electric">
                      <Clock className="size-3.5" />
                      <span>Under 60 seconds</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="shrink-0 bg-electric text-white hover:bg-electric/90 group-hover:shadow-lg group-hover:shadow-electric/20"
                  tabIndex={-1}
                  asChild
                >
                  <span>
                    {primary.cta}
                    <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </Link>
          </motion.div>

          {/* === 2 & 3. Secondary — WhatsApp + Book a Call === */}
          <div className="grid gap-6 sm:grid-cols-2">
            {secondary.map((option) => {
              const Icon = option.icon;
              return (
                <motion.div key={option.id} variants={itemVariants}>
                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:border-electric/40 hover:shadow-lg hover:shadow-electric/5 sm:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-electric/10 text-electric transition-colors group-hover:bg-electric/20">
                        <Icon className="size-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{option.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {option.subtext}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-electric">
                      {option.cta}
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* === 4 & 5. Tertiary — Email + Phone === */}
          <div className="grid gap-6 sm:grid-cols-2">
            {tertiary.map((option) => {
              const Icon = option.icon;
              return (
                <motion.div key={option.id} variants={itemVariants}>
                  <a
                    href={option.href}
                    className="group flex items-center gap-4 rounded-xl border bg-card/50 p-5 transition-all duration-300 hover:border-electric/30 hover:bg-card"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-electric/10 group-hover:text-electric">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{option.title}</p>
                      <p className="text-xs text-muted-foreground">{option.subtext}</p>
                      {"value" in option && option.value && (
                        <p className="mt-1 truncate text-sm font-medium text-electric">
                          {option.value}
                        </p>
                      )}
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ----- Divider ----- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="my-20"
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Prefer forms? Send us a message
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </motion.div>

        {/* ----- Fallback Form ----- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-2xl border bg-card/50 p-6 shadow-sm sm:p-8">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6"
              noValidate
            >
              {/* Name & Email */}
              <div className="grid gap-6 sm:grid-cols-2">
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

              {/* Company */}
              <div className="space-y-2">
                <label htmlFor="contact-company" className="text-sm font-medium">
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
                <label htmlFor="contact-message" className="text-sm font-medium">
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
    </section>
  );
}
