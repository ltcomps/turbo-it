import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioItems, caseStudies } from "@/lib/content";
import { PageTransition } from "@/components/page-transition";
import { CaseStudyContent } from "@/app/work/[slug]/case-study-content";

/* -------------------------------------------------------------------------- */
/* Static params                                                              */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.slug,
  }));
}

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) {
    return { title: "Case Study Not Found | Turbo IT" };
  }

  return {
    title: `${item.title} | Case Study | Turbo IT`,
    description: item.blurb,
  };
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);
  const caseStudy = caseStudies[slug];

  if (!item || !caseStudy) {
    notFound();
  }

  return (
    <PageTransition>
      <CaseStudyContent item={item} caseStudy={caseStudy} />
    </PageTransition>
  );
}
