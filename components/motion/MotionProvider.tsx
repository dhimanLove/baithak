"use client";

import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type LocomotiveScroll from "locomotive-scroll";

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const firstRoute = useRef(true);

  useEffect(() => {
    const shouldScrollToTop = !firstRoute.current;
    firstRoute.current = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let scroll: LocomotiveScroll | null = null;

    void import("locomotive-scroll")
      .then(({ default: LocomotiveScroll }) => {
        if (cancelled) return;

        scroll = new LocomotiveScroll({
          lenisOptions: {
            lerp: 0.08,
            smoothWheel: true,
          },
        });

        if (shouldScrollToTop) scroll.scrollTo(0, { immediate: true });
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      scroll?.destroy();
    };
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}