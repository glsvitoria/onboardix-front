import { Users, CheckCircle2, BarChart3, TrendingUp } from 'lucide-react'
import { StatCard } from './_components/stat-card'
import { HeaderPage } from './_components/header'
import { employeesResumeDashboardService } from '@/services/dashboard/employees-resume'
import { generalStatsDashboardService } from '@/services/dashboard/general-stats'
import { format } from 'date-fns'
import { Pagination } from '@/components/pagination'
import { ServiceError } from '@/types/service-error'

const ITEMS_PER_PAGE_EMPLOYEES = 5

async function getDashboardData(currentPage: number) {
	const [employeesResume, generalStats] = await Promise.all([
		employeesResumeDashboardService({
			params: {
				init: currentPage - 1,
				limit: ITEMS_PER_PAGE_EMPLOYEES,
			},
			options: {
				next: {
					revalidate: 60,
				},
			},
		}).catch((err: ServiceError) => ({
			employees: [],
			averageProgress: 0,
			totalEmployees: 0,
			message: err.message,
		})),
		generalStatsDashboardService({
			options: {
				next: {
					revalidate: 60,
				},
			},
		}),
	])

	return {
		employeesResume,
		generalStats,
	}
}

export default async function DashboardPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>
}) {
	const params = await searchParams
	const currentPage = Number(params.page) || 1

	const dashboardData = await getDashboardData(currentPage)

	if (!dashboardData) return <div>Erro ao carregar dados...</div>

	const { employeesResume, generalStats } = dashboardData

	const historyCountMaxInOneDay = Math.max(
		...generalStats.charts.history.map((item) => item.count),
		0,
	)

	return (
		<>
			<HeaderPage
				title="Dashboard"
				description="Visão geral da sua organização no Onboardix."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard
					title="Total Membros"
					value={generalStats.cards.totalEmployees}
					icon={Users}
					color="text-blue-500"
				/>
				<StatCard
					title="Progresso Médio"
					value={generalStats.cards.avgProgress}
					icon={TrendingUp}
					color="text-emerald-500"
				/>
				<StatCard
					title="Taxa de Conclusão"
					value={`${generalStats.cards.completionRate}%`}
					icon={CheckCircle2}
					color="text-purple-500"
				/>
				<StatCard
					title="Membros Ativos"
					value={employeesResume.totalEmployees}
					icon={BarChart3}
					color="text-orange-500"
				/>
			</div>

			<div className="bg-[#09090b] border border-white/5 rounded-3xl p-8">
				<div className="flex items-center justify-between mb-10">
					<div>
						<h2 className="text-lg font-semibold text-white">
							Atividade de Conclusão
						</h2>
						<p className="text-xs text-zinc-500">
							Volume de tarefas finalizadas nos últimos dias
						</p>
					</div>
					<div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
						<span className="size-1.5 rounded-full bg-primary animate-pulse" />
						Live Updates
					</div>
				</div>

				<div className="flex items-end justify-between gap-4 h-48 px-2">
					{generalStats.charts.history.map((item) => {
            const maxHeight = 160
						const heightPixel = item.count * maxHeight / historyCountMaxInOneDay

						return (
							<div
								key={item.date}
								className="flex-1 flex flex-col items-center gap-4 group"
							>
								<div className="relative w-full flex flex-col items-center">
									<span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all bg-zinc-800 text-primary text-xs font-bold px-2 py-1 rounded-md border border-white/10 z-10 shadow-xl">
										{item.count}
									</span>

									<div
										className="w-full max-w-15 bg-primary/10 border-t-2 border-primary/40 rounded-t-xl transition-all duration-500 group-hover:bg-primary/20 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
										style={{
											height: `${
												heightPixel === 0 ? '4px' : `${heightPixel}px`
											}`,
										}}
									/>
								</div>
								<span className="text-[10px] font-bold text-zinc-600 group-hover:text-zinc-300 transition-colors uppercase">
									{format(item.date, 'dd/MM/yyyy')}
								</span>
							</div>
						)
					})}
				</div>
			</div>

			<div className="bg-[#09090b] border border-white/5 rounded-3xl p-6">
				<h2 className="text-lg font-semibold mb-6">
					Progresso por Colaborador
				</h2>
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="text-zinc-500 border-b border-white/5">
								<th className="pb-4 font-medium px-4">Nome</th>
								<th className="pb-4 font-medium px-4">Status</th>
								<th className="pb-4 font-medium px-4 text-right">Progresso</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-white/5">
							{employeesResume.employees.length === 0 ? (
								<tr>
									<td colSpan={3} className="py-12 text-center text-zinc-500">
										<div className="flex flex-col items-center gap-2">
											<span className="text-sm">
												Nenhum colaborador encontrado.
											</span>
										</div>
									</td>
								</tr>
							) : (
								employeesResume.employees.map((employee) => {
									return (
										<tr
											key={employee.id}
											className="transition-colors hover:bg-white/1"
										>
											<td className="py-4 px-4">
												<div className="flex flex-col">
													<span className="text-zinc-200 font-medium">
														{employee.name}
													</span>
													<span className="text-xs text-zinc-500">
														{employee.email}
													</span>
												</div>
											</td>
											<td className="py-4 px-4">
												<span
													className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
														employee.status === 'COMPLETED'
															? 'bg-emerald-500/10 text-emerald-500'
															: 'bg-orange-500/10 text-orange-500'
													}`}
												>
													{employee.status === 'COMPLETED'
														? 'Concluído'
														: 'Em andamento'}
												</span>
											</td>
											<td className="py-4 px-4">
												<div className="flex items-center justify-end gap-4 min-w-50">
													<div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
														<div
															className="h-full bg-primary transition-all duration-500"
															style={{ width: `${employee.progress}` }}
														/>
													</div>
													<span className="text-sm text-zinc-400 w-10 text-right">
														{employee.progress}
													</span>
												</div>
											</td>
										</tr>
									)
								})
							)}
						</tbody>
					</table>
				</div>

				{employeesResume.employees.length > 0 && (
					<Pagination
						currentPage={currentPage}
						itemsPerPage={ITEMS_PER_PAGE_EMPLOYEES}
						totalItems={employeesResume.totalEmployees}
					/>
				)}
			</div>
		</>
	)
}
