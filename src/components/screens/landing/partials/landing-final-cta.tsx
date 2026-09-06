'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useReveal } from './use-reveal';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/button';

export function LandingFinalCTA() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary to-blue-700 px-6 py-16 text-center shadow-2xl transition-all duration-700 sm:px-16',
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        >
          {/* Decorative grid */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to get your work under control?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Start organizing your projects and tasks with Flowboard today.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
                  Get Started — It&apos;s Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
