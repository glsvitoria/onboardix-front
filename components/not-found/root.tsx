import { LucideIcon, Search } from 'lucide-react'
import { GlowEffect } from '../glow-effect'

interface NotFoundRootProps {
	children: React.ReactNode
	icon: LucideIcon
	title: string
	description: string
	helperMessage: string
}

export const NotFoundRoot = ({
	children,
	icon,
	description,
	title,
	helperMessage,
}: NotFoundRootProps) => {
	return (
		<div className="h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center px-4">
			<GlowEffect icon={icon} />

			<h1 className="text-2xl font-bold text-white mb-2">{title}</h1>

			<p className="text-zinc-500 max-w-[350px] mb-8">{description}</p>

			<div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
				{children}
			</div>

			<div className="mt-12 flex items-center gap-2 text-zinc-600 text-xs bg-white/5 px-4 py-2 rounded-full border border-white/5">
				<Search size={14} />
				<span>{helperMessage}</span>
			</div>
		</div>
	)
}
