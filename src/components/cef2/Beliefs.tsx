"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-client";
import { useGsapReady } from "@/hooks/useGsapReady";

const beliefs = [
  {
    text: "Talent without structure is a gift waiting to be lost.",
    bleed: "cef2-bleed-cream",
  },
  {
    text: "Creative excellence demands commercial literacy.",
    bleed: "cef2-bleed-gold",
  },
  {
    text: "Africa's next creative empires will be built in studios, not spreadsheets alone.",
    bleed: "cef2-bleed-burgundy",
  },
];

export function Beliefs() {
  const sectionRef = useRef<HTMLElement>(null);
  const gsapReady = useGsapReady();

  useGSAP(
    () => {
      if (!gsapReady) return;

      gsap.utils.toArray<HTMLElement>(".belief-panel").forEach((panel) => {
        gsap.from(panel, {
          x: -80,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [gsapReady] },
  );

  return (
    <section ref={sectionRef} id="beliefs">
      {beliefs.map((belief) => (
        <article
          key={belief.text}
          className={`belief-panel ${belief.bleed} relative overflow-hidden px-margin-mobile py-16 md:px-margin-desktop md:py-28`}
        >
          <p className="cef2-manifesto-line relative z-10 mx-auto max-w-4xl min-w-0 text-[clamp(1.5rem,4.5vw,3.25rem)] font-medium leading-tight break-words">
            {belief.text}
          </p>
        </article>
      ))}
    </section>
  );
}
