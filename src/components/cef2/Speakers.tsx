"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { FacultyProfileModal } from "@/components/cef2/FacultyProfileModal";
import { facultyCompact, facultyFeatured, getFacultyProfile } from "@/lib/content";
import { gsap } from "@/lib/gsap-client";
import { useGsapReady } from "@/hooks/useGsapReady";

function facultyImage(slug: string) {
  return `/cef/speakers/${slug}.jpg`;
}

type FacultyMember = {
  slug: string;
  name: string;
  role: string;
  isConvener?: boolean;
  tag?: string;
};

function FacultyCard({
  member,
  className = "",
  hasProfile,
  onOpenProfile,
  onHoverStart,
  onHoverEnd,
}: {
  member: FacultyMember;
  className?: string;
  hasProfile: boolean;
  onOpenProfile: (slug: string) => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <article
      className={`faculty-card group flex shrink-0 snap-start flex-col overflow-hidden rounded-2xl border-b-4 bg-white shadow-md transition-transform duration-300 ease-out hover:scale-[1.02] motion-reduce:hover:scale-100 ${
        member.isConvener ? "border-secondary" : "border-primary"
      } ${className}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
        <Image
          src={facultyImage(member.slug)}
          alt={member.name}
          fill
          className="object-cover object-top grayscale transition-[filter] duration-300 group-hover:grayscale-0"
          sizes="(max-width: 640px) 72vw, 16rem"
        />
        {hasProfile && (
          <button
            type="button"
            className="cef2-faculty-card-overlay hidden md:flex"
            onClick={() => onOpenProfile(member.slug)}
            aria-label={`Learn about ${member.name}`}
          >
            <span className="cef2-faculty-card-overlay-label">Learn more</span>
          </button>
        )}
      </div>
      <div className="px-5 py-5">
        {member.isConvener && member.tag && (
          <span className="mb-2 inline-block text-[10px] font-bold tracking-[0.12em] text-secondary uppercase">
            {member.tag}
          </span>
        )}
        <h3 className="cef2-manifesto-line text-lg leading-tight text-primary md:text-xl">
          {member.name}
        </h3>
        <p className="mt-2 text-sm text-on-surface-variant">{member.role}</p>
        {hasProfile && (
          <button
            type="button"
            className="mt-3 text-xs font-bold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-primary md:hidden"
            onClick={() => onOpenProfile(member.slug)}
          >
            Learn more
          </button>
        )}
      </div>
    </article>
  );
}

const AUTO_INTERVAL_MS = 3500;
const MOBILE_QUERY = "(max-width: 767px)";

function FacultyNavArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="cef2-faculty-nav-btn"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous faculty member" : "Next faculty member"}
    >
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        {direction === "prev" ? (
          <path
            d="M11.25 3.75L5.25 9l6 5.25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6.75 3.75L12.75 9l-6 5.25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

export function Speakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const gsapReady = useGsapReady();
  const indexRef = useRef(0);
  const hoverCountRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const allFaculty = useMemo(
    () =>
      [...facultyFeatured, ...facultyCompact].map((member) => ({
        ...member,
        isConvener: "isConvener" in member ? member.isConvener : false,
        tag: "tag" in member ? member.tag : undefined,
      })),
    [],
  );

  const loopFaculty = useMemo(() => [...allFaculty, ...allFaculty], [allFaculty]);

  const selectedMember = useMemo(
    () => allFaculty.find((member) => member.slug === selectedSlug) ?? null,
    [allFaculty, selectedSlug],
  );

  const selectedProfile = selectedSlug ? getFacultyProfile(selectedSlug) : null;

  const handleHoverStart = useCallback(() => {
    hoverCountRef.current += 1;
    setIsPaused(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    hoverCountRef.current = Math.max(0, hoverCountRef.current - 1);
    if (hoverCountRef.current === 0) setIsPaused(false);
  }, []);

  const handleOpenProfile = useCallback((slug: string) => {
    if (!getFacultyProfile(slug)) return;
    setSelectedSlug(slug);
    setIsPaused(true);
  }, []);

  const handleCloseProfile = useCallback(() => {
    setSelectedSlug(null);
    if (hoverCountRef.current === 0) setIsPaused(false);
  }, []);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.children[0] as HTMLElement | undefined;
    if (!first) return 0;
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 24;
    return first.offsetWidth + gap;
  }, []);

  const resumeAuto = useCallback(() => {
    window.setTimeout(() => {
      if (hoverCountRef.current === 0 && !selectedSlug) {
        setIsPaused(false);
      }
    }, AUTO_INTERVAL_MS);
  }, [selectedSlug]);

  const shiftFaculty = useCallback(
    (direction: "prev" | "next") => {
      setIsPaused(true);

      if (isMobile && shellRef.current) {
        const step = getStep();
        shellRef.current.scrollBy({
          left: direction === "next" ? step : -step,
          behavior: "smooth",
        });
        resumeAuto();
        return;
      }

      const track = trackRef.current;
      if (!track) return;

      const step = getStep();
      if (step === 0) return;

      if (direction === "next") {
        indexRef.current += 1;
        gsap.to(track, {
          x: -indexRef.current * step,
          duration: 0.75,
          ease: "power2.inOut",
          onComplete: () => {
            if (indexRef.current >= allFaculty.length) {
              indexRef.current = 0;
              gsap.set(track, { x: 0 });
            }
            resumeAuto();
          },
        });
        return;
      }

      if (indexRef.current <= 0) {
        indexRef.current = allFaculty.length - 1;
        gsap.set(track, { x: -indexRef.current * step });
        resumeAuto();
        return;
      }

      indexRef.current -= 1;
      gsap.to(track, {
        x: -indexRef.current * step,
        duration: 0.75,
        ease: "power2.inOut",
        onComplete: resumeAuto,
      });
    },
    [allFaculty.length, getStep, isMobile, resumeAuto],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    gsap.set(trackRef.current, { x: 0 });
    indexRef.current = 0;
  }, [isMobile]);

  useGSAP(
    () => {
      if (!gsapReady) return;

      gsap.from(".faculty-carousel-shell", {
        y: 40,
        opacity: 0,
        duration: 0.6,
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

  useEffect(() => {
    if (!gsapReady || isPaused || selectedSlug) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    if (isMobile) {
      const shell = shellRef.current;
      if (!shell) return;

      const advanceMobile = () => {
        const step = getStep();
        if (step === 0) return;

        const maxScroll = shell.scrollWidth - shell.clientWidth;
        if (shell.scrollLeft >= maxScroll - 4) {
          shell.scrollTo({ left: 0, behavior: "smooth" });
          return;
        }

        shell.scrollBy({ left: step, behavior: "smooth" });
      };

      const interval = window.setInterval(advanceMobile, AUTO_INTERVAL_MS);
      return () => window.clearInterval(interval);
    }

    const track = trackRef.current;
    if (!track) return;

    const advance = () => {
      indexRef.current += 1;
      const step = getStep();

      gsap.to(track, {
        x: -indexRef.current * step,
        duration: 0.75,
        ease: "power2.inOut",
        onComplete: () => {
          if (indexRef.current >= allFaculty.length) {
            indexRef.current = 0;
            gsap.set(track, { x: 0 });
          }
        },
      });
    };

    const interval = window.setInterval(advance, AUTO_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [gsapReady, isMobile, isPaused, selectedSlug, allFaculty.length, getStep]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !isMobile) return;

    let touchCount = 0;

    const onTouchStart = () => {
      touchCount += 1;
      setIsPaused(true);
    };

    const onTouchEnd = () => {
      touchCount = Math.max(0, touchCount - 1);
      if (touchCount === 0 && !selectedSlug) {
        setIsPaused(false);
      }
    };

    shell.addEventListener("touchstart", onTouchStart, { passive: true });
    shell.addEventListener("touchend", onTouchEnd, { passive: true });
    shell.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      shell.removeEventListener("touchstart", onTouchStart);
      shell.removeEventListener("touchend", onTouchEnd);
      shell.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [isMobile, selectedSlug]);

  const carouselMembers = isMobile ? allFaculty : loopFaculty;

  return (
    <section
      ref={sectionRef}
      id="faculty"
      className="cef2-bleed-cream py-stack-xl"
    >
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <header className="relative mb-12 md:mb-14">
          <div className="text-center">
            <h2 className="cef2-manifesto-line text-[clamp(2.25rem,5vw,3.25rem)] text-primary">
              Fellowship Faculty
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-on-surface-variant md:text-base">
              Learn from the architects of Ghana&apos;s creative industry
            </p>
          </div>
          <div className="cef2-faculty-nav mt-6 hidden justify-center gap-3 md:absolute md:top-0 md:right-0 md:mt-2 md:flex">
            <FacultyNavArrow direction="prev" onClick={() => shiftFaculty("prev")} />
            <FacultyNavArrow direction="next" onClick={() => shiftFaculty("next")} />
          </div>
        </header>

        <div
          ref={shellRef}
          className={`faculty-carousel-shell cef2-faculty-carousel ${
            isMobile ? "cef2-faculty-carousel--scroll" : ""
          }`}
        >
          <div
            ref={trackRef}
            className={`cef2-faculty-carousel-track flex gap-6 ${
              isMobile ? "" : "will-change-transform"
            }`}
          >
            {carouselMembers.map((member, index) => (
              <FacultyCard
                key={`${member.slug}-${index}`}
                member={member}
                hasProfile={getFacultyProfile(member.slug) !== null}
                onOpenProfile={handleOpenProfile}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                className="w-[min(72vw,16rem)] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
              />
            ))}
          </div>
        </div>
      </div>

      {selectedMember && selectedProfile && (
        <FacultyProfileModal
          name={selectedMember.name}
          role={selectedMember.role}
          slug={selectedMember.slug}
          profile={selectedProfile}
          onClose={handleCloseProfile}
        />
      )}
    </section>
  );
}
