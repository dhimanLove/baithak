"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { MeetingRow } from "@/components/meetings/MeetingRow";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import type { Meeting } from "@/lib/types";

type MeetingsListProps = {
  /** Server-rendered rows so the list is present before hydration. */
  meetings: Meeting[];
  /** /meetings?state=empty forces the zero-data state. */
  forceEmpty?: boolean;
};

function matches(meeting: Meeting, query: string): boolean {
  const haystack = [
    meeting.title,
    meeting.summary,
    ...meeting.participants.map((person) => person.name),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export function MeetingsList({ meetings, forceEmpty = false }: MeetingsListProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => meetings.filter((meeting) => matches(meeting, query.trim())),
    [meetings, query],
  );

  if (forceEmpty || meetings.length === 0) {
    return (
      <section className="card max-w-[560px]">
        <p className="t-caption text-slate">Empty</p>
        <h2 className="t-heading-sm mt-3">No meetings yet</h2>
        <p className="t-body mt-3 text-slate">
          Record your first meeting and Baithak writes the summary, the
          decisions and the action items.
        </p>
        <ButtonLink href="/meetings/new" variant="dark" className="mt-6">
          Start a meeting
        </ButtonLink>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="w-full max-w-[440px]">
          <Label htmlFor="meeting-search">Search</Label>
          <div className="field mt-2">
            <Search
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
              className="shrink-0 text-slate"
            />
            <Input
              id="meeting-search"
              type="search"
              value={query}
              placeholder="Titles, people or summaries"
              onChange={(event) => setQuery(event.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <p className="t-small text-slate" aria-live="polite">
          {results.length} {results.length === 1 ? "meeting" : "meetings"}
        </p>
      </div>

      {results.length === 0 ? (
        <section className="card max-w-[560px]">
          <p className="t-caption text-slate">No results</p>
          <h2 className="t-heading-sm mt-3">
            Nothing matches &ldquo;{query.trim()}&rdquo;
          </h2>
          <Button variant="secondary" className="mt-6" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </section>
      ) : (
        <ul className="card p-2">
          {results.map((meeting) => (
            <MeetingRow key={meeting.id} meeting={meeting} />
          ))}
        </ul>
      )}
    </div>
  );
}
