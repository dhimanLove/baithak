import { ButtonLink } from "@/components/ui/Button";

/** Closing card. The honey primary action is the one in this viewport. */
export function ClosingCta() {
  return (
    <section aria-labelledby="closing-heading" className="shell pt-[var(--section-gap)]">
      <div className="card flex flex-col items-center px-6 py-12 text-center md:px-16 md:py-16">
        <p className="t-caption text-slate">Try it</p>
        <h2 id="closing-heading" className="t-title mt-4 max-w-[640px]">
          Your next meeting, already written down.
        </h2>
        <p className="t-body mt-4 max-w-[480px] text-slate">
          Six demo meetings are already here. Start a live one, or read a
          finished summary end to end.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/meetings/new" variant="primary">
            Start a meeting
          </ButtonLink>
          <ButtonLink href="/meetings/m-001" variant="secondary">
            Read a sample
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
