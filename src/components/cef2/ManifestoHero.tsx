"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { convener, fellowship, heroCardSpeakers } from "@/lib/content";
import { sectionImages } from "@/lib/images";
import { site } from "@/lib/site";
import { SectionBackdrop } from "@/components/cef2/SectionBackdrop";
import { CalendarToday, LocationOn, Payments } from "@/components/icons";
import { gsap } from "@/lib/gsap-client";
import { useGsapReady } from "@/hooks/useGsapReady";

const MOBILE_FAN = [
  { x: -85, y: 18, r: -18, z: 1 },
  { x: -58, y: 8, r: -11, z: 2 },
  { x: -28, y: 2, r: -4, z: 3 },
  { x: 28, y: 2, r: 4, z: 3 },
  { x: 58, y: 8, r: 11, z: 2 },
  { x: 85, y: 18, r: 18, z: 1 },
] as const;

const DESKTOP_FAN = [
  { x: -155, y: 30, r: -22, z: 1 },
  { x: -105, y: 14, r: -14, z: 2 },
  { x: -52, y: 4, r: -6, z: 3 },
  { x: 52, y: 4, r: 6, z: 3 },
  { x: 105, y: 14, r: 14, z: 2 },
  { x: 155, y: 30, r: 22, z: 1 },
] as const;

const heroCards = [
  {
    id: "convener",
    name: convener.name,
    role: `Convener · ${convener.role}`,
    image: convener.heroImage,
    isConvener: true,
  },
  ...heroCardSpeakers.map((speaker) => ({
    id: speaker.slug,
    name: speaker.name,
    role: speaker.role,
    image: `/cef/speakers/${speaker.slug}.jpg`,
    isConvener: false,
  })),
] as const;

type CardLayout = {
  x: number;
  y: number;
  r: number;
  z: number;
  scale: number;
  isActive: boolean;
  cardWidth: number;
};

function getFanLayout(width: number) {
  const isMobile = width < 768;
  return {
    positions: isMobile ? MOBILE_FAN : DESKTOP_FAN,
    cardWidth: isMobile ? 140 : 210,
  };
}

function getCardLayouts(activeIndex: number, width: number): CardLayout[] {
  const { positions, cardWidth } = getFanLayout(width);
  const total = heroCards.length;

  return heroCards.map((_, index) => {
    if (index === activeIndex) {
      return { x: 0, y: 0, r: 0, z: 20, scale: 1, isActive: true, cardWidth };
    }

    const offset = (index - activeIndex + total) % total;
    const fan = positions[offset - 1];
    return {
      x: fan.x,
      y: fan.y,
      r: fan.r,
      z: fan.z,
      scale: 0.92,
      isActive: false,
      cardWidth,
    };
  });
}

function applyCardLayout(
  cards: HTMLElement[],
  layouts: CardLayout[],
  options?: { duration?: number; ease?: string },
) {
  const { duration = 0.55, ease = "power3.inOut" } = options ?? {};

  cards.forEach((card, index) => {
    const layout = layouts[index];
    gsap.to(card, {
      x: layout.x,
      y: layout.y,
      rotation: layout.r,
      zIndex: layout.z,
      scale: layout.scale,
      width: layout.cardWidth,
      duration,
      ease,
      overwrite: "auto",
    });
  });
}

function HeroCarouselControls({
  variant,
  arrowPressed,
  onClick,
  ariaLabel,
}: {
  variant: "under-cards" | "footer";
  arrowPressed: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <div className={`cef2-hero-cards-controls cef2-hero-cards-controls--${variant}`}>
      {variant === "footer" && (
        <button
          type="button"
          className="cef2-hero-cards-switch-label"
          onClick={onClick}
          aria-label={ariaLabel}
        >
          Switch images
        </button>
      )}
      <button
        type="button"
        className={`cef2-hero-cards-next${arrowPressed ? " is-pressed" : ""}`}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M6.75 3.75L12 9l-5.25 5.25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export function ManifestoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gsapReady = useGsapReady();
  const [activeIndex, setActiveIndex] = useState(0);
  const [arrowPressed, setArrowPressed] = useState(false);
  const isAnimatingRef = useRef(false);
  const hasEnteredRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const advanceCarousel = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setActiveIndex((prev) => (prev + 1) % heroCards.length);
  }, []);

  const handleAdvanceClick = useCallback(() => {
    setArrowPressed(true);
    advanceCarousel();
    window.setTimeout(() => setArrowPressed(false), 140);
  }, [advanceCarousel]);

  useGSAP(
    () => {
      if (!gsapReady || !stageRef.current) return;

      const stage = stageRef.current;
      const cards = gsap.utils.toArray<HTMLElement>(".hero-carousel-card", stage);
      if (cards.length === 0) return;

      const layouts = getCardLayouts(activeIndex, window.innerWidth);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!hasEnteredRef.current) {
        hasEnteredRef.current = true;

        if (reducedMotion) {
          cards.forEach((card, index) => {
            const layout = layouts[index];
            gsap.set(card, {
              opacity: 1,
              x: layout.x,
              y: layout.y,
              rotation: layout.r,
              zIndex: layout.z,
              scale: layout.scale,
              width: layout.cardWidth,
            });
          });
          isAnimatingRef.current = false;
          return;
        }

        gsap.set(cards, { opacity: 0, scale: 0.88, x: 0, y: 0, rotation: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
        timelineRef.current = tl;

        tl.from(".hero-copy-item", { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 });

        cards.forEach((card, index) => {
          const layout = layouts[index];
          const delay = layout.isActive ? 0.15 : 0.28 + index * 0.05;
          tl.to(
            card,
            {
              opacity: 1,
              x: layout.x,
              y: layout.y,
              rotation: layout.r,
              zIndex: layout.z,
              scale: layout.scale,
              width: layout.cardWidth,
              duration: layout.isActive ? 0.85 : 0.65,
              ease: layout.isActive ? "back.out(1.5)" : "back.out(1.6)",
            },
            delay,
          );
        });
      } else {
        applyCardLayout(cards, layouts, {
          duration: reducedMotion ? 0 : 0.55,
          ease: "power3.inOut",
        });

        gsap.delayedCall(reducedMotion ? 0 : 0.55, () => {
          isAnimatingRef.current = false;
        });
      }

      const cleanups: Array<() => void> = [];

      cards.forEach((card) => {
        const onEnter = () => {
          if (!card.classList.contains("hero-carousel-card-active")) return;
          gsap.to(card, { scale: 1.05, duration: 0.25, ease: "power2.out", overwrite: "auto" });
        };
        const onLeave = () => {
          if (!card.classList.contains("hero-carousel-card-active")) return;
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      let resizeTimer: ReturnType<typeof setTimeout> | undefined;
      const onResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          const nextLayouts = getCardLayouts(activeIndex, window.innerWidth);
          applyCardLayout(cards, nextLayouts, { duration: 0 });
        }, 150);
      };
      window.addEventListener("resize", onResize);

      return () => {
        timelineRef.current?.kill();
        if (resizeTimer) clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: sectionRef, dependencies: [gsapReady, activeIndex] },
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
        <div className="cef2-hero-cards-col">
          <div ref={stageRef} className="cef2-hero-card-stage">
            {heroCards.map((card, index) => (
              <article
                key={card.id}
                className={`cef2-hero-speaker-card hero-carousel-card${
                  index === activeIndex ? " hero-carousel-card-active" : ""
                }${card.isConvener && index === activeIndex ? " cef2-hero-card-convener" : ""}`}
                aria-hidden={index !== activeIndex}
              >
                <div className="cef2-hero-card-photo">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 767px) 140px, 210px"
                    priority={card.isConvener}
                  />
                </div>
                <div className="cef2-hero-card-name-bar">
                  <p className="cef2-hero-card-name">{card.name}</p>
                  <p className="cef2-hero-card-role">{card.role}</p>
                </div>
              </article>
            ))}
          </div>

          <HeroCarouselControls
            variant="under-cards"
            arrowPressed={arrowPressed}
            onClick={handleAdvanceClick}
            ariaLabel={`Show next speaker, currently ${heroCards[activeIndex].name}`}
          />
        </div>

        <div className="cef2-hero-copy min-w-0">
          <p className="cef2-hero-eyebrow hero-copy-item">
            KASA Africa Academy of Creative Excellence
          </p>

          <h1 className="cef2-hero-headline cef2-manifesto-line hero-copy-item font-medium uppercase text-on-primary">
            <span className="block">From Talent</span>
            <span className="block">
              To <span className="text-secondary-fixed">Profitable</span>
            </span>
            <span className="block origin-left -rotate-1 text-secondary-fixed md:-rotate-1">
              Business
            </span>
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
        </div>

        <div className="cef2-hero-footer hero-copy-item">
          <div className="cef2-hero-meta">
            <div className="cef2-hero-meta-item">
              <span className="mt-0.5 shrink-0 text-secondary-fixed">
                <CalendarToday className="h-[18px] w-[18px]" />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="cef2-hero-meta-label">Dates</span>
                <span className="cef2-hero-meta-val">{fellowship.dates}</span>
              </div>
            </div>
            <div className="cef2-hero-meta-item">
              <span className="mt-0.5 shrink-0 text-secondary-fixed">
                <LocationOn className="h-[18px] w-[18px]" />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="cef2-hero-meta-label">Venue</span>
                <span className="cef2-hero-meta-val">{fellowship.venue}</span>
              </div>
            </div>
            <div className="cef2-hero-meta-item">
              <span className="mt-0.5 shrink-0 text-secondary-fixed">
                <Payments className="h-[18px] w-[18px]" />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="cef2-hero-meta-label">Investment</span>
                <span className="cef2-hero-meta-val">
                  GHC {fellowship.pricing.earlyBird.amount} early bird · GHC{" "}
                  {fellowship.pricing.regular.amount} regular
                </span>
              </div>
            </div>
          </div>

          <HeroCarouselControls
            variant="footer"
            arrowPressed={arrowPressed}
            onClick={handleAdvanceClick}
            ariaLabel={`Show next speaker, currently ${heroCards[activeIndex].name}`}
          />
        </div>
      </div>
    </section>
  );
}
