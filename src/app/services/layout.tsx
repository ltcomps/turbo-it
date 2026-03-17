import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Turbo IT",
  description:
    "Competition and raffle platform specialists. From platform development and payment integration to automated draws, compliance, marketing, and hosting.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
