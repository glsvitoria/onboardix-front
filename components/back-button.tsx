import Link from 'next/link'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'

interface BackButton {
	children: React.ReactNode
	to: string
}

export const BackButton = ({ children, to }: BackButton) => {
	return (
		<Link href={to}>
			<Button variant="link" className="-ml-4 mb-4">
				<ChevronLeft size={20} />
				{children}
			</Button>
		</Link>
	)
}
