import Image from "next/image";

type CardBrandMarkProps = {
  src: string;
  position?: "top-right" | "bottom-right" | "center";
  size?: "sm" | "md" | "lg";
  opacity?: number;
};

const positionClass = {
  "top-right": "top-4 right-4",
  "bottom-right": "bottom-4 right-4",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const sizePx = {
  sm: 48,
  md: 72,
  lg: 96,
};

export function CardBrandMark({
  src,
  position = "bottom-right",
  size = "md",
  opacity = 0.12,
}: CardBrandMarkProps) {
  const px = sizePx[size];

  return (
    <div
      className={`pointer-events-none absolute ${positionClass[position]} z-0`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <Image src={src} alt="" width={px} height={px} className="h-auto w-auto max-w-none" />
    </div>
  );
}
