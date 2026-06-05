"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { facultyCompact, facultyFeatured } from "@/lib/content";
import { gsap } from "@/lib/gsap-client";
import { useGsapReady } from "@/hooks/useGsapReady";

function facultyImage(slug: string) {
  return `/cef/speakers/${slug}.jpg`;
}

export function Speakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const gsapReady = useGsapReady();

  useGSAP(
    () => {
      if (!gsapReady) return;

      gsap.from(".faculty-card", {
        y: 40,
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
    { scope: sectionRef, dependencies: [gsapReady] },
  );

  return (
    <section
      ref={sectionRef}
      id="faculty"
      className="cef2-bleed-cream py-stack-xl"
    >
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <header className="faculty-card mb-12 text-center md:mb-14">
          <h2 className="cef2-manifesto-line text-[clamp(2.25rem,5vw,3.25rem)] text-primary">
            Fellowship Faculty
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-on-surface-variant md:text-base">
            Learn from the architects of Ghana&apos;s creative industry
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facultyFeatured.map((member) => (
            <article
              key={member.slug}
              className="faculty-card group overflow-hidden rounded-2xl bg-white shadow-md transition-transform duration-300 ease-out hover:scale-[1.02] motion-reduce:hover:scale-100"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
                <Image
                  src={facultyImage(member.slug)}
                  alt={member.name}
                  fill
                  className="object-cover object-top grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div
                className={`border-b-4 px-5 py-5 ${
                  member.isConvener ? "border-secondary" : "border-primary"
                }`}
              >
                {member.isConvener && member.tag && (
                  <span className="mb-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-on-secondary-fixed uppercase">
                    {member.tag}
                  </span>
                )}
                <h3 className="cef2-manifesto-line text-lg leading-tight text-primary md:text-xl">
                  {member.name}
                </h3>
                <p
                  className={`mt-2 text-sm text-on-surface-variant ${
                    member.isConvener ? "italic" : ""
                  }`}
                >
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-5 md:mt-10 md:grid-cols-3">
          {facultyCompact.map((member) => (
            <article
              key={member.slug}
              className="faculty-card group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md transition-transform duration-300 ease-out hover:scale-[1.02] motion-reduce:hover:scale-100 md:p-5"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-surface-container md:h-[4.5rem] md:w-[4.5rem]">
                <Image
                  src={facultyImage(member.slug)}
                  alt={member.name}
                  fill
                  className="object-cover object-top grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                  sizes="72px"
                />
              </div>
              <div className="min-w-0">
                <h3 className="cef2-display text-sm font-bold leading-snug text-primary md:text-base">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs text-on-surface-variant md:text-sm">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
