import { CheckCircle2 } from 'lucide-react'
import { AcceptInvitationForm } from './form'
import { validateInvitationsService } from '@/services/invitations/validate'
import { ServiceError } from '@/types/service-error'
import { TokenError } from './token-error'

export default async function AcceptInvitationPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>
}) {
	const params = await searchParams
	const token = params.token

	if (!token) {
		return (
			<div className="text-center space-y-4">
				<h1 className="text-white text-2xl font-bold">Token Inválido</h1>
				<p className="text-zinc-500">
					Este link de convite parece estar quebrado ou expirado.
				</p>
			</div>
		)
	}

	const response = await validateInvitationsService({
		params: {
			token,
		},
	}).catch((err: ServiceError) => err)

	if (response?.message) {
		return <TokenError error={response} />
	}

	return (
		<div className="w-full max-w-md mx-auto space-y-8 p-6 h-screen">
			<div className="flex flex-col items-center text-center space-y-2">
				<div className="p-3 bg-primary/10 rounded-2xl text-primary mb-2">
					<CheckCircle2 size={32} />
				</div>
				<h1 className="text-3xl font-bold text-white tracking-tight">
					Finalize seu cadastro
				</h1>
				<p className="text-zinc-500 text-sm">
					Você foi convidado! Preencha seus dados para acessar a plataforma.
				</p>
			</div>

			<AcceptInvitationForm token={token} />

			<p className="text-center text-xs text-zinc-600 px-8">
				Ao criar sua conta, você concorda com nossos Termos de Serviço e
				Política de Privacidade.
			</p>
		</div>
	)
}
