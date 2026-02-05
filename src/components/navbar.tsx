"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Palette,
  Code,
  ShoppingCart,
  Server,
  Headphones,
  Search,
  Target,
  Globe,
  Share2,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { navLinks, servicesMegaMenu, siteConfig } from "@/lib/content";
import { containerClass } from "@/lib/tokens";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

// ---------------------------------------------------------------------------
// Icon resolver – maps string names from content.ts to Lucide components
// ---------------------------------------------------------------------------
const iconMap: Record<string, LucideIcon> = {
  Palette,
  Code,
  ShoppingCart,
  Server,
  Headphones,
  Search,
  Target,
  Globe,
  Share2,
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const easeOut = [0.33, 1, 0.68, 1] as [number, number, number, number];
const easeIn = [0.32, 0, 0.67, 0] as [number, number, number, number];

const megaMenuVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.15, ease: easeIn },
  },
};

const mobileMenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: easeOut },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: easeIn },
  },
};

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaRef = useRef<HTMLLIElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function openMega() {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  }

  function closeMega() {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  }

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className={cn(containerClass, "flex h-16 items-center justify-between")}>
        {/* ---- Logo ---- */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Zap className="size-5 text-electric" />
          <span>{siteConfig.name}</span>
        </Link>

        {/* ---- Desktop nav ---- */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isServices = link.label === "Services";
            const isActive = pathname === link.href;

            if (isServices) {
              return (
                <li
                  key={link.label}
                  className="relative"
                  ref={megaRef}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <button
                    type="button"
                    onClick={() => setMegaOpen((prev) => !prev)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive && "text-foreground",
                      !isActive && "text-muted-foreground",
                    )}
                    aria-expanded={megaOpen}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        megaOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {/* ---- Mega menu ---- */}
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        variants={megaMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-1/2 top-full mt-2 w-[36rem] -translate-x-1/2 rounded-xl border border-border bg-popover p-4 shadow-lg"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {servicesMegaMenu.map((item) => {
                            const Icon = iconMap[item.icon];
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
                              >
                                {Icon && (
                                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-electric/10 text-electric">
                                    <Icon className="size-4" />
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium leading-none group-hover:text-foreground">
                                    {item.title}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "text-foreground",
                    !isActive && "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ---- Right actions ---- */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Get a Quote</Link>
          </Button>

          {/* ---- Mobile hamburger ---- */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                  className="absolute"
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                  className="absolute"
                >
                  <Menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </nav>
    </header>

    {/* ---- Fullscreen Mobile Menu ---- */}
    <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-md lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[60] h-full w-full max-w-sm border-l border-border bg-background shadow-2xl lg:hidden overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
                <span className="font-bold text-lg">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </Button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-1 p-6 overflow-y-auto flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "active:scale-[0.98]",
                        pathname === link.href
                          ? "text-foreground bg-accent"
                          : "text-muted-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Services sub-items */}
                <div className="mt-4 border-t border-border pt-4">
                  <p className="mb-2 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Services
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {servicesMegaMenu.map((item, i) => {
                      const Icon = iconMap[item.icon];
                      return (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.03 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex flex-col items-center gap-2 rounded-lg border border-border/50 bg-muted/30 p-4 text-center transition-colors hover:bg-accent hover:border-border active:scale-[0.98]"
                          >
                            {Icon && (
                              <div className="flex size-10 items-center justify-center rounded-lg bg-electric/10">
                                <Icon className="size-5 text-electric" />
                              </div>
                            )}
                            <span className="text-xs font-medium">{item.title}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6"
                >
                  <Button asChild size="lg" className="w-full">
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                      Get a Quote
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
      )}
    </AnimatePresence>
    </>
  );
}
