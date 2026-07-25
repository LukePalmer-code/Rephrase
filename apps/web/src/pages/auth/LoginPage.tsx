import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CreamCard } from "../../components/CreamCard";
import { EditorialHeading } from "../../components/EditorialHeading";
import { PageShell } from "../../components/PageShell";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SectionDivider } from "../../components/SectionDivider";
import { useAuth } from "../../context/AuthContext";

export const authInputClass =
  "w-full rounded-rp-lg border border-rp-line bg-rp-cream-50 px-4 py-3 font-rp-body text-sm text-rp-cocoa-900 placeholder:text-rp-cocoa-500 focus:border-rp-cocoa-800 focus:outline-none";

export const authLabelClass =
  "font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-600";

export function AuthErrorBanner({ message }: { message: string }) {
  return (
    <p className="rounded-rp-lg border border-rp-blush-300 bg-rp-blush-100 px-4 py-3 font-rp-body text-sm text-rp-cocoa-900">
      {message}
    </p>
  );
}

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/app";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-rp-peach-200 font-rp-body text-rp-cocoa-900">
      <PageShell width="mobile" className="flex min-h-screen flex-col justify-center py-10">
        <EditorialHeading as="h1" size="title" className="text-3xl">
          Welcome back
        </EditorialHeading>
        <SectionDivider className="mt-4 max-w-[220px]" />

        <CreamCard className="mt-8 p-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <label className="flex flex-col gap-1.5">
              <span className={authLabelClass}>Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={authInputClass}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={authLabelClass}>Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={authInputClass}
              />
            </label>

            {error && <AuthErrorBanner message={error} />}

            <PrimaryButton type="submit" disabled={isSubmitting} className="mt-2 w-full">
              {isSubmitting ? "Signing in…" : "Sign In"}
            </PrimaryButton>
          </form>
        </CreamCard>

        <p className="mt-6 text-center font-rp-body text-sm text-rp-cocoa-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-bold text-rp-cocoa-900 underline">
            Sign up
          </Link>
        </p>
      </PageShell>
    </div>
  );
}
