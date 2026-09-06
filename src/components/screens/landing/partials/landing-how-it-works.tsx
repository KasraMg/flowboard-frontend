"use client";

import { FolderPlus, ListChecks, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useReveal } from "./use-reveal";
import { cn } from "@/src/lib/utils";

const steps: {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    number: "01",
    icon: FolderPlus,
    title: "Create a project",
    description:
      "Set up a workspace for your team and create your first project in seconds.",
  },
  {
    number: "02",
    icon: ListChecks,
    title: "Add and organize tasks",
    description:
      "Break work into tasks, assign them to teammates, set priorities and deadlines.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Track progress and get things done",
    description:
      "Watch your board move from left to right as tasks get completed.",
  },
];

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Up and running in three steps.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No complicated setup. No lengthy onboarding. Just create, organize,
            and go.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-linear-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col items-center text-center transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
        <step.icon className="h-10 w-10 text-primary" />
        <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-primary to-blue-600 text-xs font-bold text-white shadow-md">
          {step.number}
        </span>
      </div>
      <h3 className="text-lg font-semibold">{step.title}</h3>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        {step.description}
      </p>
    </div>
  );
}
