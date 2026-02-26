'use client'

import { updatePasswordAction } from '@/app/actions/update-password'
import { FormInput } from '@/components/ui/form-input'
import { Lock } from 'lucide-react'
import { useActionState } from 'react'

export function PasswordForm() {
	const [state, formAction, isPending] = useActionState(
		updatePasswordAction,
		null
	)

	return (
		<form className="space-y-6" action={formAction}>
			<div className="space-y-4">
				<FormInput
					label="Senha atual"
					name="currentPassword"
					type="password"
					error={state?.errors?.currentPassword}
					defaultValue={state?.inputs?.currentPassword}
					icon={Lock}
				/>
				<FormInput
					label="Nova Senha"
					name="newPassword"
					type="password"
					error={state?.errors?.newPassword}
					defaultValue={state?.inputs?.newPassword}
					icon={Lock}
				/>
				<FormInput
					label="Confirmação de nova senha"
					name="confirmPassword"
					type="password"
					error={state?.errors?.confirmPassword}
					defaultValue={state?.inputs?.confirmPassword}
					icon={Lock}
				/>
			</div>

			{state?.errors?.global && (
				<div className="p-4 rounded-2xl bg-destructive/10 text-destructive text-sm text-center font-medium">
					{state.errors.global}
				</div>
			)}

			<button
				disabled={isPending}
				className="h-11 px-8 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50"
			>
				{isPending ? 'Atualizando...' : 'Atualizar senha'}
			</button>
		</form>
	)
}
