import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { tokens, containerClass, sectionPadding } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Cookie Policy | Turbo IT",
  description: "How Turbo IT uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <main className={cn(sectionPadding)}>
      <div className={cn(containerClass, "max-w-3xl")}>
        <div className="mb-8">
          <span className={cn(tokens.typography.caption, "text-electric")}>
            Legal
          </span>
          <h1 className={cn(tokens.typography.h1, "mt-2")}>Cookie Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: February 2026
          </p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. What Are Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files placed on your device when you visit a website.
              They help websites remember your preferences and understand how you use the site.
              Cookies are widely used to make websites work more efficiently and provide
              information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. How We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies for the following purposes:
            </p>

            <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These cookies are necessary for the website to function properly. They enable
              basic features like page navigation and access to secure areas. The website
              cannot function properly without these cookies.
            </p>

            <h3 className="text-lg font-medium mb-2">Preference Cookies</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These cookies remember your preferences, such as your preferred theme (light/dark mode),
              to provide a more personalised experience.
            </p>

            <h3 className="text-lg font-medium mb-2">Analytics Cookies</h3>
            <p className="text-muted-foreground leading-relaxed">
              We use analytics cookies to understand how visitors interact with our website.
              This helps us improve our site and services. These cookies collect information
              anonymously.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Cookie Name</th>
                    <th className="text-left py-3 px-4 font-medium">Purpose</th>
                    <th className="text-left py-3 px-4 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">theme</td>
                    <td className="py-3 px-4">Stores your preferred colour theme</td>
                    <td className="py-3 px-4">1 year</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">_cf_bm</td>
                    <td className="py-3 px-4">Cloudflare bot management</td>
                    <td className="py-3 px-4">30 minutes</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">__cf_clearance</td>
                    <td className="py-3 px-4">Cloudflare security</td>
                    <td className="py-3 px-4">30 minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may include content from third parties (such as embedded videos or
              social media widgets) that may set their own cookies. We have no control over
              these cookies. Please refer to the relevant third party&apos;s website for more
              information about their cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                <strong>Browser settings:</strong> Most browsers allow you to refuse or delete
                cookies through their settings. The method varies between browsers, so check
                your browser&apos;s help section.
              </li>
              <li>
                <strong>Opt-out tools:</strong> Some analytics providers offer opt-out tools.
                For example, you can opt out of Google Analytics at
                tools.google.com/dlpage/gaoptout.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Please note that blocking certain cookies may impact your experience on our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our
              practices or for legal reasons. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about our use of cookies, contact us at:
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
