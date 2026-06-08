import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Africa Academy of Creative Excellence | Coming Soon",
  description:
    "The KASA Africa Academy of Creative Excellence website is coming soon. Home of the Creative Entrepreneurship Fellowship and programs for visionary African creatives.",
  alternates: {
    canonical: site.baseUrl,
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary-container px-margin-mobile text-center text-on-primary">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--color-secondary-fixed) 35%, transparent), transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 90%, color-mix(in srgb, var(--color-secondary) 20%, transparent), transparent)
          `,
        }}
      />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-4">
        <Image
          src="/cef/KASA_Logo.png"
          alt="KASA Africa Academy of Creative Excellence"
          width={200}
          height={80}
          priority
          className="mx-auto h-auto w-[min(200px,60vw)]"
        />

        <div className="mx-auto mt-10 h-px w-16 bg-secondary-fixed" aria-hidden="true" />

        <p className="mt-10 font-display text-[clamp(2rem,6vw,3.25rem)] leading-tight tracking-tight text-on-primary">
          Coming Soon
        </p>

        <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-on-primary-container/80">
          We&apos;re building something extraordinary for Africa&apos;s creative
          entrepreneurs. Stay tuned.
        </p>

        <Link
          href={site.cef2Path}
          className="mx-auto mt-10 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-on-primary/25 px-6 py-3 text-center text-sm font-bold tracking-wide text-on-primary transition-colors hover:border-secondary-fixed hover:text-secondary-fixed"
        >
          Creative Entrepreneurship Fellowship 2026
          <span aria-hidden="true">{">"}</span>
        </Link>

        <p className="mt-16 text-xs tracking-[0.2em] text-on-primary-container/50 uppercase">
          KASA Africa Academy of Creative Excellence
        </p>
      </div>
    </div>
  );
}
