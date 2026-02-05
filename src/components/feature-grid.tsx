"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Code,
  ShoppingCart,
  Search,
  Server,
  Headphones,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { services } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Code,
  ShoppingCart,
  Search,
  Server,
  Headphones,
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function FeatureGrid() {
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
            Services
          </span>
          <h2 className={cn(tokens.typography.h2, "mt-4")}>
            Everything you need to grow online
          </h2>
          <p
            className={cn(
              tokens.typography.bodyLg,
              "mt-4 text-muted-foreground"
            )}
          >
            End-to-end digital services from design to deployment and beyond.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon];

            return (
              <motion.div
                key={service.title}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardVariants}
                className={cn(
                  "group relative flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12),0_0_20px_-5px_var(--glow)] hover:border-electric/50"
                )}
              >
                {/* Icon */}
                <div className="flex size-12 items-center justify-center rounded-xl bg-electric/10 text-electric transition-colors duration-300 group-hover:bg-electric group-hover:text-white">
                  {Icon && <Icon className="size-6" />}
                </div>

                {/* Title */}
                <h3 className={cn("mt-5 text-lg font-semibold")}>
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className={cn(
                    tokens.typography.bodySm,
                    "mt-2 text-muted-foreground"
                  )}
                >
                  {service.description}
                </p>

                {/* Feature list */}
                <ul className="mt-5 flex-1 space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1 shrink-0 rounded-full bg-electric/60"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
