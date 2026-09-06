'use client';

import { Layers, CalendarClock, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useReveal } from './use-reveal';
import { cn } from '@/src/lib/utils';

const problems = [
  {
    icon: Layers,
    title: 'Tasks are everywhere',
    description: 'Scattered across spreadsheets, chat messages, and sticky notes. Nothing connects.',
  },
  {
    icon: CalendarClock,
    title: 'Deadlines are easy to miss',
    description: 'Without a clear view of due dates, important work slips through the cracks.',
  },
  {
    icon: EyeOff,
    title: 'Teams lose track of progress',
    description: 'No one knows what\u2019s done, what\u2019s stuck, or what needs attention next.',
  },
];

const solutions = [
  'Every project, task, and deadline in one place',
  'Visual boards that show exactly where work stands',
  'Shared projects so everyone stays aligned',
  'Priorities and due dates that never get lost',
];

export function LandingProblemSolution() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Problems */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your work shouldn&apos;t feel scattered.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            When your tasks live in five different places, everything takes longer than it should.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={cn(
                'rounded-2xl border border-border bg-card p-6 transition-all duration-500',
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Transition arrow */}
        <div className="my-12 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm">
            <ArrowRight className="h-5 w-5 rotate-90" />
          </div>
        </div>

        {/* Solution */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Flowboard brings everything together.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One organized workspace for projects, tasks, deadlines, and collaboration —
            so your team always knows what to do next.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {solutions.map((s, i) => (
            <div
              key={s}
              className={cn(
                'flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3.5 transition-all duration-500',
                visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              )}
              style={{ transitionDelay: `${300 + i * 80}ms` }}
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success ring-1 ring-success/20">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
