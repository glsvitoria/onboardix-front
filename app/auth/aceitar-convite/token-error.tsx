import { Button } from '@/components/ui/button'
import { ServiceError } from '@/types/service-error'
import { XCircle, MailQuestion, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const TokenError = ({ error }: { error: ServiceError }) => {
	const isExpired = error.message === 'Convite expirado'
	const isInvalid = error.message === 'Convite inválido'

	return (
		<div className="w-full max-w-md mx-auto p-6 text-center h-screen flex items-center">
			<div className="flex flex-col items-center space-y-6">
				<div className="relative">
					<div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
					<div className="relative p-5 bg-red-500/10 rounded-3xl text-red-500 border border-red-500/20">
						<XCircle size={48} />
					</div>
				</div>

				{/* Texto explicativo */}
				<div className="space-y-2">
					<h1 className="text-3xl font-bold text-white tracking-tight">
						Convite Inválido
					</h1>
					<p className="text-zinc-500 text-sm leading-relaxed px-4">
						{isExpired
							? 'Este link de convite expirou por questões de segurança.'
							: isInvalid
							? 'O link que você acessou é inválido ou foi revogado.'
							: 'Este link de convite expirou por questões de segurança.'}
					</p>
				</div>

				<div className="w-full bg-white/2border border-white/5 rounded-2xl p-4 flex items-start gap-4 text-left">
					<div className="p-2 bg-zinc-800 rounded-lg text-zinc-400">
						<MailQuestion size={20} />
					</div>
					<div>
						<p className="text-xs font-medium text-zinc-300">
							O que fazer agora?
						</p>
						<p className="text-xs text-zinc-500 mt-1">
							Solicite ao administrador da organização que envie um novo convite
							para o seu e-mail.
						</p>
					</div>
				</div>

				<Link href="auth" className="w-full">
					<Button size="xl" className="w-full">
						<ChevronLeft size={18} />
						Tentar novamente
					</Button>
				</Link>
			</div>
		</div>
	)
}
