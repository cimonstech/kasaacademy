"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Quote() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".quote-reveal", {
        y: 50,
        opacity: 0,
        duration: 0.9,
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
      className="border-y border-outline-variant/30 bg-surface-container-low py-stack-xl"
    >
      <div className="quote-reveal mx-auto max-w-4xl px-margin-mobile text-center md:px-margin-desktop">
        <blockquote className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-snug font-medium text-primary">
          &ldquo;The gift is not the business. The business is what protects the
          gift.&rdquo;
        </blockquote>
        <p className="mt-8 text-sm font-bold tracking-[0.2em] text-secondary uppercase">
          Bazal Darko Esq. · Convener
        </p>
      </div>
    </section>
  );
}
