"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useReveal } from "./use-reveal";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import AuthModal from "@/src/components/modules/layout/auth/auth-modal";

const included = [
  "Unlimited projects",
  "Unlimited tasks",
  "Kanban boards",
  "Task priorities & deadlines",
  "Team collaboration",
  "Progress tracking",
];

export function LandingPricing() {
  const { ref, visible } = useReveal();

  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start free. Stay free.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to get started, with no friction and no credit
            card required.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          <div
            ref={ref}
            className={cn(
              "relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-8 shadow-xl transition-all duration-500",
              visible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95",
            )}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Current Plan
              </div>

              <h3 className="mt-4 text-3xl font-bold">Free</h3>
              <p className="mt-2 text-muted-foreground">
                Everything you need to get started.
              </p>

              <div className="mt-6">
                <span className="text-5xl font-bold tracking-tight">$0</span>
                <span className="text-lg text-muted-foreground"> /forever</span>
              </div>

              <AuthModal
                btnClassName="mt-3! w-full"
                title={
                  <div className="flex w-full gap-2 justify-center items-center">
                    Start for free
                  </div>
                }
              />

              <div className="mt-8 space-y-3">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success ring-1 ring-success/20">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
