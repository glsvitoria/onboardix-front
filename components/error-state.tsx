import { AlertCircle, RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

interface ErrorStateProps {
	children: React.ReactNode
	to: string
}

export const ErrorState = ({ children, to }: ErrorStateProps) => {
	return (
		<div className="col-span-full py-16 flex flex-col items-center justify-center bg-red-500/5 border border-dashed border-red-500/20 rounded-3xl text-center">
			<AlertCircle className="size-10 text-red-500/50 mb-4" />
			<h3 className="text-white font-medium">{children}</h3>
			<p className="text-zinc-500 text-sm mb-6">
				Verifique sua conexão ou tente novamente mais tarde.
			</p>
			<Link href={to}>
				<Button variant="outline" size="sm" className="gap-2">
					<RefreshCcw size={14} /> Atualizar
				</Button>
			</Link>
		</div>
	)
}
