import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="page shell flex flex-col items-center justify-center py-16 text-center md:py-24"
    >
      <span className="tag">404</span>
      <h1 className="t-title mt-6 max-w-[520px]">This page has no recording</h1>
      <p className="t-body mt-4 max-w-[460px] text-slate">
        The link may be old, or the meeting was never started. The transcript was
        probably always one meeting ago.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/" variant="primary">
          Back to home
        </ButtonLink>
        <ButtonLink href="/meetings" variant="secondary">
          Browse meetings
        </ButtonLink>
      </div>
    </main>
  );
}
