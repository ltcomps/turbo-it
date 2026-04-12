export const siteConfig = {
  name: "Turbo IT",
  tagline: "We build competition platforms that sell tickets.",
  description: "UK specialists in raffle, competition, and prize draw platform development. We design and build high-converting competition websites that players trust.",
  email: "info@luckyturbo.co.uk",
  phone: "",
  address: "Manchester, UK · Operating Worldwide",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const servicesMegaMenu = [
  {
    title: "Platform Development",
    description: "Custom-built competition websites",
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
    description: "UK gambling law compliant",
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
    description: "99.9% uptime, real-time scale",
    href: "/services#hosting",
    icon: "Server",
  },
];

export const heroContent = {
  badge: "Raffles · Competitions · Prize Draws",
  headline: "We build competition\nplatforms that\nsell tickets.",
  subheadline:
    "From raffle websites to full-scale prize draw platforms — Turbo IT is the UK specialist competition businesses trust to launch and grow.",
  primaryCTA: "Get a Quote",
  secondaryCTA: "View Work",
};

export const trustedByLogos = [
  "Lucky Turbo",
  "Mr XCA",
  "Competition operators",
  "Raffle startups",
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
    category: "Raffle Platform",
    categoryTag: "Raffle",
    blurb:
      "UK raffle competition platform with instant wins, countdown timers, cart system, and a high-energy design that drives ticket sales and repeat engagement.",
    metric: "Live",
    metricLabel: "luckyturbo.co.uk",
    tags: ["Next.js", "Payments", "Instant Wins", "Gamification"],
    color: "#00B0F0",
    liveUrl: "https://luckyturbo.co.uk",
  },
  {
    slug: "mr-xca",
    title: "Mr XCA",
    category: "Competition Platform",
    categoryTag: "Competition",
    blurb:
      "Raffles and giveaways platform with a sleek dark aesthetic, real-time competitions, automated draws, and seamless ticket purchasing.",
    metric: "Live",
    metricLabel: "mrxca.co.uk",
    tags: ["React", "Supabase", "Real-time", "Automated Draws"],
    color: "#38BDF8",
    liveUrl: "https://mrxca.co.uk",
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
    subtitle: "UK Raffle Competition Platform",
    category: "Raffle Platform",
    client: "Lucky Turbo",
    duration: "10 weeks",
    year: "2026",
    overview:
      "Lucky Turbo is a UK-based online raffle competition platform. They needed a website that created excitement and drove engagement while handling secure payments, competition management, and a seamless player experience.",
    problem:
      "Competition sites need to feel exciting and trustworthy at the same time. The platform needed to handle ticket purchases, countdown timers, instant wins, winner announcements, and cart functionality — all while meeting UK competition regulations.",
    approach:
      "We focused on creating energy — bright blues, animations, progress bars, and pulsing winner badges. The gamification elements keep players engaged while the clean UI and transparent draws build trust. Payment integration was built for speed and security.",
    solution:
      "A high-energy raffle platform with instant win games, countdown timers, user accounts, shopping cart, and automated draw management. The design creates excitement while staying professional and compliant.",
    results: [
      { metric: "Live", label: "Platform", description: "luckyturbo.co.uk" },
      { metric: "Instant", label: "Wins", description: "Real-time prize reveals" },
      { metric: "Timers", label: "Countdowns", description: "Competition deadlines" },
      { metric: "Mobile", label: "Responsive", description: "Full mobile support" },
    ],
    techStack: ["Next.js", "Supabase", "Cloudflare Workers", "Payment Integration", "Real-time Updates", "Tailwind CSS"],
    liveUrl: "https://luckyturbo.co.uk",
  },
  "mr-xca": {
    slug: "mr-xca",
    title: "Mr XCA",
    subtitle: "Raffles & Giveaways Platform",
    category: "Competition Platform",
    client: "Mr XCA",
    duration: "8 weeks",
    year: "2026",
    overview:
      "Mr XCA is an online raffles and giveaways platform offering exciting competitions with transparent draws and instant results. They needed a modern, trustworthy platform to manage competitions and ticket sales at scale.",
    problem:
      "The client needed a competition platform that felt premium and trustworthy while handling real-time ticket sales, multiple concurrent competitions, and automated prize draws seamlessly.",
    approach:
      "We built a sleek dark-themed interface with sky-blue accents that creates a modern, premium feel. The platform uses Supabase for real-time data, ensuring instant updates on ticket availability and competition status across all connected players.",
    solution:
      "A polished competition platform with real-time ticket tracking, automated draws, user accounts, and a dark aesthetic that stands out from competitors. The Supabase backend ensures instant updates across all users.",
    results: [
      { metric: "Live", label: "Platform", description: "mrxca.co.uk" },
      { metric: "Real-time", label: "Updates", description: "Instant ticket tracking" },
      { metric: "Automated", label: "Draws", description: "Transparent prize selection" },
      { metric: "Mobile", label: "Responsive", description: "Full mobile support" },
    ],
    techStack: ["React", "Vite", "Supabase", "Tailwind CSS", "Real-time Subscriptions", "Payment Integration"],
    liveUrl: "https://mrxca.co.uk",
  },
};

export const services = [
  {
    title: "Platform Development",
    description:
      "Custom-built competition and raffle websites designed to sell tickets and create excitement.",
    icon: "Trophy",
    features: [
      "Custom Competition Sites",
      "User Registration & Accounts",
      "Mobile-First Design",
      "Admin Dashboard",
    ],
  },
  {
    title: "Payment & Ticketing",
    description:
      "Secure ticket purchasing systems with fast checkout, cart functionality, and multiple payment methods.",
    icon: "CreditCard",
    features: [
      "Secure Payment Gateways",
      "Shopping Cart System",
      "Ticket Management",
      "Refund & Dispute Handling",
    ],
  },
  {
    title: "Draw & Prize Systems",
    description:
      "Automated, transparent draw systems with instant wins, countdown timers, and winner announcements.",
    icon: "Timer",
    features: [
      "Automated Prize Draws",
      "Instant Win Games",
      "Countdown Timers",
      "Winner Notifications",
    ],
  },
  {
    title: "Compliance & Regulation",
    description:
      "Competition platforms built to meet UK gambling and competition law from day one.",
    icon: "ShieldCheck",
    features: [
      "UK Competition Law",
      "Terms & Conditions",
      "Age Verification",
      "Responsible Gambling",
    ],
  },
  {
    title: "Marketing & Growth",
    description:
      "Player acquisition and retention strategies including SEO, paid ads, and social media.",
    icon: "Target",
    features: [
      "SEO for Competitions",
      "Google & Meta Ads",
      "Social Media Strategy",
      "Email & SMS Marketing",
    ],
  },
  {
    title: "Hosting & Infrastructure",
    description:
      "High-availability hosting built to handle traffic spikes during competition launches and draw events.",
    icon: "Server",
    features: [
      "99.9% Uptime Guarantee",
      "Real-time Infrastructure",
      "CDN & Edge Hosting",
      "24/7 Monitoring",
    ],
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Discover",
    description:
      "We learn your competition model, audience, and regulations. What prizes? What ticket price? How many entries? We map it all out.",
  },
  {
    step: 2,
    title: "Design",
    description:
      "We design an experience that builds trust and drives ticket sales — from countdown timers to winner showcases.",
  },
  {
    step: 3,
    title: "Build",
    description:
      "Custom platform development with payments, automated draws, real-time updates, and admin tools.",
  },
  {
    step: 4,
    title: "Launch",
    description:
      "Full testing, compliance review, and a smooth go-live. Your first competition can be running within hours.",
  },
  {
    step: 5,
    title: "Grow",
    description:
      "Ongoing support, analytics, marketing integration, and feature development to scale your business.",
  },
];

export const metrics = [
  { value: "99.9%", label: "Uptime", description: "Across all platforms" },
  { value: "< 1s", label: "Load Time", description: "Edge-hosted globally" },
  { value: "2", label: "Live Platforms", description: "Processing tickets now" },
  { value: "10+", label: "Game Modes", description: "Scratch cards, spin, leaderboards & more" },
];

export const testimonials = [
  {
    quote:
      "The platform they built handles everything — payments, instant wins, automated draws, SMS campaigns — all under one roof. It feels like a product, not a website.",
    author: "Lucky Turbo",
    role: "Live Platform",
    company: "luckyturbo.co.uk",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "499",
    period: "/month",
    description: "Everything you need to launch your first competition website.",
    features: [
      "Custom competition website",
      "Mobile responsive design",
      "Payment integration",
      "Manual draw management",
      "Basic admin dashboard",
      "Hosting & SSL included",
      "Email support",
      "White-label platform",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "899",
    period: "/month",
    description: "For established competition businesses ready to scale.",
    features: [
      "Everything in Starter",
      "Automated prize draws",
      "Instant win games",
      "Real-time ticket tracking",
      "Player analytics dashboard",
      "SEO & marketing setup",
      "Priority support",
      "SMS & email notifications",
    ],
    highlighted: true,
    cta: "Get Started",
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    description: "Bespoke platform for high-traffic competition operations.",
    features: [
      "Everything in Growth",
      "Custom feature development",
      "API integrations",
      "Multi-competition management",
      "Dedicated account manager",
      "Same-day support",
      "Compliance consulting",
      "White-label options",
    ],
    highlighted: false,
    cta: "Let's Talk",
  },
];

export const faqItems = [
  {
    question: "How long does it take to build a competition platform?",
    answer:
      "Most competition platforms take 8-12 weeks from kickoff to launch. Simpler raffle sites can be faster. We'll give you a clear timeline during our discovery phase.",
  },
  {
    question: "Do you handle UK gambling and competition regulations?",
    answer:
      "Yes. We build platforms with compliance in mind from day one — including terms and conditions, age verification, responsible gambling measures, and adherence to UK competition law.",
  },
  {
    question: "What payment providers do you integrate?",
    answer:
      "We integrate with specialist gaming payment gateways like Cashflows, as well as providers like Stripe and PayPal. We'll recommend the best option for your competition model and ticket price points.",
  },
  {
    question: "Can you build automated draw systems?",
    answer:
      "Absolutely. We build fully automated, transparent draw systems with provably fair selection, winner notifications, and public draw results. Instant win mechanics are also available.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. All our packages include a support period, and we offer monthly retainer plans for ongoing maintenance, feature development, and marketing support. We grow with your business.",
  },
  {
    question: "Can you help with marketing and player acquisition?",
    answer:
      "Yes — we offer SEO, Google Ads, Meta Ads, and social media strategy specifically for competition businesses. We understand what drives ticket sales and player retention.",
  },
  {
    question: "Can you migrate my WordPress competition site?",
    answer:
      "Yes. We regularly migrate competition businesses from WordPress and other platforms. We rebuild your site on modern edge infrastructure with better performance, custom game modes, and full white-label branding — all while keeping your domain, customers, and brand. No more plugin conflicts, no more expensive hosting, and this time you own the platform.",
  },
  {
    question: "What makes you different from WordPress competition agencies?",
    answer:
      "WordPress agencies build on a general-purpose CMS with third-party plugins. We build purpose-built competition platforms from the ground up using Next.js, Supabase, and Cloudflare edge hosting. The result is faster load times, custom game modes that WordPress simply can't replicate, built-in marketing tools (SMS, email automation, Meta tracking), and a white-label platform you actually own.",
  },
];

export const teamMembers: { name: string; role: string; bio: string }[] = [];

export const companyValues = [
  {
    title: "Player Trust First",
    description: "Competitions depend on trust. We build transparent platforms with provably fair draws and secure payments.",
  },
  {
    title: "Compliance Built-In",
    description: "Regulatory compliance isn't an afterthought. We build it into every platform from day one.",
  },
  {
    title: "Performance Under Load",
    description: "Competition launches create traffic spikes. Our platforms are built to handle the rush without breaking a sweat.",
  },
  {
    title: "Long-Term Partnership",
    description: "We're not a one-and-done shop. We grow with your competition business as it scales.",
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
