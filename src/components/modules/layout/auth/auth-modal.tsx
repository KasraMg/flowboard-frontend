import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import Login from "./partials/login/login";
import Register from "./partials/register/register";
import { User } from "lucide-react";

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("login");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="default" size="sm" className="flex">
          <p className="hidden gap-1.5 lg:block"> Sign In / Sign Up</p>
          <User className="block gap-1.5 lg:hidden size-5" />
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
