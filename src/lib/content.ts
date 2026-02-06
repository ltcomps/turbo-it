export const siteConfig = {
  name: "Turbo IT",
  tagline: "We build digital experiences that accelerate growth.",
  description: "Manchester-based IT consultancy and web studio delivering premium digital solutions worldwide.",
  email: "info@turboit.uk",
  phone: "+44 161 123 4567",
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
    title: "Web Design",
    description: "Bespoke UI/UX that converts",
    href: "/services#web-design",
    icon: "Palette",
  },
  {
    title: "Web Development",
    description: "Robust, scalable web apps",
    href: "/services#web-dev",
    icon: "Code",
  },
  {
    title: "E-commerce",
    description: "Online stores that sell",
    href: "/services#ecommerce",
    icon: "ShoppingCart",
  },
  {
    title: "SEO",
    description: "Get found, rank higher",
    href: "/services#seo",
    icon: "Search",
  },
  {
    title: "Google & Meta Ads",
    description: "Paid ads that deliver ROI",
    href: "/services#ads",
    icon: "Target",
  },
  {
    title: "Hosting & Maintenance",
    description: "99.9% uptime, zero stress",
    href: "/services#hosting",
    icon: "Server",
  },
  {
    title: "IT Support",
    description: "Reliable tech, always on",
    href: "/services#it-support",
    icon: "Headphones",
  },
];

export const heroContent = {
  badge: "Web Design · Development · SEO · Ads",
  headline: "We build digital\nexperiences that\naccelerate growth.",
  subheadline:
    "From stunning websites to SEO and paid advertising — Turbo IT is the partner ambitious businesses trust to grow online.",
  primaryCTA: "Get a Quote",
  secondaryCTA: "View Work",
};

export const trustedByLogos = [
  "Studio Style MCR",
  "Renova Construction",
  "Lucky Turbo",
  "Local businesses",
  "Startups",
  "E-commerce brands",
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
    slug: "studio-style-mcr",
    title: "Studio Style MCR",
    category: "E-commerce",
    categoryTag: "Ecom",
    blurb:
      "Fashion boutique e-commerce site with style quiz, click & collect, and WhatsApp integration. Based in Worsley, Manchester.",
    metric: "Live",
    metricLabel: "studiostylemcr.co.uk",
    tags: ["E-commerce", "Style Quiz", "Click & Collect"],
    color: "#EC4899",
    liveUrl: "https://studiostylemcr.co.uk",
  },
  {
    slug: "renova-construction",
    title: "Renova Construction",
    category: "Web Design",
    categoryTag: "Web",
    blurb:
      "Premium construction company site with AI project estimator, review aggregation, and a sleek dark/gold aesthetic.",
    metric: "Live",
    metricLabel: "renovaconstruction.uk",
    tags: ["Next.js", "AI Chat", "Reviews Integration"],
    color: "#D4AF37",
    liveUrl: "https://renovaconstruction.uk",
  },
  {
    slug: "lucky-turbo",
    title: "Lucky Turbo",
    category: "Web Development",
    categoryTag: "Web",
    blurb:
      "UK raffle competition platform with instant wins, countdown timers, and a high-energy design that drives engagement.",
    metric: "Live",
    metricLabel: "luckyturbo.co.uk",
    tags: ["Next.js", "Payments", "Gamification"],
    color: "#00B0F0",
    liveUrl: "https://luckyturbo.co.uk",
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
  "studio-style-mcr": {
    slug: "studio-style-mcr",
    title: "Studio Style MCR",
    subtitle: "E-commerce for Manchester Fashion Boutique",
    category: "E-commerce",
    client: "Studio Style MCR",
    duration: "8 weeks",
    year: "2024",
    overview:
      "Studio Style MCR is a women's fashion boutique based in Worsley, Manchester. They needed an online store that captured their curated, personal approach to fashion while handling the full e-commerce experience.",
    problem:
      "The client was selling through social media and wanted a proper online presence. They needed an e-commerce site that felt as personal as their in-store experience, with local Manchester identity.",
    approach:
      "We focused on features that set them apart: a style quiz to help customers find their look, click & collect for local Manchester customers, and WhatsApp integration for that personal touch.",
    solution:
      "A clean, modern e-commerce site with style quiz functionality, local pickup options, and seamless social integration. The design is approachable and community-focused.",
    results: [
      { metric: "Live", label: "Website", description: "studiostylemcr.co.uk" },
      { metric: "10%", label: "First Order", description: "STUDIO10 discount code" },
      { metric: "£100+", label: "Free Delivery", description: "Threshold for free shipping" },
      { metric: "4", label: "Socials", description: "Instagram, Facebook, TikTok, WhatsApp" },
    ],
    techStack: ["E-commerce Platform", "Style Quiz", "Click & Collect", "WhatsApp Integration"],
    liveUrl: "https://studiostylemcr.co.uk",
  },
  "renova-construction": {
    slug: "renova-construction",
    title: "Renova Construction",
    subtitle: "Premium Website for Manchester Builders",
    category: "Web Design",
    client: "Renova Construction",
    duration: "6 weeks",
    year: "2024",
    overview:
      "Renova Construction needed a website that reflected their premium positioning in the Greater Manchester construction market. They wanted to stand out from typical builder websites.",
    problem:
      "Most construction company websites look the same — generic templates with stock photos. Renova wanted something that matched the quality of their actual work and justified their premium pricing.",
    approach:
      "We went with a bold dark theme with gold accents to signal premium quality. Added an AI project estimator for instant quotes, and aggregated their excellent reviews from Google, Checkatrade, and Trustatrader.",
    solution:
      "A sleek, modern site with luxury aesthetic — black backgrounds, gold gradients, animated elements. The AI chat tool lets visitors get instant project estimates, and the review aggregation shows their 4.9/5 rating.",
    results: [
      { metric: "4.9/5", label: "Rating", description: "Aggregated from 47 reviews" },
      { metric: "50km", label: "Service Area", description: "Greater Manchester coverage" },
      { metric: "AI", label: "Estimator", description: "Instant project quotes" },
      { metric: "3", label: "Platforms", description: "Google, Checkatrade, Trustatrader" },
    ],
    techStack: ["Next.js", "AI Chat Integration", "Review Aggregation", "Framer Motion"],
    liveUrl: "https://renovaconstruction.uk",
  },
  "lucky-turbo": {
    slug: "lucky-turbo",
    title: "Lucky Turbo",
    subtitle: "UK Raffle Competition Platform",
    category: "Web Development",
    client: "Lucky Turbo",
    duration: "10 weeks",
    year: "2024",
    overview:
      "Lucky Turbo is a UK-based online raffle competition platform. They needed a site that created excitement and drove engagement while handling payments and competition management.",
    problem:
      "Competition sites need to feel exciting and trustworthy at the same time. The platform needed to handle ticket purchases, countdown timers, instant wins, and winner announcements seamlessly.",
    approach:
      "We focused on creating energy — bright blues, animations, progress bars, and pulsing winner badges. The gamification elements keep users engaged while the clean UI builds trust.",
    solution:
      "A high-energy competition platform with instant win games, countdown timers, user accounts, and shopping cart functionality. The design creates excitement while staying professional.",
    results: [
      { metric: "Live", label: "Platform", description: "luckyturbo.co.uk" },
      { metric: "Instant", label: "Wins", description: "Real-time prize reveals" },
      { metric: "Timers", label: "Countdowns", description: "Competition deadlines" },
      { metric: "Mobile", label: "Responsive", description: "Full mobile support" },
    ],
    techStack: ["Next.js", "Payment Integration", "User Authentication", "Real-time Updates"],
    liveUrl: "https://luckyturbo.co.uk",
  },
};

export const services = [
  {
    title: "Web Design",
    description:
      "Bespoke, conversion-focused designs that look stunning and perform. Every pixel serves a purpose.",
    icon: "Palette",
    features: [
      "Custom UI/UX Design",
      "Design Systems",
      "Responsive Layouts",
      "Prototyping & Testing",
    ],
  },
  {
    title: "Web Development",
    description:
      "Robust, scalable web applications built with modern frameworks and best practices.",
    icon: "Code",
    features: [
      "Next.js / React",
      "API Development",
      "CMS Integration",
      "Performance Optimisation",
    ],
  },
  {
    title: "E-commerce",
    description:
      "Online stores that convert browsers into buyers. Shopify, WooCommerce, or fully custom.",
    icon: "ShoppingCart",
    features: [
      "Shopify / WooCommerce",
      "Payment Integration",
      "Inventory Management",
      "Conversion Optimisation",
    ],
  },
  {
    title: "SEO",
    description:
      "Get found on Google. We optimise your site to rank higher and drive organic traffic that converts.",
    icon: "Search",
    features: [
      "Keyword Research",
      "On-Page Optimisation",
      "Technical SEO Audits",
      "Local SEO & Google Business",
    ],
  },
  {
    title: "Google & Meta Ads",
    description:
      "Targeted paid advertising on Google, Facebook & Instagram that delivers real ROI.",
    icon: "Target",
    features: [
      "Google Search & Display",
      "Facebook & Instagram Ads",
      "Remarketing Campaigns",
      "Conversion Tracking",
    ],
  },
  {
    title: "Hosting & Maintenance",
    description:
      "99.9% uptime guaranteed. Managed hosting, updates, backups, and 24/7 monitoring.",
    icon: "Server",
    features: [
      "Managed Hosting",
      "SSL & Security",
      "Daily Backups",
      "Performance Monitoring",
    ],
  },
  {
    title: "IT Support",
    description:
      "Reliable tech support for your business. From helpdesk to infrastructure, we've got you covered.",
    icon: "Headphones",
    features: [
      "Helpdesk Support",
      "Network Management",
      "Cloud Migration",
      "Cyber Security",
    ],
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Discover",
    description:
      "Deep-dive into your goals, audience, and competitors. We map the landscape before we build.",
  },
  {
    step: 2,
    title: "Design",
    description:
      "Wireframes, prototypes, and visual design — iterated until it's perfect.",
  },
  {
    step: 3,
    title: "Build",
    description:
      "Clean, maintainable code. Built with performance and scalability in mind.",
  },
  {
    step: 4,
    title: "Launch",
    description:
      "Rigorous QA, performance testing, and a smooth deployment to production.",
  },
  {
    step: 5,
    title: "Support",
    description:
      "Ongoing maintenance, monitoring, and optimisation to keep you ahead.",
  },
];

export const metrics = [
  { value: "99.9%", label: "Uptime", description: "Across all managed sites" },
  { value: "0.8s", label: "Avg. Load Time", description: "Lighthouse performance" },
  { value: "+156%", label: "Lead Increase", description: "Average across clients" },
  { value: "50+", label: "Projects Delivered", description: "In the last 2 years" },
];

export const testimonials = [
  {
    quote:
      "They actually listened to what we wanted and delivered exactly that. No nonsense, just a great website that works.",
    author: "Happy Client",
    role: "Business Owner",
    company: "Manchester",
  },
  {
    quote:
      "Professional from start to finish. The site looks amazing and we've had great feedback from customers.",
    author: "Satisfied Customer",
    role: "E-commerce Owner",
    company: "UK",
  },
  {
    quote:
      "Quick turnaround, fair pricing, and they were always available when we had questions. Would recommend.",
    author: "Returning Client",
    role: "Company Director",
    company: "Greater Manchester",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "299",
    period: "/month",
    description: "Perfect for small businesses wanting a professional online presence.",
    features: [
      "Custom designed website",
      "Mobile responsive",
      "Basic SEO setup",
      "Contact form",
      "Hosting & SSL included",
      "Monthly updates",
      "Email support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "499",
    period: "/month",
    description: "For businesses ready to sell online and grow their customer base.",
    features: [
      "Everything in Starter",
      "E-commerce / online orders",
      "Payment processing",
      "Inventory management",
      "Monthly SEO work",
      "Analytics & reporting",
      "Priority support",
      "Social media integration",
    ],
    highlighted: true,
    cta: "Get Started",
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    description: "Bespoke solutions for complex requirements and larger businesses.",
    features: [
      "Everything in Growth",
      "Custom web application",
      "API integrations",
      "Advanced functionality",
      "Dedicated account manager",
      "Same-day support",
      "Strategy & consulting",
      "Unlimited revisions",
    ],
    highlighted: false,
    cta: "Let's Talk",
  },
];

export const faqItems = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most website projects take 6-12 weeks from kickoff to launch. Complex web applications or e-commerce builds may take longer. We'll give you a clear timeline during our discovery phase.",
  },
  {
    question: "Do you work with businesses outside the UK?",
    answer:
      "Absolutely. While we're based in Manchester, we work with clients globally. We use modern collaboration tools to ensure seamless communication regardless of timezone.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We primarily work with Next.js, React, TypeScript, and Node.js for web applications. For e-commerce, we're experts in Shopify Plus and WooCommerce. We choose the best tool for each project.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. All our packages include a support period, and we offer monthly retainer plans for ongoing maintenance, updates, and optimisation. We're in it for the long haul.",
  },
  {
    question: "Do you build websites for tradespeople?",
    answer:
      "Yes — we specialise in websites for builders, construction companies, and tradespeople. Check out our work for Renova Construction as an example. We know what works for trades.",
  },
  {
    question: "Can you redesign our existing website?",
    answer:
      "Of course. We regularly take on redesign projects. We'll audit your current site, identify what's working and what's not, and create a strategy to improve performance and conversions.",
  },
];

export const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Founder & Technical Director",
    bio: "15 years in software engineering. Previously led engineering teams at Monzo and Deliveroo.",
  },
  {
    name: "Sophie Chen",
    role: "Head of Design",
    bio: "Award-winning designer with a passion for accessible, beautiful interfaces. Ex-Fjord.",
  },
  {
    name: "Marcus Williams",
    role: "Lead Developer",
    bio: "Full-stack specialist with deep expertise in React, Node.js, and cloud architecture.",
  },
  {
    name: "Priya Patel",
    role: "Project Manager",
    bio: "Keeps everything running smoothly. Certified Scrum Master with 8 years in digital delivery.",
  },
];

export const companyValues = [
  {
    title: "Quality Over Quantity",
    description: "We take on fewer projects so we can give each one the attention it deserves.",
  },
  {
    title: "Transparent Communication",
    description: "No jargon, no surprises. You'll always know where your project stands.",
  },
  {
    title: "Results-Driven",
    description: "Every design decision and line of code is measured against real business outcomes.",
  },
  {
    title: "Long-Term Partnership",
    description: "We're not a one-and-done shop. We build relationships that last years.",
  },
];

export const footerLinks = {
  services: [
    { label: "Web Design", href: "/services#web-design" },
    { label: "Web Development", href: "/services#web-dev" },
    { label: "E-commerce", href: "/services#ecommerce" },
    { label: "Construction", href: "/services#construction" },
    { label: "Hosting & Maintenance", href: "/services#hosting" },
    { label: "IT Support", href: "/services#it-support" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Styleguide", href: "/styleguide" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export const socialLinks = [
  { label: "Twitter", href: "#", icon: "Twitter" },
  { label: "LinkedIn", href: "#", icon: "Linkedin" },
  { label: "GitHub", href: "#", icon: "Github" },
  { label: "Instagram", href: "#", icon: "Instagram" },
];
