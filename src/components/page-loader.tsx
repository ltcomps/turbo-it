"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "Building something great...",
  "Speed matters.",
  "Let's make it happen.",
  "Your vision, accelerated.",
  "Crafting digital excellence...",
  "Loading awesomeness...",
];

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState(quotes[0]);

  // Set random quote on mount to avoid hydration mismatch
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Main loader container */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo animation */}
            <div className="relative flex items-center justify-center">
              {/* Spinning circle */}
              <motion.div
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 360, scale: 1, opacity: 1 }}
                transition={{
                  rotate: {
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                  opacity: {
                    duration: 0.2,
                  },
                }}
                className="absolute size-24"
              >
                <svg viewBox="0 0 96 96" className="size-full">
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-border"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="60 220"
                    className="text-electric"
                  />
                </svg>
              </motion.div>

              {/* Lightning bolt */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <svg
                  viewBox="0 0 32 32"
                  className="size-12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 6L9 18h6l-1.5 8L22 14h-6l1.5-8z"
                    fill="var(--electric)"
                    stroke="var(--electric)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Pulse rings */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute size-24 rounded-full border-2 border-electric/30"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.4,
                }}
                className="absolute size-24 rounded-full border border-electric/20"
              />
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Turbo IT
              </h1>

              {/* Quote */}
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-base text-muted-foreground italic"
              >
                "{quote}"
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute bottom-12 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-electric animate-pulse" />
            <span>Manchester-based · Worldwide reach</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
