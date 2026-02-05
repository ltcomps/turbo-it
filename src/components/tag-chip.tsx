import * as React from "react";
import { cn } from "@/lib/utils";

interface TagChipProps {
  label: string;
  color?: string;
  variant?: "dot" | "border";
  className?: string;
}

export function TagChip({
  label,
  color,
  variant = "dot",
  className,
}: TagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground",
        variant === "border" && color && "border-l-2",
        className
      )}
      style={
        color
          ? variant === "border"
            ? { borderLeftColor: color }
            : undefined
          : undefined
      }
    >
      {variant === "dot" && color && (
        <span
          className="size-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
}
