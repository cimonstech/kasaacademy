import type { Metadata } from "next";
import { CefStructuredData } from "@/components/cef/CefStructuredData";
import { CefLanding } from "@/components/CefLanding";
import { site } from "@/lib/site";

const pageTitle =
  "Creative Entrepreneurship Fellowship 2026 | Africa Academy of Creative Excellence";
const pageDescription =
  "Join Ghana's leading creative entrepreneurs for a transformative 5-day fellowship. 30 June – 4 July 2026 at Bazal Art Studios, East Legon, Accra. Early bird: GHC 1,500.";

// OG image: /cef/CEF-banner.jpg (3368×1667). Ideal social crop is 1200×630px —
// headline, dates, venue, and Bazal Darko's photo on burgundy #6B1832.
const ogImageUrl = `${site.baseUrl}/cef/CEF-banner.jpg`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "creative entrepreneurship Ghana",
    "CEF 2026",
    "KASA Africa Academy",
    "creative business fellowship Accra",
    "Bazal Darko",
    "creative entrepreneurs Ghana",
    "business fellowship Ghana 2026",
  ],
  authors: [
    {
      name: "Africa Academy of Creative Excellence",
      url: site.baseUrl,
    },
  ],
  alternates: {
    canonical: site.cefUrl,
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: site.cefUrl,
    siteName: "Africa Academy of Creative Excellence",
    title: pageTitle,
    description: pageDescription,
    locale: "en_GH",
    images: [
      {
        url: ogImageUrl,
        width: 3368,
        height: 1667,
        alt: "Creative Entrepreneurship Fellowship 2026 — KASA Africa Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImageUrl],
  },
};

export default function CefPage() {
  return (
    <>
      <CefStructuredData />
      <CefLanding />
    </>
  );
}
