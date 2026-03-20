'use client'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { ArrowRight, Mail } from 'lucide-react'
import { useActionState } from 'react'
import { useActionToast } from '@/hooks/use-action-toast'
import { useRouter } from 'next/navigation'
import { forgotPasswordAction } from '../_actions/forgot-password'

export const FormForgotPassword = () => {
	const router = useRouter()

	const [state, formAction, isPending] = useActionState(
		forgotPasswordAction,
		null,
	)

	useActionToast(state, () => {
		router.push(`/auth/recuperar-senha/validar?email=${state?.inputs?.email}`)
	})

	return (
		<form action={formAction} className="space-y-4">
			<FormInput
				label="Seu e-mail cadastrado"
				name="email"
				type="email"
				icon={Mail}
				placeholder="seu@email.com"
				defaultValue={state?.inputs?.email}
				error={state?.errors?.email}
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
				Enviar código
				<ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
			</Button>

			<p className="text-center text-[11px] text-muted-foreground px-4">
				Enviaremos um código de 6 dígitos para sua caixa de entrada. Verifique
				também sua pasta de spam.
			</p>
		</form>
	)
}
