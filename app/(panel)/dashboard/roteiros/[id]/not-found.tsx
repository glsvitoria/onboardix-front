import Link from 'next/link'
import { FileQuestion, ChevronLeft, Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TemplateNotFound() {
	return (
		<div className="h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center px-4">
			<div className="relative mb-6">
				<div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
				<div className="relative bg-zinc-900 border border-white/10 p-6 rounded-3xl">
					<FileQuestion size={48} className="text-zinc-500" />
				</div>
			</div>

			<h1 className="text-2xl font-bold text-white mb-2">
				Roteiro não encontrado
			</h1>

			<p className="text-zinc-500 max-w-[350px] mb-8">
				Não conseguimos localizar o roteiro solicitado. Ele pode ter sido
				removido ou o link está incorreto.
			</p>

			<div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
				<Link href="/dashboard/roteiros">
					<Button variant="outline" className="rounded-full w-full">
						<ChevronLeft size={18} />
						Voltar para a lista
					</Button>
				</Link>

				<Link href="/dashboard/roteiros/novo">
					<Button className="font-bold rounded-full w-full">
						<Plus size={18} />
						Criar novo roteiro
					</Button>
				</Link>
			</div>

			{/* Dica visual de ID inválido */}
			<div className="mt-12 flex items-center gap-2 text-zinc-600 text-xs bg-white/5 px-4 py-2 rounded-full border border-white/5">
				<Search size={14} />
				<span>Verifique se o ID na barra de endereços está correto</span>
			</div>
		</div>
	)
}
