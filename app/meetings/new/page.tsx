import type { Metadata } from "next";
import { LiveMeeting } from "@/components/live/LiveMeeting";
import { getLiveScript, getPeople } from "@/lib/api";

export const metadata: Metadata = {
  title: "New meeting",
  description: "Record a meeting and let Baithak write it up.",
};

export default async function NewMeetingPage() {
  const [people, script] = await Promise.all([getPeople(), getLiveScript()]);

  return (
    <main id="main" className="shell page">
      <h1 className="sr-only">New meeting</h1>
      <LiveMeeting people={people} script={script} />
    </main>
  );
}
