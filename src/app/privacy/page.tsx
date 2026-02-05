import type { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Privacy Policy | Turbo IT",
  description: "How Turbo IT collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className={cn(sectionPadding)}>
      <div className={cn(containerClass, "max-w-3xl")}>
        <div className="mb-8">
          <span className={cn(tokens.typography.caption, "text-electric")}>
            Legal
          </span>
          <h1 className={cn(tokens.typography.h1, "mt-2")}>Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: February 2026
          </p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Turbo IT (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website turboit.uk or engage our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect information about you in various ways:
            </p>
            <h3 className="text-lg font-medium mb-2">Personal Data</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you contact us or use our services, we may collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Name and contact information (email, phone number)</li>
              <li>Business name and address</li>
              <li>Payment information (processed securely via third-party providers)</li>
              <li>Project requirements and communications</li>
            </ul>

            <h3 className="text-lg font-medium mb-2 mt-4">Automatically Collected Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              When you visit our website, we may automatically collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>IP address and browser type</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide and improve our services</li>
              <li>Communicate with you about projects and enquiries</li>
              <li>Send invoices and process payments</li>
              <li>Analyse website usage to improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Service providers who assist in our operations (hosting, analytics, payment processing)</li>
              <li>Legal authorities when required by law</li>
              <li>Professional advisers (accountants, lawyers) as necessary</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organisational measures to protect your
              personal data against unauthorised access, alteration, disclosure, or destruction.
              However, no internet transmission is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Your Rights (UK GDPR)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under UK data protection law, you have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, contact us at info@turboit.uk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies to enhance your experience. For more information,
              see our <Link href="/cookies" className="text-electric hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain personal data only for as long as necessary to fulfil the purposes
              for which it was collected, including legal, accounting, or reporting requirements.
              Project files and communications are typically retained for 6 years.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted
              on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, contact us at:
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
