import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ActionItems } from "@/components/meeting/ActionItemRow";
import { CopySummary } from "@/components/meeting/CopySummary";
import { SummaryReveal } from "@/components/meeting/SummaryReveal";
import { TranscriptView } from "@/components/meeting/TranscriptView";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getMeeting } from "@/lib/api";
import {
  countWords,
  formatDate,
  formatDuration,
  formatPeople,
  readingTime,
} from "@/lib/format";

type MeetingPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MeetingPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeeting(id);
  if (!meeting) return { title: "Meeting not found" };

  return {
    title: meeting.title,
    description: meeting.summary.slice(0, 155),
  };
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeeting(id);
  if (!meeting) notFound();

  const words =
    countWords(meeting.summary) +
    meeting.decisions.reduce((total, decision) => total + countWords(decision), 0) +
    meeting.actionItems.reduce((total, item) => total + countWords(item.text), 0);

  return (
    <main id="main" className="page shell pt-8 md:pt-12">
      <Link
        href="/meetings"
        className="t-small inline-flex items-center gap-2 text-slate transition-colors duration-200 hover:text-ink"
      >
        <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
        All meetings
      </Link>

      <header className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_280px] md:items-start md:gap-10">
        <div>
          <p className="t-caption text-slate">Meeting summary</p>
          <h1 className="t-title mt-3 max-w-[720px]">{meeting.title}</h1>

          <p className="t-small mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate">
            <span>{formatDate(meeting.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDuration(meeting.durationMin)}</span>
            <span aria-hidden="true">·</span>
            <span>{formatPeople(meeting.participants.length)}</span>
            <span aria-hidden="true">·</span>
            <span>{readingTime(words)}</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/meetings/new" variant="primary">
              New meeting
            </ButtonLink>
            <CopySummary text={meeting.summary} />
          </div>
        </div>

        <aside className="card">
          <p className="t-caption text-slate">In the room</p>
          <ul className="mt-4 flex flex-col gap-3">
            {meeting.participants.map((person) => (
              <li key={person.id} className="flex items-center gap-3">
                <Avatar name={person.name} />
                <span className="t-body-sm">{person.name}</span>
              </li>
            ))}
          </ul>
        </aside>
      </header>

      <div className="mt-[var(--section-gap)]">
        <SummaryReveal meeting={meeting}>
          <ActionItems items={meeting.actionItems} people={meeting.participants} />
        </SummaryReveal>
      </div>

      <section aria-labelledby="transcript-heading" className="mt-[var(--section-gap)]">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-3">
            <h2 id="transcript-heading" className="t-heading-sm">
              Transcript
            </h2>
            <span className="tag tag-outline">
              <span
                aria-hidden="true"
                className="inline-flex transition-transform duration-200 group-open:rotate-90"
              >
                <ChevronRight size={14} strokeWidth={2} />
              </span>
              {meeting.transcript.length} lines
            </span>
          </summary>

          <Card className="mt-6">
            <TranscriptView lines={meeting.transcript} people={meeting.participants} />
          </Card>
        </details>
      </section>
    </main>
  );
}
