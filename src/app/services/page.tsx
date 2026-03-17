"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Trophy,
  CreditCard,
  Timer,
  ShieldCheck,
  Target,
  Server,
  ArrowRight,
  Check,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { featuredWork } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/glow-card";
import { CardContent } from "@/components/ui/card";
import { CtaSection } from "@/components/cta-section";
import { PageTransition } from "@/components/page-transition";

const iconMap: Record<string, LucideIcon> = {
  Trophy,
  CreditCard,
  Timer,
  ShieldCheck,
  Target,
  Server,
};

// Map services to their portfolio examples
const serviceExamples: Record<string, string | null> = {
  "platform-dev": "lucky-turbo",
  "payments": "mr-xca",
  "draws": null,
  "compliance": null,
  "marketing": null,
  "hosting": null,
};

// Full service data with extended descriptions
const servicesData = [
  {
    id: "platform-dev",
    title: "Platform Development",
    icon: "Trophy",
    tagline: "Custom competition websites built to sell tickets",
    description:
      "We design and develop bespoke competition, raffle, and prize draw platforms from scratch. Every platform is built to create excitement, build trust with players, and drive ticket sales. From user registration to admin dashboards — we handle the full stack.",
    features: [
      "Custom raffle & competition websites",
      "Player registration & account management",
      "Mobile-first responsive design",
      "Admin dashboard for competition management",
      "Winner showcase & social proof features",
      "SEO-optimised for competition keywords",
    ],
    benefits: [
      "Higher ticket sales",
      "Player trust & retention",
      "Full brand control",
      "Scalable architecture",
    ],
  },
  {
    id: "payments",
    title: "Payment & Ticketing",
    icon: "CreditCard",
    tagline: "Secure, fast ticket purchasing that converts",
    description:
      "Ticket sales are the lifeblood of any competition business. We build seamless checkout experiences with cart functionality, multiple payment methods, and instant confirmation. Every payment flow is optimised for conversion and built to handle peak traffic during competition launches.",
    features: [
      "Stripe, PayPal & specialist gateway integration",
      "Shopping cart with multi-ticket purchases",
      "One-click repeat purchases for returning players",
      "Automatic ticket allocation & confirmation",
      "Refund & dispute management tools",
      "PCI-compliant payment handling",
    ],
    benefits: [
      "Higher conversion rates",
      "Faster checkout",
      "Reduced cart abandonment",
      "Secure transactions",
    ],
  },
  {
    id: "draws",
    title: "Draw & Prize Systems",
    icon: "Timer",
    tagline: "Automated, transparent draws that players trust",
    description:
      "Trust is everything in competitions. We build automated draw systems with provably fair selection, live countdown timers, instant win mechanics, and public winner announcements. Players see the process, trust the results, and come back for more.",
    features: [
      "Automated random prize draws",
      "Instant win game mechanics",
      "Live countdown timers",
      "Winner notification (email, SMS, in-app)",
      "Public draw results & winner history",
      "Provably fair selection algorithms",
    ],
    benefits: [
      "Player trust",
      "Automated operations",
      "Repeat engagement",
      "Transparent results",
    ],
  },
  {
    id: "compliance",
    title: "Compliance & Regulation",
    icon: "ShieldCheck",
    tagline: "UK competition law compliant from day one",
    description:
      "Running competitions in the UK comes with legal requirements. We build compliance into every platform — age verification, responsible gambling features, proper terms and conditions, and data protection. You focus on prizes; we handle the regulations.",
    features: [
      "UK Gambling Commission awareness",
      "Competition terms & conditions framework",
      "Age verification integration",
      "Responsible gambling tools & self-exclusion",
      "GDPR-compliant data handling",
      "Anti-fraud measures",
    ],
    benefits: [
      "Legal compliance",
      "Player protection",
      "Reduced risk",
      "Industry credibility",
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Growth",
    icon: "Target",
    tagline: "Acquire players and keep them coming back",
    description:
      "Building the platform is only half the battle — you need players. We help competition businesses grow with targeted advertising, SEO for competition keywords, social media strategy, and player retention campaigns. We understand what drives ticket sales.",
    features: [
      "SEO for competition & raffle keywords",
      "Google Search & Display campaigns",
      "Facebook & Instagram advertising",
      "Email & SMS marketing automation",
      "Referral & loyalty programmes",
      "Social media content strategy",
    ],
    benefits: [
      "More players",
      "Lower acquisition cost",
      "Higher retention",
      "Scalable growth",
    ],
  },
  {
    id: "hosting",
    title: "Hosting & Infrastructure",
    icon: "Server",
    tagline: "99.9% uptime — even during competition launches",
    description:
      "Competition launches create massive traffic spikes. Your platform can't go down when thousands of players are trying to buy tickets. We build on edge-hosted infrastructure with real-time capabilities, global CDN, and 24/7 monitoring to keep your competitions running flawlessly.",
    features: [
      "Edge-hosted on Cloudflare (global CDN)",
      "Real-time infrastructure for live updates",
      "Auto-scaling for traffic spikes",
      "SSL certificates & DDoS protection",
      "Automatic daily backups",
      "24/7 uptime monitoring & alerts",
    ],
    benefits: [
      "Zero downtime launches",
      "Global performance",
      "Real-time updates",
      "Peace of mind",
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ServicesPage() {
  return (
    <PageTransition>
    <main>
      {/* Hero Section */}
      <section className={cn(sectionPadding, "relative overflow-hidden")}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-electric/5 blur-[120px]"
        />

        <div className={cn(containerClass, "relative z-10 text-center")}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(tokens.typography.caption, "mb-4 inline-block text-electric")}
          >
            What We Build
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn(tokens.typography.h1, "mx-auto max-w-4xl")}
          >
            Everything you need to launch and grow a competition business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              tokens.typography.bodyLg,
              "mx-auto mt-6 max-w-2xl text-muted-foreground"
            )}
          >
            From platform development to payment integration, automated draws,
            and player acquisition — we handle it all.
          </motion.p>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {servicesData.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Link
                  key={service.id}
                  href={`#${service.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium transition-all hover:border-electric/50 hover:bg-electric/10"
                >
                  {Icon && <Icon className="size-4 text-electric" />}
                  {service.title}
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Individual Service Sections */}
      {servicesData.map((service, index) => {
        const Icon = iconMap[service.icon];
        const exampleSlug = serviceExamples[service.id];
        const example = exampleSlug
          ? featuredWork.find((w) => w.slug === exampleSlug)
          : null;
        const isEven = index % 2 === 0;

        return (
          <section
            key={service.id}
            id={service.id}
            className={cn(
              sectionPadding,
              "scroll-mt-20",
              !isEven && "bg-muted/30"
            )}
          >
            <div className={containerClass}>
              <div
                className={cn(
                  "grid gap-12 lg:gap-16",
                  example ? "lg:grid-cols-2 lg:items-center" : "lg:grid-cols-1"
                )}
              >
                {/* Content */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className={cn(!isEven && example && "lg:order-2")}
                >
                  <motion.div
                    variants={fadeInUp}
                    className="flex items-center gap-3"
                  >
                    <div className="flex size-12 items-center justify-center rounded-xl bg-electric/10 text-electric">
                      {Icon && <Icon className="size-6" />}
                    </div>
                    <span className={cn(tokens.typography.caption, "text-electric")}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.div>

                  <motion.h2
                    variants={fadeInUp}
                    className={cn(tokens.typography.h2, "mt-4")}
                  >
                    {service.title}
                  </motion.h2>

                  <motion.p
                    variants={fadeInUp}
                    className={cn(
                      tokens.typography.bodyLg,
                      "mt-2 text-electric"
                    )}
                  >
                    {service.tagline}
                  </motion.p>

                  <motion.p
                    variants={fadeInUp}
                    className={cn(
                      tokens.typography.body,
                      "mt-4 text-muted-foreground"
                    )}
                  >
                    {service.description}
                  </motion.p>

                  {/* Features */}
                  <motion.div variants={fadeInUp} className="mt-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      What&apos;s included
                    </h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Benefits */}
                  <motion.div
                    variants={fadeInUp}
                    className="mt-8 flex flex-wrap gap-2"
                  >
                    {service.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="rounded-full bg-electric/10 px-3 py-1 text-xs font-medium text-electric"
                      >
                        {benefit}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeInUp} className="mt-8">
                    <Button asChild>
                      <Link href="/contact">
                        Discuss your project
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Example Project Card */}
                {example && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(!isEven && "lg:order-1")}
                  >
                    <GlowCard className="overflow-hidden">
                      <div className="aspect-[4/3] relative bg-gradient-to-br from-muted to-muted/50">
                        {example.screenshot ? (
                          <Image
                            src={example.screenshot}
                            alt={example.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${example.color}20 0%, ${example.color}05 100%)`,
                            }}
                          >
                            <span
                              className="text-4xl font-bold opacity-20"
                              style={{ color: example.color }}
                            >
                              {example.title}
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <span
                              className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{
                                backgroundColor: `${example.color}20`,
                                color: example.color,
                              }}
                            >
                              {example.category}
                            </span>
                            <h4 className="mt-2 text-lg font-semibold">
                              {example.title}
                            </h4>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                              {example.blurb}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/work/${example.slug}`}>
                              View case study
                            </Link>
                          </Button>
                          {example.liveUrl && (
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={example.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Visit site
                                <ExternalLink className="ml-1.5 size-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </GlowCard>
                  </motion.div>
                )}

                {/* Placeholder for services without examples */}
                {!example && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden lg:block"
                  >
                    <div className="relative aspect-square max-w-md mx-auto">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-electric/10 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {Icon && (
                          <Icon className="size-32 text-electric/20" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <CtaSection />
    </main>
    </PageTransition>
  );
}
