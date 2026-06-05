"use client";

import { useEffect } from "react";
import { Nav } from "@/components/cef2/Nav";
import { ManifestoHero } from "@/components/cef2/ManifestoHero";
import { Beliefs } from "@/components/cef2/Beliefs";
import { JourneyScroll } from "@/components/cef2/JourneyScroll";
import { Speakers } from "@/components/cef2/Speakers";
import { Register } from "@/components/cef2/Register";
import { Footer } from "@/components/cef2/Footer";
import { ScrollTrigger } from "@/lib/gsap-client";
import { useGsapReady } from "@/hooks/useGsapReady";

export function Cef2Landing() {
  const gsapReady = useGsapReady();

  useEffect(() => {
    if (!gsapReady) return;

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [gsapReady]);

  return (
    <>
      <Nav />
      <main>
        <ManifestoHero />
        <Beliefs />
        <JourneyScroll />
        <Speakers />
        <Register />
      </main>
      <Footer />
    </>
  );
}
