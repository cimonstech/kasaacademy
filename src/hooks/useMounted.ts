"use client";

import { useSyncExternalStore } from "react";

/** Returns true only after the client has mounted — keeps SSR and first client render identical. */
export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
