import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useLogin } from "./hook";

const Login = ({
  setOpen,
  setStep,
}: {
  setOpen: (open: boolean) => void;
  setStep: (step: string) => void;
}) => {
  const {
    register,
    onSubmit,
    formState: { errors },
    isLoading,
  } = useLogin(setOpen);
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="w-rull text-center">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative pt-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="pl-9"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 pt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <div
                onClick={() => setStep("forgotPassword")}
                className="text-xs cursor-pointer font-medium text-primary hover:underline"
              >
                Forgot password?
              </div>
            </div>
            <div className="relative pt-1">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={"password"}
                placeholder="••••••••"
                className="pl-9 pr-9"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 pt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label
              htmlFor="remember"
              className="text-sm font-normal cursor-pointer"
            >
              Remember me
            </Label>
          </div>

          <Button loading={isLoading} type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="relative pt-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>
      </div>

      <DialogFooter className="justify-center!">
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setStep("register")}
            className="font-medium text-primary hover:underline"
          >
            Create one
          </span>
        </p>
      </DialogFooter>
    </>
  );
};

export default Login;
