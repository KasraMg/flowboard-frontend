'use client';

import { cn } from '@/src/lib/utils';
import type { LucideIcon } from 'lucide-react';

type Tone = 'primary' | 'success' | 'warning' | 'destructive' | 'info';

const toneClasses: Record<Tone, { icon: string; ring: string }> = {
  primary: { icon: 'text-primary bg-primary/10', ring: 'ring-primary/20' },
  success: { icon: 'text-success bg-success/10', ring: 'ring-success/20' },
  warning: { icon: 'text-warning bg-warning/10', ring: 'ring-warning/20' },
  destructive: { icon: 'text-destructive bg-destructive/10', ring: 'ring-destructive/20' },
  info: { icon: 'text-info bg-info/10', ring: 'ring-info/20' },
};

export function StatCard({
  label, value, icon: Icon, tone = 'primary', trend, sublabel,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: Tone;
  trend?: { value: string; up: boolean };
  sublabel?: string;
}) {
  const t = toneClasses[tone];
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {sublabel && <p className="mt-1 text-xs text-muted-foreground">{sublabel}</p>}
        </div>
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1', t.icon, t.ring)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={cn('flex items-center gap-0.5 text-xs font-medium', trend.up ? 'text-success' : 'text-destructive')}>
            {trend.up ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-xs text-muted-foreground">vs last week</span>
        </div>
      )}
    </div>
  );
}
