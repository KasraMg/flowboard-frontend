import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Mail } from "lucide-react";

interface ForgotPasswordEmailProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}

const ForgotPasswordEmail = ({
  email,
  setEmail,
  onSubmit,
  isPending,
}: ForgotPasswordEmailProps) => {
  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Forgot password?</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a verification code.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 pt-3">
        <div className="space-y-1.5 pb-3">
          <Label htmlFor="email">Email</Label>

          <div className="relative pt-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@company.com"
              className="pl-9"
              required
            />
          </div>
        </div>

        <Button loading={isPending} type="submit" className="w-full">
          Send verification code
        </Button>
      </form>
    </>
  );
};

export default ForgotPasswordEmail;
