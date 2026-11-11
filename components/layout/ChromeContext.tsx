"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type ChromeValue = {
  /** The live screen drops every nav link and keeps the wordmark only. */
  navReduced: boolean;
  setNavReduced: (value: boolean) => void;
};

const ChromeContext = createContext<ChromeValue>({
  navReduced: false,
  setNavReduced: () => {},
});

export function ChromeProvider({ children }: { children: ReactNode }) {
  const [navReduced, setNavReduced] = useState(false);
  const value = useMemo(() => ({ navReduced, setNavReduced }), [navReduced]);

  return <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>;
}

export function useChrome() {
  return useContext(ChromeContext);
}
