import type { Meeting } from "@/lib/types";

/**
 * Summary and decisions as two paper cards. Static markup: the text is
 * server-rendered and visible, with no JavaScript entrance gate.
 */
export function SummaryReveal({
  meeting,
  children,
}: {
  meeting: Meeting;
  children: React.ReactNode;
}) {
  return (
    <div className="reading flex flex-col gap-6">
      <section aria-labelledby="summary-heading" className="card">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="summary-heading" className="t-heading-sm">
            Summary
          </h2>
          <p className="t-caption text-slate">Written from the transcript</p>
        </div>
        <p className="t-body mt-4 text-slate">{meeting.summary}</p>
      </section>

      <section aria-labelledby="decisions-heading" className="card">
        <h2 id="decisions-heading" className="t-heading-sm">
          Key decisions
        </h2>
        <ol className="mt-5 flex flex-col gap-4">
          {meeting.decisions.map((decision, index) => (
            <li key={decision} className="flex gap-4">
              <span className="t-caption mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-graphite text-paper">
                {index + 1}
              </span>
              <p className="t-body">{decision}</p>
            </li>
          ))}
        </ol>
      </section>

      {children}
    </div>
  );
}
