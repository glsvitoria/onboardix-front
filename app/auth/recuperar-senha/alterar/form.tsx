'use client'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { Lock, CheckCircle2 } from 'lucide-react'
import { useActionState } from 'react'
import { useActionToast } from '@/hooks/use-action-toast'
import { useRouter } from 'next/navigation'
import { resetPasswordAction } from '../../_actions/reset-password'

export const FormResetPassword = ({ token }: { token?: string }) => {
	const router = useRouter()

	const [state, formAction, isPending] = useActionState(
		resetPasswordAction,
		null,
	)

	useActionToast(state, () => {
		router.push('/login?reset=success')
	})

	return (
		<form action={formAction} className="space-y-4">
			<input type="hidden" name="token" value={token} />

			<FormInput
				label="Nova senha"
				name="newPassword"
				type="password"
				icon={Lock}
				placeholder="••••••••"
				error={state?.errors?.newPassword}
				disabled={isPending}
			/>

			<FormInput
				label="Confirme a nova senha"
				name="confirmPassword"
				type="password"
				icon={Lock}
				placeholder="••••••••"
				error={state?.errors?.confirmPassword}
				disabled={isPending}
			/>

			{state?.errors?.global && (
				<div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs text-center font-medium animate-in shake-1">
					{state?.errors.global}
				</div>
			)}

			<Button
				type="submit"
				isLoading={isPending}
				size="xl"
				className="w-full rounded-full font-semibold group"
			>
				Redefinir senha
				<CheckCircle2 className="ml-2 size-4 transition-transform group-hover:scale-110" />
			</Button>

			<p className="text-center text-[11px] text-muted-foreground">
				Ao redefinir, você será desconectado de outros dispositivos por
				segurança.
			</p>
		</form>
	)
}
