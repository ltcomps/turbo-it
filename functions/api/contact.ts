interface Env {
  RESEND_API_KEY: string;
}

interface ContactBody {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
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
    const body: ContactBody = await context.request.json();

    // Honeypot check
    if (body.website) {
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    const phone = body.phone?.trim() || "";
    const source = body.source?.trim() || "unknown";

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: corsHeaders }
      );
    }

    const company = body.company?.trim() || "";
    const service = body.service?.trim() || "";
    const budget = body.budget?.trim() || "";

    const optionalRows = [
      phone && `<tr><td style="padding:10px 16px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">Phone</td><td style="padding:10px 16px;">${escapeHtml(phone)}</td></tr>`,
      company && `<tr><td style="padding:10px 16px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">Company</td><td style="padding:10px 16px;">${escapeHtml(company)}</td></tr>`,
      service && `<tr><td style="padding:10px 16px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">Service</td><td style="padding:10px 16px;">${escapeHtml(service)}</td></tr>`,
      budget && `<tr><td style="padding:10px 16px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">Budget</td><td style="padding:10px 16px;">${escapeHtml(budget)}</td></tr>`,
    ].filter(Boolean).join("");

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <div style="background:linear-gradient(135deg,#3b82f6,#2563eb);padding:24px 32px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">New Turbo IT Enquiry</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">via ${escapeHtml(source)}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#1f2937;">
        <tr style="background:#f9fafb;">
          <td style="padding:10px 16px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">Name</td>
          <td style="padding:10px 16px;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">Email</td>
          <td style="padding:10px 16px;"><a href="mailto:${escapeHtml(email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(email)}</a></td>
        </tr>
        ${optionalRows}
      </table>
      <div style="padding:20px 16px;border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 8px;font-weight:600;color:#6b7280;font-size:14px;">Message</p>
        <div style="background:#f9fafb;border-radius:8px;padding:16px;font-size:14px;line-height:1.6;color:#1f2937;white-space:pre-wrap;">${escapeHtml(message)}</div>
      </div>
      <div style="padding:16px;border-top:1px solid #e5e7eb;text-align:center;">
        <p style="margin:0;font-size:12px;color:#9ca3af;">turboit.uk</p>
      </div>
    </div>
  </div>
</body></html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Turbo IT Contact <hello@turboit.uk>",
        to: "info@turboit.uk",
        reply_to: email,
        subject: `New Turbo IT Enquiry from ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", res.status, errText);
      return new Response(
        JSON.stringify({ error: "Failed to send email." }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: corsHeaders }
    );
  }
};
