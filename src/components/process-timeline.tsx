"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { processSteps } from "@/lib/content";

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 * i,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function ProcessTimeline() {
  return (
    <section className={cn(sectionPadding)}>
      <div className={cn(containerClass)}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className={cn(tokens.typography.caption, "text-electric")}>
            Our Process
          </span>
          <h2 className={cn(tokens.typography.h2, "mt-4")}>
            How we bring ideas to life
          </h2>
          <p
            className={cn(
              tokens.typography.bodyLg,
              "mt-4 text-muted-foreground"
            )}
          >
            A proven five-step process that delivers results on time and on
            budget.
          </p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="relative mt-20 hidden lg:block">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 h-px bg-border"
          />

          <div className="grid grid-cols-5 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={stepVariants}
                className="group relative text-center"
              >
                {/* Step circle */}
                <div className="relative mx-auto flex size-12 items-center justify-center rounded-full border-2 border-border bg-background font-bold text-muted-foreground transition-colors duration-300 group-hover:border-electric group-hover:text-electric">
                  <span>{step.step}</span>
                  {/* Active dot */}
                  <div className="absolute -inset-1 rounded-full opacity-0 shadow-[0_0_20px_-5px_var(--glow)] transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Title */}
                <h3
                  className={cn(
                    "mt-6 text-lg font-semibold transition-colors duration-300 group-hover:text-electric"
                  )}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className={cn(
                    tokens.typography.bodySm,
                    "mt-2 text-muted-foreground"
                  )}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet vertical timeline */}
        <div className="relative mt-12 lg:hidden">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-6 top-0 w-px bg-border"
          />

          <div className="space-y-10">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={stepVariants}
                className="group relative flex gap-6 pl-0"
              >
                {/* Step circle */}
                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background font-bold text-muted-foreground transition-colors duration-300 group-hover:border-electric group-hover:text-electric">
                  <span>{step.step}</span>
                </div>

                {/* Content */}
                <div className="pt-2">
                  <h3
                    className={cn(
                      "text-lg font-semibold transition-colors duration-300 group-hover:text-electric"
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      tokens.typography.bodySm,
                      "mt-1 text-muted-foreground"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
