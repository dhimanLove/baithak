import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, formatDuration, formatPeople } from "@/lib/format";
import type { Meeting } from "@/lib/types";

/** One hairline row in the meetings card. Server-rendered, no motion gate. */
export function MeetingRow({ meeting }: { meeting: Meeting }) {
  const open = meeting.actionItems.filter((item) => !item.done).length;

  return (
    <li className="border-b border-ink/10 last:border-b-0">
      <Link
        href={`/meetings/${meeting.id}`}
        className="row group flex items-center gap-4 px-3 py-4 md:gap-6 md:px-4 md:py-5"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="t-subheading">{meeting.title}</h3>
            <span className="t-caption text-slate">{open} open</span>
          </div>
          <p className="t-body-sm mt-1 line-clamp-2 text-slate">{meeting.summary}</p>
          <p className="t-small mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate">
            <span>{formatDate(meeting.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDuration(meeting.durationMin)}</span>
            <span aria-hidden="true">·</span>
            <span>{formatPeople(meeting.participants.length)}</span>
          </p>
        </div>

        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] border border-ink/10 bg-linen text-ink transition-colors duration-200 group-hover:border-graphite group-hover:bg-graphite group-hover:text-paper"
        >
          <ArrowUpRight size={18} strokeWidth={1.5} />
        </span>
      </Link>
    </li>
  );
}
