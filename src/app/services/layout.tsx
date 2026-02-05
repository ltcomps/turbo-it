import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Turbo IT",
  description:
    "Comprehensive digital solutions from web design and development to e-commerce, SEO, Google & Meta Ads, hosting, and IT support. Discover how Turbo IT accelerates your growth.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
