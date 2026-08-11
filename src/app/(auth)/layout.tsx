export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-indigo-700 p-12 text-white lg:flex">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path d="M4 6h16M4 12h10M4 18h7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight">FlowBoard</span>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Organize your work,<br />flow your way.
          </h1>
          <p className="max-w-md text-lg text-white/80">
            Boards, lists, calendars, and tasks — everything your team needs to ship projects faster, in one beautiful place.
          </p>
          <div className="flex gap-6 pt-4">
            <div>
              <p className="text-3xl font-bold">12k+</p>
              <p className="text-sm text-white/70">Teams onboarded</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2M+</p>
              <p className="text-sm text-white/70">Tasks completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold">99.9%</p>
              <p className="text-sm text-white/70">Uptime</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-sm text-white/70">
          <div className="flex -space-x-2">
            {['from-rose-400 to-pink-500', 'from-amber-400 to-orange-500', 'from-emerald-400 to-teal-500', 'from-cyan-400 to-blue-500'].map((g, i) => (
              <div key={i} className={`h-8 w-8 rounded-full bg-gradient-to-br ${g} ring-2 ring-primary`} />
            ))}
          </div>
          <span>Trusted by product teams worldwide</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center bg-background p-6 lg:w-1/2">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
