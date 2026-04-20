// Re-capture work-page screenshots with proper page-load waits.
// Usage: node scripts/capture-screenshots.mjs
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "screenshots");
mkdirSync(outDir, { recursive: true });

const sites = [
  {
    name: "luckyturbo",
    url: "https://luckyturbo.co.uk/",
    cookieKey: "lt_cookie_consent",
    cookieValue: JSON.stringify({ essential: true, analytics: false, marketing: false }),
  },
  {
    name: "mrxca",
    url: "https://mrxca.co.uk/",
    cookieKey: "mrxca_cookie_consent",
    cookieValue: "essential",
  },
];

const VIEWPORT = { width: 1440, height: 900 };
const SETTLE_MS = 6000; // give hero animation, lazy-loads, dynamic banners time

const browser = await chromium.launch();
try {
  for (const site of sites) {
    // Use scale 1 — full-page caps of long pages exceed WebP's 16383px limit at 2x.
    const ctx = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 1,
    });
    // Pre-set cookie consent before any page script runs.
    await ctx.addInitScript(
      ({ key, value }) => {
        try { window.localStorage.setItem(key, value); } catch {}
      },
      { key: site.cookieKey, value: site.cookieValue }
    );

    const page = await ctx.newPage();
    console.log(`→ ${site.name}: navigating ${site.url}`);
    await page.goto(site.url, { waitUntil: "networkidle", timeout: 60000 });

    // Wait for fonts + Framer Motion entrance + lazy-loaded imagery.
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(SETTLE_MS);

    // Scroll to bottom and back to trigger lazy hydration of below-the-fold sections,
    // then settle at top so the hero crop is consistent.
    await page.evaluate(async () => {
      const dist = document.documentElement.scrollHeight;
      window.scrollTo({ top: dist, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 800));
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(1500);

    const heroPath = join(outDir, `${site.name}-hero.webp`);
    const fullPath = join(outDir, `${site.name}-full.webp`);

    const heroPng = await page.screenshot({ type: "png", fullPage: false });
    await sharp(heroPng).webp({ quality: 88 }).toFile(heroPath);
    console.log(`  ✓ hero  → ${heroPath}`);

    const fullPng = await page.screenshot({ type: "png", fullPage: true });
    await sharp(fullPng).webp({ quality: 85 }).toFile(fullPath);
    console.log(`  ✓ full  → ${fullPath}`);

    await ctx.close();
  }
} finally {
  await browser.close();
}
console.log("Done.");
