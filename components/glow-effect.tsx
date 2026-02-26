import { LucideIcon } from 'lucide-react'

interface GlowEffectProps {
	icon: LucideIcon
}

export const GlowEffect = ({ icon }: GlowEffectProps) => {
	const Icon = icon
	return (
		<div className="relative mb-6">
			<div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
			<div className="relative bg-zinc-900 border border-white/10 p-6 rounded-[32px]">
				<Icon className="text-zinc-500" size={48} />
			</div>
		</div>
	)
}
