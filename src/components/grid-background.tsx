"use client";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  variant?: "dots" | "lines" | "mesh";
  className?: string;
}

export function GridBackground({ variant = "dots", className }: GridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {variant === "dots" && (
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--muted-foreground) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      )}

      {variant === "lines" && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--foreground) 1px, transparent 1px),
              linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      )}

      {variant === "mesh" && (
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh-pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 32V0h32"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
        </svg>
      )}
    </div>
  );
}
