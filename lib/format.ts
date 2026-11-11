const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

/** "12 Sep" */
export function formatDate(iso: string): string {
  return DATE_FMT.format(new Date(iso));
}

/** "42 min" */
export function formatDuration(minutes: number): string {
  return `${minutes} min`;
}

/** "5 people" */
export function formatPeople(count: number): string {
  return count === 1 ? "1 person" : `${count} people`;
}

/** "4:07" for transcript timestamps, "0:07" under a minute */
export function formatStamp(stamp: string): string {
  const [rawMinutes, rawSeconds] = stamp.split(":");
  const minutes = Number(rawMinutes ?? 0);
  const seconds = Number(rawSeconds ?? 0);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/** mm:ss for the recording timer, tabular figures in CSS */
export function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/** "PS" from "Priya Sharma" */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

/** "Priya" from "Priya Sharma" */
export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Reading time over the summary, decisions and action items only. */
export function readingTime(words: number): string {
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}
