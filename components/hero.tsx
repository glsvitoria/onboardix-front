"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { DashboardMockup } from "@/components/dashboard-mockup"

export function Hero() {
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
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/4 right-0 size-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            Em breve: vagas limitadas no Beta
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 md:text-6xl md:leading-tight">
            Do contrato assinado ao{" "}
            <span className="text-primary">primeiro dia produtivo</span>
            {" "}sem planilhas
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 md:text-xl">
            {"Onboardix automatiza o onboarding de novos colaboradores. Cadastro r\u00e1pido, acesso por link m\u00e1gico e um dashboard completo para o gestor acompanhar tudo em tempo real."}
          </p>

          <div className="mt-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
            {submitted ? (
              <div className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-4 text-primary">
                <CheckCircle2 className="size-5" />
                <span className="text-sm font-medium">
                  {"Voc\u00ea est\u00e1 na lista! Entraremos em contato em breve."}
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
                  Quero Testar
                  <ArrowRight className="ml-1 size-4" />
                </Button>
              </form>
            )}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {"Sem spam. Acesso antecipado garantido para os primeiros inscritos."}
            </p>
          </div>
        </div>

        <div className="mt-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 md:mt-20">
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}
