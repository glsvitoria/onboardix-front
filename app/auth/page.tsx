import Link from 'next/link'
import { FormLogin } from './form'

export default function LoginPage() {
	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
			</div>

			<div className="relative z-10 w-full max-w-[400px]">
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

					<FormLogin />
				</div>
			</div>
		</main>
	)
}
