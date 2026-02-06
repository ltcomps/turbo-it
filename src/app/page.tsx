"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero } from "@/components/hero";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { featuredWork, testimonials } from "@/lib/content";
import { containerClass } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export default function HomePage() {
  // Show 3 projects
  const projects = featuredWork.slice(0, 3);
  const testimonial = testimonials[1]; // Dr. Sarah Chen's quote

  return (
    <PageTransition>
      {/* Hero */}
      <Hero />

      {/* Work - simple, staggered */}
      <section className={cn(containerClass, "py-24 sm:py-32")}>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Recent work
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              A few things we&apos;ve built
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
            const displayUrl = project.liveUrl ? new URL(project.liveUrl).hostname : "";
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group block overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/20"
                >
                  {/* Browser mockup with live preview */}
                  <div className="relative overflow-hidden bg-card">
                    {/* Browser chrome - Safari style */}
                    <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                      <div className="flex gap-1.5">
                        <div className="size-3 rounded-full bg-red-500/80" />
                        <div className="size-3 rounded-full bg-yellow-500/80" />
                        <div className="size-3 rounded-full bg-green-500/80" />
                      </div>
                      {displayUrl && (
                        <div className="ml-4 flex-1 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
                          {displayUrl}
                        </div>
                      )}
                    </div>

                    {/* Live website preview */}
                    <div className="aspect-[16/10] overflow-hidden bg-white">
                      {(project as { screenshot?: string }).screenshot ? (
                        <img
                          src={(project as { screenshot?: string }).screenshot}
                          alt={`${project.title} Preview`}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : project.liveUrl ? (
                        <iframe
                          src={project.liveUrl}
                          title={`${project.title} Preview`}
                          className="origin-top-left border-0 pointer-events-none"
                          style={{ width: "300%", height: "300%", transform: "scale(0.3333)" }}
                          loading="lazy"
                          scrolling="no"
                        />
                      ) : (
                        <div
                          className="h-full w-full"
                          style={{
                            background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        {project.category}
                      </span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: project.color }}
                      >
                        {project.metric}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold group-hover:text-electric">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {project.blurb}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <Link
          href="/work"
          className="mt-8 block text-center text-sm font-medium text-muted-foreground hover:text-foreground sm:hidden"
        >
          View all projects →
        </Link>
      </section>

      {/* Single testimonial - not a carousel */}
      <section className="border-y bg-muted/30">
        <div className={cn(containerClass, "py-16 sm:py-24")}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <blockquote className="text-xl font-medium leading-relaxed sm:text-2xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className={cn(containerClass, "py-24 sm:py-32")}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Got a project in mind?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We&apos;d love to hear about it. Drop us a line and we&apos;ll get
            back to you within 24 hours.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">
              Let&apos;s talk
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </PageTransition>
  );
}
