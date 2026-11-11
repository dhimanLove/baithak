import Link from "next/link";
import type { ComponentProps } from "react";

type Variant =
  /** Honey fill. Exactly one per viewport. */
  | "primary"
  /** Transparent with an ink hairline. The everyday action. */
  | "secondary"
  /** Graphite fill for places that need weight without the accent. */
  | "dark"
  /** Paper-on-graphite inverse. */
  | "outlineInvert"
  /** No surface until hover. Third or fourth action. */
  | "ghost";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  dark: "btn btn-dark",
  outlineInvert: "btn btn-outline-invert",
  ghost: "btn btn-ghost",
};

function classes(variant: Variant, className?: string): string {
  return [VARIANT_CLASS[variant], className].filter(Boolean).join(" ");
}

/**
 * Honey is reserved for the single most important action in a viewport, so
 * callers must ask for `primary` explicitly. Everything else defaults to the
 * quiet outlined button.
 */
export function Button({
  variant = "secondary",
  className,
  type = "button",
  ...rest
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button type={type} className={classes(variant, className)} {...rest} />;
}

export function ButtonLink({
  variant = "secondary",
  className,
  ...rest
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={classes(variant, className)} {...rest} />;
}
