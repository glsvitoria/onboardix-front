'use client'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { Lock, User } from 'lucide-react'
import { useActionState } from 'react'
import { acceptInvitationAction } from '../_actions/accept-invitation'
import { useActionToast } from '@/hooks/use-action-toast'
import { useRouter } from 'next/navigation'

interface AcceptInvitationFormProps {
	token: string
}

export const AcceptInvitationForm = ({ token }: AcceptInvitationFormProps) => {
	const router = useRouter()

	const [state, formAction, isPending] = useActionState(
		acceptInvitationAction,
		null,
	)

	useActionToast(state, () => {
		router.push('/auth?success=account-created')
	})

	return (
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

			<Button isLoading={isPending} className="w-full" size="xl">
				Criar minha conta
			</Button>
		</form>
	)
}
