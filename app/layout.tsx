import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  title: "Cloud Computing",
  description:
    "High-performance VPS and Cloud Hosting with NVMe SSD, 10Gbps network, and enterprise-grade DDoS protection. Deploy globally in seconds.",
  openGraph: {
    title: "NovaCloud — Deploy Your Cloud in Seconds",
    description:
      "High-performance VPS and Cloud Hosting with NVMe SSD, 10Gbps network, and enterprise-grade DDoS protection.",
    type: "website",
    locale: "en_US",
    siteName: "NovaCloud",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaCloud — Deploy Your Cloud in Seconds",
    description:
      "High-performance VPS and Cloud Hosting. Deploy globally in seconds.",
  },
  keywords: [
    "VPS",
    "Cloud Hosting",
    "NVMe SSD",
    "DDoS Protection",
    "High Performance Server",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
