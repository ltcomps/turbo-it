"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";
import { faqItems } from "@/lib/content";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FaqAccordion() {
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
            FAQ
          </span>
          <h2 className={cn(tokens.typography.h2, "mt-4")}>
            Frequently asked questions
          </h2>
          <p
            className={cn(
              tokens.typography.bodyLg,
              "mt-4 text-muted-foreground"
            )}
          >
            Everything you need to know about working with us.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger
                  className={cn(
                    "text-base font-medium hover:no-underline [&[data-state=open]]:text-electric"
                  )}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    tokens.typography.body,
                    "text-muted-foreground"
                  )}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
