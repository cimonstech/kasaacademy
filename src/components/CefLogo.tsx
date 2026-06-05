import Image from "next/image";
import { site } from "@/lib/site";

type CefLogoProps = {
  className?: string;
  priority?: boolean;
  size?: "nav" | "footer";
};

const sizes = {
  nav: { width: 200, height: 72, className: "h-14 w-auto md:h-16" },
  footer: { width: 160, height: 56, className: "h-10 w-auto" },
};

export function CefLogo({
  className = "",
  priority = false,
  size = "nav",
}: CefLogoProps) {
  const { width, height, className: sizeClass } = sizes[size];

  return (
    <Image
      src={site.logo}
      alt="Creative Entrepreneurship Fellowship"
      width={width}
      height={height}
      priority={priority}
      className={`${sizeClass} ${className}`.trim()}
    />
  );
}
