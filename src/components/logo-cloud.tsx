"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoCloudProps {
  companies: string[];
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
    },
  },
};

export function LogoCloud({ companies, className }: LogoCloudProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12",
        className
      )}
    >
      {companies.map((name) => (
        <motion.span
          key={name}
          variants={itemVariants}
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground sm:text-base",
            "motion-reduce:transition-none"
          )}
        >
          {name}
        </motion.span>
      ))}
    </motion.div>
  );
}
