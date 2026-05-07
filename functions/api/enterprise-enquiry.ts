interface Env {
  RESEND_API_KEY: string;
}

interface EnterpriseBody {
  name: string;
  email: string;
  phone: string;
  company: string;
  audienceSize?: string;
  audiencePlatform: string;
  goals: string;
  budget: string;
  timeline: string;
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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://turboit.uk",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const body: EnterpriseBody = await context.request.json();

    // Honeypot
    if (body.website) {
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const company = body.company?.trim();
    const audienceSize = body.audienceSize?.trim() || "";
    const audiencePlatform = body.audiencePlatform?.trim();
    const goals = body.goals?.trim();
    const budget = body.budget?.trim();
    const timeline = body.timeline?.trim();

    if (
      !name ||
      !email ||
      !phone ||
      !company ||
      !audiencePlatform ||
      !goals ||
      !budget ||
      !timeline
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

    const fields = [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Company / brand", value: company },
      { label: "Main platform", value: audiencePlatform },
      { label: "Audience size", value: audienceSize || "Not provided" },
      { label: "Budget", value: budget },
      { label: "Timeline", value: timeline },
    ];

    const fieldRows = fields
      .map(
        (f, i) => `<tr${i % 2 ? "" : ' style="background:#f9fafb;"'}>
          <td style="padding:10px 16px;font-weight:600;color:#6b7280;width:160px;vertical-align:top;">${escapeHtml(f.label)}</td>
          <td style="padding:10px 16px;">${escapeHtml(f.value)}</td>
        </tr>`,
      )
      .join("");

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <div style="background:linear-gradient(135deg,#7c3aed,#5b21b6);padding:24px 32px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">New Enterprise / Influencer Enquiry</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">${escapeHtml(company)}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#1f2937;">
        ${fieldRows}
      </table>
      <div style="padding:16px;border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 8px;font-weight:600;color:#6b7280;font-size:14px;">What they want to build</p>
        <div style="background:#f9fafb;border-radius:8px;padding:14px;font-size:14px;line-height:1.6;color:#1f2937;white-space:pre-wrap;">${escapeHtml(goals)}</div>
      </div>
      <div style="padding:16px;border-top:1px solid #e5e7eb;text-align:center;">
        <p style="margin:0;font-size:12px;color:#9ca3af;">turboit.uk · respond within 24h</p>
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
        subject: `Enterprise enquiry: ${company}`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", res.status, errText);
      return new Response(JSON.stringify({ error: "Failed to send email." }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
  } catch (err) {
    console.error("Enterprise enquiry API error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};
