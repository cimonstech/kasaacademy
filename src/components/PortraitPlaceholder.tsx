type PortraitPlaceholderProps = {
  name: string;
  variant?: "featured" | "compact";
  accent?: "primary" | "secondary" | "gold";
};

function hashHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 15 + (Math.abs(hash) % 30);
}

function initials(name: string): string {
  const parts = name.replace(/Esq\.|Dr\./g, "").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function PortraitPlaceholder({
  name,
  variant = "featured",
  accent = "primary",
}: PortraitPlaceholderProps) {
  const hue = hashHue(name);
  const accentColor =
    accent === "secondary"
      ? "var(--color-secondary-fixed-dim)"
      : accent === "gold"
        ? "var(--color-gold)"
        : "var(--color-primary-container)";

  return (
    <div
      className={`group/portrait relative overflow-hidden ${
        variant === "featured" ? "aspect-[4/5] w-full" : "h-24 w-24 shrink-0 rounded-full"
      }`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover/portrait:scale-105"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 20%, color-mix(in srgb, ${accentColor} 35%, transparent), transparent 70%),
            linear-gradient(145deg, oklch(92% 0.02 ${hue}) 0%, oklch(78% 0.06 ${hue + 10}) 55%, oklch(62% 0.1 ${hue + 5}) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 3px, color-mix(in srgb, var(--color-on-surface) 4%, transparent) 3px, color-mix(in srgb, var(--color-on-surface) 4%, transparent) 4px)
          `,
        }}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center font-display font-medium text-primary ${
          variant === "featured" ? "text-6xl" : "text-2xl"
        }`}
        style={{ fontStyle: "normal" }}
      >
        {initials(name)}
      </div>
      {variant === "featured" && (
        <div
          className="absolute right-0 bottom-0 left-0 h-1"
          style={{ background: accentColor }}
        />
      )}
    </div>
  );
}
