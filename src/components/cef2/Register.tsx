"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { fellowship, goals } from "@/lib/content";
import { sectionImages } from "@/lib/images";
import { CardBrandMark } from "@/components/cef2/CardBrandMark";
import { Chat, Verified } from "@/components/icons";
import { gsap } from "@/lib/gsap-client";
import { useGsapReady } from "@/hooks/useGsapReady";
import { site } from "@/lib/site";

export function Register() {
  const sectionRef = useRef<HTMLElement>(null);
  const gsapReady = useGsapReady();

  useGSAP(
    () => {
      if (!gsapReady) return;

      gsap.from(".register-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".register-pricing-grid > *", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".register-pricing-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef, dependencies: [gsapReady] },
  );

  return (
    <section ref={sectionRef} id="register" className="cef2-bleed-gold relative overflow-hidden py-stack-xl">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <h2 className="cef2-manifesto-line register-reveal text-[clamp(2.5rem,6vw,4.5rem)] text-on-secondary-fixed">
          Claim your seat
        </h2>
        <p className="register-reveal mt-4 max-w-xl text-on-secondary-fixed-variant">
          Two paths into the fellowship. Same five-day transformation.
        </p>

        <div className="register-pricing-grid mt-10 grid grid-cols-1 items-stretch gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-[1fr_1fr_minmax(0,22rem)]">
          <article className="register-pricing-card relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.02] motion-reduce:hover:scale-100 md:p-10">
            <CardBrandMark src={site.cefIcon} position="top-right" size="lg" opacity={0.1} />
            <span className="relative z-10 text-xs font-bold tracking-widest text-secondary uppercase">
              Early Bird
            </span>
            <p className="cef2-manifesto-line relative z-10 mt-4 text-5xl text-primary tabular-nums sm:text-6xl">
              {fellowship.pricing.earlyBird.amount}
            </p>
            <p className="relative z-10 text-sm text-on-surface-variant">
              GHC · until {fellowship.pricing.earlyBird.deadline}
            </p>
            <ul className="relative z-10 mt-8 space-y-3 text-sm">
              {["5-day access", "Workbooks", "Studio visit", "Certificate"].map((f) => (
                <li key={f} className="flex items-center gap-2 font-medium text-on-surface">
                  <Verified className="text-secondary" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="relative z-10 mt-auto">
              <button
                type="button"
                className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold tracking-wide text-on-primary transition-colors hover:bg-primary/90"
              >
                Pay with Paystack
              </button>
              <p className="mt-2 text-center text-xs text-on-surface-variant/80">
                Valid until {fellowship.pricing.earlyBird.deadline}
              </p>
            </div>
          </article>

          <article className="register-pricing-card relative flex h-full flex-col overflow-hidden rounded-2xl bg-primary p-8 text-on-primary transition-transform duration-300 ease-out hover:scale-[1.02] motion-reduce:hover:scale-100 md:p-10">
            <CardBrandMark src={site.cefWeb} position="center" size="lg" opacity={0.14} />
            <span className="relative z-10 text-xs font-bold tracking-widest text-on-primary/70 uppercase">
              Regular
            </span>
            <p className="cef2-manifesto-line relative z-10 mt-4 text-5xl tabular-nums sm:text-6xl">
              {fellowship.pricing.regular.amount}
            </p>
            <p className="relative z-10 text-sm text-on-primary/70">GHC · standard enrollment</p>
            <ul className="relative z-10 mt-8 space-y-3 text-sm">
              {["5-day access", "Workbooks", "Certificate", "Pitch session"].map((f) => (
                <li key={f} className="flex items-center gap-2 font-medium text-on-primary/85">
                  <Verified className="text-secondary-fixed" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="relative z-10 mt-auto w-full rounded-lg bg-white px-4 py-3 text-sm font-bold tracking-wide text-primary transition-colors hover:bg-white/90"
            >
              Pay with Paystack
            </button>
          </article>

          <div className="register-image-col relative min-h-[14rem] overflow-hidden rounded-2xl md:col-span-2 md:min-h-[12rem] lg:col-span-1 lg:min-h-0 lg:h-full">
            <Image
              src={sectionImages.register}
              alt="Creative at work in studio"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 22rem"
            />
            <div className="cef2-scrim-gold absolute inset-0" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 z-10 w-20 drop-shadow-lg">
              <Image
                src={site.cefWeb}
                alt=""
                width={80}
                height={80}
                className="h-auto w-full"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div className="register-reveal mt-16 border-t border-on-secondary-fixed/20 pt-12">
          <p className="text-sm font-bold tracking-widest text-on-secondary-fixed uppercase">
            Fellows leave with
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {goals.map((goal) => (
              <li
                key={goal}
                className="rounded-lg bg-white/30 px-4 py-3 text-sm font-medium text-on-secondary-fixed-variant"
              >
                {goal}
              </li>
            ))}
          </ul>
        </div>

        <p className="register-reveal mt-10 flex items-center justify-center gap-2 text-sm text-on-secondary-fixed-variant">
          <Chat />
          <a
            href={fellowship.contact.whatsapp}
            className="font-bold underline decoration-primary"
          >
            WhatsApp {fellowship.contact.whatsappLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
