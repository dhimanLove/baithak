"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { useChrome } from "@/components/layout/ChromeContext";

const LINKS = [
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/m-001", label: "Sample summary" },
];

/**
 * Floating navigation. A white bar with a hairline border sits on the
 * parchment canvas; it is deliberately not sticky and carries no honey, so
 * the page's single primary action always lives in the content.
 */
export function SiteHeader() {
  const { navReduced } = useChrome();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative z-50">
      <div className="shell pt-4">
        <div className="relative">
          <nav
            aria-label="Main"
            className="nav-bar flex items-center justify-between gap-4 px-3 md:px-4"
          >
            <Wordmark />

            {navReduced ? null : (
              <>
                <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
                  {LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className="nav-link"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="hidden items-center gap-2 md:flex">
                  <ButtonLink href="/sign-in" variant="secondary">
                    Sign in
                  </ButtonLink>
                  <ButtonLink href="/meetings/new" variant="dark">
                    New meeting
                  </ButtonLink>
                </div>

                <button
                  type="button"
                  className="btn btn-ghost h-11 w-11 p-0 md:hidden"
                  aria-expanded={open}
                  aria-controls="mobile-nav"
                  onClick={() => setOpen((current) => !current)}
                >
                  {open ? (
                    <X size={20} strokeWidth={1.5} aria-hidden="true" />
                  ) : (
                    <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {open ? "Close menu" : "Open menu"}
                  </span>
                </button>
              </>
            )}
          </nav>

          <AnimatePresence>
            {open && !navReduced ? (
              <motion.div
                id="mobile-nav"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-[calc(100%+8px)] z-50 rounded-[12px] border border-ink/10 bg-paper p-4 md:hidden"
              >
                <div className="flex flex-col gap-1">
                  {LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className="nav-link t-subheading px-3 py-3"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <hr className="hairline my-4" />
                <div className="flex flex-col gap-2">
                  <ButtonLink href="/meetings/new" variant="dark" className="w-full">
                    New meeting
                  </ButtonLink>
                  <ButtonLink href="/sign-in" variant="secondary" className="w-full">
                    Sign in
                  </ButtonLink>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
