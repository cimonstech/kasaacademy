"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { fellowship } from "@/lib/content";
import { CefLogo } from "@/components/CefLogo";
import { site } from "@/lib/site";

gsap.registerPlugin(useGSAP);

const links = [
  { href: "#journey", label: "Journey" },
  { href: "#faculty", label: "Faculty" },
  { href: "#register", label: "Register" },
];

export function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".masthead-line", {
        y: 12,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: navRef },
  );

  return (
    <header ref={navRef} className="border-b-2 border-primary bg-background">
      <div className="masthead-line border-b border-outline-variant/40 py-2 text-center">
        <p className="text-xs font-bold tracking-[0.25em] text-on-surface-variant uppercase">
          {fellowship.dates} · {fellowship.venue}
        </p>
      </div>

      <div className="masthead-line mx-auto flex max-w-container-max flex-col items-center px-margin-mobile py-8 md:px-margin-desktop">
        <a href={site.cefPath} className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
          <CefLogo priority />
        </a>
        <p className="mt-4 text-xs text-on-surface-variant">
          A program of KASA Africa Academy of Creative Excellence
        </p>
      </div>

      <nav
        className="masthead-line mx-auto flex max-w-container-max items-center justify-between border-t border-outline-variant/30 px-margin-mobile py-4 md:px-margin-desktop"
        aria-label="Main navigation"
      >
        <span className="hidden text-xs font-bold tracking-widest text-on-surface-variant uppercase md:inline">
          Issue 01 · 2026
        </span>

        <ul className="flex flex-1 items-center justify-center gap-8 md:gap-12">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-bold tracking-wide text-on-surface-variant transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#register"
          className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-on-primary transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
          Register
        </a>
      </nav>
    </header>
  );
}
