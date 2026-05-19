import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["300", "400", "500", "600", "700", "800", "900"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AERO | Next-Gen Sports Cars",
  description: "Experience the ultimate driving thrill with AERO.",
  openGraph: {
    title: "AERO | Next-Gen Sports Cars",
    description: "Experience the ultimate driving thrill with AERO.",
    url: "/",
    siteName: "AERO",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero-hood.png",
        width: 1920,
        height: 1080,
        alt: "AERO — sports car detail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AERO | Next-Gen Sports Cars",
    description: "Experience the ultimate driving thrill with AERO.",
    images: ["/hero-hood.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-foreground bg-background overflow-x-hidden min-h-screen relative`}>
        <Preloader />
        {/* Subtle noise grain texture overlay as requested */}
        <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.035] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
