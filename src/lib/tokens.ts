export const tokens = {
  colors: {
    electric: {
      DEFAULT: "var(--electric)",
      foreground: "var(--electric-foreground)",
    },
    glow: "var(--glow)",
  },
  spacing: {
    section: "clamp(4rem, 8vw, 8rem)",
    sectionSm: "clamp(2rem, 4vw, 4rem)",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    containerWide: "max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  shadows: {
    glow: "0 0 20px -5px var(--glow)",
    glowLg: "0 0 40px -10px var(--glow)",
    card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    cardHover: "0 10px 40px -10px rgba(0,0,0,0.12), 0 0 20px -5px var(--glow)",
  },
  typography: {
    display: "text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9]",
    h1: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]",
    h2: "text-3xl sm:text-4xl font-bold tracking-tight leading-tight",
    h3: "text-2xl sm:text-3xl font-semibold tracking-tight",
    h4: "text-xl sm:text-2xl font-semibold",
    body: "text-base leading-relaxed",
    bodyLg: "text-lg leading-relaxed",
    bodySm: "text-sm leading-relaxed",
    caption: "text-xs uppercase tracking-widest font-medium",
    mono: "font-mono text-sm",
  },
} as const;

export const sectionPadding = "py-20 sm:py-28 lg:py-32";
export const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
export const containerWideClass = "max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8";
