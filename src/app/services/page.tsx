"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Palette,
  Code,
  ShoppingCart,
  Search,
  Target,
  Server,
  Headphones,
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
  Palette,
  Code,
  ShoppingCart,
  Search,
  Target,
  Server,
  Headphones,
};

// Map services to their portfolio examples (only use each example once)
const serviceExamples: Record<string, string | null> = {
  "web-design": "renova-construction",
  "web-dev": "lucky-turbo",
  "ecommerce": "studio-style-mcr",
  "seo": null,
  "ads": null,
  "hosting": null,
  "it-support": null,
};

// Full service data with extended descriptions
const servicesData = [
  {
    id: "web-design",
    title: "Web Design",
    icon: "Palette",
    tagline: "Beautiful designs that convert visitors into customers",
    description:
      "Great design isn't just about looking good — it's about guiding users towards action. We create bespoke, conversion-focused designs that capture your brand's personality while delivering real business results. Every element is intentional, every interaction is considered.",
    features: [
      "Custom UI/UX design tailored to your brand",
      "Mobile-first responsive layouts",
      "Interactive prototypes for stakeholder approval",
      "Design systems for consistency at scale",
      "Accessibility compliance (WCAG 2.1)",
      "User research and journey mapping",
    ],
    benefits: [
      "Higher conversion rates",
      "Stronger brand perception",
      "Better user engagement",
      "Reduced bounce rates",
    ],
  },
  {
    id: "web-dev",
    title: "Web Development",
    icon: "Code",
    tagline: "Fast, scalable web applications built to last",
    description:
      "We build websites and web applications using modern technologies like Next.js, React, and TypeScript. Our code is clean, maintainable, and optimised for performance. Whether you need a marketing site, a web app, or a complex platform — we've got the expertise to deliver.",
    features: [
      "Next.js & React development",
      "Custom API development",
      "CMS integration (WordPress, Sanity, etc.)",
      "Third-party integrations",
      "Performance optimisation",
      "Progressive Web Apps (PWAs)",
    ],
    benefits: [
      "Lightning-fast load times",
      "Easy content management",
      "Scalable architecture",
      "Future-proof technology",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    icon: "ShoppingCart",
    tagline: "Online stores that turn browsers into buyers",
    description:
      "We build e-commerce experiences that sell. From Shopify and WooCommerce to fully custom solutions, we create online stores with seamless checkout flows, smart product discovery, and features that keep customers coming back. Your products deserve a platform that does them justice.",
    features: [
      "Shopify & WooCommerce expertise",
      "Custom e-commerce development",
      "Payment gateway integration",
      "Inventory & order management",
      "Product filtering & search",
      "Abandoned cart recovery",
    ],
    benefits: [
      "Increased sales conversions",
      "Lower cart abandonment",
      "Repeat customer growth",
      "Streamlined operations",
    ],
  },
  {
    id: "seo",
    title: "SEO",
    icon: "Search",
    tagline: "Get found on Google. Rank higher. Drive traffic.",
    description:
      "Search engine optimisation is how people find you. We use data-driven strategies to improve your visibility on Google, drive organic traffic, and outrank your competitors. From technical audits to content strategy — we cover all the bases.",
    features: [
      "Comprehensive keyword research",
      "On-page SEO optimisation",
      "Technical SEO audits & fixes",
      "Local SEO & Google Business Profile",
      "Content strategy & creation",
      "Link building & outreach",
    ],
    benefits: [
      "More organic traffic",
      "Higher search rankings",
      "Better qualified leads",
      "Long-term ROI",
    ],
  },
  {
    id: "ads",
    title: "Google & Meta Ads",
    icon: "Target",
    tagline: "Paid advertising that delivers real ROI",
    description:
      "Cut through the noise with targeted paid advertising. We run Google Search, Display, and Shopping campaigns alongside Facebook and Instagram ads — all optimised for maximum return on your ad spend. Stop wasting budget on clicks that don't convert.",
    features: [
      "Google Search & Display campaigns",
      "Google Shopping ads",
      "Facebook & Instagram advertising",
      "Remarketing & retargeting",
      "A/B testing & optimisation",
      "Conversion tracking setup",
    ],
    benefits: [
      "Immediate visibility",
      "Precise audience targeting",
      "Measurable results",
      "Scalable growth",
    ],
  },
  {
    id: "hosting",
    title: "Hosting & Maintenance",
    icon: "Server",
    tagline: "99.9% uptime. Zero stress.",
    description:
      "Your website is your digital storefront — it needs to be online, fast, and secure 24/7. We provide managed hosting with automatic backups, security monitoring, SSL certificates, and regular updates. Sleep easy knowing your site is in safe hands.",
    features: [
      "Managed cloud hosting",
      "SSL certificates & security",
      "Automatic daily backups",
      "24/7 uptime monitoring",
      "Regular software updates",
      "Performance optimisation",
    ],
    benefits: [
      "Peace of mind",
      "Faster load times",
      "Enhanced security",
      "Expert support",
    ],
  },
  {
    id: "it-support",
    title: "IT Support",
    icon: "Headphones",
    tagline: "Reliable tech support for your business",
    description:
      "Technology should help your business run smoothly, not slow it down. We provide responsive IT support for small and medium businesses — from helpdesk and network management to cloud migration and cyber security. Real humans, real solutions.",
    features: [
      "Helpdesk & remote support",
      "Network setup & management",
      "Cloud migration (Microsoft 365, Google)",
      "Cyber security assessments",
      "Hardware procurement",
      "IT strategy consulting",
    ],
    benefits: [
      "Reduced downtime",
      "Improved productivity",
      "Cost-effective IT",
      "Expert guidance",
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
            What We Do
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn(tokens.typography.h1, "mx-auto max-w-4xl")}
          >
            Digital services that drive real results
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
            From concept to launch and beyond — comprehensive solutions for
            businesses that want to grow online.
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
