"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { CardBrandMark } from "@/components/cef2/CardBrandMark";
import { JourneyDayModal } from "@/components/cef2/JourneyDayModal";
import { curriculum, type CurriculumDay } from "@/lib/content";
import { sectionImages } from "@/lib/images";
import { SectionBackdrop } from "@/components/cef2/SectionBackdrop";
import { gsap, ScrollTrigger } from "@/lib/gsap-client";
import { useGsapReady } from "@/hooks/useGsapReady";
import { site } from "@/lib/site";

type GenieOrigin = {
  x: number;
  y: number;
};

function JourneyEyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function JourneyScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const gsapReady = useGsapReady();
  const [selectedDay, setSelectedDay] = useState<CurriculumDay | null>(null);
  const [genieOrigin, setGenieOrigin] = useState<GenieOrigin | null>(null);

  const openDayModal = (day: CurriculumDay, trigger: HTMLButtonElement) => {
    const rect = trigger.getBoundingClientRect();
    setGenieOrigin({ x: rect.right, y: rect.bottom });
    setSelectedDay(day);
  };

  const closeDayModal = () => {
    setSelectedDay(null);
    setGenieOrigin(null);
  };

  useGSAP(
    () => {
      if (!gsapReady) return;

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const ctaCard = track.querySelector<HTMLElement>("[data-journey-cta]");
        if (!ctaCard) return;

        const getMetrics = () => {
          const viewport = window.innerWidth;
          const cardWidth = ctaCard.offsetWidth;
          track.style.paddingRight = `${Math.max(0, viewport / 2 - cardWidth / 2)}px`;

          const cardCenter = ctaCard.offsetLeft + cardWidth / 2;
          const endX = viewport / 2 - cardCenter;

          return {
            endX,
            scrollDistance: Math.abs(endX),
          };
        };

        const tween = gsap.to(track, {
          x: () => getMetrics().endX,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getMetrics().scrollDistance + window.innerHeight * 0.6}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.refresh();

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          track.style.paddingRight = "";
          gsap.set(track, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [gsapReady] },
  );

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="cef2-bleed-ink relative overflow-hidden"
    >
      <SectionBackdrop src={sectionImages.journey} overlay="ink" />
      <div className="relative z-10 px-margin-mobile pt-10 pb-4 md:absolute md:top-8 md:left-margin-desktop md:px-0 md:pt-0 md:pb-0">
        <p className="text-xs font-bold tracking-[0.25em] text-secondary-fixed-dim uppercase">
          The Journey
        </p>
        <h2 className="cef2-manifesto-line mt-2 text-3xl text-on-tertiary sm:text-4xl md:text-5xl">
          Five days. Five shifts.
        </h2>
        <p className="mt-2 text-xs text-on-tertiary/60 md:hidden">Swipe to explore →</p>
      </div>

      <div
        ref={trackRef}
        className="cef2-journey-track relative z-10 flex min-h-0 items-stretch gap-4 overflow-x-auto px-margin-mobile pt-4 pb-10 snap-x snap-mandatory md:min-h-screen md:items-center md:gap-6 md:overflow-x-visible md:px-margin-desktop md:pt-40 md:pb-16 md:snap-none"
      >
        {curriculum.map((day, i) => (
          <article
            key={day.day}
            className="relative w-[min(82vw,20rem)] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:w-[min(78vw,22rem)] sm:p-8 md:w-[24rem] md:p-10"
          >
            {i === 4 && (
              <CardBrandMark src={site.cefIcon} position="bottom-right" size="md" opacity={0.18} />
            )}
            <div className="relative z-10 flex items-baseline justify-between">
              <span className="font-display text-6xl text-on-tertiary-container/30 tabular-nums">
                {day.day}
              </span>
              <span className="text-xs font-bold tracking-widest text-secondary-fixed uppercase">
                {day.date}
              </span>
            </div>
            <h3 className="cef2-manifesto-line relative z-10 mt-6 text-3xl text-on-tertiary">
              {day.title}
            </h3>
            <p className="relative z-10 mt-4 text-sm leading-relaxed text-on-tertiary/90">
              {day.description}
            </p>
            <div className="relative z-10 mt-8 h-1 w-12 bg-secondary-fixed" />
            <p className="relative z-10 mt-4 text-xs text-on-tertiary/70">
              Phase {i + 1} of 5
            </p>
            <button
              type="button"
              className="cef2-journey-eye absolute right-4 bottom-4 z-20"
              onClick={(event) => openDayModal(day, event.currentTarget)}
              aria-label={`View Day ${Number.parseInt(day.day, 10)} details`}
            >
              <JourneyEyeIcon />
            </button>
          </article>
        ))}

        <article
          data-journey-cta
          className="relative flex w-[min(82vw,18rem)] shrink-0 snap-center flex-col justify-center overflow-hidden rounded-2xl bg-secondary-container p-6 sm:w-[min(78vw,18rem)] sm:p-8 md:w-[20rem] md:p-10"
        >
          <CardBrandMark src={site.cefWeb} position="top-right" size="md" opacity={0.2} />
          <p className="cef2-manifesto-line relative z-10 text-3xl text-on-secondary-fixed">
            Ready to begin?
          </p>
          <a
            href="#register"
            className="relative z-10 mt-6 inline-block text-sm font-bold tracking-wide text-on-secondary-fixed underline decoration-primary decoration-2 underline-offset-4"
          >
            Register now →
          </a>
        </article>
      </div>

      {selectedDay && genieOrigin && (
        <JourneyDayModal day={selectedDay} origin={genieOrigin} onClose={closeDayModal} />
      )}
    </section>
  );
}
