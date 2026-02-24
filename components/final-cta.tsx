"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export function FinalCTA() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section id="precos" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-10 text-center md:p-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 size-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Oferta de lançamento
            </div>

            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Seja um dos primeiros a testar
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              {"Garanta 50% de desconto vitalício entrando no programa Beta. Vagas limitadas para empresas que querem revolucionar seu onboarding."}
            </p>

            <div className="mx-auto mt-8 max-w-md">
              {submitted ? (
                <div className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-4 text-primary">
                  <CheckCircle2 className="size-5" />
                  <span className="text-sm font-medium">
                    {"Inscri\u00e7\u00e3o confirmada! Voc\u00ea receberá novidades em breve."}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 flex-1 rounded-full border-border/60 bg-secondary/50 px-5 text-foreground placeholder:text-muted-foreground"
                  />
                  <Button type="submit" size="lg" className="h-12 rounded-full px-6">
                    Garantir Vaga
                    <ArrowRight className="ml-1 size-4" />
                  </Button>
                </form>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-primary" />
                {"Sem cart\u00e3o de cr\u00e9dito"}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-primary" />
                Setup em 5 minutos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-primary" />
                Suporte prioritário
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
