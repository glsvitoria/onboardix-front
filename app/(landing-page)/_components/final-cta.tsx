'use client'

import { useActionState } from 'react' // Se estiver no React 18, use 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { registerLeadAction } from '../_actions/register-lead'
import { useActionToast } from '@/hooks/use-action-toast'

export function FinalCTA() {
	const [state, formAction, isPending] = useActionState(
		registerLeadAction,
		null
	)

  useActionToast(state)

	return (
		<section id="precos" className="py-20 md:py-28">
			<div className="mx-auto max-w-6xl px-6">
				<div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-10 text-center md:p-16">
					<div className="pointer-events-none absolute inset-0">
						<div className="absolute -top-20 left-1/2 size-100 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
					</div>

					<div className="relative">
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
							Oferta de lançamento
						</div>

						<h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
							Seja um dos primeiros a testar
						</h2>

						<p className="mx-auto mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
							{
								'Garanta acesso antecipado entrando no programa Beta. Vagas limitadas para empresas que querem revolucionar seu onboarding.'
							}
						</p>

						<div className="mx-auto mt-8 max-w-md">
							{state?.success ? (
								<div className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-4 text-primary animate-in fade-in zoom-in duration-300">
									<CheckCircle2 className="size-5" />
									<span className="text-sm font-medium">
										{'Inscrição confirmada! Verifique seu e-mail em instantes.'}
									</span>
								</div>
							) : (
								<form action={formAction} className="flex flex-col gap-3">
									<div className="flex sm:flex-row flex-col gap-3">
										<Input
											name="email"
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
											Garantir Vaga
											<ArrowRight className="ml-1 size-4" />
										</Button>
									</div>

									{state?.errors && (
										<p className="text-destructive text-xs mt-1 font-medium animate-in slide-in-from-top-1">
											{state.errors.global}
										</p>
									)}
								</form>
							)}
						</div>

						<div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
							<span className="flex items-center gap-1.5">
								<CheckCircle2 className="size-3.5 text-primary" />
								{'Sem cartão de crédito'}
							</span>
							<span className="flex items-center gap-1.5">
								<CheckCircle2 className="size-3.5 text-primary" />
								Setup em 5 minutos
							</span>
							<span className="flex items-center gap-1.5">
								<CheckCircle2 className="size-3.5 text-primary" />
								Suporte prioritário
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
