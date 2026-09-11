import { useState } from "react";
import { toast } from "sonner";

import {
  useForgotPassword,
  useResetPassword,
  useVerifyOtp,
} from "@/src/hooks/useForgotPassword";

import ForgotPasswordEmail from "./partials/forgot-password-email";
import ForgotPasswordOtp from "./partials/forgot-password-otp";
import ForgotPasswordReset from "./partials/forgot-password-reset";

const ForgotPassword = ({
  setOpen,
  setModalStep,
}: {
  setModalStep: (v: string) => void;
  setOpen: (v: boolean) => void;
}) => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: forgotPasswordMutate, isPending: forgotPasswordPending } =
    useForgotPassword();

  const { mutate: verifyOtpMutate, isPending: verifyOtpPending } =
    useVerifyOtp();

  const { mutate: resetPasswordMutate, isPending: resetPasswordPending } =
    useResetPassword();

  const handleSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    forgotPasswordMutate(email, {
      onSuccess() {
        setStep("otp");
      },
    });
  };

  const handleVerifyOtp = (otp: string) => {
    verifyOtpMutate(
      {
        email,
        otp,
      },
      {
        onSuccess() {
          setStep("reset");
        },
      },
    );
  };

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    resetPasswordMutate(
      {
        email,
        password,
      },
      {
        onSuccess() {
          setOpen(false);
          setModalStep("login");
        },
      },
    );
  };

  if (step === "email") {
    return (
      <ForgotPasswordEmail
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmitEmail}
        isPending={forgotPasswordPending}
      />
    );
  }

  if (step === "otp") {
    return (
      <ForgotPasswordOtp
        onComplete={handleVerifyOtp}
        isPending={verifyOtpPending}
      />
    );
  }

  return (
    <ForgotPasswordReset
      password={password}
      confirmPassword={confirmPassword}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      onSubmit={handleResetPassword}
      isPending={resetPasswordPending}
    />
  );
};

export default ForgotPassword;
