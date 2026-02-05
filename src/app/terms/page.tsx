import type { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Terms of Service | Turbo IT",
  description: "Terms and conditions for using Turbo IT services.",
};

export default function TermsPage() {
  return (
    <main className={cn(sectionPadding)}>
      <div className={cn(containerClass, "max-w-3xl")}>
        <div className="mb-8">
          <span className={cn(tokens.typography.caption, "text-electric")}>
            Legal
          </span>
          <h1 className={cn(tokens.typography.h1, "mt-2")}>Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: February 2026
          </p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing our website or engaging our services, you agree to be bound by these
              Terms of Service. If you disagree with any part of these terms, you may not access
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Turbo IT provides web design, web development, e-commerce solutions, SEO,
              digital advertising, hosting, and IT support services. Specific deliverables,
              timelines, and costs will be outlined in individual project proposals or contracts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Quotes and Pricing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All quotes are valid for 30 days unless otherwise stated. Prices are in GBP and
              exclude VAT unless specified. We reserve the right to adjust pricing if project
              scope changes significantly from the original brief.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Payment Terms</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>A 50% deposit is required before work commences</li>
              <li>Remaining balance is due upon project completion, before final handover</li>
              <li>Monthly retainers are invoiced at the start of each month</li>
              <li>Payment is due within 14 days of invoice date</li>
              <li>Late payments may incur interest at 4% above the Bank of England base rate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Client Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To ensure successful project delivery, clients agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide content, images, and feedback in a timely manner</li>
              <li>Designate a single point of contact for approvals</li>
              <li>Review and approve deliverables within agreed timeframes</li>
              <li>Ensure provided content does not infringe third-party rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Upon full payment:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Clients own the final deliverables (website, designs, content created for them)</li>
              <li>We retain the right to use work in our portfolio unless agreed otherwise</li>
              <li>Third-party assets (stock images, fonts, plugins) remain subject to their original licences</li>
              <li>We retain ownership of any reusable code libraries or frameworks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Revisions and Changes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Project quotes typically include a set number of revision rounds (usually 2-3).
              Additional revisions or scope changes will be quoted separately. Major changes
              after development has begun may affect timeline and cost.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Project Delays</h2>
            <p className="text-muted-foreground leading-relaxed">
              If a project is delayed due to client non-responsiveness for more than 30 days,
              we reserve the right to invoice for completed work and close the project.
              Restarting may require a new quote and re-scheduling.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. Hosting and Maintenance</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hosting and maintenance services are provided on a monthly or annual basis.
              Either party may terminate with 30 days written notice. We are not responsible
              for data loss; clients should maintain their own backups.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, Turbo IT shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including
              loss of profits, data, or business opportunities. Our total liability shall
              not exceed the amount paid for the services in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">11. Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              We warrant that our services will be performed with reasonable skill and care.
              We do not guarantee specific results from SEO or advertising services, as these
              depend on many factors outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">12. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              Either party may terminate a project with written notice. Upon termination,
              the client shall pay for all work completed to date. Any unused deposit may
              be retained to cover work performed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">13. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by the laws of England and Wales. Any disputes shall
              be subject to the exclusive jurisdiction of the English courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">14. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these terms, contact us at:
            </p>
            <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border">
              <p className="font-medium">Turbo IT</p>
              <p className="text-muted-foreground">Manchester, UK</p>
              <p className="text-muted-foreground">Email: info@turboit.uk</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
