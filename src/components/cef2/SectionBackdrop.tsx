import Image from "next/image";

type Overlay = "burgundy" | "dark" | "gold" | "light" | "ink";

type SectionBackdropProps = {
  src: string;
  alt?: string;
  overlay?: Overlay;
  priority?: boolean;
  className?: string;
};

const overlayClass: Record<Overlay, string> = {
  burgundy: "cef2-overlay-burgundy",
  dark: "cef2-overlay-dark",
  gold: "cef2-overlay-gold",
  light: "cef2-overlay-light",
  ink: "cef2-overlay-ink",
};

export function SectionBackdrop({
  src,
  alt = "",
  overlay = "dark",
  priority = false,
  className = "",
}: SectionBackdropProps) {
  return (
    <div
      className={`cef2-section-bg ${overlayClass[overlay]} ${className}`.trim()}
      aria-hidden={alt === ""}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}
