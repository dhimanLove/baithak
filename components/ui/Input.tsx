import type { ComponentProps } from "react";

export function Input({ className, ...rest }: ComponentProps<"input">) {
  return <input className={`input ${className ?? ""}`.trim()} {...rest} />;
}

type LabelProps = ComponentProps<"label">;

/** Sans, small, slate. Every input on the site is labelled. */
export function Label({ className, ...rest }: LabelProps) {
  return <label className={`label ${className ?? ""}`.trim()} {...rest} />;
}