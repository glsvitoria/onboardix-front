import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { Button } from '@/components/ui/button'
import {
	ChevronLeft,
	CheckCircle2,
	Circle,
	Mail,
	BarChart3,
	ListChecks,
	Clock,
	PlusCircle,
	AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { notFound } from 'next/navigation'

interface PageProps {
	params: Promise<{ id: string }>
}

export default async function CollaboratorDetailPage({ params }: PageProps) {
	const { id } = await params

	const employee = await api
		.get<any>(`/employees/${id}/detail`)
		.catch(() => null)

	if (!employee) {
		notFound()
	}

	const hasTasks = employee.stats.total > 0

	return (
		<div className="p-8 max-w-5xl mx-auto space-y-8">
			{/* Botão Voltar */}
			<Button
				asChild
				variant="ghost"
				className="text-zinc-500 hover:text-white -ml-4"
			>
				<Link href="/dashboard/colaboradores">
					<ChevronLeft size={20} className="mr-1" /> Voltar para Equipe
				</Link>
			</Button>

			{/* Header do Perfil */}
			<div
				className={`flex flex-col md:flex-row md:items-end justify-between gap-6 bg-zinc-900/40 border ${
					!hasTasks ? 'border-amber-500/20' : 'border-white/5'
				} p-8 rounded-[40px] relative overflow-hidden`}
			>
				{!hasTasks && (
					<div className="absolute top-0 right-0 p-4">
						<Badge className="bg-amber-500/10 text-amber-500 border-none animate-pulse">
							Aguardando Atribuição
						</Badge>
					</div>
				)}

				<div className="flex items-center gap-6">
					<div className="size-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
						<span className="text-3xl font-bold">
							{employee.fullName.charAt(0)}
						</span>
					</div>
					<div className="space-y-1">
						<h1 className="text-3xl font-bold text-white tracking-tight">
							{employee.fullName}
						</h1>
						<div className="flex items-center text-zinc-500 gap-4 text-sm">
							<span className="flex items-center gap-1.5">
								<Mail size={14} /> {employee.email}
							</span>
						</div>
					</div>
				</div>

				<div className="flex gap-3">
					{hasTasks ? (
						<Badge className="bg-primary/10 text-primary border-none py-1.5 px-4 text-sm">
							{employee.progress}% Concluído
						</Badge>
					) : (
						<Button
							asChild
							className="bg-amber-500 text-black font-bold hover:bg-amber-400"
						>
							<Link href={`/dashboard/colaboradores/${id}/atribuir`}>
								<PlusCircle size={18} className="mr-2" />
								Atribuir Roteiro
							</Link>
						</Button>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Coluna Lateral: Stats */}
				<div className="space-y-6">
					<div className="bg-zinc-900/40 border border-white/5 p-6 rounded-[32px] space-y-6">
						<h3 className="text-white font-bold flex items-center gap-2">
							<BarChart3 size={18} className="text-primary" /> Estatísticas
						</h3>

						<div className="space-y-4">
							<div className="flex justify-between items-center p-3 rounded-2xl bg-white/[0.02]">
								<span className="text-zinc-500 text-sm">Total de Tasks</span>
								<span className="text-white font-bold">
									{employee.stats.total}
								</span>
							</div>
							<div className="flex justify-between items-center p-3 rounded-2xl bg-green-500/5">
								<span className="text-zinc-500 text-sm">Concluídas</span>
								<span className="text-green-500 font-bold">
									{employee.stats.completed}
								</span>
							</div>
							<div className="flex justify-between items-center p-3 rounded-2xl bg-amber-500/5">
								<span className="text-zinc-500 text-sm">Pendentes</span>
								<span className="text-amber-500 font-bold">
									{employee.stats.pending}
								</span>
							</div>
						</div>

						<div className="pt-2">
							<Progress value={employee.progress} className="h-2 bg-zinc-800" />
						</div>
					</div>

					{!hasTasks && (
						<div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-[32px]">
							<div className="flex gap-3 text-amber-500 mb-2">
								<AlertCircle size={20} />
								<span className="font-bold text-sm">Ação Necessária</span>
							</div>
							<p className="text-xs text-zinc-500 leading-relaxed">
								Este colaborador está ativo no sistema, mas ainda não iniciou
								sua jornada. Selecione um roteiro de onboarding para que ele
								possa começar suas atividades.
							</p>
						</div>
					)}
				</div>

				{/* Coluna Principal: Lista de Tasks */}
				<div className="md:col-span-2 space-y-6">
					<div className="flex items-center justify-between">
						<h3 className="text-white font-bold text-xl flex items-center gap-2">
							<ListChecks size={20} className="text-primary" /> Roteiro de
							Onboarding
						</h3>
					</div>

					<div className="space-y-3">
						{hasTasks ? (
							employee.tasks
								.sort((a: any, b: any) => a.order - b.order)
								.map((task: any) => (
									<div
										key={task.id}
										className={`flex items-center justify-between p-5 rounded-[24px] border transition-all ${
											task.completed
												? 'bg-green-500/[0.03] border-green-500/10'
												: 'bg-zinc-900/40 border-white/5'
										}`}
									>
										<div className="flex items-center gap-4">
											{task.completed ? (
												<div className="text-green-500">
													<CheckCircle2 size={24} />
												</div>
											) : (
												<div className="text-zinc-700">
													<Circle size={24} />
												</div>
											)}
											<div>
												<p
													className={`font-semibold ${
														task.completed
															? 'text-zinc-400 line-through'
															: 'text-zinc-200'
													}`}
												>
													{task.title}
												</p>
												{task.completedAt && (
													<span className="text-[10px] text-zinc-600 flex items-center gap-1">
														<Clock size={10} /> Concluído em{' '}
														{new Date(task.completedAt).toLocaleDateString(
															'pt-BR'
														)}
													</span>
												)}
											</div>
										</div>
										{!task.completed && (
											<Badge
												variant="outline"
												className="text-[10px] border-zinc-800 text-zinc-500"
											>
												Pendente
											</Badge>
										)}
									</div>
								))
						) : (
							<div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/5 rounded-[40px] bg-zinc-900/20 text-center px-6">
								<div className="size-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
									<ListChecks size={32} />
								</div>
								<h4 className="text-white font-bold mb-2">
									Nenhuma tarefa atribuída
								</h4>
								<p className="text-zinc-500 text-sm max-w-[300px] mb-8">
									Este colaborador ainda não possui um roteiro. Comece
									atribuindo um template existente.
								</p>
								<Button
									asChild
									variant="outline"
									className="border-white/10 hover:bg-white/5 rounded-xl"
								>
									<Link href={`/dashboard/colaboradores/${id}/atribuir`}>
										Escolher Roteiro Agora
									</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
