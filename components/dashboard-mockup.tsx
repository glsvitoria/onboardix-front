import { CheckCircle2, Clock, AlertTriangle, User } from "lucide-react"

export function DashboardMockup() {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/30 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-muted-foreground/20" />
            <div className="size-3 rounded-full bg-muted-foreground/20" />
            <div className="size-3 rounded-full bg-muted-foreground/20" />
          </div>
          <div className="ml-4 flex-1">
            <div className="mx-auto max-w-xs rounded-md bg-secondary/60 px-3 py-1 text-center text-xs text-muted-foreground">
              app.onboardix.com/dashboard
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
          <div className="hidden border-r border-border/40 bg-secondary/20 p-4 md:block">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary">
                <span className="text-xs font-bold text-primary-foreground">O</span>
              </div>
              <span className="text-sm font-semibold text-foreground">Onboardix</span>
            </div>
            <div className="flex flex-col gap-1">
              {["Dashboard", "Colaboradores", "Trilhas", "Convites"].map((item, i) => (
                <div
                  key={item}
                  className={`rounded-md px-3 py-2 text-xs ${i === 0 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 p-4 md:col-span-3 md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Onboardings em andamento</h3>
                <p className="text-xs text-muted-foreground">3 colaboradores ativos</p>
              </div>
              <div className="flex gap-2">
                <div className="rounded-md bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground">
                  {"Tempo m\u00e9dio: 6 dias"}
                </div>
                <div className="rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  {"82% conclu\u00eddo"}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { name: "Ana Costa", role: "Dev Frontend", progress: 100, tasks: "12/12", status: "complete", days: 5 },
                { name: "Pedro Lima", role: "Sales Rep", progress: 68, tasks: "8/12", status: "in-progress", days: 3 },
                { name: "Julia Santos", role: "Designer UX", progress: 25, tasks: "3/12", status: "alert", days: 4 },
              ].map((person) => (
                <div key={person.name} className="flex items-center gap-4 rounded-lg border border-border/40 bg-secondary/20 p-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                    <User className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-foreground">{person.name}</span>
                      <span className="text-xs text-muted-foreground">{person.role}</span>
                      <span className="text-[10px] text-muted-foreground/60">{`h\u00e1 ${person.days} dias`}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full transition-all ${person.status === "alert" ? "bg-amber-500" : "bg-primary"}`}
                        style={{ width: `${person.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {person.status === "complete" ? (
                      <CheckCircle2 className="size-3.5 text-primary" />
                    ) : person.status === "alert" ? (
                      <AlertTriangle className="size-3.5 text-amber-500" />
                    ) : (
                      <Clock className="size-3.5 text-primary/70" />
                    )}
                    <span>{person.tasks}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-2.5">
              <p className="text-xs text-amber-400">
                {"Alerta: Julia Santos est\u00e1 travada em \"Configurar ambiente local\" h\u00e1 24h"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
