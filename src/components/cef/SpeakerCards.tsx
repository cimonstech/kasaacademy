"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { facultyFeatured } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function speakerImage(slug: string) {
  return `/cef/speakers/${slug}.jpg`;
}

function facultyAlt(name: string, role: string, isConvener: boolean) {
  if (isConvener) {
    return `${name}, Convener of the Creative Entrepreneurship Fellowship 2026`;
  }
  return `${name}, ${role} — CEF Faculty 2026`;
}

export default function SpeakerCards() {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      gsap.from(".speaker-card", {
        y: 36,
        opacity: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: listRef },
  );

  return (
    <ul
      ref={listRef}
      className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4"
    >
      {facultyFeatured.map((member) => (
        <li key={member.slug}>
          <article className="speaker-card overflow-hidden rounded-xl border border-outline-variant/30 bg-white">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container">
              <Image
                src={speakerImage(member.slug)}
                alt={facultyAlt(member.name, member.role, member.isConvener)}
                width={352}
                height={512}
                className="h-full w-full object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div
              className={`p-6 ${
                member.isConvener
                  ? "border-b-4 border-secondary"
                  : "border-b-4 border-primary"
              }`}
            >
              {member.isConvener && "tag" in member && member.tag && (
                <span className="mb-2 inline-block rounded-full bg-secondary-fixed/20 px-3 py-1 text-[10px] font-bold tracking-wide text-secondary uppercase">
                  {member.tag}
                </span>
              )}
              <h3 className="font-display text-xl text-primary">{member.name}</h3>
              <p className="mt-1 text-sm text-on-surface-variant">{member.role}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
