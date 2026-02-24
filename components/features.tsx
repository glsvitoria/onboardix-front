import { UserPlus, Link2, LayoutDashboard } from "lucide-react"

const features = [
  {
    icon: UserPlus,
    label: "Cadastro",
    title: "Cadastro Rápido do Novo Contratado",
    description:
      "O gestor cadastra o novo colaborador em segundos. Sem formulários gigantes: basta nome, e-mail, template de onboarding, data de início e o mentor responsável. Vapt-vupt.",
    highlights: [
      "Cadastro em menos de 30 segundos",
      "Templates de onboarding por cargo (Dev, Vendas, Design...)",
      "Atribuição de mentor/buddy para acompanhamento",
    ],
  },
  {
    icon: Link2,
    label: "Link Mágico",
    title: "Acesso Instantâneo por Link Mágico",
    description:
      "O novo colaborador recebe um e-mail com um link mágico. Um clique e ele já está dentro da plataforma, sem precisar criar senha. O onboarding começa antes mesmo do primeiro dia.",
    highlights: [
      "Sem senha no primeiro acesso",
      "Token seguro com validade de 7 dias",
      "Colaborador já entra engajado na trilha",
    ],
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    title: "Dashboard Completo para o Gestor",
    description:
      "O gestor bate o olho e sabe quem precisa de ajuda. Métricas de conclusão, acompanhamento individual com barra de progresso, alertas de gargalo e heatmap de tarefas difíceis.",
    highlights: [
      "Métricas: contratações ativas, taxa de conclusão, tempo de ramp-up",
      "Alertas automáticos de colaboradores travados",
      "Heatmap para identificar tarefas problemáticas",
    ],
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
            Três pilares para um onboarding que funciona
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            {"Do cadastro ao acompanhamento: tudo o que o gestor e o novo colaborador precisam em um s\u00f3 lugar."}
          </p>
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
      <div className="w-full max-w-sm">
        <div className="rounded-lg border border-border/40 bg-card p-5">
          <div className="mb-4 text-xs font-medium text-foreground">Novo Colaborador</div>
          <div className="flex flex-col gap-3">
            <div className="rounded-md border border-border/30 bg-secondary/30 px-3 py-2">
              <span className="text-[10px] text-muted-foreground">Nome Completo</span>
              <p className="text-xs text-foreground">Ana Costa</p>
            </div>
            <div className="rounded-md border border-border/30 bg-secondary/30 px-3 py-2">
              <span className="text-[10px] text-muted-foreground">E-mail</span>
              <p className="text-xs text-foreground">ana.costa@empresa.com</p>
            </div>
            <div className="rounded-md border border-primary/40 bg-primary/5 px-3 py-2">
              <span className="text-[10px] text-primary">Template de Onboarding</span>
              <p className="text-xs text-foreground">Dev Frontend</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 rounded-md border border-border/30 bg-secondary/30 px-3 py-2">
                <span className="text-[10px] text-muted-foreground">{"In\u00edcio"}</span>
                <p className="text-xs text-foreground">03/03/2026</p>
              </div>
              <div className="flex-1 rounded-md border border-border/30 bg-secondary/30 px-3 py-2">
                <span className="text-[10px] text-muted-foreground">Mentor</span>
                <p className="text-xs text-foreground">Carlos M.</p>
              </div>
            </div>
            <div className="mt-1 rounded-md bg-primary px-3 py-2 text-center text-xs font-medium text-primary-foreground">
              Enviar Convite
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (index === 1) {
    return (
      <div className="w-full max-w-sm">
        <div className="rounded-lg border border-border/40 bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary">
              <span className="text-[10px] font-bold text-primary-foreground">O</span>
            </div>
            <span className="text-xs font-semibold text-foreground">Onboardix</span>
          </div>

          <div className="mb-4 rounded-md bg-secondary/30 p-3">
            <p className="mb-1 text-[10px] text-muted-foreground">Para: ana.costa@empresa.com</p>
            <p className="mb-2 text-xs font-medium text-foreground">{"Bem-vinda \u00e0 equipe! \ud83c\udf89"}</p>
            <p className="mb-3 text-[10px] leading-relaxed text-muted-foreground">
              {"Ol\u00e1 Ana, sua trilha de onboarding est\u00e1 pronta. Clique no bot\u00e3o abaixo para come\u00e7ar:"}
            </p>
            <div className="rounded-md bg-primary px-3 py-2 text-center text-[10px] font-medium text-primary-foreground">
              Acessar Meu Onboarding
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2">
            <Link2 className="size-3 text-primary" />
            <code className="text-[10px] text-primary">app.onboardix.com/join?token=abc-123</code>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">{"Link v\u00e1lido por 7 dias \u2022 Sem senha \u2022 Acesso instant\u00e2neo"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border/40 bg-card p-5">
        <div className="mb-4 text-xs font-medium text-foreground">Dashboard do Gestor</div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="rounded-md bg-primary/10 p-2 text-center">
            <p className="text-lg font-bold text-primary">5</p>
            <p className="text-[9px] text-muted-foreground">Ativos</p>
          </div>
          <div className="rounded-md bg-secondary/40 p-2 text-center">
            <p className="text-lg font-bold text-foreground">82%</p>
            <p className="text-[9px] text-muted-foreground">{"Conclus\u00e3o"}</p>
          </div>
          <div className="rounded-md bg-secondary/40 p-2 text-center">
            <p className="text-lg font-bold text-foreground">6d</p>
            <p className="text-[9px] text-muted-foreground">Ramp-up</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { name: "Ana Costa", role: "Dev Frontend", progress: 95, tasks: "12/12", status: "done" },
            { name: "Pedro Lima", role: "Sales Rep", progress: 68, tasks: "8/12", status: "ok" },
            { name: "Julia Santos", role: "Designer UX", progress: 25, tasks: "3/12", status: "alert" },
          ].map((p) => (
            <div key={p.name} className="flex items-center gap-3 rounded-md bg-secondary/20 p-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                {p.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-medium text-foreground">{p.name}</span>
                  <span className="text-[9px] text-muted-foreground">{p.role}</span>
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full ${p.status === "alert" ? "bg-amber-500" : "bg-primary"}`}
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1">
                {p.status === "alert" && (
                  <div className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                )}
                <span className="text-[10px] text-muted-foreground">{p.tasks}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-md border border-amber-500/20 bg-amber-500/5 p-2">
          <p className="text-[10px] text-amber-400">
            {"⚠ Julia Santos travada em \"Configurar ambiente local\" h\u00e1 24h"}
          </p>
        </div>
      </div>
    </div>
  )
}
