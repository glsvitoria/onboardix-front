import Link from 'next/link'
import { Button } from './ui/button'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
	icon: LucideIcon
	title: string
	description: string
	button?: {
		to: string
		text: string
	}
}

export const EmptyState = ({
	description,
	icon,
	title,
	button,
}: EmptyStateProps) => {
	const Icon = icon

	return (
		<div className="flex flex-col items-center justify-center py-12 border border-dashed border-white/10 rounded-[40px] bg-zinc-900/20 text-center px-6">
			<div className="size-20 rounded-3xl bg-zinc-800 flex items-center justify-center text-zinc-600 mb-6">
				<Icon size={40} />
			</div>
			<h3 className="text-xl font-bold text-white mb-2">{title}</h3>
			<p className="text-zinc-500 max-w-xl mb-8">{description}</p>
			{button && (
				<Link href={button.to}>
					<Button>{button.text}</Button>
				</Link>
			)}
		</div>
	)
}
