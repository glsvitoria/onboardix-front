import { cn } from '@/lib/utils'
import {
	Users,
	CheckCircle2,
	BarChart3,
	TrendingUp,
	Home,
	LayoutGrid,
	LogOut,
} from 'lucide-react'

export const DashboardMockup = () => {
	const stats = {
		cards: {
			totalEmployees: 24,
			avgProgress: '72%',
			completionRate: 85,
			activeMembers: 12,
		},
		charts: {
			recentActivity: [
				{ date: 'SEG', count: 4 },
				{ date: 'TER', count: 20 },
				{ date: 'QUA', count: 8 },
				{ date: 'QUI', count: 6 },
				{ date: 'SEX', count: 2 },
				{ date: 'SAB', count: 4 },
				{ date: 'DOM', count: 12 },
			],
		},
	}

	const menuItems = [
		{ name: 'Início', icon: Home, active: true },
		{ name: 'Roteiros', icon: LayoutGrid },
		{ name: 'Equipe', icon: Users },
	]

	return (
		<div className="w-full max-w-6xl mx-auto overflow-hidden border rounded-2xl border-white/10 bg-[#09090b] shadow-2xl">
			<div className="flex items-center gap-2 border-b border-white/5 bg-zinc-900/50 px-6 py-4">
				<div className="flex gap-2">
					<div className="size-3 rounded-full bg-red-500/20 border border-red-500/40" />
					<div className="size-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
					<div className="size-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
				</div>
				<div className="ml-8 flex h-8 w-full max-w-md items-center rounded-lg bg-zinc-950 border border-white/5 px-4 text-[11px] text-zinc-500">
					app.onboardix.com/dashboard
				</div>
			</div>

			<div className="flex flex-col lg:flex-row">
				<aside className="sticky hidden top-0 h-auto w-64 border-r border-white/5 lg:flex flex-col p-6 bg-[#09090b]">
					<div className="mb-10 px-2">
						<span className="font-bold tracking-tighter text-xl text-white uppercase">
							ONBOARDIX
						</span>
					</div>

					<nav className="flex-1 space-y-2 overflow-y-auto">
						{menuItems.map((item) => {
							return (
								<p
									key={item.name}
									className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 cursor-auto ${
										item.active
											? 'bg-primary/10 text-primary font-semibold'
											: 'text-zinc-500 '
									}`}
								>
									<item.icon
										size={20}
										className={item.active ? 'text-primary' : 'text-zinc-500'}
									/>
									{item.name}
								</p>
							)
						})}
					</nav>

					<div className="pt-6 border-t border-white/5 mt-auto">
						<button className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 transition-colors outline-none">
							<LogOut size={20} />
							Sair
						</button>
					</div>
				</aside>

				<main className="flex-1 p-8 space-y-8 bg-zinc-950/40">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold text-white tracking-tight">
								Dashboard
							</h1>
							<p className="text-zinc-500 text-sm">
								Visão geral da sua organização no Onboardix.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						<MockStatCard
							title="Total Membros"
							value={stats.cards.totalEmployees}
							icon={Users}
							color="text-blue-500"
						/>
						<MockStatCard
							title="Progresso Médio"
							value={stats.cards.avgProgress}
							icon={TrendingUp}
							color="text-emerald-500"
						/>
						<MockStatCard
							title="Taxa Conclusão"
							value={`${stats.cards.completionRate}%`}
							icon={CheckCircle2}
							color="text-purple-500"
						/>
						<MockStatCard
							title="Membros Ativos"
							value={stats.cards.activeMembers}
							icon={BarChart3}
							color="text-orange-500"
						/>
					</div>

					<div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 shadow-inner">
						<div className="flex items-center justify-between mb-10">
							<div>
								<h2 className="text-lg font-semibold text-white">
									Atividade de Conclusão
								</h2>
								<p className="text-xs text-zinc-500">
									Volume de tarefas finalizadas nos últimos dias
								</p>
							</div>
							<div className="flex items-center gap-2 text-[10px] font-bold text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
								<span className="size-1.5 rounded-full bg-primary animate-pulse" />{' '}
								LIVE UPDATES
							</div>
						</div>

						<div className="flex items-end justify-between gap-3 h-20 px-2">
							{stats.charts.recentActivity.map((item) => {
								return (
									<div
										key={item.date}
										className="flex-1 flex flex-col items-center gap-3 group"
									>
										<div
											className={cn(
												'w-full max-w-[40px] bg-primary/10 border-t-2 border-primary/40 rounded-t-lg transition-all duration-500 group-hover:bg-primary/20 group-hover:border-primary',
												`h-${item.count}`
											)}
										/>
										<span className="text-[9px] font-bold text-zinc-600 group-hover:text-zinc-300 uppercase tracking-tighter">
											{item.date}
										</span>
									</div>
								)
							})}
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

function MockStatCard({ title, value, icon: Icon, color }: any) {
	return (
		<div className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl hover:bg-zinc-900/50 transition-colors">
			<div className={`p-2 w-fit rounded-xl bg-white/5 mb-4 ${color}`}>
				<Icon size={18} />
			</div>
			<p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
				{title}
			</p>
			<h3 className="text-2xl font-bold text-zinc-100 mt-1">{value}</h3>
		</div>
	)
}
