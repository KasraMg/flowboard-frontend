'use client';

import { CheckSquare, FolderKanban, Users, LayoutPanelLeft, CalendarClock, TrendingUp } from 'lucide-react';
import { useReveal } from './use-reveal';

const items = [
  { icon: CheckSquare, label: 'Task Management' },
  { icon: FolderKanban, label: 'Project Tracking' },
  { icon: Users, label: 'Team Collaboration' },
  { icon: LayoutPanelLeft, label: 'Kanban Boards' },
  { icon: CalendarClock, label: 'Deadlines' },
  { icon: TrendingUp, label: 'Productivity' },
];

export function LandingTrustStrip() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="border-y border-border bg-card/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
          Everything your team needs to stay organized.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <item.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
