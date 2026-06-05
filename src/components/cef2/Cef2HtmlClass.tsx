"use client";

import { useEffect } from "react";

export function Cef2HtmlClass() {
  useEffect(() => {
    document.documentElement.classList.add("cef2-page");
    return () => document.documentElement.classList.remove("cef2-page");
  }, []);

  return null;
}
