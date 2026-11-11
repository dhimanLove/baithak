"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Pause, Play, Square } from "lucide-react";
import { useChrome } from "@/components/layout/ChromeContext";
import { TranscriptView } from "@/components/meeting/TranscriptView";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatClock } from "@/lib/format";
import type { Person, TranscriptLine } from "@/lib/types";

type Phase = "idle" | "recording" | "paused" | "processing" | "done";

const LINE_MS = 1400;
const PROCESS_MS = 2200;

/** Simulated input level, written straight to the node so nothing re-renders. */
function useAudioLevel(active: boolean) {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!active) {
      if (barRef.current) barRef.current.style.transform = "scaleX(0)";
      return;
    }

    let frame = 0;
    let level = 0.1;

    const tick = () => {
      level = Math.min(0.92, Math.max(0.06, level + (Math.random() - 0.5) * 0.34));
      if (barRef.current) barRef.current.style.transform = `scaleX(${level})`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return barRef;
}

export function LiveMeeting({
  people,
  script,
}: {
  people: Person[];
  script: TranscriptLine[];
}) {
  const { setNavReduced } = useChrome();
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [copied, setCopied] = useState(false);

  const capturing = phase === "recording" || phase === "paused";
  const levelRef = useAudioLevel(phase === "recording");

  useEffect(() => {
    setNavReduced(capturing || phase === "processing");
    return () => setNavReduced(false);
  }, [capturing, phase, setNavReduced]);

  useEffect(() => {
    if (phase !== "recording") return;
    const timer = setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "recording") return;
    if (lines.length >= script.length) {
      setPhase("processing");
      return;
    }
    const timer = setTimeout(
      () => setLines((current) => [...current, script[current.length]]),
      LINE_MS,
    );
    return () => clearTimeout(timer);
  }, [phase, lines.length, script]);

  useEffect(() => {
    if (phase !== "processing") return;
    const timer = setTimeout(() => setPhase("done"), PROCESS_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  const endMeeting = useCallback(() => {
    setPhase("processing");
  }, []);

  async function copyTranscript() {
    try {
      await navigator.clipboard.writeText(lines.map((line) => line.text).join("\n"));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait" initial={false}>
        {phase === "idle" ? (
          <motion.div
            key="idle"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex max-w-[620px] flex-col items-center pt-12 pb-8 text-center md:pt-20"
          >
            <p className="tag">Recorder</p>
            <h2 className="t-title mt-5">Ready when you are</h2>
            <p className="t-body-lg mt-4 max-w-[440px] text-slate">
              Baithak listens, transcribes and writes the summary. You keep the
              room.
            </p>
            <Button
              variant="primary"
              className="mt-8"
              onClick={() => setPhase("recording")}
            >
              Start recording
              <Play size={18} strokeWidth={1.5} aria-hidden="true" />
            </Button>
            <p className="t-caption mt-6 text-slate">
              Nothing is recorded until you press start
            </p>
          </motion.div>
        ) : null}

        {phase === "recording" || phase === "paused" ? (
          <motion.div
            key="capturing"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="sr-only">
              {phase === "paused" ? "Recording paused" : "Recording in progress"}
            </h2>

            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <p className="tag">
                <motion.span
                  aria-hidden="true"
                  className="block h-[7px] w-[7px] rounded-full bg-ink"
                  animate={
                    phase === "recording"
                      ? { opacity: [0.25, 1, 0.25] }
                      : { opacity: 0.3 }
                  }
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
                {phase === "paused" ? "Paused" : "Listening"}
              </p>
              <p className="t-title tabular-nums">{formatClock(elapsed)}</p>
            </div>

            <div className="level-line mt-2">
              <span
                ref={levelRef}
                className="level-fill scale-x-0 transition-transform duration-100 ease-out"
              />
            </div>

            <div className="card mt-6">
              <TranscriptView lines={lines} people={people} live />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Button variant="dark" onClick={endMeeting}>
                <Square size={16} strokeWidth={1.5} aria-hidden="true" />
                End meeting
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  setPhase((current) =>
                    current === "recording" ? "paused" : "recording",
                  )
                }
              >
                {phase === "paused" ? (
                  <Play size={16} strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Pause size={16} strokeWidth={1.5} aria-hidden="true" />
                )}
                {phase === "paused" ? "Resume" : "Pause"}
              </Button>
              <Button
                variant="ghost"
                onClick={copyTranscript}
                disabled={lines.length === 0}
              >
                {copied ? "Copied" : "Copy transcript so far"}
              </Button>
            </div>
          </motion.div>
        ) : null}

        {phase === "processing" ? (
          <motion.div
            key="processing"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[720px] py-8"
          >
            <p className="t-caption text-center text-slate">Working</p>
            <h2 className="t-heading mt-3 text-center">Writing your summary</h2>
            <ul aria-hidden="true" className="card-linen mt-8 flex flex-col gap-6">
              {[0, 1, 2, 3].map((index) => (
                <li key={index} className="flex flex-col gap-3">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        {phase === "done" ? (
          <motion.div
            key="done"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex max-w-[620px] flex-col items-center pt-12 pb-8 text-center md:pt-20"
          >
            <p className="tag">Ready</p>
            <h2 className="t-title mt-5">Summary is ready</h2>
            <p className="t-body-lg mt-4 max-w-[440px] text-slate">
              Decisions, action items and the full transcript, all in one place.
            </p>
            <ButtonLink href="/meetings/m-001" variant="primary" className="group mt-8">
              Read the summary
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </ButtonLink>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
