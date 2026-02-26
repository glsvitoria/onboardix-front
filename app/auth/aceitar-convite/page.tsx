'use client'

import { Suspense, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { FormInput } from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'
import { User, Lock, CheckCircle2, Loader2 } from 'lucide-react'
import { acceptInvitationAction } from '@/app/actions/accept-invitation'

export const AcceptInvitationForm = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const [state, formAction, isPending] = useActionState(
		acceptInvitationAction,
		null
	)

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

	return (
		<div className="w-full max-w-md mx-auto space-y-8 p-6">
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

			<form action={formAction} className="space-y-4">
				<input type="hidden" name="token" value={token} />

				<FormInput
					label="Nome Completo"
					name="fullName"
					placeholder="Como quer ser chamado?"
					icon={User}
					error={state?.errors?.fullName}
					defaultValue={state?.inputs?.fullName}
					required
				/>

				<FormInput
					label="Senha"
					name="password"
					type="password"
					placeholder="Mínimo 6 caracteres"
					icon={Lock}
					error={state?.errors?.password}
					defaultValue={state?.inputs?.password}
					required
				/>

				<FormInput
					label="Confirmar Senha"
					name="confirmPassword"
					type="password"
					placeholder="Repita sua senha"
					icon={Lock}
					error={state?.errors?.confirmPassword}
					defaultValue={state?.inputs?.confirmPassword}
					required
				/>

				{state?.errors?.global && (
					<div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
						{state?.errors?.global}
					</div>
				)}

				<Button isLoading={isPending}>Criar minha conta</Button>
			</form>

			<p className="text-center text-xs text-zinc-600 px-8">
				Ao criar sua conta, você concorda com nossos Termos de Serviço e
				Política de Privacidade.
			</p>
		</div>
	)
}

export default function AcceptInvitationPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-[400px] flex items-center justify-center">
					<Loader2 className="animate-spin text-primary" size={40} />
				</div>
			}
		>
			<AcceptInvitationForm />
		</Suspense>
	)
}
