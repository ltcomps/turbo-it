export const siteConfig = {
  name: "Turbo IT",
  tagline: "The white-label competition platform behind Lucky Turbo.",
  description:
    "Turbo IT is the licensing arm of Lucky Turbo Ltd. We run our own raffle business on the platform — and license the same stack to other competition operators, white-label, live in weeks.",
  email: "info@turboit.uk",
  phone: "",
  address: "Manchester, UK · Lucky Turbo Ltd",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/demo" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const servicesMegaMenu = [
  {
    title: "Platform Development",
    description: "White-label competition websites",
    href: "/services#platform-dev",
    icon: "Trophy",
  },
  {
    title: "Payment & Ticketing",
    description: "Secure ticket sales & checkout",
    href: "/services#payments",
    icon: "CreditCard",
  },
  {
    title: "Draw & Prize Systems",
    description: "Automated, transparent draws",
    href: "/services#draws",
    icon: "Timer",
  },
  {
    title: "Compliance & Regulation",
    description: "UK competition law compliant",
    href: "/services#compliance",
    icon: "ShieldCheck",
  },
  {
    title: "Marketing & Growth",
    description: "Acquire and retain players",
    href: "/services#marketing",
    icon: "Target",
  },
  {
    title: "Hosting & Infrastructure",
    description: "Edge-hosted, 99.9% uptime",
    href: "/services#hosting",
    icon: "Server",
  },
];

export const heroContent = {
  badge: "White-Label Competition Platform · UK",
  headline: "The raffle platform\nwe run ourselves.\nNow licensed to you.",
  subheadline:
    "Turbo IT is the tech behind Lucky Turbo — our own competition business. Same platform, same edge infrastructure, branded as yours. Live in weeks, not quarters.",
  primaryCTA: "See the Platform",
  secondaryCTA: "Talk to the team",
};

/* ── Headline numbers — pulled from real LT + Mr XCA production data ── */
export const platformStats = [
  { value: "50,000+", label: "Tickets sold", description: "Across our platforms" },
  { value: "12,000+", label: "Prizes awarded", description: "Instant wins + draws" },
  { value: "40,000+", label: "Tickets · 1 day", description: "Lucky Turbo launch day" },
  { value: "7", label: "Game modes", description: "All native, all included" },
];

export const trustedByLogos = [
  "Lucky Turbo",
  "Mr XCA",
];

/* ── Logo wall — three rows of names, mixed across categories so the strip
   feels dense even with only two live clients today. ── */
export const marqueeRows: { label: string; items: string[]; reverse?: boolean }[] = [
  {
    label: "Live on the platform",
    items: [
      "Lucky Turbo",
      "Mr XCA",
      "Manchester · UK",
      "50,000+ tickets sold",
      "40,000 launch-day tickets",
      "12,000+ prizes awarded",
      "7 native game modes",
    ],
  },
  {
    label: "Built on",
    reverse: true,
    items: [
      "Cloudflare Pages",
      "Cloudflare Workers",
      "Supabase",
      "Next.js 16",
      "Tailwind CSS",
      "Framer Motion",
      "TypeScript",
    ],
  },
  {
    label: "Payments & trust",
    items: [
      "Cashflows",
      "Apple Pay",
      "Google Pay",
      "Visa",
      "Mastercard",
      "Amex",
      "Twilio · SMS",
      "Resend · Email",
      "Trustpilot",
    ],
  },
];

export const featuredWork: {
  slug: string;
  title: string;
  category: string;
  categoryTag: string;
  blurb: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  color: string;
  liveUrl: string;
  screenshot?: string;
}[] = [
  {
    slug: "lucky-turbo",
    title: "Lucky Turbo",
    category: "Our Flagship",
    categoryTag: "Dog-food",
    blurb:
      "Lucky Turbo Ltd's own competition business — 50,000+ tickets sold since launch, 41,000 in a single launch day. Turbo IT built it. Turbo IT runs it. This is proof of concept by proof of use.",
    metric: "50K+",
    metricLabel: "tickets sold",
    tags: ["Next.js", "Cloudflare Pages", "Supabase", "Cashflows", "Instant Wins", "7 Game Modes"],
    color: "#00B0F0",
    liveUrl: "https://luckyturbo.co.uk",
    screenshot: "/screenshots/luckyturbo-hero.webp",
  },
  {
    slug: "mr-xca",
    title: "Mr XCA",
    category: "White-Label Client",
    categoryTag: "Client",
    blurb:
      "Our first white-label licensee. Built on the same Turbo IT platform as Lucky Turbo, re-themed end-to-end, onboarded and ready to run public draws. Proof the multi-tenant architecture works — not just in theory, but with real customer traffic on their own brand.",
    metric: "Client #1",
    metricLabel: "our first licensee",
    tags: ["White-label", "Multi-tenant", "Full re-theme", "Admin panel"],
    color: "#38BDF8",
    liveUrl: "https://mrxca.co.uk",
    screenshot: "/screenshots/mrxca-hero.webp",
  },
];

export const portfolioItems = [
  ...featuredWork,
];

export const caseStudies: Record<string, {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  duration: string;
  year: string;
  overview: string;
  problem: string;
  approach: string;
  solution: string;
  results: { metric: string; label: string; description: string }[];
  techStack: string[];
  liveUrl: string;
}> = {
  "lucky-turbo": {
    slug: "lucky-turbo",
    title: "Lucky Turbo",
    subtitle: "Our own competition business — and the proof Turbo IT works at scale",
    category: "Flagship Platform",
    client: "Lucky Turbo Ltd (ourselves)",
    duration: "10 weeks to v1, continuous since",
    year: "2026",
    overview:
      "Lucky Turbo is Lucky Turbo Ltd's flagship competition business and the dog-food for the Turbo IT platform. We didn't build it to sell; we built it to run. Every feature on the Turbo IT licence exists because we needed it ourselves — and every bug gets fixed before it reaches a client, because it hits our own revenue first.",
    problem:
      "UK raffle operators live and die by launch-day traffic, payment reliability, and compliance. Template platforms like Rafflex can't do custom game modes. WordPress plugins collapse under load. Existing competition agencies take 6+ months and five-figure builds. We needed something we could run ourselves — and re-use.",
    approach:
      "Built on Next.js 16 static export + Cloudflare Pages for sub-second TTFB anywhere in the world, Supabase for real-time data, Cashflows embedded checkout with Apple Pay + Google Pay, and a custom Workers backend for payment + cron + SMS. Every draw automated and auditable. Every instant-win deterministic. Seven native game modes: scratch cards, spin the wheel, coin flip, mystery chest, turbo drop (plinko), flappy bird, sugar rush (match-3).",
    solution:
      "A production raffle operation that opened to the public on 7 March 2026. We handle payments, draws, compliance, anti-fraud, SMS campaigns, email automation, Meta Pixel + CAPI, and customer support in-house — on the same codebase we license to clients.",
    results: [
      { metric: "50,000+", label: "Tickets sold", description: "Since public launch 7 March 2026" },
      { metric: "12,000+", label: "Prizes awarded", description: "Instant wins + draws combined" },
      { metric: "40,000+", label: "Launch-day tickets", description: "Sold in a single 24-hour window" },
      { metric: "7", label: "Game modes", description: "All custom — none of them off-the-shelf" },
    ],
    techStack: ["Next.js 16", "Cloudflare Pages", "Cloudflare Workers", "Supabase", "Cashflows", "Twilio", "Resend", "Tailwind CSS"],
    liveUrl: "https://luckyturbo.co.uk",
  },
  "mr-xca": {
    slug: "mr-xca",
    title: "Mr XCA",
    subtitle: "Our first white-label client — same Turbo IT platform, different brand, onboarded in weeks",
    category: "White-Label Licensing",
    client: "Mr XCA",
    duration: "8 weeks from kickoff to handover",
    year: "2026",
    overview:
      "Mr XCA is the proof that the Turbo IT platform is genuinely multi-tenant. Same core codebase as Lucky Turbo. Different brand. Different admin panel. Different payment destination. No forks — one platform, two tenants, clean separation. The Mr XCA team has full control of their own competition business, running on infrastructure we keep running for them.",
    problem:
      "A new competition brand needed to go live fast without the two-year build timeline (and six-figure bill) of a traditional agency. They also didn't want a Rafflex-style template that would make them look identical to every other raffle site on Google.",
    approach:
      "Started from the Lucky Turbo reference implementation. Re-themed to Mr XCA's brand. Stood up their own Supabase project, their own payment gateway, their own admin panel. Kept the shared components, game modes, and automated draw engine. 8 weeks from kickoff to a handover-ready platform.",
    solution:
      "A branded competition platform at mrxca.co.uk running on Turbo IT infrastructure. Their team uses the same admin panel we use for Lucky Turbo. When we ship a platform improvement, they benefit automatically.",
    results: [
      { metric: "8 weeks", label: "Kickoff to live", description: "vs. 6–12 months for bespoke agency builds" },
      { metric: "Full re-theme", label: "End-to-end", description: "Every surface branded Mr XCA" },
      { metric: "Shared codebase", label: "Multi-tenant proven", description: "No forks, no stale clones" },
      { metric: "Admin panel", label: "Fully handed over", description: "Their team runs their draws" },
    ],
    techStack: ["Shared Turbo IT codebase", "Supabase (dedicated tenant)", "Cloudflare Pages", "Automated draw engine", "Admin panel"],
    liveUrl: "https://mrxca.co.uk",
  },
};

/* ── 3-way comparison matrix — generic buckets, no named competitors ── */
export const comparisonMatrix: {
  feature: string;
  turboIt: string | boolean;
  templateSaas: string | boolean;
  traditionalAgency: string | boolean;
}[] = [
  { feature: "Launch speed", turboIt: "6–10 weeks", templateSaas: "Days", traditionalAgency: "6+ months" },
  { feature: "Truly custom game modes", turboIt: true, templateSaas: false, traditionalAgency: "For £££" },
  { feature: "White-label / own brand", turboIt: true, templateSaas: "Partial", traditionalAgency: true },
  { feature: "Multi-tenant (you aren't a fork)", turboIt: true, templateSaas: true, traditionalAgency: false },
  { feature: "Dog-fooded in production", turboIt: "Yes — luckyturbo.co.uk", templateSaas: false, traditionalAgency: false },
  { feature: "Edge-hosted (< 200ms TTFB)", turboIt: true, templateSaas: "Varies", traditionalAgency: "Depends on host" },
  { feature: "Upfront build fee", turboIt: "Minimal", templateSaas: "None", traditionalAgency: "£10k–£50k" },
  { feature: "Ongoing cost model", turboIt: "Monthly licence", templateSaas: "Per-order + subscription", traditionalAgency: "Per-sprint retainers" },
  { feature: "Code ownership", turboIt: "We own — proprietary IP", templateSaas: "Vendor locked", traditionalAgency: "You own (and maintain)" },
  { feature: "Your brand + customer data", turboIt: "Yours — fully portable", templateSaas: "Locked to vendor", traditionalAgency: "Yours" },
  { feature: "Product improvements shipped to you automatically", turboIt: true, templateSaas: true, traditionalAgency: false },
];

/* ── Playable game-mode showcase for the homepage + /demo page ── */
export const gameModes: {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  demoComponent: string;
  difficulty: "easy" | "medium" | "hard";
}[] = [
  { slug: "scratch-card", title: "Scratch Card", tagline: "Canvas-based silver foil — scratch to reveal.", icon: "CreditCard", demoComponent: "DemoScratchCard", difficulty: "easy" },
  { slug: "coin-flip", title: "Coin Flip", tagline: "3D heads-or-tails on a Framer Motion axis.", icon: "Circle", demoComponent: "DemoCoinFlip", difficulty: "easy" },
  { slug: "spin-the-wheel", title: "Spin the Wheel", tagline: "Weighted-segment wheel with pointer physics.", icon: "PieChart", demoComponent: "DemoSpinTheWheel", difficulty: "medium" },
  { slug: "turbo-drop", title: "Turbo Drop", tagline: "Plinko-style drop with procedural chiptune.", icon: "Layers", demoComponent: "DemoTurboDrop", difficulty: "medium" },
  { slug: "flappy-bird", title: "Sky Run", tagline: "Flap through pipes — leaderboard prizes.", icon: "Bird", demoComponent: "DemoFlappyBird", difficulty: "hard" },
  { slug: "sugar-rush", title: "Sugar Rush", tagline: "Match-3 candy swap with cascade scoring.", icon: "Candy", demoComponent: "DemoSugarRush", difficulty: "hard" },
];

export const services = [
  {
    title: "Platform Development",
    description:
      "White-label competition and raffle websites — the same stack we run Lucky Turbo on, rebranded for you.",
    icon: "Trophy",
    features: [
      "Custom brand + theme",
      "Your own admin panel",
      "Mobile-first design",
      "All 7 native game modes",
    ],
  },
  {
    title: "Payment & Ticketing",
    description:
      "Embedded Cashflows checkout with Apple Pay + Google Pay, cart, instant receipts, refund tooling.",
    icon: "CreditCard",
    features: [
      "Secure tokenised payments",
      "Apple Pay + Google Pay",
      "Shopping cart + vouchers",
      "Refund + chargeback tooling",
    ],
  },
  {
    title: "Draw & Prize Systems",
    description:
      "Automated scheduled draws, deterministic instant-wins, provable fairness, winner notifications — all in the admin panel.",
    icon: "Timer",
    features: [
      "Auto-scheduled draws",
      "Deterministic instant wins",
      "Provable fairness audit log",
      "SMS + email winner alerts",
    ],
  },
  {
    title: "Compliance & Regulation",
    description:
      "UK competition law compliance baked in — T&Cs template, age verification, responsible-play messaging, banned-word filters.",
    icon: "ShieldCheck",
    features: [
      "UK competition-law T&Cs",
      "Age verification",
      "Responsible-play messaging",
      "Anti-fraud + device checks",
    ],
  },
  {
    title: "Marketing & Growth",
    description:
      "The marketing stack we use on Lucky Turbo: Meta Pixel + CAPI, SMS campaigns, abandoned-cart, trust pilot integration.",
    icon: "Target",
    features: [
      "Meta Pixel + CAPI server-side",
      "SMS campaign batching",
      "Abandoned-cart recovery",
      "Trustpilot + SEO setup",
    ],
  },
  {
    title: "Hosting & Infrastructure",
    description:
      "Cloudflare Pages edge hosting, Workers for APIs, Supabase for data. Sub-second TTFB globally, 99.9% uptime.",
    icon: "Server",
    features: [
      "Edge-hosted on Cloudflare",
      "< 200ms TTFB target",
      "99.9% uptime",
      "24/7 monitoring",
    ],
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Brand",
    description:
      "You bring the brand — name, colours, prize strategy. We map it to the Turbo IT reference and flag anything that'll need custom work.",
  },
  {
    step: 2,
    title: "Configure",
    description:
      "We stand up your dedicated Supabase tenant, your payment gateway, your admin panel. No forks; you're a real tenant on the shared platform.",
  },
  {
    step: 3,
    title: "Theme",
    description:
      "We re-skin the storefront to match your brand and drop in any bespoke game mode or prize mechanic you need.",
  },
  {
    step: 4,
    title: "Launch",
    description:
      "Compliance review, test purchases, soft launch. First paid draw usually within 6–10 weeks of kickoff.",
  },
  {
    step: 5,
    title: "Grow together",
    description:
      "When we ship a platform improvement — Apple Pay, Google Pay, new game modes — every tenant gets it. Including you.",
  },
];

export const metrics = [
  { value: "50K+", label: "Tickets sold", description: "Across our platforms" },
  { value: "40K+", label: "Launch day tickets", description: "Lucky Turbo, 7 March 2026" },
  { value: "< 200ms", label: "Edge TTFB", description: "On Cloudflare Pages globally" },
  { value: "7", label: "Game modes", description: "All custom, all on the licence" },
];

export const testimonials = [
  {
    quote:
      "The Turbo IT platform handles everything — payments, instant wins, automated draws, SMS campaigns — all under one roof. It feels like a product, not a website. It should; we built it to run our own business.",
    author: "Lucky Turbo Operations",
    role: "Lucky Turbo Ltd — parent company of Turbo IT",
    company: "luckyturbo.co.uk",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "499",
    period: "/month",
    description: "Your own white-labelled competition site, live in weeks.",
    features: [
      "Your brand, your domain",
      "Mobile-first storefront",
      "Cashflows payment integration",
      "Manual draw tooling",
      "Admin panel access",
      "Hosting + SSL included",
      "Email support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "899",
    period: "/month",
    description: "Established competition businesses ready to scale.",
    features: [
      "Everything in Starter",
      "All 7 native game modes",
      "Automated draws + instant wins",
      "SMS + email marketing suite",
      "Meta Pixel + CAPI server-side",
      "Real-time analytics",
      "Priority support",
    ],
    highlighted: true,
    cta: "Get Started",
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    description: "Custom game modes, dedicated infra, enterprise support.",
    features: [
      "Everything in Growth",
      "Bespoke game-mode development",
      "Dedicated Supabase + Workers",
      "API + webhook integrations",
      "Compliance consulting",
      "Dedicated account manager",
      "Same-day SLA",
    ],
    highlighted: false,
    cta: "Let's Talk",
  },
];

export const faqItems = [
  {
    question: "Is Turbo IT building a one-off site, or selling a platform?",
    answer:
      "A platform. Turbo IT is the licensing arm of Lucky Turbo Ltd. We run luckyturbo.co.uk on the platform ourselves. Clients license the same stack — branded as them, hosted by us, improved continuously.",
  },
  {
    question: "How is this different from Rafflex or other SaaS raffle tools?",
    answer:
      "Template SaaS tools ship one fixed product. If you want a Flappy-Bird-style instant win, you don't get it. We dog-food our own platform and build the game modes we need for Lucky Turbo, then every client gets them. You can't buy our feature set anywhere else.",
  },
  {
    question: "How is this different from a traditional raffle agency?",
    answer:
      "Agencies build you a one-off site, charge £10k–£50k up front, then stop shipping. We license a living platform: every time we improve it for ourselves, you get the improvement too. No forks, no stale codebases.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Most clients go live 6–10 weeks after kickoff. Mr XCA launched in 8 weeks. If all you need is a brand reskin with our defaults, it's faster.",
  },
  {
    question: "Can I see the platform running?",
    answer:
      "Yes — luckyturbo.co.uk is our live flagship. mrxca.co.uk is our first licensee. You can also play the game modes directly on the Platform page without creating an account.",
  },
  {
    question: "Who owns the code?",
    answer:
      "We do. That's intentional — it's how we can keep rolling out improvements to every tenant simultaneously. You own your brand, your customers, and your tenant data. On Scale plans we can discuss bespoke-fork arrangements.",
  },
  {
    question: "What payment providers do you support?",
    answer:
      "Cashflows by default (specialist gaming gateway). Stripe and others for specific cases. We'll recommend the best fit during onboarding.",
  },
  {
    question: "Do you handle UK competition regulations?",
    answer:
      "Yes — T&Cs template, age verification, responsible-play messaging, banned-word filters, provable-draw audit logs. We deal with the same rules on Lucky Turbo every day.",
  },
];

export const teamMembers: { name: string; role: string; bio: string }[] = [];

export const companyValues = [
  {
    title: "Dog-fooded",
    description: "Every feature ships to Lucky Turbo before it ships to you. We eat our own cooking.",
  },
  {
    title: "Compliance built-in",
    description: "UK competition law is baked into the platform — T&Cs, age checks, fairness audit logs — not bolted on after.",
  },
  {
    title: "Performance at launch",
    description: "Lucky Turbo sold 40,000+ tickets in its launch day. The platform you'd license is the same one.",
  },
  {
    title: "Improvements travel with the licence",
    description: "When we ship Apple Pay, new game modes, or an SMS campaign tool — every tenant gets it that week.",
  },
];

export const footerLinks = {
  services: [
    { label: "Platform Development", href: "/services#platform-dev" },
    { label: "Payment & Ticketing", href: "/services#payments" },
    { label: "Draw & Prize Systems", href: "/services#draws" },
    { label: "Compliance", href: "/services#compliance" },
    { label: "Marketing & Growth", href: "/services#marketing" },
    { label: "Hosting", href: "/services#hosting" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Platform demo", href: "/demo" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export const socialLinks: { label: string; href: string; icon: string }[] = [];
