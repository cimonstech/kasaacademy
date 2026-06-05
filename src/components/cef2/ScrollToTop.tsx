"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_MIN = 120;
const HIDE_DELAY_MS = 1000;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearHideTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const onScroll = () => {
      const y = window.scrollY;

      if (y < SCROLL_MIN) {
        clearHideTimer();
        setVisible(false);
        return;
      }

      setVisible(true);
      clearHideTimer();
      hideTimerRef.current = setTimeout(() => setVisible(false), HIDE_DELAY_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearHideTimer();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    setPressed(true);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    window.setTimeout(() => setPressed(false), 140);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`cef2-scroll-top${visible ? " is-visible" : ""}${pressed ? " is-pressed" : ""}`}
    >
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 3.75L9 14.25M9 3.75L4.5 8.25M9 3.75L13.5 8.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
