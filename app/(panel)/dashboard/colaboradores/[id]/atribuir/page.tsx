// src/app/dashboard/colaboradores/[id]/atribuir/page.tsx
import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { Button } from '@/components/ui/button'
import {
	ChevronLeft,
	LayoutTemplate,
	FileText,
	Info,
	ChevronRight,
	Plus,
} from 'lucide-react'
import Link from 'next/link'
import { AssignButton } from './_components/assign-button'

interface PageProps {
	params: Promise<{ id: string }>
	searchParams: Promise<{ page?: string }>
}

export default async function AssignTemplatePage({
	params,
	searchParams,
}: PageProps) {
	const { id } = await params
	const { page } = await searchParams
	const currentPage = Number(page) || 1
	const limit = 6

	// Busca templates paginados e detalhes do colaborador
	const [templatesData, employee] = await Promise.all([
		api
			.get<any>(`/templates?init=${(currentPage - 1) * limit}&limit=${limit}`)
			.catch(() => ({ templates: [], total: 0 })),
		api.get<any>(`/employees/${id}/detail`).catch(() => null),
	])

	const templates = templatesData.templates || []
	const totalTemplates = templatesData.total || 0
	const totalPages = Math.ceil(totalTemplates / limit)

	return (
		<div className="p-8 max-w-4xl mx-auto space-y-8">
			<Link href={`/dashboard/colaboradores/${id}`}>
				<Button variant="link" className="-ml-4 mb-4">
					<ChevronLeft size={20} className="mr-1" /> Voltar ao perfil
				</Button>
			</Link>

			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold text-white tracking-tight">
						Atribuir Roteiro
					</h1>
					<p className="text-zinc-500">
						Selecione um guia para{' '}
						<span className="text-white font-medium">{employee?.fullName}</span>
						.
					</p>
				</div>

				{templates.length > 0 && (
					<Button
						asChild
						variant="outline"
						className="border-white/5 bg-white/5 rounded-xl text-xs h-9"
					>
						<Link href="/dashboard/templates/novo">
							<Plus size={14} className="mr-2" /> Novo Template
						</Link>
					</Button>
				)}
			</div>

			{/* Estado Vazio */}
			{templates.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-[40px] bg-zinc-900/20 text-center px-6">
					<div className="size-20 rounded-3xl bg-zinc-800 flex items-center justify-center text-zinc-600 mb-6">
						<LayoutTemplate size={40} />
					</div>
					<h3 className="text-xl font-bold text-white mb-2">
						Nenhum roteiro encontrado
					</h3>
					<p className="text-zinc-500 max-w-[320px] mb-8">
						Você ainda não possui templates de onboarding criados para a sua
						organização.
					</p>
					<Button
						asChild
						className="bg-primary text-black font-bold hover:bg-primary/90 rounded-xl px-8"
					>
						<Link href="/dashboard/templates/novo">
							Criar meu primeiro roteiro
						</Link>
					</Button>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 gap-4">
						{templates.map((template: any) => (
							<div
								key={template.id}
								className="group bg-zinc-900/40 border border-white/5 p-6 rounded-[32px] flex items-center justify-between hover:border-primary/50 transition-all"
							>
								<div className="flex items-center gap-5">
									<div className="size-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors">
										<FileText size={28} />
									</div>
									<div className="max-w-md">
										<h3 className="text-lg font-bold text-white">
											{template.title}
										</h3>
										<p className="text-sm text-zinc-500 line-clamp-1">
											{template.description || 'Sem descrição disponível.'}
										</p>
									</div>
								</div>

								<AssignButton employeeId={id} templateId={template.id} />
							</div>
						))}
					</div>

					{/* Paginação */}
					{totalPages > 1 && (
						<div className="flex items-center justify-center gap-2 pt-4">
							<Button
								asChild
								variant="outline"
								disabled={currentPage <= 1}
								className="border-white/5 bg-zinc-900/50 rounded-xl disabled:opacity-30"
							>
								<Link href={`?page=${currentPage - 1}`}>
									<ChevronLeft size={18} />
								</Link>
							</Button>

							<span className="text-sm text-zinc-500 px-4">
								Página{' '}
								<span className="text-white font-bold">{currentPage}</span> de{' '}
								{totalPages}
							</span>

							<Button
								asChild
								variant="outline"
								disabled={currentPage >= totalPages}
								className="border-white/5 bg-zinc-900/50 rounded-xl disabled:opacity-30"
							>
								<Link href={`?page=${currentPage + 1}`}>
									<ChevronRight size={18} />
								</Link>
							</Button>
						</div>
					)}
				</>
			)}

			{/* Info Box */}
			{templates.length > 0 && (
				<div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-3 items-start">
					<Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
					<p className="text-xs text-zinc-400 leading-relaxed">
						Ao atribuir, todas as tarefas deste template serão copiadas para o
						colaborador. Você poderá acompanhar o progresso dele individualmente
						no perfil.
					</p>
				</div>
			)}
		</div>
	)
}
