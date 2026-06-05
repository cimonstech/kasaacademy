"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { convener, fellowship } from "@/lib/content";
import { ArrowForward } from "@/components/icons";

const HeroCanvas = dynamic(() => import("@/components/cef/HeroCanvas"), {
  ssr: false,
});

gsap.registerPlugin(useGSAP);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".stat-hero-num", { scale: 0.85, opacity: 0, duration: 1 })
        .from(".stat-hero-qual", { y: 24, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".stat-hero-body", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".stat-hero-cta", { y: 16, opacity: 0, duration: 0.4 }, "-=0.1")
        .from(".stat-hero-portrait", { scale: 0.92, opacity: 0, duration: 0.7 }, "-=0.6");
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-primary-container py-stack-xl text-on-primary md:py-32"
    >
      <HeroCanvas />

      <div className="relative z-10 mx-auto grid max-w-container-max grid-cols-1 items-end gap-stack-lg px-margin-mobile md:grid-cols-12 md:px-margin-desktop">
        <div className="md:col-span-7">
          <p className="stat-hero-body mb-6 text-sm font-bold tracking-[0.2em] text-secondary-fixed uppercase">
            Fellowship Residency
          </p>
          <h1 className="stat-hero-num font-display text-[clamp(6rem,18vw,12rem)] leading-[0.85] font-medium tracking-tighter tabular-nums">
            <span className="sr-only">
              Creative Entrepreneurship Fellowship 2026 —{" "}
            </span>
            05
          </h1>
          <p className="stat-hero-qual mt-4 max-w-lg font-display text-2xl text-primary-fixed md:text-3xl">
            intensive days to turn creative talent into a profitable business
          </p>
        </div>

        <div className="space-y-stack-md md:col-span-5">
          <div className="stat-hero-portrait relative mx-auto aspect-[3/4] w-full max-w-[13rem] overflow-hidden rounded-2xl border-2 border-secondary-fixed shadow-xl md:mx-0 md:max-w-[15rem]">
            <Image
              src={convener.heroImage}
              alt="Bazal Darko Esq., Convener of the Creative Entrepreneurship Fellowship 2026"
              width={352}
              height={512}
              priority
              className="h-full w-full object-cover object-top"
              sizes="(max-width: 768px) 208px, 240px"
            />
          </div>
          <p className="stat-hero-body text-lg text-on-primary-container">
            {fellowship.dates}
          </p>
          <p className="stat-hero-body text-lg text-on-primary-container">
            {fellowship.venue}
          </p>
          <p className="stat-hero-body text-base text-on-primary-container/80">
            Seven industry mentors. One studio immersion. One pitch showcase.
            Limited seats.
          </p>
          <a
            href="#register"
            className="stat-hero-cta group inline-flex items-center gap-3 rounded-full bg-secondary-container px-8 py-4 text-sm font-bold text-on-secondary-fixed transition-colors duration-300 hover:bg-secondary-fixed focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-fixed"
          >
            Secure Your Seat
            <ArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
