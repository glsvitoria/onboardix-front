'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Building2,
	User,
	Mail,
	Lock,
	Loader2,
	CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import { FormInput } from '@/components/ui/form-input'
import { registerOrgAction } from './_actions/register-org'

export default function RegisterOrgPage() {
	const [state, formAction, isPending] = useActionState(registerOrgAction, null)

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-0 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
			</div>

			<div className="relative z-10 w-full max-w-[500px]">
				<div className="rounded-3xl border border-border/40 bg-card/50 p-8 backdrop-blur-xl shadow-2xl">
					{state?.success ? (
						<div className="py-8 text-center animate-in zoom-in duration-300">
							<CheckCircle2 className="mx-auto size-12 text-primary mb-4" />
							<h1 className="text-2xl font-bold">Tudo pronto!</h1>
							<p className="mt-2 text-muted-foreground">
								Sua organização foi criada. Você já pode acessar o dashboard.
							</p>
							<Link href="/auth">
								<Button className="mt-8 w-full rounded-full">
									Ir para Login
								</Button>
							</Link>
						</div>
					) : (
						<>
							<div className="mb-8">
								<h1 className="text-2xl font-bold tracking-tight">
									Crie sua conta
								</h1>
								<p className="text-sm text-muted-foreground">
									Configure sua empresa no Onboardix
								</p>
							</div>

							<form action={formAction} className="space-y-4">
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<FormInput
										label="Empresa"
										name="companyName"
										icon={Building2}
										placeholder="Nome da empresa"
										defaultValue={state?.inputs?.companyName}
										disabled={isPending}
										error={state?.errors?.companyName}
									/>

									<FormInput
										label="Seu Nome"
										name="ownerName"
										icon={User}
										placeholder="Seu nome"
										defaultValue={state?.inputs?.ownerName}
										disabled={isPending}
										error={state?.errors?.ownerName}
									/>
								</div>

								<FormInput
									label="E-mail Corporativo"
									name="email"
									type="email"
									icon={Mail}
									placeholder="email@empresa.com"
									defaultValue={state?.inputs?.email}
									disabled={isPending}
									error={state?.errors?.email}
								/>

								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<FormInput
										label="Senha"
										name="password"
										type="password"
										icon={Lock}
										placeholder="••••••"
										defaultValue={state?.inputs?.password}
										disabled={isPending}
										error={state?.errors?.password}
									/>

									<FormInput
										label="Confirmar"
										name="confirmPassword"
										type="password"
										icon={Lock}
										placeholder="••••••"
										defaultValue={state?.inputs?.confirmPassword}
										disabled={isPending}
										error={state?.errors?.confirmPassword}
									/>
								</div>

								{state?.errors?.global && (
									<div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs text-center font-medium animate-in shake-200">
										{state?.errors.global}
									</div>
								)}

								<Button
									type="submit"
									disabled={isPending}
									className="w-full rounded-full h-11 mt-4 transition-all active:scale-[0.98]"
								>
									{isPending ? (
										<Loader2 className="size-4 animate-spin" />
									) : (
										'Finalizar Cadastro'
									)}
								</Button>

								<p className="text-center text-xs text-muted-foreground mt-4">
									Já tem conta?{' '}
									<Link href="/auth" className="text-primary hover:underline">
										Entre aqui
									</Link>
								</p>
							</form>
						</>
					)}
				</div>
			</div>
		</main>
	)
}
