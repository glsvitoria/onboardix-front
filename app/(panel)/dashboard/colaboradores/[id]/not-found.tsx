import Link from 'next/link'
import { UserX, ChevronLeft, Search, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EmployeeNotFound() {
	return (
		<div className="h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center px-4">
			{/* Icone com Efeito de Glow */}
			<div className="relative mb-6">
				<div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
				<div className="relative bg-zinc-900 border border-white/10 p-6 rounded-[32px]">
					<UserX size={48} className="text-zinc-500" />
				</div>
			</div>

			<h1 className="text-2xl font-bold text-white mb-2">
				Colaborador não encontrado
			</h1>

			<p className="text-zinc-500 max-w-[400px] mb-8">
				Não conseguimos localizar o perfil solicitado. O colaborador pode ter
				sido removido da organização ou o ID fornecido é inválido.
			</p>

			<div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
				<Link href="/dashboard/colaboradores">
					<Button variant="outline" className="rounded-full w-full">
						<ChevronLeft size={18} />
						Voltar para a Equipe
					</Button>
				</Link>

				<Link href="/dashboard/colaboradores/convidar">
					<Button className="font-bold rounded-full w-full">
						<UserPlus size={18} />
						Convidar novo
					</Button>
				</Link>
			</div>

			{/* Dica visual */}
			<div className="mt-12 flex items-center gap-2 text-zinc-600 text-[10px] uppercase tracking-widest bg-white/[0.02] px-6 py-2 rounded-full border border-white/5">
				<Search size={14} />
				<span>Verifique o identificador na URL</span>
			</div>
		</div>
	)
}
