"use client";

import { useEffect, useState } from "react";

export function OnboardSuccessReadout() {
  const [slug, setSlug] = useState("");
  const [ref, setRef] = useState("");

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setSlug(sp.get("slug") ?? "");
    setRef(sp.get("ref") ?? "");
  }, []);

  return (
    <h1 className="mt-2 text-3xl font-bold tracking-tight">
      {slug ? `${slug} is ready` : "Tenant ready"}
      {ref && (
        <span className="mt-1 block text-sm font-normal text-muted-foreground">
          Supabase project <code className="text-electric">{ref}</code>
        </span>
      )}
    </h1>
  );
}
