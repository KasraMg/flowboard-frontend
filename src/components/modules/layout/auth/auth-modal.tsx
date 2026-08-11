import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import Login from "./partials/login/login";
import Register from "./partials/register/register";

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("login");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="default" size="sm" className="hidden gap-1.5 sm:flex">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        {step === "login" ? (
          <Login setStep={setStep} />
        ) : (
          <Register setStep={setStep} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
