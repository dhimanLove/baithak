/**
 * Motion tokens and shared variants.
 *
 * Framer Motion owns route transitions and UI state. Above-the-fold copy is
 * never given a JavaScript-set hidden state, so nothing can be left invisible
 * if hydration is slow or fails.
 */
import type { Transition, Variants } from "framer-motion";

export const ease = {
  enter: [0.22, 1, 0.36, 1],
  exit: [0.65, 0, 0.35, 1],
  soft: [0.16, 1, 0.3, 1],
} as const;

export const duration = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
  hero: 1.2,
} as const;

export const stagger = {
  children: 0.08,
  line: 0.045,
} as const;

export const distance = {
  y: 24,
} as const;

/** Layout/drag only. Damping is high enough that there is no bounce. */
export const spring = { stiffness: 260, damping: 32, mass: 1 } as const;

const t = (seconds: number): Transition => ({
  duration: seconds,
  ease: ease.enter,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance.y },
  show: { opacity: 1, y: 0, transition: t(duration.base) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: t(duration.base) },
};

/** Cards arrive with the faintest scale so they feel placed, not dropped. */
export const floatIn: Variants = {
  hidden: { opacity: 0, y: distance.y, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: t(0.7) },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: stagger.children } },
};

/** Heading lines ride up from behind a clipping mask. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: t(0.7) },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: distance.y },
  show: { opacity: 1, y: 0, transition: t(duration.base) },
};

export const heroCard: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: t(duration.hero) },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: t(0.55),
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(3px)",
    transition: { duration: duration.fast, ease: ease.exit },
  },
};

/** In-view trigger used across every card and section. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

export const reducedTransition: Transition = { duration: 0.2 };
