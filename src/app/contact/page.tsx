import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { ContactContent } from "@/app/contact/contact-content";

export const metadata: Metadata = {
  title: "Contact | Turbo IT",
  description:
    "Get in touch with Turbo IT. Let's discuss your competition platform, raffle website, or prize draw project. Based in Manchester, working worldwide.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <main>
        <ContactContent />
      </main>
    </PageTransition>
  );
}
