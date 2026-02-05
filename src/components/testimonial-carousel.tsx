"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { testimonials } from "@/lib/content";
import { Button } from "@/components/ui/button";

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const testimonial = testimonials[current];

  return (
    <section className={cn(sectionPadding)}>
      <div className={cn(containerClass)}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className={cn(tokens.typography.caption, "text-electric")}>
            Testimonials
          </span>
          <h2 className={cn(tokens.typography.h2, "mt-4")}>
            Trusted by ambitious businesses
          </h2>
        </motion.div>

        <div
          className="relative mx-auto mt-16 max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card */}
          <div className="relative min-h-[280px] rounded-2xl border bg-card p-8 sm:p-12">
            <Quote
              aria-hidden="true"
              className="absolute left-8 top-8 size-10 text-electric/20 sm:left-12 sm:top-10"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <blockquote
                  className={cn(
                    "mt-8 text-lg italic leading-relaxed text-foreground sm:text-xl"
                  )}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-8">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className={cn(tokens.typography.bodySm, "text-muted-foreground")}>
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              aria-label="Previous testimonial"
              className="size-10 rounded-full"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === current}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  onClick={() => setCurrent(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    idx === current
                      ? "w-6 bg-electric"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              aria-label="Next testimonial"
              className="size-10 rounded-full"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
