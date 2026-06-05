import type { Metadata } from "next";
import { Belanosima, JetBrains_Mono, Monda } from "next/font/google";
import { site } from "@/lib/site";
import "./cef2.css";

const belanosima = Belanosima({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cef2-display",
  display: "swap",
});

const monda = Monda({
  subsets: ["latin"],
  variable: "--font-cef2-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-cef2-mono",
  display: "swap",
});

const cef2Url = `${site.baseUrl}/cef2`;

export const metadata: Metadata = {
  title: "Creative Entrepreneurship Fellowship",
  description: `${site.theme}. Five days. Seven mentors. One transformation. KASA Creative Entrepreneurship Fellowship, 30 June to 4 July 2026.`,
  alternates: {
    canonical: cef2Url,
  },
  openGraph: {
    title: "KASA Creative Entrepreneurship Fellowship",
    url: cef2Url,
    siteName: "KASA Africa Academy of Creative Excellence",
    type: "website",
    images: [{ url: `${site.baseUrl}${site.logo}`, alt: "CEF Logo" }],
  },
};

export default function Cef2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`cef2-root ${belanosima.variable} ${monda.variable} ${jetbrainsMono.variable}`}
    >
      {children}
    </div>
  );
}
