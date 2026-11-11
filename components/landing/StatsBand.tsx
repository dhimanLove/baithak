import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/motion/CountUp";
import type { Meeting } from "@/lib/types";

/** The single graphite band on the landing page, measured from real demo data. */
export function StatsBand({ meeting }: { meeting: Meeting }) {
  const stats = [
    { label: "Meeting length", value: meeting.durationMin, suffix: " min" },
    {
      label: "In the room",
      value: meeting.participants.length,
      suffix: meeting.participants.length === 1 ? " person" : " people",
    },
    { label: "Decisions", value: meeting.decisions.length, suffix: "" },
    { label: "Action items", value: meeting.actionItems.length, suffix: "" },
  ];

  return (
    <section
      aria-labelledby="stats-heading"
      className="mt-[var(--section-gap)] bg-graphite text-paper"
    >
      <div className="shell py-[var(--section-gap)]">
        <div className="max-w-[680px]">
          <p className="t-caption text-invert-muted">One meeting, measured</p>
          <h2 id="stats-heading" className="t-title mt-3">
            One sprint planning session, by the numbers.
          </h2>
          <p className="t-body mt-4 max-w-[520px] text-invert-muted">
            The transcript stays available, but nobody has to read it. This is
            what one sprint planning session becomes.
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="t-small text-invert-muted">{stat.label}</dt>
              <dd className="t-heading mt-2 tabular-nums">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <ButtonLink href={`/meetings/${meeting.id}`} variant="outlineInvert">
            Read the full summary
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
