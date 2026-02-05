import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { StyleguideContent } from "@/app/styleguide/styleguide-content";

export const metadata: Metadata = {
  title: "Styleguide | Turbo IT",
  description:
    "Turbo IT design system and component library. Typography, colours, buttons, cards, and more.",
};

export default function StyleguidePage() {
  return (
    <PageTransition>
      <main>
        <StyleguideContent />
      </main>
    </PageTransition>
  );
}
