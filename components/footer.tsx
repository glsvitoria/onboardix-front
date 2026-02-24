export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary">
            <span className="text-xs font-bold text-primary-foreground">O</span>
          </div>
          <span className="text-sm font-semibold text-foreground">Onboardix</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {"© 2026 Onboardix. Todos os direitos reservados."}
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            Termos
          </a>
          <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            Privacidade
          </a>
          <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            Contato
          </a>
        </div>
      </div>
    </footer>
  )
}
