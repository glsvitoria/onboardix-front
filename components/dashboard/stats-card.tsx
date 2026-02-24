import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
	title: string
	value: string
	description: string
	icon: LucideIcon
}

export function StatsCard({
	title,
	value,
	description,
	icon: Icon,
}: StatsCardProps) {
	return (
		<div className="relative group overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-6 transition-all hover:border-primary/50">
			<div className="absolute -right-4 -top-4 size-24 bg-primary/10 blur-3xl transition-all group-hover:bg-primary/20" />

			<div className="flex items-center justify-between mb-4">
				<span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
					{title}
				</span>
				<div className="p-2 rounded-xl bg-zinc-800 text-primary">
					<Icon size={20} />
				</div>
			</div>

			<div className="space-y-1">
				<h3 className="text-3xl font-bold">{value}</h3>
				<p className="text-xs text-zinc-500 font-medium">{description}</p>
			</div>
		</div>
	)
}
