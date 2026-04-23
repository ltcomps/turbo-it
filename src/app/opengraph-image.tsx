import { ImageResponse } from "next/og";

export const alt = "Turbo IT — UK Competition & Raffle Platform Specialists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0a0a0f",
          backgroundImage:
            "radial-gradient(ellipse at 20% 0%, rgba(139, 92, 246, 0.35) 0%, transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(0, 176, 240, 0.32) 0%, transparent 55%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: brand mark + sub-brand tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "#0a0a0f",
              border: "2px solid rgba(59, 130, 246, 0.35)",
              boxShadow: "0 0 60px rgba(59, 130, 246, 0.35)",
            }}
          >
            <svg width="64" height="64" viewBox="0 0 512 512" fill="none">
              <path
                d="M280 96L144 288h96l-24 128L352 224h-96l24-128z"
                fill="#3b82f6"
                stroke="#3b82f6"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: -1.5,
                lineHeight: 1,
              }}
            >
              Turbo IT
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 18,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
              By Lucky Turbo Ltd
            </div>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              maxWidth: 1040,
            }}
          >
            <div style={{ display: "flex" }}>The white-label competition</div>
            <div style={{ display: "flex", gap: 18 }}>
              <span>platform behind</span>
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #a78bfa 0%, #3b82f6 50%, #22d3ee 100%)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Lucky Turbo.
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#94a3b8",
              maxWidth: 920,
              lineHeight: 1.4,
            }}
          >
            Custom raffle sites, live in weeks. Same stack. Same edge
            infrastructure. Same game modes.
          </div>
        </div>

        {/* Bottom row: proof strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            fontSize: 22,
            color: "#e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#3b82f6", fontWeight: 700 }}>50k+</span>
            <span style={{ color: "#64748b" }}>tickets sold</span>
          </div>
          <div style={{ color: "#1e293b" }}>•</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#3b82f6", fontWeight: 700 }}>12k+</span>
            <span style={{ color: "#64748b" }}>prizes awarded</span>
          </div>
          <div style={{ color: "#1e293b" }}>•</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#3b82f6", fontWeight: 700 }}>turboit.uk</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
