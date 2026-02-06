"use client";

import { useState, FormEvent } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwfNsyHnXNKJVWEq3Scn501p-h7BWpVjtFJ67mbWZv63VvlcAzlkqN5PgoZ2Nt4ksU5/exec";

export function ContactFormButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const allFilled = form.name.trim() && form.email.trim() && form.phone.trim() && form.message.trim();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allFilled) return;

    setStatus("sending");
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          timestamp: new Date().toISOString(),
        }),
      });
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        setIsOpen(false);
      }, 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-electric text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label="Contact us"
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {/* Form panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-48px)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="border-b border-border bg-muted/50 px-5 py-4">
            <p className="text-sm font-semibold">Get in touch</p>
            <p className="text-xs text-muted-foreground">All fields are required</p>
          </div>

          {status === "sent" ? (
            <div className="flex flex-col items-center gap-2 px-5 py-10">
              <div className="flex size-12 items-center justify-center rounded-full bg-green-500/10">
                <Send className="size-5 text-green-500" />
              </div>
              <p className="text-sm font-medium">Message sent!</p>
              <p className="text-xs text-muted-foreground">We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
              <input
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-electric"
              />
              <input
                type="email"
                placeholder="Email address"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-electric"
              />
              <input
                type="tel"
                placeholder="Phone number"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-electric"
              />
              <textarea
                placeholder="How can we help?"
                required
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-electric"
              />
              <button
                type="submit"
                disabled={!allFilled || status === "sending"}
                className="flex items-center justify-center gap-2 rounded-lg bg-electric px-4 py-2.5 text-sm font-medium text-white transition-opacity disabled:opacity-50"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending...
                  </>
                ) : status === "error" ? (
                  "Something went wrong — try again"
                ) : (
                  <>
                    <Send className="size-4" /> Send message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
