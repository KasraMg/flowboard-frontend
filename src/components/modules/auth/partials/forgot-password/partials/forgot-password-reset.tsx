import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Lock } from "lucide-react";

interface ForgotPasswordResetProps {
  password: string;
  confirmPassword: string;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}

const ForgotPasswordReset = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  onSubmit,
  isPending,
}: ForgotPasswordResetProps) => {
  const passwordsMatch = password === confirmPassword;
  const passwordValid = password.length >= 6;
  const canSubmit = passwordValid && passwordsMatch;

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Reset your password
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 pt-3">
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>

          <div className="relative pt-1">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-9"
              minLength={6}
              required
            />
          </div>

          {password.length > 0 && password.length < 6 && (
            <p className="pt-1 text-sm text-red-500">
              Password must be at least 6 characters.
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm-password">Confirm password</Label>

          <div className="relative pt-1">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-9"
              minLength={6}
              required
            />
          </div>

          {confirmPassword && !passwordsMatch && (
            <p className="pt-1 text-sm text-red-500">Passwords do not match.</p>
          )}
        </div>

        <Button
          disabled={!canSubmit}
          type="submit"
          className="w-full"
          loading={isPending}
        >
          Reset password
        </Button>
      </form>
    </>
  );
};

export default ForgotPasswordReset;
