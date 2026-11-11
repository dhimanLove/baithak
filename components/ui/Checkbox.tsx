"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type CheckboxProps = Omit<ComponentProps<"input">, "type">;

/**
 * A real checkbox with an animated tick. The input is invisible but keeps the
 * full 44px hit area, so the control is keyboard- and touch-friendly while the
 * painted square stays at 20px with the system's 4px radius.
 */
export function Checkbox({ className, checked, ...rest }: CheckboxProps) {
  return (
    <label className="checkbox-hit">
      <span className="relative grid place-items-center">
        <input
          type="checkbox"
          checked={checked}
          className={`peer absolute inset-0 cursor-pointer opacity-0 ${className ?? ""}`}
          {...rest}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none grid h-5 w-5 place-items-center rounded-[4px] border-[1.5px] border-ink/40 bg-transparent transition-colors duration-200 peer-checked:border-graphite peer-checked:bg-graphite peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink"
        >
          <svg viewBox="0 0 12 10" className="h-2 w-2.5" fill="none">
            <motion.path
              d="M1 5.4 L4.4 8.8 L11 1.6"
              stroke="var(--paper)"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={false}
              animate={{ pathLength: checked ? 1 : 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </span>
      </span>
    </label>
  );
}
