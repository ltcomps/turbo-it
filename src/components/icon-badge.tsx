import * as React from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface IconBadgeProps {
  icon: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: {
    container: "size-8",
    icon: "size-4",
  },
  md: {
    container: "size-10",
    icon: "size-5",
  },
  lg: {
    container: "size-12",
    icon: "size-6",
  },
} as const;

export function IconBadge({ icon, size = "md", className }: IconBadgeProps) {
  const LucideIcon = LucideIcons[icon as IconName] as LucideIcons.LucideIcon | undefined;

  if (!LucideIcon || typeof LucideIcon !== "function") {
    return null;
  }

  const { container, icon: iconSize } = sizeMap[size];

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-muted text-foreground",
        container,
        className
      )}
      aria-hidden="true"
    >
      <LucideIcon className={iconSize} />
    </div>
  );
}
