import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
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
  website?: string; // honeypot
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();

    // Honeypot check — bots fill hidden fields
    if (body.website) {
      // Silently accept so bots don't retry
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    const phone = body.phone?.trim();
    const source = body.source?.trim() || "unknown";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Optional fields
    const company = body.company?.trim() || "";
    const service = body.service?.trim() || "";
    const budget = body.budget?.trim() || "";

    // Build optional rows only if values exist
    const optionalRows = [
      phone && `
        <tr>
          <td style="padding:10px 16px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">Phone</td>
          <td style="padding:10px 16px;">${escapeHtml(phone)}</td>
        </tr>`,
      company && `
        <tr>
          <td style="padding:10px 16px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">Company</td>
          <td style="padding:10px 16px;">${escapeHtml(company)}</td>
        </tr>`,
      service && `
        <tr>
          <td style="padding:10px 16px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">Service</td>
          <td style="padding:10px 16px;">${escapeHtml(service)}</td>
        </tr>`,
      budget && `
        <tr>
          <td style="padding:10px 16px;font-weight:600;color:#6b7280;width:140px;vertical-align:top;">Budget</td>
          <td style="padding:10px 16px;">${escapeHtml(budget)}</td>
        </tr>`,
    ]
      .filter(Boolean)
      .join("");

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#3b82f6,#2563eb);padding:24px 32px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">New Turbo IT Enquiry</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">via ${escapeHtml(source)}</p>
      </div>

      <!-- Details -->
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

      <!-- Message -->
      <div style="padding:20px 16px;border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 8px;font-weight:600;color:#6b7280;font-size:14px;">Message</p>
        <div style="background:#f9fafb;border-radius:8px;padding:16px;font-size:14px;line-height:1.6;color:#1f2937;white-space:pre-wrap;">${escapeHtml(message)}</div>
      </div>

      <!-- Footer -->
      <div style="padding:16px;border-top:1px solid #e5e7eb;text-align:center;">
        <p style="margin:0;font-size:12px;color:#9ca3af;">${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })} &bull; turboit.uk</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    const { error } = await getResend().emails.send({
      from: "Turbo IT Contact <onboarding@resend.dev>",
      to: "info@luckyturbo.co.uk",
      replyTo: email,
      subject: `New Turbo IT Enquiry from ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
