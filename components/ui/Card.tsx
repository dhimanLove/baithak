import type { ComponentProps } from "react";

const TONE = {
  /** Paper, the brightest surface. */
  white: "card",
  /** Linen, one step above the parchment canvas. */
  linen: "card-linen",
  /** The single inverted graphite panel. */
  graphite: "card-graphite",
  /** No surface, no padding. */
  bare: "card-bare",
} as const;

export function Card({
  className,
  tone = "white",
  ...rest
}: ComponentProps<"div"> & { tone?: keyof typeof TONE }) {
  return <div className={`${TONE[tone]} ${className ?? ""}`.trim()} {...rest} />;
}
