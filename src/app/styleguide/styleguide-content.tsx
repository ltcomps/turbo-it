"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  pickVariants,
  useReducedMotion,
} from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { GlowCard } from "@/components/glow-card";
import { TagChip } from "@/components/tag-chip";
import { PricingCards } from "@/components/pricing-cards";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface ColorSwatch {
  label: string;
  variable: string;
  className: string;
}

type AnimationKey = "fade-in" | "slide-up" | "scale-in";

/* -------------------------------------------------------------------------- */
/*  Section wrapper                                                            */
/* -------------------------------------------------------------------------- */

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const fadeUp = pickVariants(fadeInUp, reduced);

  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="scroll-mt-24"
    >
      <div className="mb-8">
        <h2 className={cn(tokens.typography.h3)}>{title}</h2>
        <p className={cn(tokens.typography.body, "mt-2 text-muted-foreground")}>
          {description}
        </p>
      </div>
      {children}
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Color palette data                                                         */
/* -------------------------------------------------------------------------- */

const colorSwatches: ColorSwatch[] = [
  { label: "Background", variable: "--background", className: "bg-background border" },
  { label: "Foreground", variable: "--foreground", className: "bg-foreground" },
  { label: "Primary", variable: "--primary", className: "bg-primary" },
  { label: "Secondary", variable: "--secondary", className: "bg-secondary" },
  { label: "Muted", variable: "--muted", className: "bg-muted" },
  { label: "Accent", variable: "--accent", className: "bg-accent" },
  { label: "Electric", variable: "--electric", className: "bg-electric" },
  { label: "Destructive", variable: "--destructive", className: "bg-destructive" },
  { label: "Border", variable: "--border", className: "bg-border" },
];

/* -------------------------------------------------------------------------- */
/*  StyleguideContent                                                          */
/* -------------------------------------------------------------------------- */

export function StyleguideContent() {
  const reduced = useReducedMotion();
  const fadeUp = pickVariants(fadeInUp, reduced);
  const containerVariants = pickVariants(staggerContainer, reduced);
  const itemVariants = pickVariants(staggerItem, reduced);

  /* Animation demo state */
  const [activeAnimation, setActiveAnimation] = useState<AnimationKey | null>(null);
  const [staggerKey, setStaggerKey] = useState(0);

  const triggerAnimation = (key: AnimationKey) => {
    setActiveAnimation(null);
    requestAnimationFrame(() => setActiveAnimation(key));
  };

  const animationVariants = {
    "fade-in": {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.8 } },
    },
    "slide-up": {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } },
    },
    "scale-in": {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const } },
    },
  } as const;

  return (
    <div className={cn(sectionPadding)}>
      <div className={cn(containerClass)}>
        {/* ---------------------------------------------------------------- */}
        {/* Page header                                                      */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <span className={cn(tokens.typography.caption, "mb-4 inline-block text-electric")}>
            Design System
          </span>
          <h1 className={cn(tokens.typography.h1, "mt-2")}>Styleguide</h1>
          <p className={cn(tokens.typography.bodyLg, "mt-4 max-w-2xl text-muted-foreground")}>
            A living reference for every visual element in the Turbo IT design
            system. Typography, colour, components, and animation &mdash; all in
            one place.
          </p>
        </motion.div>

        <div className="space-y-24">
          {/* ================================================================ */}
          {/* a. Typography Scale                                              */}
          {/* ================================================================ */}
          <Section
            id="typography"
            title="Typography Scale"
            description="Our type scale is built for clarity at every size. Based on Inter with a monospaced fallback for code."
          >
            <div className="space-y-8 rounded-xl border bg-card p-6 sm:p-8">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Display &middot; text-7xl font-bold</p>
                <p className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[0.9]">
                  Display Text
                </p>
              </div>

              <Separator />

              <div>
                <p className="mb-1 text-xs text-muted-foreground">H1 &middot; text-6xl font-bold</p>
                <p className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[0.95]">
                  Heading One
                </p>
              </div>

              <Separator />

              <div>
                <p className="mb-1 text-xs text-muted-foreground">H2 &middot; text-4xl font-bold</p>
                <p className="text-3xl font-bold tracking-tight sm:text-4xl leading-tight">
                  Heading Two
                </p>
              </div>

              <Separator />

              <div>
                <p className="mb-1 text-xs text-muted-foreground">H3 &middot; text-3xl font-semibold</p>
                <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Heading Three
                </p>
              </div>

              <Separator />

              <div>
                <p className="mb-1 text-xs text-muted-foreground">H4 &middot; text-2xl font-semibold</p>
                <p className="text-xl font-semibold sm:text-2xl">
                  Heading Four
                </p>
              </div>

              <Separator />

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Body &middot; text-base</p>
                <p className="text-base leading-relaxed">
                  Body text is used for the majority of content. It should be easy
                  to read at any screen size with comfortable line-height and
                  adequate contrast against the background.
                </p>
              </div>

              <Separator />

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Body Small &middot; text-sm</p>
                <p className="text-sm leading-relaxed">
                  Smaller body text for supporting content, meta information, and
                  secondary descriptions. Still fully legible.
                </p>
              </div>

              <Separator />

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Caption &middot; uppercase tracking-widest text-xs</p>
                <p className="text-xs font-medium uppercase tracking-widest">
                  Caption Text
                </p>
              </div>

              <Separator />

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Mono &middot; font-mono text-sm</p>
                <p className="font-mono text-sm">
                  const turboIT = &quot;premium digital experiences&quot;;
                </p>
              </div>
            </div>
          </Section>

          {/* ================================================================ */}
          {/* b. Colour Palette                                                */}
          {/* ================================================================ */}
          <Section
            id="colours"
            title="Colour Palette"
            description="Semantic colour tokens that adapt to light and dark themes automatically."
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {colorSwatches.map((swatch) => (
                <div key={swatch.variable} className="space-y-2">
                  <div
                    className={cn(
                      "aspect-[4/3] w-full rounded-lg",
                      swatch.className
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium">{swatch.label}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {swatch.variable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ================================================================ */}
          {/* c. Buttons                                                       */}
          {/* ================================================================ */}
          <Section
            id="buttons"
            title="Buttons"
            description="All button variants and sizes. Built with class-variance-authority for consistent styling."
          >
            <div className="space-y-10 rounded-xl border bg-card p-6 sm:p-8">
              {/* Variants */}
              <div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Variants
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="default">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <Separator />

              {/* Electric accent */}
              <div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Electric Accent
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button className="bg-electric text-white hover:bg-electric/90">
                    Electric Primary
                  </Button>
                  <Button variant="outline" className="border-electric text-electric hover:bg-electric/10">
                    Electric Outline
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Sizes */}
              <div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Sizes
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <Separator />

              {/* With icons */}
              <div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  With Icons
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button>
                    <Zap className="size-4" />
                    Get Started
                  </Button>
                  <Button variant="outline">
                    Learn More
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Star className="size-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* States */}
              <div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  States
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button>Default</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </Section>

          {/* ================================================================ */}
          {/* d. Cards                                                         */}
          {/* ================================================================ */}
          <Section
            id="cards"
            title="Cards"
            description="Standard cards and the signature GlowCard with hover glow effect."
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Basic card */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                  <CardDescription>
                    The default card component with header, content, and footer
                    slots.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cards are the primary container for grouped content. They
                    provide visual separation and hierarchy.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Action
                  </Button>
                </CardFooter>
              </Card>

              {/* GlowCard */}
              <GlowCard>
                <CardHeader>
                  <CardTitle>Glow Card</CardTitle>
                  <CardDescription>
                    Hover to see the signature glow effect and subtle lift
                    animation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The GlowCard wraps the base Card with Framer Motion hover
                    states for a premium interactive feel.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="bg-electric text-white hover:bg-electric/90">
                    Explore
                  </Button>
                </CardFooter>
              </GlowCard>

              {/* Bordered card */}
              <Card className="border-electric/30">
                <CardHeader>
                  <CardTitle>Accent Border</CardTitle>
                  <CardDescription>
                    A card with a subtle electric border for emphasis and visual
                    interest.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use accent borders to draw attention to featured or
                    highlighted content sections.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm">
                    Details
                    <ArrowRight className="size-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </Section>

          {/* ================================================================ */}
          {/* e. Badges / Chips                                                */}
          {/* ================================================================ */}
          <Section
            id="badges"
            title="Badges & Chips"
            description="Compact labels for categorisation, status, and tagging."
          >
            <div className="space-y-8 rounded-xl border bg-card p-6 sm:p-8">
              {/* Badge variants */}
              <div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Badge Variants
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="ghost">Ghost</Badge>
                </div>
              </div>

              <Separator />

              {/* TagChip examples */}
              <div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Tag Chips (dot variant)
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <TagChip label="Next.js" color="#3B82F6" />
                  <TagChip label="TypeScript" color="#10B981" />
                  <TagChip label="Tailwind CSS" color="#8B5CF6" />
                  <TagChip label="React" color="#06B6D4" />
                  <TagChip label="Framer Motion" color="#F59E0B" />
                </div>
              </div>

              <Separator />

              {/* TagChip border variant */}
              <div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Tag Chips (border variant)
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <TagChip label="Web Design" color="#3B82F6" variant="border" />
                  <TagChip label="E-commerce" color="#10B981" variant="border" />
                  <TagChip label="SEO" color="#F59E0B" variant="border" />
                  <TagChip label="IT Support" color="#EF4444" variant="border" />
                </div>
              </div>
            </div>
          </Section>

          {/* ================================================================ */}
          {/* f. Form Inputs                                                   */}
          {/* ================================================================ */}
          <Section
            id="forms"
            title="Form Inputs"
            description="Input fields, textareas, and selects with consistent focus and error states."
          >
            <div className="grid gap-8 rounded-xl border bg-card p-6 sm:grid-cols-2 sm:p-8">
              {/* Default states */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Default States
                </p>
                <div className="space-y-2">
                  <label htmlFor="sg-text" className="text-sm font-medium">
                    Text Input
                  </label>
                  <Input id="sg-text" type="text" placeholder="Enter text..." />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sg-email" className="text-sm font-medium">
                    Email Input
                  </label>
                  <Input
                    id="sg-email"
                    type="email"
                    placeholder="name@company.co.uk"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sg-select" className="text-sm font-medium">
                    Select
                  </label>
                  <select
                    id="sg-select"
                    className={cn(
                      "placeholder:text-muted-foreground dark:bg-input/30 border-input",
                      "h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs",
                      "transition-[color,box-shadow] outline-none md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "appearance-none cursor-pointer"
                    )}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose an option...
                    </option>
                    <option>Option One</option>
                    <option>Option Two</option>
                    <option>Option Three</option>
                  </select>
                </div>
              </div>

              {/* Additional states */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Additional States
                </p>
                <div className="space-y-2">
                  <label htmlFor="sg-filled" className="text-sm font-medium">
                    Filled Input
                  </label>
                  <Input
                    id="sg-filled"
                    type="text"
                    defaultValue="Pre-filled content"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sg-disabled" className="text-sm font-medium">
                    Disabled Input
                  </label>
                  <Input
                    id="sg-disabled"
                    type="text"
                    placeholder="Disabled..."
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sg-error" className="text-sm font-medium">
                    Error State
                  </label>
                  <Input
                    id="sg-error"
                    type="email"
                    defaultValue="invalid-email"
                    aria-invalid="true"
                  />
                  <p className="text-xs text-destructive">
                    Please enter a valid email address.
                  </p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="sg-textarea" className="text-sm font-medium">
                    Textarea
                  </label>
                  <textarea
                    id="sg-textarea"
                    rows={3}
                    placeholder="Write your message..."
                    className={cn(
                      "placeholder:text-muted-foreground dark:bg-input/30 border-input",
                      "w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs",
                      "transition-[color,box-shadow] outline-none md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "resize-none leading-relaxed"
                    )}
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* ================================================================ */}
          {/* g. Accordion                                                     */}
          {/* ================================================================ */}
          <Section
            id="accordion"
            title="Accordion"
            description="Collapsible content panels for progressive disclosure of information."
          >
            <div className="rounded-xl border bg-card p-6 sm:p-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    What technologies do you use?
                  </AccordionTrigger>
                  <AccordionContent>
                    We primarily work with Next.js, React, TypeScript, and
                    Node.js for web applications. For e-commerce, we are experts
                    in Shopify Plus and WooCommerce. We choose the best tool for
                    each project.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How long does a typical project take?
                  </AccordionTrigger>
                  <AccordionContent>
                    Most website projects take 6-12 weeks from kickoff to launch.
                    Complex web applications or e-commerce builds may take longer.
                    We will give you a clear timeline during our discovery phase.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Do you offer ongoing support?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. All our packages include a support period, and we offer
                    monthly retainer plans for ongoing maintenance, updates, and
                    optimisation. We are in it for the long haul.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Section>

          {/* ================================================================ */}
          {/* h. Pricing Cards                                                 */}
          {/* ================================================================ */}
          <Section
            id="pricing"
            title="Pricing Cards"
            description="Three-tier pricing layout with a highlighted popular plan and electric accent."
          >
            <PricingCards />
          </Section>

          {/* ================================================================ */}
          {/* i. Animations Demo                                               */}
          {/* ================================================================ */}
          <Section
            id="animations"
            title="Animations"
            description="Framer Motion presets used throughout the site. Click a button to preview each animation."
          >
            <div className="space-y-10 rounded-xl border bg-card p-6 sm:p-8">
              {/* Trigger buttons */}
              <div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Trigger Animation
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => triggerAnimation("fade-in")}
                  >
                    Fade In
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => triggerAnimation("slide-up")}
                  >
                    Slide Up
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => triggerAnimation("scale-in")}
                  >
                    Scale In
                  </Button>
                </div>
              </div>

              {/* Preview area */}
              <div className="flex min-h-[160px] items-center justify-center rounded-lg border border-dashed bg-muted/30">
                {activeAnimation ? (
                  <motion.div
                    key={activeAnimation + Date.now()}
                    initial={animationVariants[activeAnimation].initial}
                    animate={animationVariants[activeAnimation].animate}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex size-16 items-center justify-center rounded-xl bg-electric/10">
                      <Zap className="size-8 text-electric" />
                    </div>
                    <p className="text-sm font-medium capitalize">
                      {activeAnimation.replace("-", " ")}
                    </p>
                  </motion.div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Click a button above to preview an animation.
                  </p>
                )}
              </div>

              <Separator />

              {/* Stagger grid */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    Stagger Animation
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStaggerKey((k) => k + 1)}
                  >
                    Replay
                  </Button>
                </div>
                <motion.div
                  key={staggerKey}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8"
                >
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className={cn(
                        "flex aspect-square items-center justify-center rounded-lg text-xs font-semibold",
                        i % 3 === 0
                          ? "bg-electric/15 text-electric"
                          : i % 3 === 1
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                      )}
                    >
                      {i + 1}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
