'use client'

import { FormInput } from '@/components/ui/form-input'
import { Lock } from 'lucide-react'
import { useActionState } from 'react'
import { Button } from './ui/button'
import { updatePasswordAction } from '@/app/(panel)/dashboard/_actions/update-password'
import { useActionToast } from '@/hooks/use-action-toast'

export function PasswordForm() {
	const [state, formAction, isPending] = useActionState(
		updatePasswordAction,
		null,
	)

	useActionToast(state)

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

			<Button size="xl" isLoading={isPending} type="submit">
				Atualizar senha
			</Button>
		</form>
	)
}
