// src/app/dashboard/templates/page.tsx
import { Plus, FileText, Layers, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { Pagination } from '@/components/pagination'

const ITEMS_PER_PAGE = 9

export default async function TemplatesPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>
}) {
	const params = await searchParams
	const currentPage = Number(params.page) || 1

	const { templates, total } = await api.get<{
		templates: any[]
		total: number
	}>('/templates', {
		params: {
			init: (currentPage - 1) * ITEMS_PER_PAGE,
			limit: ITEMS_PER_PAGE,
		},
	})

	const lastPage = Math.ceil(total / ITEMS_PER_PAGE)

	return (
		<div className="p-8 max-w-7xl mx-auto space-y-8">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-white">
						Roteiros
					</h1>
					<p className="text-zinc-500">
						Gerencie as trilhas de aprendizado da sua organização.
					</p>
				</div>

				<Button
					asChild
					className="bg-primary hover:bg-primary/90 text-black font-bold rounded-xl gap-2"
				>
					<Link href="/dashboard/roteiros/novo">
						<Plus size={20} /> Novo Roteiro
					</Link>
				</Button>
			</div>

			{templates.length > 0 ? (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{templates.map((template) => (
							<Link
								key={template.id}
								href={`/dashboard/roteiros/${template.id}`}
								className="group bg-zinc-900/40 border border-white/5 p-6 rounded-3xl hover:border-primary/50 transition-all"
							>
								<div className="flex justify-between items-start mb-4">
									<div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
										<FileText size={24} />
									</div>
									<div className="flex items-center gap-1 text-[10px] font-bold text-zinc-600 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
										<Layers size={12} /> {template._count?.tasks || 0} Etapas
									</div>
								</div>

								<h3 className="text-xl font-bold text-zinc-100 mb-2">
									{template.title}
								</h3>
								<p className="text-sm text-zinc-500 line-clamp-2 mb-6">
									{template.description || 'Sem descrição disponível.'}
								</p>

								<div className="flex items-center gap-2 text-xs text-zinc-600 border-t border-white/5 pt-4">
									<Calendar size={14} />
									Criado em{' '}
									{new Date(template.createdAt).toLocaleDateString('pt-BR')}
								</div>
							</Link>
						))}
					</div>

					<Pagination
						currentPage={currentPage}
						lastPage={lastPage}
						total={total}
					/>
				</>
			) : (
				<div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl">
					<p className="text-zinc-500">Nenhum roteiro encontrado.</p>
				</div>
			)}
		</div>
	)
}
