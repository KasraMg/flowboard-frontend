import { ArrowRight, Play } from "lucide-react";
import { KanbanMockup } from "./partials/kanban-mockup";
import { Button } from "@/src/components/ui/button";
import AuthModal from "@/src/components/modules/layout/auth/auth-modal";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-125 w-200 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-0 top-40 h-75 w-75 rounded-full bg-blue-400/10 blur-[100px]" />
        <div className="absolute left-0 top-60 h-75 w-75 rounded-full bg-cyan-400/5 blur-[100px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.15]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-success" />
            Free to get started — no credit card required
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in-up">
            Turn your projects into{" "}
            <span className="bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              progress
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Flowboard helps you organize tasks, manage projects, and keep your
            team moving forward — all in one simple workspace.
          </p>

          <div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <AuthModal
              title={
                <>
                  Get Started — It&apos;s Free
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              }
            />
            <a href="#how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 sm:w-auto flex"
              >
                <Play className="h-4 w-4" />
                See how it works
              </Button>
            </a>
          </div>
        </div>

        <div
          className="relative mt-16 animate-scale-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl g-linear-to-b from-primary/10 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/70" />
                <div className="h-3 w-3 rounded-full bg-amber-400/70" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-background px-3 text-xs text-muted-foreground">
                flowboard/projects/3
              </div>
            </div>
            <div className="flex">
              <div className="hidden w-48 shrink-0 border-r border-border bg-sidebar p-3 lg:block">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-blue-600 text-white">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">FlowBoard</span>
                </div>
                <div className="space-y-1">
                  {["Dashboard", "Projects", "Notification"].map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs ${i === 2 ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground"}`}
                    >
                      <div
                        className="h-3.5 w-3.5 rounded"
                        style={{
                          backgroundColor: i === 2 ? "#3b82f6" : "currentColor",
                          opacity: i === 2 ? 1 : 0.4,
                        }}
                      />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="mb-1.5 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Favorites
                  </p>
                  {[
                    "Mobile App Redesign",
                    "Marketing Website",
                    "Brand Refresh",
                  ].map((p, i) => (
                    <div
                      key={p}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: ["#3b82f6", "#ec4899", "#06b6d4"][i],
                        }}
                      />
                      <span className="truncate">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-hidden bg-background p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold">Mobile App Redesign</h3>
                    <p className="text-xs text-muted-foreground">
                      4 members · 8 tasks
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {["AM", "JL", "SR", "TC"].map((initials, i) => (
                        <div
                          key={initials}
                          className={`flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br text-[10px] font-semibold text-white ring-2 ring-background ${
                            [
                              "from-blue-500 to-indigo-500",
                              "from-emerald-500 to-teal-500",
                              "from-amber-500 to-orange-500",
                              "from-rose-500 to-pink-500",
                            ][i]
                          }`}
                        >
                          {initials}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <KanbanMockup compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
