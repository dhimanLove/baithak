import type { Metadata } from "next";
import { MeetingsList } from "@/components/meetings/MeetingsList";
import { ButtonLink } from "@/components/ui/Button";
import { getMeetings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Your meetings",
  description: "Every recording, summary and action item in one place.",
};

type MeetingsPageProps = {
  searchParams: Promise<{ state?: string }>;
};

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const { state } = await searchParams;
  const meetings = await getMeetings();

  return (
    <main id="main" className="page shell pt-8 md:pt-12">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[640px]">
          <p className="t-caption text-slate">Workspace</p>
          <h1 className="t-title mt-3">Your meetings</h1>
          <p className="t-body mt-4 text-slate">
            Every recording, the decisions that came out of it, and who owes
            what next.
          </p>
        </div>
        <ButtonLink href="/meetings/new" variant="primary">
          New meeting
        </ButtonLink>
      </header>

      <div className="mt-10">
        <MeetingsList meetings={meetings} forceEmpty={state === "empty"} />
      </div>
    </main>
  );
}
