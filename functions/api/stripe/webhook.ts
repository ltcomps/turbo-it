interface Env {
  RESEND_API_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
}

interface StripeEvent {
  id: string;
  type: string;
  livemode: boolean;
  data: { object: StripeCheckoutSession };
}

interface StripeCheckoutSession {
  id: string;
  object: "checkout.session";
  amount_total: number | null;
  currency: string | null;
  client_reference_id: string | null;
  payment_status: string;
  customer_details?: {
    email?: string | null;
    name?: string | null;
    phone?: string | null;
  } | null;
  metadata?: Record<string, string> | null;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function verifyStripeSignature(
  payload: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds = 300,
): Promise<boolean> {
  const parts = signatureHeader.split(",");
  let timestamp: number | null = null;
  const v1Hashes: string[] = [];

  for (const p of parts) {
    const eq = p.indexOf("=");
    if (eq === -1) continue;
    const k = p.slice(0, eq);
    const v = p.slice(eq + 1);
    if (k === "t") timestamp = parseInt(v, 10);
    else if (k === "v1") v1Hashes.push(v);
  }

  if (!timestamp || v1Hashes.length === 0) return false;

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > toleranceSeconds) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signedPayload),
  );
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return v1Hashes.some((hash) => timingSafeEqualHex(expected, hash));
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const signature = context.request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature", { status: 400 });
  }

  if (!context.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET not set");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const payload = await context.request.text();

  const valid = await verifyStripeSignature(
    payload,
    signature,
    context.env.STRIPE_WEBHOOK_SECRET,
  );
  if (!valid) {
    console.error("Stripe signature verification failed");
    return new Response("Invalid signature", { status: 400 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Only act on completed checkout sessions for now.
  if (event.type !== "checkout.session.completed") {
    return new Response(JSON.stringify({ received: true, ignored: event.type }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = event.data.object;
  if (session.payment_status !== "paid") {
    return new Response(
      JSON.stringify({ received: true, ignored: "not paid" }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  const tier = session.metadata?.tier ?? "unknown";
  const amount = session.amount_total ?? 0;
  const currency = (session.currency ?? "gbp").toUpperCase();
  const formattedAmount = `${currency} ${(amount / 100).toFixed(2)}`;
  const customerEmail = session.customer_details?.email ?? "(no email)";
  const customerName = session.customer_details?.name ?? "(no name)";
  const customerPhone = session.customer_details?.phone ?? "(no phone)";
  const reference = session.client_reference_id ?? "(no reference)";

  // Notify only on growth-partner. Launch tier comes later in Phase 2.
  if (tier === "growth-partner") {
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f0fdf4;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <div style="background:linear-gradient(135deg,#10b981,#059669);padding:24px 32px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">✅ Growth Partner Paid</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">${escapeHtml(formattedAmount)} · ref ${escapeHtml(reference)}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#1f2937;">
        <tr style="background:#f9fafb;"><td style="padding:10px 16px;font-weight:600;color:#6b7280;width:160px;">Customer</td><td style="padding:10px 16px;">${escapeHtml(customerName)}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#6b7280;">Email</td><td style="padding:10px 16px;"><a href="mailto:${escapeHtml(customerEmail)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(customerEmail)}</a></td></tr>
        <tr style="background:#f9fafb;"><td style="padding:10px 16px;font-weight:600;color:#6b7280;">Phone</td><td style="padding:10px 16px;">${escapeHtml(customerPhone)}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#6b7280;">Amount</td><td style="padding:10px 16px;font-weight:600;color:#059669;">${escapeHtml(formattedAmount)}</td></tr>
        <tr style="background:#f9fafb;"><td style="padding:10px 16px;font-weight:600;color:#6b7280;">Reference</td><td style="padding:10px 16px;font-family:ui-monospace,monospace;">${escapeHtml(reference)}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#6b7280;">Stripe session</td><td style="padding:10px 16px;font-family:ui-monospace,monospace;font-size:12px;">${escapeHtml(session.id)}</td></tr>
      </table>
      <div style="padding:20px 16px;border-top:1px solid #e5e7eb;background:#f9fafb;">
        <p style="margin:0;font-size:13px;line-height:1.6;color:#374151;">
          The original enquiry email was sent earlier with full discovery answers — search inbox for reference <strong>${escapeHtml(reference)}</strong>. Time to schedule the kickoff call.
        </p>
      </div>
    </div>
  </div>
</body></html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Turbo IT Signups <hello@turboit.uk>",
        to: "info@turboit.uk",
        reply_to: customerEmail,
        subject: `✅ PAID — Growth Partner ${formattedAmount} (ref ${reference})`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error on paid notification:", res.status, errText);
      // Don't return error to Stripe — the payment is real, retry won't fix our email
    }
  } else {
    console.log(`Webhook received for tier=${tier} session=${session.id} — no action taken`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
