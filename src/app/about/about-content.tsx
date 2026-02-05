"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";
import { GlowCard } from "@/components/glow-card";
import { CardContent } from "@/components/ui/card";
import {
  pickVariants,
  staggerContainer,
  staggerItem,
  useReducedMotion,
} from "@/lib/motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

interface CompanyValue {
  title: string;
  description: string;
}

interface AboutContentProps {
  teamMembers: TeamMember[];
  companyValues: CompanyValue[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract initials from a full name (up to 2 characters). */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Deterministic colour palette for avatar circles. */
const avatarColors = [
  "bg-electric text-white",
  "bg-emerald-600 text-white",
  "bg-violet-600 text-white",
  "bg-amber-500 text-white",
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AboutContent({
  teamMembers,
  companyValues,
}: AboutContentProps) {
  const reduced = useReducedMotion();
  const containerVariants = pickVariants(staggerContainer, reduced);
  const itemVariants = pickVariants(staggerItem, reduced);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Team Grid                                                        */}
      {/* ---------------------------------------------------------------- */}
      {teamMembers.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {teamMembers.map((member, idx) => (
            <motion.div key={member.name} variants={itemVariants}>
              <GlowCard className="h-full">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  {/* Avatar */}
                  <div
                    className={cn(
                      "flex size-20 items-center justify-center rounded-full text-2xl font-bold tracking-tight",
                      avatarColors[idx % avatarColors.length]
                    )}
                    aria-hidden="true"
                  >
                    {getInitials(member.name)}
                  </div>

                  {/* Name */}
                  <h3 className={cn(tokens.typography.h4, "mt-5")}>
                    {member.name}
                  </h3>

                  {/* Role */}
                  <span
                    className={cn(
                      tokens.typography.caption,
                      "mt-1 text-electric"
                    )}
                  >
                    {member.role}
                  </span>

                  {/* Bio */}
                  <p
                    className={cn(
                      tokens.typography.bodySm,
                      "mt-3 text-muted-foreground"
                    )}
                  >
                    {member.bio}
                  </p>
                </CardContent>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Values Grid                                                      */}
      {/* ---------------------------------------------------------------- */}
      {companyValues.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {companyValues.map((value) => (
            <motion.div key={value.title} variants={itemVariants}>
              <GlowCard className="h-full">
                <CardContent className="flex flex-col gap-3 p-6 sm:p-8">
                  {/* Decorative accent bar */}
                  <div
                    aria-hidden="true"
                    className="h-1 w-10 rounded-full bg-electric"
                  />
                  <h3 className={cn(tokens.typography.h4)}>{value.title}</h3>
                  <p
                    className={cn(
                      tokens.typography.body,
                      "text-muted-foreground"
                    )}
                  >
                    {value.description}
                  </p>
                </CardContent>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
