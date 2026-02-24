'use client'

import { useActionState, useState } from 'react'
import { registerOrgAction } from '@/app/actions/register-org'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Building2,
	User,
	Mail,
	Lock,
	Loader2,
	CheckCircle2,
	Eye,
	EyeOff,
} from 'lucide-react'
import Link from 'next/link'

export default function RegisterOrgPage() {
	const [state, formAction, isPending] = useActionState(registerOrgAction, {})

	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-0 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
			</div>

			<div className="relative z-10 w-full max-w-[500px]">
				<div className="rounded-3xl border border-border/40 bg-card/50 p-8 backdrop-blur-xl shadow-2xl">
					{state.success ? (
						<div className="py-8 text-center animate-in zoom-in duration-300">
							<CheckCircle2 className="mx-auto size-12 text-primary mb-4" />
							<h1 className="text-2xl font-bold">Tudo pronto!</h1>
							<p className="mt-2 text-muted-foreground">
								Sua organização foi criada. Você já pode acessar o dashboard.
							</p>
							<Button asChild className="mt-8 w-full rounded-full">
								<Link href="/login">Ir para Login</Link>
							</Button>
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
									<div className="space-y-1">
										<Label className="text-xs font-medium uppercase text-muted-foreground">
											Empresa
										</Label>
										<div className="relative">
											<Building2 className="absolute left-3 top-3 size-4 text-muted-foreground" />
											<Input
												name="companyName"
												placeholder="Nome da empresa"
												className="pl-10 rounded-xl"
												defaultValue={state.inputs?.companyName}
												disabled={isPending}
											/>
										</div>
										{state.errors?.companyName && (
											<p className="text-[10px] text-destructive font-medium">
												{state.errors.companyName[0]}
											</p>
										)}
									</div>

									<div className="space-y-1">
										<Label className="text-xs font-medium uppercase text-muted-foreground">
											Seu Nome
										</Label>
										<div className="relative">
											<User className="absolute left-3 top-3 size-4 text-muted-foreground" />
											<Input
												name="ownerName"
												placeholder="Seu nome"
												className="pl-10 rounded-xl"
												defaultValue={state.inputs?.ownerName}
												disabled={isPending}
											/>
										</div>
										{state.errors?.ownerName && (
											<p className="text-[10px] text-destructive font-medium">
												{state.errors.ownerName[0]}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-1">
									<Label className="text-xs font-medium uppercase text-muted-foreground">
										E-mail Corporativo
									</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
										<Input
											name="email"
											type="email"
											placeholder="email@empresa.com"
											className="pl-10 rounded-xl"
											defaultValue={state.inputs?.email}
											disabled={isPending}
										/>
									</div>
									{state.errors?.email && (
										<p className="text-[10px] text-destructive font-medium">
											{state.errors.email[0]}
										</p>
									)}
								</div>

								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div className="space-y-1">
										<Label className="text-xs font-medium uppercase text-muted-foreground">
											Senha
										</Label>
										<div className="relative">
											<Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
											<Input
												name="password"
												type={showPassword ? 'text' : 'password'}
												placeholder="••••••"
												className="pl-10 pr-10 rounded-xl"
												defaultValue={state.inputs?.password}
												disabled={isPending}
											/>
											<button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
											>
												{showPassword ? (
													<EyeOff size={16} />
												) : (
													<Eye size={16} />
												)}
											</button>
										</div>
										{state.errors?.password && (
											<p className="text-[10px] text-destructive font-medium">
												{state.errors.password[0]}
											</p>
										)}
									</div>

									<div className="space-y-1">
										<Label className="text-xs font-medium uppercase text-muted-foreground">
											Confirmar
										</Label>
										<div className="relative">
											<Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
											<Input
												name="confirmPassword"
												type={showConfirmPassword ? 'text' : 'password'}
												placeholder="••••••"
												className="pl-10 pr-10 rounded-xl"
												defaultValue={state.inputs?.confirmPassword}
												disabled={isPending}
											/>
											<button
												type="button"
												onClick={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
												className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
											>
												{showConfirmPassword ? (
													<EyeOff size={16} />
												) : (
													<Eye size={16} />
												)}
											</button>
										</div>
										{state.errors?.confirmPassword && (
											<p className="text-[10px] text-destructive font-medium">
												{state.errors.confirmPassword[0]}
											</p>
										)}
									</div>
								</div>

								{/* ... (Global error e botão de submit mantidos) ... */}
								{state.errors?.global && (
									<div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs text-center font-medium">
										{state.errors.global}
									</div>
								)}

								<Button
									type="submit"
									disabled={isPending}
									className="w-full rounded-full h-11 mt-4"
								>
									{isPending ? (
										<Loader2 className="size-4 animate-spin" />
									) : (
										'Finalizar Cadastro'
									)}
								</Button>

								<p className="text-center text-xs text-muted-foreground mt-4">
									Já tem conta?{' '}
									<Link href="/login" className="text-primary hover:underline">
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
