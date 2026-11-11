import type { ComponentProps } from "react";

/** Flat linen block with a slow opacity pulse. Never a shimmer. */
export function Skeleton({ className, ...rest }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={`skeleton skeleton-pulse ${className ?? ""}`.trim()}
      {...rest}
    />
  );
}
