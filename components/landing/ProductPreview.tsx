import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate, formatDuration, formatPeople } from "@/lib/format";
import type { Meeting } from "@/lib/types";

/**
 * The finished artifact, shown below the hero as a plain paper card. It uses
 * real demo data so the preview can never drift from the summary it links to.
 */
export function ProductPreview({ meeting }: { meeting: Meeting }) {
  const open = meeting.actionItems.filter((item) => !item.done).length;
  const nextAction = meeting.actionItems.find((item) => !item.done) ?? meeting.actionItems[0];
  const owner =
    meeting.participants.find((person) => person.id === nextAction.ownerId) ??
    meeting.participants[0];

  return (
    <section
      id="product"
      aria-labelledby="product-heading"
      className="shell scroll-mt-8 pt-[var(--section-gap)]"
    >
      <div className="max-w-[640px]">
        <p className="t-caption text-slate">A finished meeting</p>
        <h2 id="product-heading" className="t-heading mt-3">
          The whole meeting, on one page.
        </h2>
        <p className="t-body mt-4 text-slate">
          The paragraph to read, the decisions to remember, and the actions that
          actually have an owner.
        </p>
      </div>

      <article className="card mt-8 md:mt-10">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="t-caption text-slate">
              {formatDate(meeting.date)} · {formatDuration(meeting.durationMin)} ·{" "}
              {formatPeople(meeting.participants.length)}
            </p>
            <h3 className="t-heading-sm mt-2">{meeting.title}</h3>
          </div>
          <span className="tag">Ready</span>
        </header>

        <hr className="hairline my-6" />

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-10">
          <div>
            <p className="t-caption text-slate">Summary</p>
            <p className="t-body mt-3 text-slate">{meeting.summary}</p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="t-caption text-slate">Decisions</p>
              <ol className="mt-3 flex flex-col gap-3">
                {meeting.decisions.slice(0, 2).map((decision, index) => (
                  <li key={decision} className="flex gap-3">
                    <span className="t-caption mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[8px] bg-graphite text-paper">
                      {index + 1}
                    </span>
                    <span className="t-body-sm text-slate">{decision}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="inset">
              <p className="t-caption text-slate">Next action</p>
              <div className="mt-2 flex items-center gap-2">
                <Avatar name={owner.name} />
                <span className="t-body-sm">
                  <span className="font-medium">{owner.name}</span>
                  <span className="text-slate"> · {nextAction.text.slice(0, 38)}…</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="hairline my-6" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {meeting.participants.slice(0, 4).map((person) => (
                <Avatar key={person.id} name={person.name} className="ring-2 ring-paper" />
              ))}
            </div>
            <span className="t-caption text-slate">{open} open actions</span>
          </div>

          <Link href={`/meetings/${meeting.id}`} className="link-underline t-small font-medium">
            <span className="inline-flex items-center gap-1">
              Open the full summary
              <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </article>
    </section>
  );
}
