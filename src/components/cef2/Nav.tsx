"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { CefLogo } from "@/components/CefLogo";
import { fellowship } from "@/lib/content";
import { site } from "@/lib/site";
import { gsap } from "@/lib/gsap-client";
import { useGsapReady } from "@/hooks/useGsapReady";

const links = [
  { href: "#beliefs", label: "Beliefs" },
  { href: "#journey", label: "Journey" },
  { href: "#faculty", label: "Faculty" },
  { href: "#register", label: "Register" },
];

export function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);
  const gsapReady = useGsapReady();

  useGSAP(
    () => {
      if (!gsapReady) return;

      gsap.from(".cef2-nav-enter", {
        y: -20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
      });
    },
    { scope: headerRef, dependencies: [gsapReady] },
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > lastScroll.current && y > 80) setBannerVisible(false);
      if (y < lastScroll.current) setBannerVisible(true);
      lastScroll.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 right-0 left-0 z-50">
      <div
        className={`cef2-nav-enter overflow-hidden bg-secondary text-on-secondary transition-all duration-500 ${
          bannerVisible ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="hidden py-2.5 text-center text-[0.6rem] font-bold tracking-[0.2em] uppercase sm:block">
          {fellowship.dates} · {fellowship.venue} · Limited seats
        </p>
        <p className="py-2.5 text-center text-[0.55rem] font-bold tracking-[0.14em] uppercase sm:hidden">
          {fellowship.dates} · Limited seats
        </p>
      </div>

      <div
        className={`cef2-nav-bar cef2-nav-enter border-b transition-colors duration-300 ${
          scrolled
            ? "cef2-nav-scrolled border-white/10"
            : "border-outline-variant/25 bg-background/92 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-container-max items-center justify-between gap-4 px-5 md:px-margin-desktop">
          <a href={site.cef2Path} className="shrink-0">
            <CefLogo size="footer" priority />
          </a>

          <nav
            className="hidden flex-1 items-center justify-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-colors ${
                  scrolled
                    ? "text-on-primary/80 hover:text-secondary-fixed"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={site.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-on-primary transition-transform hover:scale-105 active:scale-95"
          >
            Apply
          </a>
        </div>
      </div>
    </header>
  );
}
