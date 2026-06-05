export function CtaStrip() {
  return (
    <section className="bg-secondary-container py-16">
      <div className="mx-auto flex max-w-container-max flex-col items-center gap-6 px-margin-mobile text-center md:px-margin-desktop">
        <p className="font-display text-2xl text-on-secondary-fixed md:text-3xl">
          Five days. Seven mentors. One transformation.
        </p>
        <a
          href="#register"
          className="rounded-full bg-primary px-10 py-4 text-sm font-bold tracking-wide text-on-primary transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Register for the Fellowship
        </a>
      </div>
    </section>
  );
}
