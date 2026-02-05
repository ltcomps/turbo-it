import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { SectionHeader } from "@/components/section-header";
import { WorkContent } from "@/app/work/work-content";
import { containerClass, sectionPadding } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Our Work | Turbo IT",
  description:
    "Explore our portfolio of high-impact web design, e-commerce, SEO, and IT projects. Real results for ambitious businesses.",
};

export default function WorkPage() {
  return (
    <PageTransition>
      <main>
        {/* ------------------------------------------------------------------ */}
        {/* Hero / Page Header                                                 */}
        {/* ------------------------------------------------------------------ */}
        <section className={sectionPadding}>
          <div className={containerClass}>
            <SectionHeader
              badge="Portfolio"
              title="Our Work"
              subtitle="Real projects, real results. We partner with ambitious businesses to deliver digital experiences that move the needle. Browse our latest case studies below."
              align="center"
            />
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Filters + Portfolio Grid (client-side interactivity)               */}
        {/* ------------------------------------------------------------------ */}
        <section className="pb-20 sm:pb-28 lg:pb-32">
          <div className={containerClass}>
            <WorkContent />
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
