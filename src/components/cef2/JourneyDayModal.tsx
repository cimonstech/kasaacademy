"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { CurriculumDay, CurriculumDayItem } from "@/lib/content";
import { gsap } from "@/lib/gsap-client";

type GenieOrigin = {
  x: number;
  y: number;
};

type JourneyDayModalProps = {
  day: CurriculumDay;
  origin: GenieOrigin;
  onClose: () => void;
};

function DaySidebarIcon({ day }: { day: string }) {
  const icons: Record<string, ReactNode> = {
    "01": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 18h6M10 21h4M12 3a5 5 0 00-2 9.5V14h4v-1.5A5 5 0 0012 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "02": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 18V8l4-2 4 2 4-2 4 2v10M8 16l4-2 4 2 4-2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M18 10l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    "03": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    "04": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 7h10M7 12h10M7 17h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M5 5v14M19 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    "05": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l2.35 4.76 5.26.76-3.8 3.71.9 5.24L12 15.77 7.29 17.47l.9-5.24L4.39 8.52l5.26-.76L12 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return icons[day] ?? icons["01"];
}

function renderItem(item: CurriculumDayItem, index: number) {
  if (typeof item === "string") {
    return (
      <li key={item} className="cef2-journey-modal-item">
        <span className="cef2-journey-modal-badge">{index + 1}</span>
        <span>{item}</span>
      </li>
    );
  }

  return (
    <li key={item.text} className="cef2-journey-modal-item">
      <span className="cef2-journey-modal-badge">{index + 1}</span>
      <span>
        {item.text}
        {item.highlight && (
          <>
            {" "}
            <strong className="text-primary">{item.highlight}</strong>
          </>
        )}
      </span>
    </li>
  );
}

export function JourneyDayModal({ day, origin, onClose }: JourneyDayModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const originRef = useRef(origin);
  originRef.current = origin;

  const animateClose = useCallback(() => {
    if (closingRef.current || !panelRef.current || !backdropRef.current) return;
    closingRef.current = true;

    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      gsap.to([backdrop, panel], {
        opacity: 0,
        duration: 0.2,
        onComplete: onClose,
      });
      return;
    }

    const { x, y } = originRef.current;

    gsap.to(backdrop, { opacity: 0, duration: 0.35, ease: "power2.in" });
    gsap.to(panel, {
      left: x,
      top: y,
      xPercent: -100,
      yPercent: -100,
      scaleX: 0.06,
      scaleY: 0.06,
      opacity: 0.5,
      duration: 0.5,
      ease: "power3.inOut",
      transformOrigin: "100% 100%",
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return () => {
      document.body.style.overflow = previousOverflow;
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { x, y } = originRef.current;

    gsap.set(backdrop, { opacity: 0 });
    gsap.set(panel, {
      position: "fixed",
      left: x,
      top: y,
      xPercent: -100,
      yPercent: -100,
      scaleX: 0.06,
      scaleY: 0.06,
      opacity: 0.55,
      transformOrigin: "100% 100%",
    });

    if (reducedMotion) {
      gsap.set(panel, {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        clearProps: "transformOrigin",
      });
      gsap.to(backdrop, { opacity: 1, duration: 0.2 });
    } else {
      const tl = gsap.timeline();
      tl.to(backdrop, { opacity: 1, duration: 0.25, ease: "power2.out" })
        .to(
          panel,
          {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            duration: 0.62,
            ease: "power3.inOut",
            transformOrigin: "50% 50%",
          },
          0.04,
        )
        .to(
          panel,
          {
            scaleX: 1.015,
            scaleY: 0.985,
            duration: 0.12,
            ease: "sine.inOut",
          },
          0.5,
        )
        .to(panel, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.18,
          ease: "sine.out",
        });
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") animateClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [animateClose]);

  return createPortal(
    <div
      ref={backdropRef}
      className="cef2-journey-modal-backdrop"
      role="presentation"
      onClick={animateClose}
    >
      <div
        ref={panelRef}
        className="cef2-journey-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`journey-day-title-${day.day}`}
        onClick={(event) => event.stopPropagation()}
      >
        <aside className="cef2-journey-modal-sidebar">
          <p className="cef2-journey-modal-day">Day {Number.parseInt(day.day, 10)}</p>
          <div className="cef2-journey-modal-sidebar-rule" aria-hidden="true" />
          <p className="cef2-journey-modal-date">{day.fullDate}</p>
          <div className="cef2-journey-modal-sidebar-icon">
            <DaySidebarIcon day={day.day} />
          </div>
        </aside>

        <div className="cef2-journey-modal-content">
          <button
            type="button"
            className="cef2-journey-modal-close"
            onClick={animateClose}
            aria-label="Close day details"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <h3 id={`journey-day-title-${day.day}`} className="cef2-journey-modal-theme">
            {day.theme}
          </h3>
          <div className="cef2-journey-modal-accent" aria-hidden="true" />
          <ol className="cef2-journey-modal-list">
            {day.items.map((item, index) => renderItem(item, index))}
          </ol>
        </div>
      </div>
    </div>,
    document.body,
  );
}
