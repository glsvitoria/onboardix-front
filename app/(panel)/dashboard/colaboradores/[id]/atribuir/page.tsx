import { Button } from '@/components/ui/button'
import { ChevronLeft, LayoutTemplate, FileText, Info, Plus } from 'lucide-react'
import Link from 'next/link'
import { AssignButton } from './_components/assign-button'
import { listTemplatesService } from '@/services/templates/list'
import { ServiceError } from '@/types/service-error'
import { EmptyState } from '@/components/empty-state'
import { showEmployeesService } from '@/services/employees/show'

const ITEMS_PER_PAGE_TEMPLATES = 9
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

	const [templates, employee] = await Promise.all([
		listTemplatesService({
			init: (currentPage - 1) * ITEMS_PER_PAGE_TEMPLATES,
			limit: ITEMS_PER_PAGE_TEMPLATES,
		}).catch((err: ServiceError) => ({
			items: [],
			total: 0,
			message: err.message,
		})),
		showEmployeesService({
			params: {
				employeeId: id,
			},
		}),
	])

	return (
		<>
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

				{templates.items.length > 0 && (
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

			{templates.items.length === 0 ? (
				<EmptyState
					description="Você ainda não possui templates de onboarding criados para a sua
						organização."
					icon={LayoutTemplate}
					title="Nenhum roteiro encontrado"
					button={{
						text: 'Criar meu primeiro roteiro',
						to: '/dashboard/templates/novo',
					}}
				/>
			) : (
				<div className="grid grid-cols-1 gap-4">
					{templates.items.map((template) => (
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
			)}

			{templates.items.length > 0 && (
				<div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-3 items-start">
					<Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
					<p className="text-xs text-zinc-400 leading-relaxed">
						Ao atribuir, todas as tarefas deste template serão copiadas para o
						colaborador. Você poderá acompanhar o progresso dele individualmente
						no perfil.
					</p>
				</div>
			)}
		</>
	)
}
