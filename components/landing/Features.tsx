import { ListChecks, Mic, Users } from "lucide-react";

const FEATURES = [
  {
    icon: Mic,
    title: "Live transcription",
    body: "Tuned for the names, accents and code-switching your team actually records in. Read it line by line while the meeting happens.",
  },
  {
    icon: ListChecks,
    title: "Summaries you can scan",
    body: "The paragraph, the decisions and the actions, in that order. Two minutes to read a forty-five minute meeting.",
  },
  {
    icon: Users,
    title: "Actions with owners",
    body: "Every commitment lands with a name and a due date, ticked off in place. Nothing leaves the page to be chased.",
  },
];

/** Three hairline cards. Icons are outlined and monochrome; no accent fill. */
export function Features() {
  return (
    <section aria-labelledby="features-heading" className="shell pt-[var(--section-gap)]">
      <div className="max-w-[640px]">
        <p className="t-caption text-slate">Why Baithak</p>
        <h2 id="features-heading" className="t-heading mt-3">
          The meeting is the easy part. The notes are not.
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="card flex flex-col items-start">
            <span className="grid h-10 w-10 place-items-center rounded-[12px] border border-ink/10 bg-linen text-ink">
              <feature.icon size={20} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3 className="t-heading-sm mt-6">{feature.title}</h3>
            <p className="t-body mt-3 text-slate">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
