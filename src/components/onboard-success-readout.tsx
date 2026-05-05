"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";

export function OnboardSuccessReadout() {
  const [slug, setSlug] = useState("");
  const [ref, setRef] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setSlug(sp.get("slug") ?? "");
    setRef(sp.get("ref") ?? "");
  }, []);

  const url = slug ? `https://${slug}.turboit.uk` : "";

  function copy() {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        {slug ? `${slug} is ready` : "Tenant ready"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Supabase project created, migrations applied, payment worker registered.
      </p>

      {url && (
        <div className="mt-6 rounded-xl border border-electric/30 bg-electric/5 p-5">
          <p className="text-xs uppercase tracking-widest text-electric">Customer site URL</p>
          <div className="mt-2 flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-md bg-background/60 px-3 py-2 font-mono text-sm text-foreground hover:text-electric"
            >
              {url} <ExternalLink className="ml-1 inline size-3" />
            </a>
            <button
              onClick={copy}
              className="rounded-md border border-border/40 bg-background/60 p-2 text-muted-foreground hover:text-foreground"
              aria-label="Copy URL"
            >
              {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
            </button>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            <strong className="text-amber-400">Won&apos;t work yet</strong> — you need to finish the
            three manual steps below before this URL serves the site.
          </p>
        </div>
      )}

      {ref && (
        <p className="mt-3 text-xs text-muted-foreground">
          Supabase project: <code className="text-electric">{ref}</code>
        </p>
      )}

      <div className="mt-8">
        <p className="text-sm font-semibold text-foreground">Final 3 manual steps</p>
        <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/20 text-[10px] font-bold text-electric">1</span>
            <span>
              Create CF Pages project named <code className="text-foreground">{slug || "<slug>"}</code>{" "}
              pointing at <code className="text-foreground">ltcomps/raffle_template_01_prod</code>{" "}
              (build command <code>npx opennextjs-cloudflare build</code>, output
              <code> .open-next/assets</code>). Paste the env vars from the email.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/20 text-[10px] font-bold text-electric">2</span>
            <span>
              Add CNAME <code className="text-foreground">{slug || "<slug>"}</code> on the{" "}
              <code>turboit.uk</code> zone pointing at the new project&apos;s{" "}
              <code>*.pages.dev</code> URL, then attach{" "}
              <code className="text-foreground">{slug ? `${slug}.turboit.uk` : "<slug>.turboit.uk"}</code>{" "}
              as the project&apos;s custom domain.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/20 text-[10px] font-bold text-electric">3</span>
            <span>
              Tell the customer to sign up at{" "}
              <code className="text-foreground">{url || "..."}/sign-up</code>, then run{" "}
              <code>UPDATE profiles SET role = &apos;admin&apos; WHERE email = &apos;...&apos;</code>{" "}
              in their Supabase SQL editor.
            </span>
          </li>
        </ol>
      </div>
    </>
  );
}
