"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatStamp } from "@/lib/format";
import type { Person, TranscriptLine } from "@/lib/types";

type TranscriptViewProps = {
  lines: TranscriptLine[];
  people: Person[];
  /** Processing state swaps the transcript for flat skeleton blocks. */
  pending?: boolean;
  /** Live screens auto-scroll; a static transcript does not. */
  live?: boolean;
};

const SKELETON_WIDTHS = ["w-2/3", "w-full", "w-5/6", "w-1/2"];

export function TranscriptView({
  lines,
  people,
  pending = false,
  live = false,
}: TranscriptViewProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  const nameFor = (speakerId: string) =>
    people.find((person) => person.id === speakerId)?.name ?? "Speaker";

  useEffect(() => {
    if (!live || stuck || pending) return;
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, stuck, pending, live]);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    setStuck(el.scrollHeight - el.scrollTop - el.clientHeight > 24);
  }

  function jumpToLatest() {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setStuck(false);
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className={`scroll-smooth overflow-y-auto pr-2 ${
          live ? "h-[52vh] min-h-[280px]" : "max-h-[560px]"
        }`}
      >
        {pending ? (
          <ul aria-hidden="true" className="flex flex-col gap-6">
            {SKELETON_WIDTHS.map((width, i) => (
              <li key={i} className="flex flex-col gap-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className={`h-4 ${width}`} />
              </li>
            ))}
          </ul>
        ) : (
          <ul aria-live="polite" className="flex flex-col gap-6">
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.li
                  key={line.id}
                  initial={live ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-2"
                >
                  <p className="flex items-baseline gap-2">
                    <span className="t-chrome">{nameFor(line.speakerId)}</span>
                    <span className="t-mono text-slate">{formatStamp(line.timestamp)}</span>
                  </p>
                  <p className="t-body">{line.text}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {stuck && live && !pending ? (
        <div className="sticky bottom-0 flex justify-center pt-4">
          <button type="button" onClick={jumpToLatest} className="btn btn-dark">
            Jump to latest
          </button>
        </div>
      ) : null}
    </div>
  );
}
