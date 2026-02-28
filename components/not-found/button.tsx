import Link from 'next/link'
import { Button } from '../ui/button'
import { LucideIcon } from 'lucide-react'

interface NotFoundBackButtonProps {
	children: React.ReactNode
	icon: LucideIcon
	to: string
	type: 'outline' | 'default'
}

export const NotFoundButton = ({
	children,
	icon,
	to,
	type,
}: NotFoundBackButtonProps) => {
	const Icon = icon
	return (
		<Link href={to}>
			<Button variant={type} className="rounded-full w-full">
				<Icon size={18} />
				{children}
			</Button>
		</Link>
	)
}
