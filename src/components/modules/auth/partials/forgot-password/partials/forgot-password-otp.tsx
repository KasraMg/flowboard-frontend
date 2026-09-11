import { Button } from "@/src/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";

interface ForgotPasswordOtpProps {
  onComplete: (otp: string) => void;
  isPending: boolean;
}

const ForgotPasswordOtp = ({
  onComplete,
  isPending,
}: ForgotPasswordOtpProps) => {
  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Verify your email</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Enter the 4-digit verification code sent to your email.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex justify-center pb-4">
          <InputOTP maxLength={4} onComplete={onComplete}>
            <InputOTPGroup>
              <InputOTPSlot className="size-10" index={0} />
              <InputOTPSlot className="size-10" index={1} />
              <InputOTPSlot className="size-10" index={2} />
              <InputOTPSlot className="size-10" index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button loading={isPending} type="button" className="w-full">
          Verify code
        </Button>
      </div>
    </>
  );
};

export default ForgotPasswordOtp;
