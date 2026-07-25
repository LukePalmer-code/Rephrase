import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreamCard } from "../../components/CreamCard";
import { EditorialHeading } from "../../components/EditorialHeading";
import { PageShell } from "../../components/PageShell";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SectionDivider } from "../../components/SectionDivider";
import { useAuth } from "../../context/AuthContext";
import { authInputClass, authLabelClass, AuthErrorBanner } from "./LoginPage";

export function SignupPage() {
  const { signUp, confirmSignUp, signIn } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<"details" | "confirm">("details");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(email, password);
      setStep("confirm");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign up.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirm(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await confirmSignUp(email, code);
      // Cognito requires a fresh sign-in after confirming the account.
      await signIn(email, password);
      navigate("/app", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not confirm your account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-rp-peach-200 font-rp-body text-rp-cocoa-900">
      <PageShell width="mobile" className="flex min-h-screen flex-col justify-center py-10">
        <EditorialHeading as="h1" size="title" className="text-3xl">
          {step === "details" ? "Create your account" : "Check your email"}
        </EditorialHeading>
        <SectionDivider className="mt-4 max-w-[220px]" />

        {step === "details" ? (
          <CreamCard className="mt-8 p-6">
            <form className="flex flex-col gap-4" onSubmit={handleSignUp} noValidate>
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
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={authInputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={authLabelClass}>Confirm password</span>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className={authInputClass}
                />
              </label>

              {error && <AuthErrorBanner message={error} />}

              <PrimaryButton type="submit" disabled={isSubmitting} className="mt-2 w-full">
                {isSubmitting ? "Signing up…" : "Sign Up"}
              </PrimaryButton>
            </form>
          </CreamCard>
        ) : (
          <CreamCard className="mt-8 p-6">
            <p className="font-rp-body text-sm text-rp-cocoa-600">
              We sent a verification code to <span className="font-bold">{email}</span>.
            </p>
            <form className="mt-4 flex flex-col gap-4" onSubmit={handleConfirm} noValidate>
              <label className="flex flex-col gap-1.5">
                <span className={authLabelClass}>Verification code</span>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className={authInputClass}
                />
              </label>

              {error && <AuthErrorBanner message={error} />}

              <PrimaryButton type="submit" disabled={isSubmitting} className="mt-2 w-full">
                {isSubmitting ? "Confirming…" : "Confirm & Continue"}
              </PrimaryButton>
            </form>
          </CreamCard>
        )}

        <p className="mt-6 text-center font-rp-body text-sm text-rp-cocoa-600">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-rp-cocoa-900 underline">
            Sign in
          </Link>
        </p>
      </PageShell>
    </div>
  );
}
