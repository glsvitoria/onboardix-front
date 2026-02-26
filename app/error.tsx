'use client' // Componentes de erro DEVEM ser Client Components

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error('Application Error:', error)
	}, [error])

	return (
		<div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-8 text-center">
			<div className="relative mb-6">
				<div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
				<div className="relative size-20 bg-zinc-900 border border-red-500/50 rounded-3xl flex items-center justify-center text-red-500">
					<AlertTriangle size={40} />
				</div>
			</div>

			<div className="space-y-2 mb-8">
				<h1 className="text-3xl font-bold text-white tracking-tight">
					Ops! Algo deu errado
				</h1>
				<p className="text-zinc-500 max-w-[400px] mx-auto leading-relaxed">
					Ocorreu um erro inesperado no sistema. Já notificamos nossa equipe
					técnica para verificar o que aconteceu.
				</p>

				{process.env.NODE_ENV === 'development' && (
					<div className="mt-4 p-4 bg-zinc-950 border border-white/5 rounded-xl text-left">
						<code className="text-xs text-red-400 break-all">
							{error.message || 'Erro desconhecido'}
						</code>
					</div>
				)}
			</div>

			<div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
				<Button
					onClick={() => reset()}
					className="flex-1 rounded-full font-bold gap-2"
				>
					<RefreshCcw size={18} />
					Tentar Novamente
				</Button>

				<Button
					asChild
					variant="outline"
					className="flex-1 rounded-full gap-2 "
				>
					<Link href="/auth">
						<Home size={18} />
						Início
					</Link>
				</Button>
			</div>
		</div>
	)
}
