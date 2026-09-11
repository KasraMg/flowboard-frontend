import React, { ReactNode, useState } from "react";
import Login from "./partials/login/login";
import Register from "./partials/register/register";
import { User } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import ForgotPassword from "./partials/forgot-password/forgot-password";

const AuthModal = ({
  title,
  btnClassName,
}: {
  title?: ReactNode;
  btnClassName?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("login");

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          setStep("login");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className={cn("flex", btnClassName)}
        >
          {title ? (
            title
          ) : (
            <>
              <p className="hidden gap-1.5 lg:block"> Sign In / Sign Up</p>
              <User className="block gap-1.5 lg:hidden size-5" />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto outline-0! shadow-none! ring-0!">
        {step === "login" ? (
          <Login setOpen={setOpen} setStep={setStep} />
        ) : step == "register" ? (
          <Register setOpen={setOpen} setStep={setStep} />
        ) : (
          <ForgotPassword setModalStep={setStep} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
