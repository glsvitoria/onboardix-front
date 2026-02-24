'use client'

import { useActionState, useEffect, useState } from 'react'
import { loginAction } from '@/app/actions/login'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FormInput } from '@/components/ui/form-input'

export default function LoginPage() {
	const [state, formAction, isPending] = useActionState(loginAction, {})
	const [localErrors, setLocalErrors] = useState<any>(null)

	useEffect(() => {
		if (state.errors) setLocalErrors(state.errors)
		if (state.success) {
			// Redirecionamento após o login
			window.location.href = '/dashboard'
		}
	}, [state])

	const clearFieldError = (field: string) => {
		setLocalErrors((prev: any) => {
			if (!prev) return null
			const { [field]: _, ...rest } = prev
			return rest
		})
	}

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
			{/* Background Glows Estilo Onboardix */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
			</div>

			<div className="relative z-10 w-full max-w-[400px]">
				{/* Logo superior sutil */}
				<div className="mb-8 text-center">
					<Link
						href="/"
						className="inline-block font-bold tracking-tighter text-2xl"
					>
						ONBOARDIX
					</Link>
				</div>

				<div className="rounded-3xl border border-border/40 bg-card/50 p-8 backdrop-blur-xl shadow-2xl">
					<div className="mb-8">
						<h1 className="text-xl font-bold tracking-tight">
							Bem-vindo de volta
						</h1>
						<p className="text-sm text-muted-foreground">
							Acesse sua conta para gerenciar seus colaboradores.
						</p>
					</div>

					<form action={formAction} className="space-y-4">
						<FormInput
							label="E-mail"
							name="email"
							type="email"
							icon={Mail}
							placeholder="seu@email.com"
							defaultValue={state.inputs?.email}
							error={localErrors?.email}
							clearError={() => clearFieldError('email')}
							disabled={isPending}
						/>

						<div className="space-y-1">
							<FormInput
								label="Senha"
								name="password"
								type="password"
								icon={Lock}
								placeholder="••••••"
								error={localErrors?.password}
								clearError={() => clearFieldError('password')}
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

						{state.errors?.global && (
							<div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs text-center font-medium animate-in shake-1">
								{state.errors.global}
							</div>
						)}

						<Button
							type="submit"
							disabled={isPending}
							className="w-full rounded-full h-11 mt-2 font-semibold group"
						>
							{isPending ? (
								<Loader2 className="size-4 animate-spin" />
							) : (
								<>
									Entrar na plataforma
									<ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
								</>
							)}
						</Button>

						<div className="mt-6 text-center text-xs text-muted-foreground">
							Não tem uma organização?{' '}
							<Link
								href="/register"
								className="text-primary font-semibold hover:underline"
							>
								Crie agora gratuitamente
							</Link>
						</div>
					</form>
				</div>
			</div>
		</main>
	)
}
