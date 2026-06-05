import { fellowship } from "@/lib/content";
import { Countdown } from "@/components/cef2/Countdown";
import { CefLogo } from "@/components/CefLogo";
import { CalendarToday, LocationOn } from "@/components/icons";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="cef2-bleed-cream border-t-2 border-primary px-margin-mobile py-16 md:px-margin-desktop md:py-20">
      <div className="mx-auto max-w-container-max">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a href={site.cef2Path} className="inline-block">
              <CefLogo size="footer" />
            </a>

            <p className="cef2-manifesto-line mt-10 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] leading-tight text-primary">
              Build the business behind the gift.
            </p>

            <p className="mt-6 text-on-surface-variant">
              {fellowship.program} · {fellowship.parent}
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <Countdown
              targetIso={fellowship.eventStartAt}
              label="Fellowship begins"
              endedText="In session"
              className="cef2-countdown--footer"
            />
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-secondary-fixed">
                <CalendarToday />
              </span>
              <div className="lg:text-right">
                <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">
                  Dates
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">{fellowship.dates}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-secondary-fixed">
                <LocationOn />
              </span>
              <div className="lg:text-right">
                <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">
                  Venue
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">{fellowship.venue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-outline-variant/30 pt-8 text-sm text-on-surface-variant md:flex-row md:flex-wrap md:items-center md:justify-between">
          <a href={`mailto:${fellowship.contact.email}`} className="hover:text-primary">
            {fellowship.contact.email}
          </a>
          <p className="text-xs text-primary">
            Built with precision by:{" "}
            <a
              href="https://thisismotivo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-on-surface underline decoration-primary underline-offset-2 transition-opacity hover:opacity-80"
            >
              Motivo Limited
            </a>
          </p>
          <p className="text-xs opacity-60">
            © 2026 KASA Africa Academy of Creative Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
