'use client'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form-input'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'
import { loginAction } from './_actions/login'
import { useActionToast } from '@/hooks/use-action-toast'
import { useRouter } from 'next/navigation'

export const FormLogin = () => {
	const router = useRouter()

	const [state, formAction, isPending] = useActionState(loginAction, null)

	useActionToast(state, () => {
		if(state?.message && state.message.includes('colaborador')) {
      router.push('/onboarding')
    } else {
      router.push('/dashboard')
    }
	})

	return (
		<form action={formAction} className="space-y-4">
			<FormInput
				label="E-mail"
				name="email"
				type="email"
				icon={Mail}
				placeholder="seu@email.com"
				defaultValue={state?.inputs?.email}
				error={state?.errors?.email}
				disabled={isPending}
			/>

			<div className="space-y-1">
				<FormInput
					label="Senha"
					name="password"
					type="password"
					icon={Lock}
					placeholder="••••••"
					error={state?.errors?.password}
					disabled={isPending}
				/>
				<div className="flex justify-end">
					<Link
						href="/forgot-password"
						className="text-[11px] text-primary hover:underline font-medium"
					>
						Esqueceu a senha?
					</Link>
				</div>
			</div>

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
				Entrar na plataforma
				<ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
			</Button>

			<div className="mt-6 text-center text-xs text-muted-foreground">
				Não tem uma organização?{' '}
				<Link
					href="/registro"
					className="text-primary font-semibold hover:underline"
				>
					Crie agora gratuitamente
				</Link>
			</div>
		</form>
	)
}
