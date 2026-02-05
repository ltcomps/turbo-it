"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/placeholder-image";
import { TagChip } from "@/components/tag-chip";
import { SectionHeader } from "@/components/section-header";
import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { useReducedMotion, fadeInUp, pickVariants } from "@/lib/motion";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  categoryTag: string;
  blurb: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  color: string;
  liveUrl?: string;
}

interface CaseStudyResult {
  metric: string;
  label: string;
  description: string;
}

interface CaseStudyData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  duration: string;
  year: string;
  overview: string;
  problem: string;
  approach: string;
  solution: string;
  results: CaseStudyResult[];
  techStack: string[];
  liveUrl: string;
}

interface CaseStudyContentProps {
  item: PortfolioItem;
  caseStudy: CaseStudyData;
}

/* -------------------------------------------------------------------------- */
/* Scroll-reveal wrapper                                                      */
/* -------------------------------------------------------------------------- */

function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const variants = pickVariants(fadeInUp, reduced);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Gallery placeholder colors derived from the project color                  */
/* -------------------------------------------------------------------------- */

function deriveGalleryColors(base: string): string[] {
  const num = parseInt(base.replace("#", ""), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;

  const shift = (channel: number, amount: number) =>
    Math.min(255, Math.max(0, channel + amount));

  const toHex = (rv: number, gv: number, bv: number) =>
    `#${[rv, gv, bv].map((c) => c.toString(16).padStart(2, "0")).join("")}`;

  return [
    base,
    toHex(shift(r, 30), shift(g, -20), shift(b, 10)),
    toHex(shift(r, -30), shift(g, 20), shift(b, 40)),
    toHex(shift(r, 15), shift(g, 15), shift(b, -30)),
    toHex(shift(r, -15), shift(g, -15), shift(b, 20)),
  ];
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function CaseStudyContent({ item, caseStudy }: CaseStudyContentProps) {
  const galleryColors = deriveGalleryColors(item.color);

  return (
    <main>
      {/* ================================================================== */}
      {/* A. Hero                                                            */}
      {/* ================================================================== */}
      <section className={sectionPadding}>
        <div className={containerClass}>
          {/* Back link */}
          <RevealSection>
            <Link
              href="/work"
              className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Work
            </Link>
          </RevealSection>

          <RevealSection>
            <Badge
              variant="secondary"
              className="mb-4 border"
              style={{ borderColor: item.color, color: item.color }}
            >
              {item.category}
            </Badge>

            <h1 className={cn(tokens.typography.h1, "mb-4")}>
              {item.title}
            </h1>

            <p
              className={cn(
                tokens.typography.bodyLg,
                "mb-8 max-w-2xl text-muted-foreground"
              )}
            >
              {caseStudy.subtitle}
            </p>

            {/* Meta row */}
            <div className="mb-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">Client</span>{" "}
                &mdash; {caseStudy.client}
              </div>
              <div>
                <span className="font-semibold text-foreground">Duration</span>{" "}
                &mdash; {caseStudy.duration}
              </div>
              <div>
                <span className="font-semibold text-foreground">Year</span>{" "}
                &mdash; {caseStudy.year}
              </div>
            </div>

            {/* Live site button */}
            <div className="mb-10">
              <Button asChild variant="outline">
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live Site
                  <ExternalLink className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </RevealSection>

          {/* Hero image */}
          <RevealSection>
            <div className="overflow-hidden rounded-2xl">
              <PlaceholderImage
                color={item.color}
                aspectRatio="21/9"
                className="w-full"
              />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* B. Overview                                                        */}
      {/* ================================================================== */}
      <section className="pb-20 sm:pb-28 lg:pb-32">
        <div className={containerClass}>
          <RevealSection>
            <SectionHeader
              badge="Overview"
              title="The Brief"
              align="left"
            />
            <p className={cn(tokens.typography.bodyLg, "max-w-3xl text-muted-foreground")}>
              {caseStudy.overview}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* C. Problem                                                         */}
      {/* ================================================================== */}
      <section className="bg-muted/50 py-20 sm:py-28 lg:py-32">
        <div className={containerClass}>
          <RevealSection>
            <SectionHeader
              badge="Challenge"
              title="The Problem"
              align="left"
            />
            <p className={cn(tokens.typography.bodyLg, "max-w-3xl text-muted-foreground")}>
              {caseStudy.problem}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* D. Approach                                                        */}
      {/* ================================================================== */}
      <section className={sectionPadding}>
        <div className={containerClass}>
          <RevealSection>
            <SectionHeader
              badge="Process"
              title="Our Approach"
              align="left"
            />
            <p className={cn(tokens.typography.bodyLg, "max-w-3xl text-muted-foreground")}>
              {caseStudy.approach}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* E. Solution                                                        */}
      {/* ================================================================== */}
      <section className="bg-muted/50 py-20 sm:py-28 lg:py-32">
        <div className={containerClass}>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <RevealSection>
              <SectionHeader
                badge="Delivery"
                title="The Solution"
                align="left"
                className="mb-6"
              />
              <p className={cn(tokens.typography.bodyLg, "text-muted-foreground")}>
                {caseStudy.solution}
              </p>
            </RevealSection>

            <RevealSection delay={0.15}>
              <div className="overflow-hidden rounded-2xl">
                <PlaceholderImage
                  color={item.color}
                  aspectRatio="4/3"
                  className="w-full"
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* F. Results                                                         */}
      {/* ================================================================== */}
      <section className={sectionPadding}>
        <div className={containerClass}>
          <RevealSection>
            <SectionHeader
              badge="Impact"
              title="The Results"
              subtitle="Key outcomes and deliverables from this project."
            />
          </RevealSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudy.results.map((result, index) => (
              <RevealSection key={result.label} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 text-center transition-colors hover:border-[var(--glow)]/30">
                  {/* Accent top bar */}
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: item.color }}
                  />
                  <span
                    className="text-4xl font-bold tracking-tight"
                    style={{ color: item.color }}
                  >
                    {result.metric}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {result.label}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {result.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* G. Gallery - Screenshots                                           */}
      {/* ================================================================== */}
      <section className="bg-muted/50 py-20 sm:py-28 lg:py-32">
        <div className={containerClass}>
          <RevealSection>
            <SectionHeader
              badge="Gallery"
              title="Project Showcase"
              subtitle="Screenshots from the live website."
            />
          </RevealSection>

          {/* Top row - 3 different sections of the site */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <RevealSection delay={0}>
              <div className="overflow-hidden rounded-xl bg-white">
                <img
                  src={`https://image.thum.io/get/width/800/crop/600/${caseStudy.liveUrl}`}
                  alt={`${item.title} - Hero section`}
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </RevealSection>
            <RevealSection delay={0.1}>
              <div className="overflow-hidden rounded-xl bg-white">
                <img
                  src={`https://image.thum.io/get/width/800/crop/600/viewportHeight/1200/${caseStudy.liveUrl}`}
                  alt={`${item.title} - Middle section`}
                  className="aspect-[4/3] w-full object-cover object-bottom transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </RevealSection>
            <RevealSection delay={0.2}>
              <div className="overflow-hidden rounded-xl bg-white">
                <img
                  src={`https://image.thum.io/get/width/800/crop/600/viewportHeight/2000/${caseStudy.liveUrl}`}
                  alt={`${item.title} - Lower section`}
                  className="aspect-[4/3] w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </RevealSection>
          </div>

          {/* Full-width hero screenshot */}
          <RevealSection className="mt-4">
            <div className="overflow-hidden rounded-xl bg-white">
              <img
                src={`https://image.thum.io/get/width/1400/crop/600/${caseStudy.liveUrl}`}
                alt={`${item.title} - Full width view`}
                className="aspect-[21/9] w-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </RevealSection>

          {/* Bottom row - 2 more views */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <RevealSection delay={0}>
              <div className="overflow-hidden rounded-xl bg-white">
                <img
                  src={`https://image.thum.io/get/width/900/crop/506/viewportHeight/800/${caseStudy.liveUrl}`}
                  alt={`${item.title} - Feature section`}
                  className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </RevealSection>
            <RevealSection delay={0.1}>
              <div className="overflow-hidden rounded-xl bg-white">
                <img
                  src={`https://image.thum.io/get/width/900/crop/506/viewportHeight/1500/${caseStudy.liveUrl}`}
                  alt={`${item.title} - Content section`}
                  className="aspect-[16/9] w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* H. Tech Stack                                                      */}
      {/* ================================================================== */}
      <section className={sectionPadding}>
        <div className={containerClass}>
          <RevealSection>
            <SectionHeader
              badge="Technology"
              title="Tech Stack"
              subtitle="The tools and technologies behind this project."
            />
          </RevealSection>

          <RevealSection>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {caseStudy.techStack.map((tech) => (
                <TagChip
                  key={tech}
                  label={tech}
                  color={item.color}
                  variant="dot"
                  className="px-4 py-2 text-sm"
                />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* I. CTA                                                             */}
      {/* ================================================================== */}
      <section className="bg-muted/50 py-20 sm:py-28 lg:py-32">
        <div className={containerClass}>
          <RevealSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className={cn(tokens.typography.h2, "mb-4")}>
                Want something like this?
              </h2>
              <p
                className={cn(
                  tokens.typography.bodyLg,
                  "mb-8 text-muted-foreground"
                )}
              >
                Let&apos;s talk about your project. We&apos;d love to help.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/work">View More Work</Link>
                </Button>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
