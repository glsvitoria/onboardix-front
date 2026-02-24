import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Users, CheckCircle2, BarChart3, TrendingUp } from 'lucide-react'
import { DashboardData, OrganizationReport } from '@/@types/dashboard'

async function getDashboardData(token: string) {
	const [statsRes, reportRes] = await Promise.all([
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/general-stats`, {
			headers: { Authorization: `Bearer ${token}` },
			next: { revalidate: 60 }, // Cache de 1 minuto
		}),
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/organization-report`, {
			headers: { Authorization: `Bearer ${token}` },
			next: { revalidate: 60 },
		}),
	])

	if (!statsRes.ok || !reportRes.ok) return null

	return {
		stats: (await statsRes.json()) as DashboardData,
		report: (await reportRes.json()) as OrganizationReport,
	}
}

export default async function DashboardPage() {
	const data = await getSession()
	if (!data?.token) redirect('/login')

	const dashboardData = await getDashboardData(data.token)
	if (!dashboardData) return <div>Erro ao carregar dados...</div>

	const { stats, report } = dashboardData

	return (
		<div className="p-8 space-y-8">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
				<p className="text-zinc-500">
					Visão geral da sua organização no Onboardix.
				</p>
			</div>

			{/* Cards de Resumo */}
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
					value={report.totalEmployees}
					icon={BarChart3}
					color="text-orange-500"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Tabela de Progresso (Report) */}
				<div className="lg:col-span-2 bg-[#09090b] border border-white/5 rounded-3xl p-6">
					<h2 className="text-lg font-semibold mb-6">
						Progresso por Colaborador
					</h2>
					<div className="overflow-x-auto">
						<table className="w-full text-left">
							<thead>
								<tr className="text-zinc-500 border-b border-white/5">
									<th className="pb-4 font-medium">Nome</th>
									<th className="pb-4 font-medium">Status</th>
									<th className="pb-4 font-medium">Progresso</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-white/5">
								{report.employees.map((emp: any) => (
									<tr key={emp.id} className="group">
										<td className="py-4">
											<div className="flex flex-col">
												<span className="text-zinc-200 font-medium">
													{emp.name}
												</span>
												<span className="text-xs text-zinc-500">
													{emp.email}
												</span>
											</div>
										</td>
										<td className="py-4">
											<span
												className={`text-xs px-2 py-1 rounded-full ${
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
										<td className="py-4">
											<div className="flex items-center gap-3">
												<div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
													<div
														className="h-full bg-primary transition-all duration-500"
														style={{ width: emp.progress }}
													/>
												</div>
												<span className="text-sm font-mono text-zinc-400">
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

				{/* Mini Gráfico / Atividade Recente */}
				<div className="bg-[#09090b] border border-white/5 rounded-3xl p-6">
					<h2 className="text-lg font-semibold mb-6">Atividade de Conclusão</h2>
					<div className="space-y-6">
						{stats.charts.recentActivity.map((item: any) => (
							<div key={item.date} className="flex items-center gap-4">
								<span className="text-xs text-zinc-500 w-10">{item.date}</span>
								<div className="flex-1 h-8 bg-white/5 rounded-lg relative overflow-hidden">
									<div
										className="absolute inset-y-0 left-0 bg-primary/20 border-r border-primary/40 transition-all"
										style={{ width: `${(item.count / 10) * 100}%` }} // Exemplo: escala baseada em 10 tasks
									/>
									<span className="absolute inset-0 flex items-center px-3 text-xs font-medium">
										{item.count} tasks finalizadas
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

function StatCard({ title, value, icon: Icon, color }: any) {
	return (
		<div className="bg-[#09090b] border border-white/5 p-6 rounded-3xl">
			<div className="flex items-center justify-between mb-4">
				<div className={`p-2 rounded-xl bg-white/5 ${color}`}>
					<Icon size={20} />
				</div>
			</div>
			<p className="text-sm text-zinc-500">{title}</p>
			<h3 className="text-2xl font-bold text-zinc-100">{value}</h3>
		</div>
	)
}
