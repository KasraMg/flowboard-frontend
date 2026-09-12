import { Button } from "@/src/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Lock, Mail, User } from "lucide-react";
import { useRegister } from "./hook";

const Register = ({
  setStep,
  setOpen,
}: {
  setOpen: (open: boolean) => void;
  setStep: (step: string) => void;
}) => {
  const {
    register,
    onSubmit,
    formState: { errors },
    isLoading,
  } = useRegister(setOpen);
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="w-rull text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              Create your account
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start organizing your projects in minutes
            </p>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>

            <div className="relative pt-1">
              <User className="absolute left-3 top-[55%] h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="name"
                placeholder="Alex Morgan"
                className="pl-9"
                {...register("name")}
              />
            </div>

            {errors.name && (
              <p className="text-sm text-red-500 pt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>

            <div className="relative pt-1">
              <Mail className="absolute left-3 top-[55%] h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                placeholder="you@gmail.com"
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

          {/* <div className="space-y-1.5">
            <Label htmlFor="age">Age</Label>

            <Input
              className="mt-1"
              id="age"
              type="number"
              placeholder="20"
              {...register("age")}
            />

            {errors.age && (
              <p className="text-sm text-red-500 pt-1">{errors.age.message}</p>
            )}
          </div> */}

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>

            <div className="relative pt-1">
              <Lock className="absolute left-3 top-[55%] h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                type="password"
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

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm password</Label>

            <div className="relative pt-1">
              <Lock className="absolute left-3 top-[55%] h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="pl-9"
                {...register("confirmPassword")}
              />
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-red-500 pt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" loading={isLoading} className="w-full">
            Create account
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
          Already have an account?{" "}
          <span
            onClick={() => setStep("login")}
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </span>
        </p>
      </DialogFooter>
    </>
  );
};

export default Register;
