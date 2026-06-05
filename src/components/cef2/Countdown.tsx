"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const total = Math.max(0, target.getTime() - Date.now());
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function RollingDigit({ digit }: { digit: number }) {
  return (
    <span className="cef2-countdown-digit" aria-hidden="true">
      <span
        className="cef2-countdown-digit-strip"
        style={{ transform: `translateY(-${digit * 10}%)` }}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} className="cef2-countdown-digit-cell">
            {index}
          </span>
        ))}
      </span>
    </span>
  );
}

function RollingSeconds({ seconds }: { seconds: number }) {
  const tens = Math.floor(seconds / 10);
  const ones = seconds % 10;

  return (
    <span className="cef2-countdown-seconds">
      <RollingDigit digit={tens} />
      <RollingDigit digit={ones} />
    </span>
  );
}

function CountdownUnit({
  value,
  suffix,
  rolling = false,
}: {
  value: number;
  suffix: string;
  rolling?: boolean;
}) {
  return (
    <div className="cef2-countdown-unit">
      {rolling ? (
        <RollingSeconds seconds={value} />
      ) : (
        <span className="cef2-countdown-value tabular-nums">{value.toString().padStart(2, "0")}</span>
      )}
      <span className="cef2-countdown-suffix">{suffix}</span>
    </div>
  );
}

type CountdownProps = {
  targetIso: string;
  label?: string;
  endedText?: string;
  className?: string;
};

export function Countdown({
  targetIso,
  label,
  endedText = "Live now",
  className = "",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date(targetIso)));

  useEffect(() => {
    const target = new Date(targetIso);
    const tick = () => setTimeLeft(getTimeLeft(target));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [targetIso]);

  const ariaLabel = timeLeft.total <= 0
    ? endedText
    : `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds remaining`;

  return (
    <div
      className={`cef2-countdown ${className}`.trim()}
      role="timer"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      {label && <span className="cef2-countdown-label">{label}</span>}
      {timeLeft.total <= 0 ? (
        <span className="cef2-countdown-ended">{endedText}</span>
      ) : (
        <div className="cef2-countdown-units">
          <CountdownUnit value={timeLeft.days} suffix="d" />
          <CountdownUnit value={timeLeft.hours} suffix="h" />
          <CountdownUnit value={timeLeft.minutes} suffix="m" />
          <CountdownUnit value={timeLeft.seconds} suffix="s" rolling />
        </div>
      )}
    </div>
  );
}
