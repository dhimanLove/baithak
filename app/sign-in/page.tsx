import type { Metadata } from "next";
import { SignInForm } from "@/components/auth/SignInForm";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Baithak workspace.",
};

export default function SignInPage() {
  return (
    <main id="main" className="page shell">
      <div className="mx-auto w-full max-w-[460px] pt-12 md:pt-20">
        <p className="t-caption text-slate">Account</p>
        <h1 className="t-title mt-3">Sign in</h1>
        <p className="t-body mt-4 text-slate">
          Baithak is coming to your email. This is a prototype.
        </p>

        <SignInForm />

        <p className="t-small mt-8 text-slate">
          No account yet? Baithak is invite only for now.
        </p>

        <ButtonLink href="/meetings" variant="secondary" className="mt-4">
          Browse demo meetings
        </ButtonLink>
      </div>
    </main>
  );
}
