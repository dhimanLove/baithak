import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { formatDate, formatPeople } from "@/lib/format";
import type { Meeting } from "@/lib/types";

/**
 * Centred, type-led hero. There is no illustration and no JavaScript-driven
 * entrance: the copy is server-rendered and visible, and the optional rise
 * animation is pure CSS, so it can never leave the headline hidden.
 */
export function Hero({ meeting }: { meeting: Meeting }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="shell pb-4 pt-12 md:pt-20"
    >
      <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
        <span className="tag rise">Meeting notes, written from the room</span>

        <h1 id="hero-heading" className="t-display mt-6">
          <span className="hero-title-line">
            <span className="hero-title-line-inner">Forty-five minutes in.</span>
          </span>
          <span className="hero-title-line">
            <span className="hero-title-line-inner">Two minutes out.</span>
          </span>
        </h1>

        <p className="t-body-lg rise rise-3 mt-6 max-w-[560px] text-slate">
          Baithak sits in on your meetings and writes down what was said. When
          it ends you get a summary, the decisions that were made, and who owes
          what.
        </p>

        <div className="rise rise-3 mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/meetings/new" variant="primary">
            Start a meeting
          </ButtonLink>
          <ButtonLink href="/meetings/m-001" variant="secondary">
            Read a sample summary
          </ButtonLink>
        </div>

        <p className="t-caption rise rise-3 mt-6 text-slate">
          {formatDate(meeting.date)} · {meeting.durationMin} min ·{" "}
          {formatPeople(meeting.participants.length)} ·{" "}
          {meeting.actionItems.length} action items
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="#product"
          className="scroll-cue"
          aria-label="Jump to a finished summary"
        >
          <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
