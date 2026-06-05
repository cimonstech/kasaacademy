import { fellowship } from "@/lib/content";
import { CefLogo } from "@/components/CefLogo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t-2 border-primary bg-background px-margin-mobile py-16 md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        <a href={site.cefPath} className="mb-8 inline-block">
          <CefLogo size="footer" />
        </a>
        <p className="font-display text-2xl text-primary md:text-3xl">
          Yours in creative excellence,
        </p>
        <p className="mt-2 font-display text-xl text-secondary">
          The KASA Fellowship Team
        </p>

        <div className="mt-12 flex flex-col gap-6 border-t border-outline-variant/30 pt-8 text-sm text-on-surface-variant md:flex-row md:items-center md:justify-between">
          <div>
            <p>KASA Creative Entrepreneurship Fellowship</p>
            <p>KASA Africa Academy of Creative Excellence</p>
            <p>
              <a
                href={`mailto:${fellowship.contact.email}`}
                className="transition-colors hover:text-primary"
              >
                {fellowship.contact.email}
              </a>
            </p>
          </div>
          <p className="text-xs opacity-60">
            © 2026 KASA Creative Entrepreneurship Fellowship
          </p>
        </div>
      </div>
    </footer>
  );
}
