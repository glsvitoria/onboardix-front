import { FileX, Clock, FolderSearch } from "lucide-react"

const painPoints = [
  {
    icon: FileX,
    title: "Chega de checklists manuais",
    description:
      "Pare de gerenciar onboarding com Notion, Trello ou planilhas improvisadas. Centralize tudo em um fluxo automatizado.",
  },
  {
    icon: Clock,
    title: "Sem mais primeira semana ociosa",
    description:
      "Evite que novos contratados fiquem sem direcionamento. Cada tarefa é entregue no momento certo, automaticamente.",
  },
  {
    icon: FolderSearch,
    title: "Documentos e acessos centralizados",
    description:
      "Todos os documentos, credenciais e recursos que o novo colaborador precisa, organizados em um único fluxo.",
  },
]

export function PainPoints() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">
            O problema
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Onboarding manual custa caro
          </h2>
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
