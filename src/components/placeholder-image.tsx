import * as React from "react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  color?: string;
  aspectRatio?: string;
  className?: string;
}

/**
 * Generates a visually appealing CSS-gradient placeholder with a subtle grid
 * pattern and abstract decorative shapes. No external images required.
 */
export function PlaceholderImage({
  color = "#3B82F6",
  aspectRatio = "16/9",
  className,
}: PlaceholderImageProps) {
  // Derive a lighter tint for the secondary gradient stop
  const lighten = (hex: string, amount: number) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, ((num >> 16) & 0xff) + amount);
    const g = Math.min(255, ((num >> 8) & 0xff) + amount);
    const b = Math.min(255, (num & 0xff) + amount);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const lighter = lighten(color, 60);
  const lightest = lighten(color, 120);

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-muted", className)}
      style={{ aspectRatio }}
      role="img"
      aria-label="Decorative placeholder"
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${lighter} 50%, ${lightest} 100%)`,
        }}
      />

      {/* Grid pattern overlay */}
      <svg
        className="absolute inset-0 size-full opacity-[0.07]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`grid-${color.replace("#", "")}`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-${color.replace("#", "")})`}
        />
      </svg>

      {/* Decorative circle - top right */}
      <div
        className="absolute -right-[10%] -top-[20%] size-[50%] rounded-full opacity-20 blur-xl"
        style={{ backgroundColor: lightest }}
        aria-hidden="true"
      />

      {/* Decorative circle - bottom left */}
      <div
        className="absolute -bottom-[15%] -left-[5%] size-[40%] rounded-full opacity-15 blur-2xl"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />

      {/* Small accent shape */}
      <div
        className="absolute left-1/2 top-1/2 size-[20%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-2xl opacity-10"
        style={{ backgroundColor: "#fff" }}
        aria-hidden="true"
      />
    </div>
  );
}
