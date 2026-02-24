"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">O</span>
          </div>
          <span className="text-lg font-semibold text-foreground">Onboardix</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#problema" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            O Problema
          </a>
          <a href="#funcionalidades" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Funcionalidades
          </a>
          <a href="#como-funciona" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Como Funciona
          </a>
        </div>

        <div className="hidden md:block">
          <Button size="lg" className="rounded-full">
            Entrar na Lista de Espera
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            <a
              href="#problema"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              O Problema
            </a>
            <a
              href="#funcionalidades"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Funcionalidades
            </a>
            <a
              href="#como-funciona"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como Funciona
            </a>
            <Button size="lg" className="mt-2 w-full rounded-full">
              Entrar na Lista de Espera
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
