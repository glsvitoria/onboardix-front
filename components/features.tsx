import { Route, LayoutDashboard, Bell } from "lucide-react"

const features = [
  {
    icon: Route,
    label: "Trilhas",
    title: "Trilhas Dinâmicas",
    description:
      "Crie checklists personalizados por cargo — Dev, Sales, RH, Design. Cada colaborador segue o caminho certo desde o primeiro dia.",
    highlights: ["Modelos por departamento", "Tarefas condicionais", "Progresso em tempo real"],
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    title: "Dashboard de Gestão",
    description:
      "Visualize em tempo real quem está travado, quem finalizou e onde estão os gargalos do processo de onboarding.",
    highlights: ["Visão geral do time", "Alertas automáticos", "Relatórios detalhados"],
  },
  {
    icon: Bell,
    label: "Integrações",
    title: "Integração Nativa",
    description:
      "Notificações automáticas no Slack e Teams. Conecte com as ferramentas que seu time já usa no dia a dia.",
    highlights: ["Slack & Teams", "Webhooks customizados", "API aberta"],
  },
]

export function Features() {
  return (
    <section id="funcionalidades" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">
            Funcionalidades
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Tudo que você precisa para automatizar o onboarding
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:border-primary/30 md:flex-row ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <feature.icon className="size-3.5" />
                  {feature.label}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {feature.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="size-1.5 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-1 items-center justify-center bg-secondary/20 p-8 md:p-12">
                <FeatureVisual index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="w-full max-w-xs">
        <div className="rounded-lg border border-border/40 bg-card p-4">
          <div className="mb-3 text-xs font-medium text-foreground">Trilha: Dev Frontend</div>
          {[
            { task: "Configurar ambiente local", done: true },
            { task: "Acesso ao repositório", done: true },
            { task: "Review do código base", done: false },
            { task: "Primeiro PR de teste", done: false },
          ].map((item) => (
            <div key={item.task} className="flex items-center gap-3 border-t border-border/30 py-2.5">
              <div className={`size-4 rounded-sm border ${item.done ? "border-primary bg-primary" : "border-border"}`}>
                {item.done && (
                  <svg viewBox="0 0 16 16" fill="none" className="size-4 text-primary-foreground">
                    <path d="M4 8l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`text-xs ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (index === 1) {
    return (
      <div className="w-full max-w-xs">
        <div className="rounded-lg border border-border/40 bg-card p-4">
          <div className="mb-3 text-xs font-medium text-foreground">Status geral</div>
          <div className="flex flex-col gap-3">
            {[
              { label: "Engenharia", value: 87, color: "bg-primary" },
              { label: "Vendas", value: 65, color: "bg-primary/70" },
              { label: "Design", value: 42, color: "bg-primary/40" },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">{bar.label}</span>
                  <span className="text-foreground font-medium">{bar.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-xs">
      <div className="rounded-lg border border-border/40 bg-card p-4">
        <div className="mb-3 text-xs font-medium text-foreground">Notificações</div>
        <div className="flex flex-col gap-2">
          {[
            { channel: "#onboarding", msg: "Ana Costa completou todas as tarefas!", time: "2min" },
            { channel: "#rh-alertas", msg: "Pedro Lima está travado há 2 dias", time: "1h" },
            { channel: "#welcome", msg: "Julia Santos iniciou o onboarding", time: "3h" },
          ].map((n) => (
            <div key={n.msg} className="rounded-md bg-secondary/40 p-3">
              <div className="mb-1 flex justify-between">
                <span className="text-xs font-medium text-primary">{n.channel}</span>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground">{n.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
