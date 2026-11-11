import { cache } from "react";
import { LIVE_SCRIPT, PEOPLE, getDummyMeeting, getDummyMeetings } from "./data";
import type { Meeting, Person, TranscriptLine } from "./types";

const MIN_DELAY = 300;
const MAX_DELAY = 900;

function delay(): Promise<void> {
  const ms = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO(ai): replace with Supabase/Groq
export const getMeetings = cache(async (): Promise<Meeting[]> => {
  await delay();
  return getDummyMeetings();
});

/** Cached per request so generateMetadata and the page share one lookup. */
// TODO(ai): replace with Supabase/Groq
export const getMeeting = cache(async (id: string): Promise<Meeting | null> => {
  await delay();
  return getDummyMeeting(id) ?? null;
});

/** People in the workspace, resolved once for name lookups. */
export async function getPeople(): Promise<Person[]> {
  await delay();
  return PEOPLE;
}

/** Script the live screen plays back line by line. */
export async function getLiveScript(): Promise<TranscriptLine[]> {
  await delay();
  return LIVE_SCRIPT;
}
