"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const count = useMotionValue(value);
  const rounded = useTransform(count, (current) => Math.round(current));

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    count.set(0);
    const controls = animate(count, value, {
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [count, inView, value]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="inline-flex">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </>
  );
}