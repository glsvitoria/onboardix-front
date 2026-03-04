import { LucideIcon } from 'lucide-react'

export interface StatCardProps {
	title: string
	value: number | string
	icon: LucideIcon
	color: string
}

export const StatCard = ({
	title,
	value,
	icon: Icon,
	color,
}: StatCardProps) => {
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
