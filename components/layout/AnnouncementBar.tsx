"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

/**
 * Apricot announcement strip. Apricot is ambient warmth, not the action
 * colour, so it can span the full width without competing with a CTA.
 */
export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div role="region" aria-label="Announcement" className="bg-apricot">
      <div className="shell relative flex min-h-[44px] items-center justify-center py-2 pl-2 pr-12">
        <p className="t-body-sm text-center text-ink">
          <span className="tag tag-outline mr-2 hidden align-middle sm:inline-flex">
            New
          </span>
          Live transcription is in private beta.{" "}
          <Link href="/meetings/new" className="link-underline font-medium">
            Try a meeting
          </Link>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setVisible(false)}
          className="absolute right-0 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-[8px] text-ink transition-colors duration-150 hover:bg-ink/10"
        >
          <X size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
