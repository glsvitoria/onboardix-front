const companies = [
  "TechFlow",
  "ScaleUp",
  "DataBridge",
  "CloudSync",
  "NeoBank",
  "Vortex",
]

export function SocialProof() {
  return (
    <section id="depoimentos" className="border-y border-border/40 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-10 text-center text-sm text-muted-foreground">
          {"Confiado por times em crescimento em toda Am\u00e9rica Latina"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((company) => (
            <div
              key={company}
              className="text-lg font-semibold tracking-tight text-muted-foreground/40 transition-colors hover:text-muted-foreground/70"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
