import { site } from "@/lib/site";

const ogImage = `${site.baseUrl}/cef/CEF-banner.jpg`;

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Creative Entrepreneurship Fellowship 2026",
  description:
    "A 5-day immersive fellowship equipping Ghana's creative entrepreneurs with the mindset, skills, strategies, and networks to build profitable, sustainable businesses.",
  startDate: "2026-06-30T09:00:00+00:00",
  endDate: "2026-07-04T15:00:00+00:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Bazal Art Studios",
    address: {
      "@type": "PostalAddress",
      streetAddress: "East Legon",
      addressLocality: "Accra",
      addressCountry: "GH",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Africa Academy of Creative Excellence",
    url: site.baseUrl,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Early Bird",
      price: "1500",
      priceCurrency: "GHS",
      availability: "https://schema.org/InStock",
      validThrough: "2026-06-20",
      url: `${site.cefUrl}#register`,
    },
    {
      "@type": "Offer",
      name: "Regular",
      price: "2000",
      priceCurrency: "GHS",
      availability: "https://schema.org/InStock",
      url: `${site.cefUrl}#register`,
    },
  ],
  performer: [
    { "@type": "Person", name: "Bazal Darko Esq." },
    { "@type": "Person", name: "Betty Edem" },
    { "@type": "Person", name: "Tonyi Senayah" },
    { "@type": "Person", name: "Baaba Amoaba" },
    { "@type": "Person", name: "Veronica Owusu-Konamah Frimpong Esq." },
    { "@type": "Person", name: "Dr. Boahemaa Ntim" },
    { "@type": "Person", name: "Jonathan Addey" },
  ],
  image: ogImage,
  url: site.cefUrl,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: site.baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Creative Entrepreneurship Fellowship",
      item: site.cefUrl,
    },
  ],
};

export function CefStructuredData() {
  const jsonLd = [eventSchema, breadcrumbSchema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
