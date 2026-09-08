import { benefits } from "@/src/lib/helpers";
import { useReveal } from "./use-reveal";
import { cn } from "@/src/lib/utils";

export function LandingBenefits() {
  return (
    <section id="benefits" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-100 w-100 rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-75 w-75 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Less managing. More doing.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Flowboard takes the overhead out of project management so you can
            focus on the work itself.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} benefit={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof benefits)[number];
  index: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={cn(
        "group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:shadow-md hover:-translate-y-0.5",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-110">
        <benefit.icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold leading-tight">{benefit.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {benefit.description}
        </p>
      </div>
    </div>
  );
}
