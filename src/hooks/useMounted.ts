"use client";

import { useEffect, useState } from "react";

/** Returns true only after the client has mounted — keeps SSR and first client render identical. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
