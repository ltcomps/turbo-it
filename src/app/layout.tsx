import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageLoader } from "@/components/page-loader";
import { ContactFormButton } from "@/components/contact-form-button";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://turboit.uk"),
  title: "Turbo IT | UK Competition & Raffle Platform Specialists",
  description: siteConfig.description,
  alternates: {
    canonical: "https://turboit.uk",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Turbo IT | UK Competition & Raffle Platform Specialists",
    description: siteConfig.description,
    url: "https://turboit.uk",
    siteName: "Turbo IT",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Turbo IT — UK Competition & Raffle Platform Specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turbo IT | UK Competition & Raffle Platform Specialists",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <PageLoader />
          <Navbar />
          {children}
          <Footer />
          <ContactFormButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
