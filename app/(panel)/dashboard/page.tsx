import { Users, CheckCircle2, BarChart3, TrendingUp } from 'lucide-react'
import { DashboardData, OrganizationReport } from '@/types/dashboard'
import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { StatCard } from './_components/stat-card'
import { HeaderPage } from './_components/header'

async function getDashboardData() {
	const [stats, reports] = await Promise.all([
		api.get<DashboardData>('/dashboard/general-stats', {
			next: {
				revalidate: 60,
			},
		}),
		api.get<OrganizationReport>('/dashboard/organization-report', {
			next: {
				revalidate: 60,
			},
		}),
	])

	return {
		stats,
		reports,
	}
}

export default async function DashboardPage() {
	const dashboardData = await getDashboardData()
	if (!dashboardData) return <div>Erro ao carregar dados...</div>
	const { stats, reports } = dashboardData

	return (
		<div className="p-8 space-y-8">
			<HeaderPage
				title="Dashboard"
				description="Visão geral da sua organização no Onboardix."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard
					title="Total Membros"
					value={stats.cards.totalEmployees}
					icon={Users}
					color="text-blue-500"
				/>
				<StatCard
					title="Progresso Médio"
					value={stats.cards.avgProgress}
					icon={TrendingUp}
					color="text-emerald-500"
				/>
				<StatCard
					title="Taxa de Conclusão"
					value={`${stats.cards.completionRate}%`}
					icon={CheckCircle2}
					color="text-purple-500"
				/>
				<StatCard
					title="Membros Ativos"
					value={reports.totalEmployees}
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
					{stats.charts.recentActivity.map((item: any) => {
						const heightPercentage = Math.min((item.count / 20) * 100, 100)
						return (
							<div
								key={item.date}
								className="flex-1 flex flex-col items-center gap-4 group"
							>
								<div className="relative w-full flex flex-col items-center">
									{/* Tooltip fixa suave que aparece no hover */}
									<span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all bg-zinc-800 text-primary text-xs font-bold px-2 py-1 rounded-md border border-white/10 z-10 shadow-xl">
										{item.count}
									</span>

									<div
										className="w-full max-w-[60px] bg-primary/10 border-t-2 border-primary/40 rounded-t-xl transition-all duration-500 group-hover:bg-primary/20 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
										style={{
											height: `${
												item.count === 0 ? '4px' : `${heightPercentage}%`
											}`,
										}}
									/>
								</div>
								<span className="text-[10px] font-bold text-zinc-600 group-hover:text-zinc-300 transition-colors uppercase">
									{item.date}
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
							{reports.employees.map((emp: any) => (
								<tr
									key={emp.id}
									className="transition-colors"
								>
									<td className="py-4 px-4">
										<div className="flex flex-col">
											<span className="text-zinc-200 font-medium">
												{emp.name}
											</span>
											<span className="text-xs text-zinc-500">{emp.email}</span>
										</div>
									</td>
									<td className="py-4 px-4">
										<span
											className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
												emp.status === 'COMPLETED'
													? 'bg-emerald-500/10 text-emerald-500'
													: 'bg-orange-500/10 text-orange-500'
											}`}
										>
											{emp.status === 'COMPLETED'
												? 'Concluído'
												: 'Em andamento'}
										</span>
									</td>
									<td className="py-4 px-4">
										<div className="flex items-center justify-end gap-4 min-w-[200px]">
											<div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
												<div
													className="h-full bg-primary"
													style={{ width: emp.progress }}
												/>
											</div>
											<span className="text-sm font-mono text-zinc-400 w-10 text-right">
												{emp.progress}
											</span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
