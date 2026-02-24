import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
			{/* Elementos visuais de fundo para manter o padrão do Hero */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
				<div className="absolute top-0 right-0 size-[300px] rounded-full bg-primary/5 blur-3xl" />
			</div>

			<div className="relative z-10 flex flex-col items-center text-center">
				{/* Badge de Erro */}
				<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm font-medium text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
					<span className="size-2 rounded-full bg-destructive" />
					Erro 404
				</div>

				<h1 className="text-balance text-6xl font-bold tracking-tighter text-foreground md:text-8xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
					Perdido no <span className="text-primary">processo?</span>
				</h1>

				<p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
					Parece que o onboarding desta página ainda não foi concluído. A página
					que você procura não existe ou foi movida para um novo departamento.
				</p>

				<div className="mt-10 flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
					<Button asChild size="lg" className="h-12 rounded-full px-8">
						<Link href="/">
							<Home className="mr-2 size-4" />
							Voltar ao Início
						</Link>
					</Button>
				</div>
			</div>

			{/* Rodapé sutil */}
			<p className="absolute bottom-8 text-xs text-muted-foreground/60">
				&copy; {new Date().getFullYear()} Onboardix - Simplificando sua jornada.
			</p>
		</main>
	)
}
