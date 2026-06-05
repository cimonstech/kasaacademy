"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { FacultyProfile } from "@/lib/content";

type FacultyProfileModalProps = {
  name: string;
  role: string;
  slug: string;
  profile: FacultyProfile;
  onClose: () => void;
};

function facultyImage(slug: string) {
  return `/cef/speakers/${slug}.jpg`;
}

export function FacultyProfileModal({
  name,
  role,
  slug,
  profile,
  onClose,
}: FacultyProfileModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="cef2-faculty-modal" role="presentation" onClick={onClose}>
      <div
        className="cef2-faculty-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="faculty-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="cef2-faculty-modal-close"
          onClick={onClose}
          aria-label="Close profile"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="cef2-faculty-modal-header">
          <div className="cef2-faculty-modal-photo">
            <Image
              src={facultyImage(slug)}
              alt=""
              fill
              className="object-cover object-top"
              sizes="96px"
            />
          </div>
          <div>
            <h3 id="faculty-modal-title" className="cef2-manifesto-line text-2xl text-primary">
              {name}
            </h3>
            <p className="mt-1 text-sm text-on-surface-variant">{role}</p>
          </div>
        </div>

        <div className="cef2-faculty-modal-body">
          {profile.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {profile.sections?.map((section) => (
            <div key={section.title} className="cef2-faculty-modal-section">
              <h4>{section.title}</h4>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
