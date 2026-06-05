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

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M3 6h16M3 11h16M3 16h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M5 5l12 12M17 5L5 17"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
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
      if (y > lastScroll.current && y > 80) setBannerVisible(false);
      if (y < lastScroll.current) setBannerVisible(true);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
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

      <div className="cef2-nav-enter border-b border-outline-variant/25 bg-background/92 backdrop-blur-lg">
        <div className="mx-auto flex max-w-container-max items-center justify-between gap-4 px-margin-mobile py-3.5 md:gap-6 md:px-margin-desktop md:py-4">
          <a href={site.cef2Path} className="shrink-0">
            <CefLogo size="footer" priority />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold tracking-wide text-on-surface-variant transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-bold text-on-primary transition-transform hover:scale-105 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Apply
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/40 text-on-surface-variant transition-colors hover:border-primary hover:text-primary lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="cef2-mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <nav
          id="cef2-mobile-nav"
          aria-label="Mobile"
          className={`border-t border-outline-variant/20 bg-background/98 lg:hidden ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="mx-auto max-w-container-max px-margin-mobile py-3 md:px-margin-desktop">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-3 text-base font-bold tracking-wide text-on-surface-variant transition-colors hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
