import { Loader2 } from 'lucide-react'

export default function DashboardLoading() {
	return (
		<div className="h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
			<div className="relative flex items-center justify-center">
				{/* Spinner Externo */}
				<Loader2 className="h-12 w-12 text-primary animate-spin" />
				{/* Ponto Central Estático */}
				<div className="absolute h-2 w-2 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
			</div>

			<div className="space-y-2 text-center">
				<p className="text-sm font-medium text-zinc-200 tracking-wide uppercase italic">
					Carregando dados...
				</p>
				<div className="flex gap-1 justify-center">
					<div className="h-1 w-1 bg-zinc-700 rounded-full animate-bounce [animation-delay:-0.3s]" />
					<div className="h-1 w-1 bg-zinc-700 rounded-full animate-bounce [animation-delay:-0.15s]" />
					<div className="h-1 w-1 bg-zinc-700 rounded-full animate-bounce" />
				</div>
			</div>
		</div>
	)
}
