interface Env {
  RESEND_API_KEY: string;
  STRIPE_GROWTH_PARTNER_PAYMENT_LINK: string;
}

interface GrowthBody {
  name: string;
  email: string;
  phone: string;
  business: string;
  currentState: string;
  whatYouNeed: string;
  brandDirection?: string;
  launchTiming: string;
  targetRevenue: string;
  cashflows: string;
  source: string;
  website?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function makeReference(): string {
  const ts = Date.now().toString(36);
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `gp-${ts}-${rand}`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://turboit.uk",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const body: GrowthBody = await context.request.json();

    // Honeypot — silent success on bots
    if (body.website) {
      return new Response(
        JSON.stringify({
          success: true,
          redirectUrl: "https://turboit.uk/get-started/growth/thanks",
        }),
        { headers: corsHeaders },
      );
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const business = body.business?.trim();
    const currentState = body.currentState?.trim();
    const whatYouNeed = body.whatYouNeed?.trim();
    const brandDirection = body.brandDirection?.trim() || "";
    const launchTiming = body.launchTiming?.trim();
    const targetRevenue = body.targetRevenue?.trim();
    const cashflows = body.cashflows?.trim();

    if (
      !name ||
      !email ||
      !phone ||
      !business ||
      !currentState ||
      !whatYouNeed ||
      !launchTiming ||
      !targetRevenue ||
      !cashflows
    ) {
      return new Response(JSON.stringify({ error: "Missing required fields." }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address." }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    if (!context.env.STRIPE_GROWTH_PARTNER_PAYMENT_LINK) {
      console.error("STRIPE_GROWTH_PARTNER_PAYMENT_LINK env var not set");
      return new Response(
        JSON.stringify({ error: "Payment link not configured." }),
        { status: 500, headers: corsHeaders },
      );
    }

    const reference = makeReference();

    // Email Harvey with full enquiry details (before payment)
    const fields = [
      { label: "Reference", value: reference },
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Business", value: business },
      { label: "Launch timing", value: launchTiming },
      { label: "Target revenue (6mo)", value: targetRevenue },
      { label: "Cashflows MID", value: cashflows },
    ];

    const fieldRows = fields
      .map(
        (f, i) => `<tr${i % 2 ? "" : ' style="background:#f9fafb;"'}>
          <td style="padding:10px 16px;font-weight:600;color:#6b7280;width:170px;vertical-align:top;">${escapeHtml(f.label)}</td>
          <td style="padding:10px 16px;">${escapeHtml(f.value)}</td>
        </tr>`,
      )
      .join("");

    const longBlock = (label: string, content: string) => `
      <div style="padding:16px;border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 8px;font-weight:600;color:#6b7280;font-size:14px;">${escapeHtml(label)}</p>
        <div style="background:#f9fafb;border-radius:8px;padding:14px;font-size:14px;line-height:1.6;color:#1f2937;white-space:pre-wrap;">${escapeHtml(content)}</div>
      </div>`;

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <div style="background:linear-gradient(135deg,#3b82f6,#2563eb);padding:24px 32px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">New Growth Partner Enquiry</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Awaiting £1,000 setup payment · ref ${escapeHtml(reference)}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#1f2937;">
        ${fieldRows}
      </table>
      ${longBlock("Where they're at right now", currentState)}
      ${longBlock("What they want from us", whatYouNeed)}
      ${brandDirection ? longBlock("Brand direction", brandDirection) : ""}
      <div style="padding:16px;border-top:1px solid #e5e7eb;text-align:center;">
        <p style="margin:0;font-size:12px;color:#9ca3af;">A second email will arrive when the £1,000 is paid. If no payment confirmation arrives within 30 mins, they bailed at checkout — consider a follow-up.</p>
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
        reply_to: email,
        subject: `Growth Partner enquiry: ${business} (awaiting payment)`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", res.status, errText);
      return new Response(JSON.stringify({ error: "Failed to send notification." }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    // Build the Stripe Payment Link URL with prefilled email + reference
    const baseUrl = context.env.STRIPE_GROWTH_PARTNER_PAYMENT_LINK;
    const params = new URLSearchParams({
      prefilled_email: email,
      client_reference_id: reference,
    });
    const redirectUrl = `${baseUrl}?${params.toString()}`;

    return new Response(
      JSON.stringify({ success: true, redirectUrl, reference }),
      { headers: corsHeaders },
    );
  } catch (err) {
    console.error("Growth enquiry API error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};
