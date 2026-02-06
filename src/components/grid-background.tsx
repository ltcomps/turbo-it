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
        <>
          {/* Base dot layer with gentle breathing */}
          <div
            className="absolute inset-0 animate-[dotGlow_6s_ease-in-out_infinite] dark:hidden"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--muted-foreground) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute inset-0 hidden animate-[dotGlowDark_6s_ease-in-out_infinite] dark:block"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--muted-foreground) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Diagonal wave sweep — bright glow that travels across */}
          <div
            className="absolute inset-0 animate-[dotWave_7s_ease-in-out_infinite] dark:hidden"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--muted-foreground) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
              maskImage: `linear-gradient(135deg, transparent 0%, transparent 35%, white 50%, transparent 65%, transparent 100%)`,
              WebkitMaskImage: `linear-gradient(135deg, transparent 0%, transparent 35%, white 50%, transparent 65%, transparent 100%)`,
              maskSize: "300% 300%",
              WebkitMaskSize: "300% 300%",
            }}
          />
          <div
            className="absolute inset-0 hidden animate-[dotWaveDark_7s_ease-in-out_infinite] dark:block"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--muted-foreground) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
              maskImage: `linear-gradient(135deg, transparent 0%, transparent 35%, white 50%, transparent 65%, transparent 100%)`,
              WebkitMaskImage: `linear-gradient(135deg, transparent 0%, transparent 35%, white 50%, transparent 65%, transparent 100%)`,
              maskSize: "300% 300%",
              WebkitMaskSize: "300% 300%",
            }}
          />
        </>
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
