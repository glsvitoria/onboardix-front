import { FileSpreadsheet, Clock, AlertTriangle } from "lucide-react"

const painPoints = [
  {
    icon: FileSpreadsheet,
    title: "Planilhas e Notion improvisados",
    description:
      "Cada gestor monta seu onboarding de um jeito diferente. Checklists se perdem entre Notion, Trello e Google Sheets. O novo colaborador fica sem saber o que fazer.",
  },
  {
    icon: Clock,
    title: "Primeira semana desperdicada",
    description:
      "Sem um fluxo estruturado, o novo contratado passa dias esperando acessos, documentos e orientações. O tempo de ramp-up dispara e a produtividade despenca.",
  },
  {
    icon: AlertTriangle,
    title: "Gestor sem visibilidade",
    description:
      "Quem está travado? Qual tarefa é gargalo? O RH e os gestores não têm como saber sem perguntar um por um. Problemas só aparecem quando já é tarde.",
  },
]

export function PainPoints() {
  return (
    <section id="problema" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">
            O problema
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {"Onboarding manual custa tempo, dinheiro e talentos"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            {"Empresas em crescimento perdem produtividade toda vez que um novo colaborador entra. O processo \u00e9 fragmentado, manual e invis\u00edvel para a gest\u00e3o."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {painPoints.map((point, i) => (
            <div
              key={point.title}
              className="group rounded-xl border border-border/60 bg-card p-8 transition-all hover:border-primary/30 hover:bg-primary/5"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <point.icon className="size-6" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
