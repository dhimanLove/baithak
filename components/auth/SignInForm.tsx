"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";

/**
 * Prototype only. No auth provider is wired up; the form demonstrates the
 * labelled-field pattern and says plainly that nothing was sent.
 */
export function SignInForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <form
      className="card mt-8 flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <Label htmlFor="email">Work email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Sign in
      </Button>

      <AnimatePresence initial={false}>
        {submitted ? (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="t-body-sm rounded-[12px] border border-ink/10 bg-linen p-4 text-slate"
          >
            Nothing was sent — this is a prototype, so{" "}
            <span className="font-medium text-ink">{email}</span> was not sent
            anywhere.{" "}
            <Link href="/meetings" className="link-underline font-medium text-ink">
              Browse the demo meetings
            </Link>{" "}
            instead.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
