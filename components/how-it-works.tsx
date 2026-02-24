import { UserPlus, Send, BarChart3 } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Gestor cadastra o novo colaborador",
    description:
      "Preencha nome, e-mail, selecione o template de onboarding, defina a data de início e atribua um mentor. Feito em 30 segundos.",
  },
  {
    number: "02",
    icon: Send,
    title: "Colaborador recebe o Link Mágico",
    description:
      "Um e-mail é enviado automaticamente. O novo colaborador clica no link e já está dentro da plataforma, pronto para seguir a trilha.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Gestor acompanha em tempo real",
    description:
      "O dashboard mostra quem concluiu, quem está travado e onde estão os gargalos. Alertas automáticos garantem que ninguém fique para trás.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="border-y border-border/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">
            Como funciona
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {"Simples para o gestor. Engajante para o colaborador."}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] bg-border/60 md:block" />
              )}
              <div className="relative mb-6 flex size-20 items-center justify-center rounded-2xl border border-border/60 bg-card">
                <step.icon className="size-8 text-primary" />
                <div className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {step.number}
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
