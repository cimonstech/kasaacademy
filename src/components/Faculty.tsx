"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { facultyCompact } from "@/lib/content";

const SpeakerCards = dynamic(() => import("@/components/cef/SpeakerCards"), {
  ssr: false,
});

gsap.registerPlugin(useGSAP, ScrollTrigger);

function speakerImage(slug: string) {
  return `/cef/speakers/${slug}.jpg`;
}

function compactAlt(name: string, role: string) {
  return `${name}, ${role} — CEF Faculty 2026`;
}

export function Faculty() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".faculty-compact-card", {
        y: 36,
        opacity: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="faculty"
      className="mx-auto max-w-container-max px-margin-mobile py-stack-xl md:px-margin-desktop"
    >
      <div className="mb-16 max-w-2xl">
        <h2 className="font-display text-[length:var(--text-headline-lg)] text-primary">
          Fellowship Faculty
        </h2>
        <p className="mt-4 text-on-surface-variant">
          Learn from the architects of Ghana&apos;s creative industry
        </p>
      </div>

      <SpeakerCards />

      <ul className="mx-auto mt-gutter grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
        {facultyCompact.map((member) => (
          <li key={member.slug}>
            <article className="faculty-compact-card flex items-center gap-5 rounded-xl border border-outline-variant/30 bg-surface-container-low p-5">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-surface-container">
                <Image
                  src={speakerImage(member.slug)}
                  alt={compactAlt(member.name, member.role)}
                  width={352}
                  height={512}
                  className="h-full w-full object-cover object-top"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg text-primary">{member.name}</h3>
                <p className="text-xs text-on-surface-variant">{member.role}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
