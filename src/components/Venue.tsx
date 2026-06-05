"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LocationOn, MapIcon } from "@/components/icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Venue() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".venue-block", {
        y: 32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-stack-xl">
      <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-stack-lg px-margin-mobile md:grid-cols-2 md:px-margin-desktop">
        <div className="venue-block space-y-6">
          <h2 className="font-display text-[length:var(--text-headline-lg)] text-primary">
            The Studio Venue
          </h2>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary-fixed-dim">
              <LocationOn />
            </span>
            <div>
              <h3 className="font-display text-xl text-primary">
                Bazal Art Studios
              </h3>
              <p className="text-on-surface-variant">East Legon, Accra, Ghana</p>
            </div>
          </div>
          <p className="max-w-prose leading-relaxed text-on-surface-variant">
            Our fellowship is hosted in an environment designed for inspiration.
            Bazal Art Studios provides the perfect blend of creative chaos and
            professional structure required for deep work.
          </p>
          <a
            href="https://maps.google.com/?q=Bazal+Art+Studios+East+Legon+Accra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
          >
            <MapIcon />
            View on Google Maps
          </a>
        </div>

        <div
          className="venue-block relative aspect-[4/3] overflow-hidden rounded-2xl border border-outline-variant/40"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 50% at 60% 30%, color-mix(in srgb, var(--color-secondary-fixed-dim) 25%, transparent), transparent),
                linear-gradient(160deg, var(--color-surface-container) 0%, var(--color-primary-container) 100%)
              `,
            }}
          />
          <div className="absolute inset-8 border border-white/20" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="font-display text-2xl text-on-primary">Bazal Art Studios</p>
            <p className="text-sm text-on-primary-container">East Legon · Accra</p>
          </div>
        </div>
      </div>
    </section>
  );
}
