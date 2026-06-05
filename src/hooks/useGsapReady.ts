"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap-client";

/**
 * Waits until after hydration, then refreshes ScrollTrigger once layout is stable.
 */
export function useGsapReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let frame = 0;
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;

    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        setReady(true);
        refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 50);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      if (refreshTimer) clearTimeout(refreshTimer);
    };
  }, []);

  return ready;
}
