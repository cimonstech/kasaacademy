"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { goals } from "@/lib/content";
import { CheckCircle } from "@/components/icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: "5", label: "Intensive Days" },
  { value: "7", label: "Industry Mentors" },
  { value: "1", label: "Studio Visit" },
  { value: "1.5k", label: "Early Bird GHC" },
];

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".proof-stat", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
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
    <section
      ref={sectionRef}
      id="about"
      className="bg-primary py-stack-xl text-on-primary"
    >
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 gap-8 border-b border-white/15 pb-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="proof-stat text-center md:text-left">
              <div className="font-display text-5xl font-medium tabular-nums text-secondary-fixed md:text-6xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-bold tracking-widest text-on-primary/70 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-stack-lg lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-on-primary">
              About the Fellowship
            </h2>
            <p className="mt-4 max-w-lg text-on-primary/75">
              The KASA Creative Entrepreneurship Fellowship bridges artistic
              brilliance and structural commercial success — for creatives ready
              to build businesses that last.
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl text-on-primary">
              What You Leave With
            </h3>
            <ul className="mt-6 grid grid-cols-1 gap-3">
            {goals.map((goal) => (
              <li
                key={goal}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-5 py-4"
              >
                <CheckCircle className="shrink-0 text-secondary-fixed" />
                <span className="text-sm font-medium text-on-primary/90">
                  {goal}
                </span>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
