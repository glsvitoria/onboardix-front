import {
	Route,
	LayoutDashboard,
	MailCheck,
	ChevronRight,
	Mail,
	User,
	Clock,
} from 'lucide-react'

const features = [
	{
		icon: Route,
		label: 'Trilhas',
		title: 'Trilhas Dinâmicas',
		description:
			'Crie checklists personalizados por cargo — Dev, Sales, RH, Design. Cada colaborador segue o caminho certo desde o primeiro dia.',
		highlights: [
			'Modelos por departamento',
			'Tarefas ordenadas',
			'Progresso em tempo real',
		],
	},
	{
		icon: LayoutDashboard,
		label: 'Dashboard',
		title: 'Dashboard de Gestão',
		description:
			'Visualize em tempo real quem está travado, quem finalizou e onde estão os gargalos do processo de onboarding.',
		highlights: [
			'Visão geral do time',
			'Alertas automáticos',
			'Relatórios detalhados',
		],
	},
	{
		icon: MailCheck,
		label: 'Convites',
		title: 'Onboarding Automatizado',
		description:
			'Convites automatizados via e-mail e inicie o fluxo de boas-vindas instantaneamente. Menos burocracia, mais eficiência.',
		highlights: [
			'Envio via Resend API',
			'Status de entrega',
			'Link de acesso seguro',
		],
	},
	// {
	//   icon: Bell,
	//   label: "Integrações",
	//   title: "Integração Nativa",
	//   description:
	//     "Notificações automáticas no Slack e Teams. Conecte com as ferramentas que seu time já usa no dia a dia.",
	//   highlights: ["Slack & Teams", "Webhooks customizados", "API aberta"],
	// },
]

export function Features() {
	return (
		<section id="funcionalidades" className="py-20 md:py-28">
			<div className="mx-auto max-w-6xl px-6">
				<div className="mb-14 text-center">
					<p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">
						Funcionalidades
					</p>
					<h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
						Tudo que você precisa para automatizar o onboarding
					</h2>
				</div>

				<div className="flex flex-col gap-8">
					{features.map((feature, i) => (
						<div
							key={feature.title}
							className={`group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:border-primary/30 md:flex-row ${
								i % 2 === 1 ? 'md:flex-row-reverse' : ''
							}`}
						>
							<div className="flex flex-1 flex-col justify-center p-8 md:p-12">
								<div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
									<feature.icon className="size-3.5" />
									{feature.label}
								</div>
								<h3 className="mb-3 text-2xl font-bold text-foreground">
									{feature.title}
								</h3>
								<p className="mb-6 text-sm leading-relaxed text-muted-foreground">
									{feature.description}
								</p>
								<ul className="flex flex-col gap-2.5">
									{feature.highlights.map((h) => (
										<li
											key={h}
											className="flex items-center gap-2 text-sm text-foreground"
										>
											<div className="size-1.5 rounded-full bg-primary" />
											{h}
										</li>
									))}
								</ul>
							</div>

							<div className="flex flex-1 items-center justify-center bg-secondary/20 p-8 md:p-12">
								<FeatureVisual index={i} />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function FeatureVisual({ index }: { index: number }) {
	const mockEmployees = [
		{
			id: '1',
			fullName: 'Ana Costa',
			role: 'Dev Frontend',
			email: 'ana.costa@onboardix.com',
			onboarding: { progress: '95%' },
			hasStarted: true,
			isPendingAssignment: false,
		},
	]

	const invitations = [
		{
			id: 1,
			email: 'ana.costa@tech.com',
			createdAt: '2024-03-20',
			expiresAt: '2024-03-27',
		},
		{
			id: 2,
			email: 'pedro.lima@sales.com',
			createdAt: '2024-03-21',
			expiresAt: '2024-03-28',
		},
		{
			id: 3,
			email: 'julia.s@design.com',
			createdAt: '2024-03-22',
			expiresAt: '2024-03-29',
		},
	]

	if (index === 0) {
		return (
			<div className="w-full max-w-xs">
				<div className="rounded-lg border border-border/40 bg-card p-4">
					<div className="mb-3 text-xs font-medium text-foreground">
						Trilha: Dev Frontend
					</div>
					{[
						{ task: 'Configurar ambiente local', done: true },
						{ task: 'Acesso ao repositório', done: true },
						{ task: 'Review do código base', done: false },
						{ task: 'Primeiro PR de teste', done: false },
					].map((item) => (
						<div
							key={item.task}
							className="flex items-center gap-3 border-t border-border/30 py-2.5"
						>
							<div
								className={`size-4 rounded-sm border ${
									item.done ? 'border-primary bg-primary' : 'border-border'
								}`}
							>
								{item.done && (
									<svg
										viewBox="0 0 16 16"
										fill="none"
										className="size-4 text-primary-foreground"
									>
										<path
											d="M4 8l3 3 5-6"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								)}
							</div>
							<span
								className={`text-xs ${
									item.done
										? 'text-muted-foreground line-through'
										: 'text-foreground'
								}`}
							>
								{item.task}
							</span>
						</div>
					))}
				</div>
			</div>
		)
	}

	if (index === 1) {
		return (
			<div className="gap-6">
				{mockEmployees.map((employee) => {
					const isPendingAssignment = employee.isPendingAssignment
					const hasStarted = employee.hasStarted

					return (
						<div
							key={employee.id}
							className={`bg-zinc-900/40 border ${
								isPendingAssignment ? 'border-amber-500/20' : 'border-white/5'
							} p-6 rounded-3xl hover:border-primary/30 transition-all flex flex-col group relative overflow-hidden shadow-xl`}
						>
							{hasStarted && (
								<div className="absolute -right-10 -top-10 size-32 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors" />
							)}
							{isPendingAssignment && (
								<div className="absolute -right-10 -top-10 size-32 bg-amber-500/5 blur-3xl rounded-full" />
							)}

							{/* Header: Avatar e Info */}
							<div className="flex justify-between items-start mb-6 relative z-10">
								<div className="flex items-center gap-4">
									<div className="size-12 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-all">
										<User size={24} />
									</div>
									<div>
										<h3 className="font-bold text-zinc-100 leading-tight">
											{employee.fullName}
										</h3>
										<span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
											{employee.role}
										</span>
									</div>
								</div>

								<div
									className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
										isPendingAssignment
											? 'bg-amber-500/10 text-amber-500'
											: hasStarted
											? 'bg-green-500/10 text-green-500'
											: 'bg-zinc-800 text-zinc-500'
									}`}
								>
									{isPendingAssignment
										? 'Sem trilha'
										: hasStarted
										? 'Em progresso'
										: 'Não iniciado'}
								</div>
							</div>

							{/* Content: Email e Barra de Progresso */}
							<div className="space-y-4 mb-6 flex-1 relative z-10">
								<div className="flex items-center text-sm text-zinc-400">
									<Mail size={14} className="mr-2 shrink-0" />
									<span className="truncate text-xs">{employee.email}</span>
								</div>

								{!isPendingAssignment ? (
									<div className="space-y-1.5">
										<div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-600">
											<span>Progresso Onboarding</span>
											<span className={hasStarted ? 'text-primary' : ''}>
												{employee.onboarding.progress}
											</span>
										</div>
										<div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
											<div
												className="h-full bg-primary transition-all duration-500"
												style={{ width: employee.onboarding.progress }}
											/>
										</div>
									</div>
								) : (
									<div className="py-2.5 px-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
										<p className="text-[10px] text-amber-500/80 leading-relaxed font-medium">
											Aguardando atribuição de roteiro para iniciar.
										</p>
									</div>
								)}
							</div>

							{/* Footer: Button */}
							<button
								className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all border ${
									isPendingAssignment
										? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20'
										: 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 border-white/5'
								}`}
							>
								{isPendingAssignment
									? 'Atribuir Roteiro'
									: 'Ver Perfil Detalhado'}
								<ChevronRight
									size={14}
									className="group-hover:translate-x-1 transition-transform"
								/>
							</button>
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/5 bg-[#09090b] shadow-2xl">
			<div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
				<MailCheck size={14} className="text-primary" />
				<span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
					Convites Pendentes
				</span>
			</div>

			<table className="w-full text-left border-collapse">
				<thead>
					<tr className="border-b border-white/5 bg-white/2">
						<th className="px-4 py-3 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
							Convidado
						</th>
						<th className="px-4 py-3 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-right">
							Expira em
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-white/5">
					{invitations.map((invitation) => (
						<tr
							key={invitation.id}
							className="transition-colors group hover:bg-white/1"
						>
							<td className="px-4 py-4">
								<div className="text-xs font-medium text-zinc-200 truncate max-w-[140px]">
									{invitation.email}
								</div>
								<div className="text-[9px] text-zinc-600 mt-0.5">
									Enviado:{' '}
									{new Date(invitation.createdAt).toLocaleDateString('pt-BR')}
								</div>
							</td>
							<td className="px-4 py-4 text-right">
								<div className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 border border-amber-500/10 px-2 py-1 text-[9px] font-bold text-amber-500">
									<Clock size={10} />
									{new Date(invitation.expiresAt).toLocaleDateString('pt-BR')}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
