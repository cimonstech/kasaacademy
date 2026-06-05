"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMounted } from "@/hooks/useMounted";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type VisualInterludeProps = {
  caption?: string;
};

export function VisualInterlude({ caption }: VisualInterludeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useMounted();

  useGSAP(
    () => {
      if (!mounted || !sectionRef.current) return;

      gsap.from(sectionRef.current, {
        opacity: 0.6,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef, dependencies: [mounted] },
  );

  if (!caption) return null;

  return (
    <section
      ref={sectionRef}
      className="cef2-bleed-ink relative flex h-[min(50vh,28rem)] items-end overflow-hidden"
    >
      <p className="cef2-mono absolute bottom-6 left-margin-mobile z-10 text-xs tracking-widest text-on-tertiary/80 uppercase md:left-margin-desktop">
        {caption}
      </p>
    </section>
  );
}
