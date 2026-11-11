import Link from "next/link";

/**
 * Type-only brand mark. The system is editorial, so the wordmark is the logo:
 * 18px Inter 700 with tight tracking. No icon, no accent fill.
 */
export function Wordmark({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-[12px] px-2 py-1 text-[18px] font-bold leading-none tracking-[-0.04em] transition-opacity duration-200 hover:opacity-70 ${className}`.trim()}
    >
      Baithak
    </Link>
  );
}
