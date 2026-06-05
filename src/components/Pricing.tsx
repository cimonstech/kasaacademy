"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { fellowship } from "@/lib/content";
import { Chat, Verified } from "@/components/icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const tiers = [
  {
    name: "Early Bird",
    badge: "Limited Availability",
    amount: fellowship.pricing.earlyBird.amount,
    note: `Valid until ${fellowship.pricing.earlyBird.deadline}`,
    features: [
      "Full 5-Day Access",
      "Course Materials & Workbooks",
      "Tigon Creative Studio Site Visit",
      "Professional Certificate",
    ],
    style: "gold" as const,
  },
  {
    name: "Regular Seat",
    badge: "Standard Enrollment",
    amount: fellowship.pricing.regular.amount,
    note: null,
    features: [
      "Full 5-Day Access",
      "Course Materials & Workbooks",
      "Professional Certificate",
      "Pitch Session Participation",
    ],
    style: "burgundy" as const,
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".pricing-row", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="register"
      className="border-y border-outline-variant/30 bg-surface-container-low py-stack-xl"
    >
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="mb-12 max-w-xl">
          <h2 className="font-display text-[length:var(--text-headline-lg)] text-primary">
            Register
          </h2>
          <p className="mt-4 text-on-surface-variant">
            Two enrollment paths. Same fellowship. Different timing.
          </p>
        </div>

        <div className="space-y-6">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`pricing-row grid grid-cols-1 gap-8 rounded-2xl border p-8 md:grid-cols-12 md:p-10 ${
                tier.style === "gold"
                  ? "border-secondary/30 bg-secondary-container"
                  : "border-primary/20 bg-primary text-on-primary"
              }`}
            >
              <div className="md:col-span-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                    tier.style === "gold"
                      ? "bg-white/25 text-on-secondary-fixed"
                      : "bg-primary-container text-on-primary"
                  }`}
                >
                  {tier.badge}
                </span>
                <h3
                  className={`mt-4 font-display text-3xl ${
                    tier.style === "gold"
                      ? "text-on-secondary-fixed"
                      : "text-white"
                  }`}
                >
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={`text-lg font-bold ${
                      tier.style === "gold"
                        ? "text-on-secondary-fixed/70"
                        : "text-white/70"
                    }`}
                  >
                    GHC
                  </span>
                  <span
                    className={`font-display text-5xl font-medium tabular-nums ${
                      tier.style === "gold"
                        ? "text-on-secondary-fixed"
                        : "text-white"
                    }`}
                  >
                    {tier.amount}
                  </span>
                </div>
              </div>

              <ul
                className={`space-y-3 md:col-span-5 ${
                  tier.style === "gold"
                    ? "text-on-secondary-fixed-variant"
                    : "text-white/85"
                }`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium">
                    <Verified
                      className={
                        tier.style === "gold"
                          ? "text-secondary"
                          : "text-secondary-fixed"
                      }
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col justify-end gap-3 md:col-span-3">
                <button
                  type="button"
                  className={`w-full rounded-xl py-4 font-bold transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 ${
                    tier.style === "gold"
                      ? "bg-on-secondary-fixed text-white focus-visible:outline-primary"
                      : "bg-white text-primary focus-visible:outline-secondary"
                  }`}
                >
                  Pay with Paystack
                </button>
                {tier.note && (
                  <p className="text-center text-xs opacity-60">{tier.note}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-on-surface-variant">
          <Chat />
          Questions?{" "}
          <a
            href={fellowship.contact.whatsapp}
            className="font-bold text-primary underline decoration-secondary"
          >
            WhatsApp {fellowship.contact.whatsappLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
