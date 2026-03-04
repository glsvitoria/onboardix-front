'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { DashboardMockup } from './dashboard-mockup'
import { registerLeadAction } from '../_actions/register-lead'

export function Hero() {
	const [state, formAction, isPending] = useActionState(
		registerLeadAction,
		null
	)

	return (
		<section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
				<div className="absolute top-1/4 right-0 size-[400px] rounded-full bg-primary/5 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-6xl px-6">
				<div className="flex flex-col items-center text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
						<span className="size-2 rounded-full bg-primary animate-pulse" />
						Vagas limitadas no Beta
					</div>

					<h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 md:text-6xl md:leading-tight">
						Reduza o tempo de ramp-up do seu time em{' '}
						<span className="text-primary">40%</span>
					</h1>

					<p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 md:text-xl">
						Automatize o onboarding de novos funcionários. Do contrato assinado
						ao primeiro dia de produtividade, sem planilhas ou mensagens
						perdidas no Slack.
					</p>

					<div className="mt-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
						{state?.success ? (
							<div className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-4 text-primary animate-in fade-in zoom-in duration-300">
								<CheckCircle2 className="size-5" />
								<span className="text-sm font-medium">
									{'Você está na lista! Verifique seu e-mail em breve.'}
								</span>
							</div>
						) : (
							<form action={formAction} className="flex flex-col gap-2">
								<div className="flex sm:flex-row flex-col gap-3">
									<Input
										name="email" // O atributo name é vital para o FormData capturar o valor
										type="email"
										placeholder="seu@email.com"
										required
										disabled={isPending}
										className="h-12 flex-1 rounded-full border-border/60 bg-secondary/50 px-5 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
									/>
									<Button
										type="submit"
										size="xl"
										isLoading={isPending}
										className="rounded-full"
									>
										Entrar na Lista
										<ArrowRight className="ml-1 size-4" />
									</Button>
								</div>

								{state?.errors?.global && (
									<p className="text-destructive text-xs mt-1 font-medium text-center px-4 animate-in slide-in-from-top-1">
										{state.errors.global}
									</p>
								)}
							</form>
						)}
						<p className="mt-3 text-center text-xs text-muted-foreground">
							{
								'Sem spam. Cancelamento a qualquer momento. Acesso antecipado garantido.'
							}
						</p>
					</div>
				</div>

				<div className="mt-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 md:mt-20">
					<DashboardMockup />
				</div>
			</div>
		</section>
	)
}
