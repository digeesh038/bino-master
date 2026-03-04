import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bino — The Professional Dynamic Page Engine",
    template: "%s | Bino"
  },
  description: "Bino is a high-performance page generation engine. Create stunning landing pages on demand using a simple JSON API + MongoDB. No coding or deployment required for new pages.",
  keywords: ["Dynamic Pages", "Next.js", "Page Builder", "API Driven", "MongoDB", "Marketing Operations"],
  authors: [{ name: "Bino Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bino.app",
    title: "Bino — Dynamic Page Engine",
    description: "Build premium landing pages via API in seconds.",
    siteName: "Bino",
    images: [{
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&h=630",
      width: 1200,
      height: 630,
      alt: "Bino Professional Dashboard"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bino — Dynamic Page Engine",
    description: "Launch landing pages via API in seconds.",
    images: ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&h=630"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
