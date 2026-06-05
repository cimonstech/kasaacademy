"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { convener, fellowship, heroCardSpeakers } from "@/lib/content";
import { sectionImages } from "@/lib/images";
import { site } from "@/lib/site";
import { SectionBackdrop } from "@/components/cef2/SectionBackdrop";
import { CalendarToday, LocationOn } from "@/components/icons";
import { gsap } from "@/lib/gsap-client";
import { useGsapReady } from "@/hooks/useGsapReady";

const baseFanPositions = [
  { x: -78, y: 18, r: -12, z: 1 },
  { x: -52, y: 9, r: -8, z: 2 },
  { x: -26, y: 2, r: -4, z: 3 },
  { x: 26, y: 2, r: 4, z: 3 },
  { x: 52, y: 9, r: 8, z: 2 },
  { x: 78, y: 18, r: 12, z: 1 },
] as const;

const convenerRest = { x: 0, y: 0, r: 0, z: 10 };

function fanScale(width: number) {
  if (width < 400) return 0.42;
  if (width < 640) return 0.55;
  if (width < 900) return 0.72;
  return 1;
}

function getFanPositions(width: number) {
  const scale = fanScale(width);
  return baseFanPositions.map((pos) => ({
    x: Math.round(pos.x * scale),
    y: Math.round(pos.y * scale),
    r: pos.r,
    z: pos.z,
  }));
}

export function ManifestoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gsapReady = useGsapReady();

  useGSAP(
    () => {
      if (!gsapReady || !stageRef.current) return;

      const stage = stageRef.current;
      const speakerCards = gsap.utils.toArray<HTMLElement>(".hero-speaker-card", stage);
      const convenerCard = stage.querySelector<HTMLElement>(".hero-convener-card");
      if (!convenerCard || speakerCards.length === 0) return;

      const allCards = [...speakerCards, convenerCard];
      const positions = getFanPositions(window.innerWidth);

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        speakerCards.forEach((card, i) => {
          const f = positions[i];
          gsap.set(card, { opacity: 1, scale: 1, x: f.x, y: f.y, rotation: f.r, zIndex: f.z });
        });
        gsap.set(convenerCard, { opacity: 1, scale: 1, ...convenerRest });
        return;
      }

      gsap.set(speakerCards, { opacity: 0, scale: 0.88, x: 0, y: 0, rotation: 0 });
      gsap.set(convenerCard, { opacity: 0, scale: 0.9, y: 20, zIndex: convenerRest.z });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-copy-item", { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 })
        .to(
          convenerCard,
          { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: "back.out(1.5)" },
          "-=0.4",
        );

      const fanTl = gsap.timeline({ delay: 0.2 });
      speakerCards.forEach((card, i) => {
        const f = positions[i];
        fanTl.to(
          card,
          {
            opacity: 1,
            scale: 1,
            x: f.x,
            y: f.y,
            rotation: f.r,
            zIndex: f.z,
            duration: 0.65,
            ease: "back.out(1.6)",
          },
          i * 0.06,
        );
      });

      const cleanups: Array<() => void> = [];

      allCards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, { scale: 1.05, duration: 0.25, ease: "power2.out", overwrite: "auto" });
        };
        const onLeave = () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      let lastWidth = window.innerWidth;
      const onResize = () => {
        const width = window.innerWidth;
        if (Math.abs(width - lastWidth) < 40) return;
        lastWidth = width;
        const next = getFanPositions(width);
        speakerCards.forEach((card, i) => {
          const f = next[i];
          gsap.set(card, { x: f.x, y: f.y, rotation: f.r, zIndex: f.z });
        });
      };
      window.addEventListener("resize", onResize);

      return () => {
        tl.kill();
        fanTl.kill();
        window.removeEventListener("resize", onResize);
        cleanups.forEach((fn) => fn());
        speakerCards.forEach((card, i) => {
          const f = positions[i];
          gsap.set(card, {
            clearProps: "transform,opacity",
            opacity: 1,
            scale: 1,
            x: f.x,
            y: f.y,
            rotation: f.r,
            zIndex: f.z,
          });
        });
        gsap.set(convenerCard, {
          clearProps: "transform,opacity",
          opacity: 1,
          scale: 1,
          ...convenerRest,
        });
      };
    },
    { scope: sectionRef, dependencies: [gsapReady] },
  );

  return (
    <section
      ref={sectionRef}
      className="cef2-bleed-burgundy cef2-grain relative min-h-0 overflow-hidden md:min-h-[92vh]"
    >
      <SectionBackdrop
        src={sectionImages.hero}
        alt=""
        overlay="burgundy"
        priority
      />

      <div className="cef2-hero-wrap">
        <div className="cef2-hero-copy min-w-0">
          <p className="cef2-hero-eyebrow hero-copy-item">
            KASA Africa Academy of Creative Excellence
          </p>

          <h1 className="cef2-manifesto-line hero-copy-item text-[clamp(1.69rem,5.54vw,4rem)] font-medium uppercase text-on-primary">
            <span className="block">From Talent</span>
            <span className="block">
              To <span className="cef2-accent-block">Profitable</span>
            </span>
            <span className="block origin-left -rotate-1 text-secondary-fixed">Business</span>
          </h1>

          <p className="cef2-hero-sub hero-copy-item">
            A 5-day intensive fellowship equipping Ghana&apos;s creative entrepreneurs
            with the mindset, strategy, and network to build businesses that last.
          </p>

          <div className="cef2-hero-actions hero-copy-item">
            <a
              href={site.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cef2-hero-btn-gold"
            >
              Join the Fellowship
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path
                  d="M1.5 6.5h10M7 2l4.5 4.5L7 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href={site.curriculumPdf} className="cef2-hero-btn-ghost" download>
              Download Curriculum
            </a>
          </div>

          <div className="cef2-hero-meta hero-copy-item">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 text-secondary-fixed">
                <CalendarToday className="h-[18px] w-[18px]" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="cef2-hero-meta-label">Dates</span>
                <span className="cef2-hero-meta-val">{fellowship.dates}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 text-secondary-fixed">
                <LocationOn className="h-[18px] w-[18px]" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="cef2-hero-meta-label">Venue</span>
                <span className="cef2-hero-meta-val">{fellowship.venue}</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="cef2-hero-meta-label">Investment</span>
              <span className="cef2-hero-meta-val">
                GHC {fellowship.pricing.earlyBird.amount} early bird
              </span>
            </div>
          </div>
        </div>

        <div ref={stageRef} className="cef2-hero-card-stage">
          {heroCardSpeakers.map((speaker) => (
            <article
              key={speaker.slug}
              className="cef2-hero-speaker-card hero-speaker-card"
            >
              <div className="cef2-hero-card-photo">
                <Image
                  src={`/cef/speakers/${speaker.slug}.jpg`}
                  alt={speaker.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 900px) 155px, 210px"
                />
              </div>
              <div className="cef2-hero-card-name-bar">
                <p className="cef2-hero-card-name">{speaker.name}</p>
                <p className="cef2-hero-card-role">{speaker.role}</p>
              </div>
            </article>
          ))}

          <article className="cef2-hero-speaker-card cef2-hero-card-convener hero-convener-card">
            <span className="cef2-hero-convener-badge">Convener</span>
            <div className="cef2-hero-card-photo">
              <Image
                src={convener.heroImage}
                alt={convener.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 900px) 155px, 210px"
                priority
              />
            </div>
            <div className="cef2-hero-card-name-bar">
              <p className="cef2-hero-card-name">{convener.name}</p>
              <p className="cef2-hero-card-role">
                Convener · {convener.role}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
