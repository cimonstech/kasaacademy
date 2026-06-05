"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { curriculum } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const stages = gsap.utils.toArray<HTMLElement>(".journey-stage");

      stages.forEach((stage) => {
        gsap.from(stage, {
          x: -40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="mx-auto max-w-container-max px-margin-mobile py-stack-xl md:px-margin-desktop"
    >
      <div className="mb-16 max-w-2xl">
        <h2 className="font-display text-[length:var(--text-headline-lg)] text-primary">
          The Five-Day Journey
        </h2>
        <p className="mt-4 text-lg text-on-surface-variant">
          Each day builds on the last — from identity to execution. This is the
          roadmap from artistic brilliance to commercial structure.
        </p>
      </div>

      <ol className="relative space-y-0">
        {curriculum.map((day, index) => (
          <li
            key={day.day}
            className="journey-stage relative grid grid-cols-1 gap-6 border-t-2 border-primary py-12 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-3">
              <span className="font-display text-5xl font-medium text-primary/15 tabular-nums md:text-6xl">
                {day.day}
              </span>
              <p className="mt-2 text-xs font-bold tracking-widest text-secondary uppercase">
                {day.date}
              </p>
            </div>

            <div className="md:col-span-6">
              <h3 className="font-display text-2xl text-primary md:text-3xl">
                {day.title}
              </h3>
              <p className="mt-4 max-w-prose text-on-surface-variant">
                {day.description}
              </p>
            </div>

            <div className="flex items-start md:col-span-3 md:justify-end">
              <span className="rounded-full border border-outline-variant/50 bg-surface-container-low px-4 py-2 text-xs font-bold tracking-wide text-on-surface-variant">
                Day {index + 1} of 5
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 border-t-2 border-primary pt-12">
        <a
          href="#register"
          className="inline-flex items-center gap-2 font-display text-xl text-primary transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
          Start at Day 01
          <ArrowForward />
        </a>
      </div>
    </section>
  );
}

function ArrowForward() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
