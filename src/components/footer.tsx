import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Zap,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig, footerLinks, socialLinks } from "@/lib/content";
import { containerClass } from "@/lib/tokens";

// ---------------------------------------------------------------------------
// Icon resolver for social links
// ---------------------------------------------------------------------------
const socialIconMap: Record<string, LucideIcon> = {
  Twitter,
  Linkedin,
  Github,
  Instagram,
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      {/* ---- Migrate CTA strip ---- */}
      <div className="border-b border-border bg-gradient-to-r from-electric/[0.06] via-violet-500/[0.05] to-electric/[0.06]">
        <div className={cn(containerClass, "flex flex-col items-center justify-between gap-3 py-5 text-center sm:flex-row sm:text-left")}>
          <p className="text-sm sm:text-base">
            <span className="text-muted-foreground">Still on WordPress or a template SaaS? </span>
            <span className="font-semibold">Migrate to Turbo IT in 6 weeks.</span>
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full border border-electric/40 bg-electric/10 px-5 py-2 text-sm font-semibold text-electric transition-all hover:border-electric/70 hover:bg-electric/20 hover:shadow-[0_0_24px_-6px_var(--glow)]"
          >
            Start a migration chat
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className={cn(containerClass, "py-16")}>
        {/* ---- Top grid ---- */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-lg tracking-tight"
            >
              <Zap className="size-5 text-electric" />
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              {siteConfig.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {siteConfig.address}
            </p>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          {/* Social icons */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {Icon && <Icon className="size-4" />}
                  </a>
                );
              })}
            </div>
          )}

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
