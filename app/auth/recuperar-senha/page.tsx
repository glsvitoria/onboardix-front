import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FormForgotPassword } from './form'

export default function ForgotPasswordPage() {
	return (
		<div className="rounded-3xl border border-border/40 bg-card/50 p-8 backdrop-blur-xl shadow-2xl">
			<div className="mb-8">
				<Link
					href="/login"
					className="mb-4 inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
				>
					<ArrowLeft className="mr-1 size-3" />
					Voltar para o login
				</Link>
				<h1 className="mt-2 text-xl font-bold tracking-tight">
					Recuperar senha
				</h1>
				<p className="text-sm text-muted-foreground">
					Digite seu e-mail para receber um código de verificação.
				</p>
			</div>

			<FormForgotPassword />
		</div>
	)
}
