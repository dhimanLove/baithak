import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/meetings", label: "Meetings" },
      { href: "/meetings/new", label: "New meeting" },
      { href: "/meetings/m-001", label: "Sample summary" },
    ],
  },
  {
    heading: "Account",
    links: [
      { href: "/sign-in", label: "Sign in" },
      { href: "/", label: "Home" },
    ],
  },
];

/** Graphite footer: the one inverted band on every page. */
export function SiteFooter() {
  return (
    <footer className="mt-auto bg-graphite text-paper">
      <div className="shell py-[var(--section-gap)]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr_1fr] md:gap-8">
          <div>
            <Wordmark className="text-paper" />
            <p className="t-body mt-4 max-w-[320px] text-invert-muted">
              Meeting notes that write themselves. A prototype showing demo
              data.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="t-caption text-invert-muted">{column.heading}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="t-small inline-flex rounded-[8px] py-1 text-paper transition-opacity duration-200 hover:opacity-70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="hairline-invert mt-10" />

        <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="t-caption text-invert-muted">Baithak — prototype</p>
          <p className="t-caption text-invert-muted">
            Built for teams who would rather read the two minutes than sit
            through the forty-five.
          </p>
        </div>
      </div>
    </footer>
  );
}
