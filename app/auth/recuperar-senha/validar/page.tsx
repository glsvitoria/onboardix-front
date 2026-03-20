import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FormValidateCode } from './form'

interface ValidatePageProps {
	searchParams: Promise<{ email?: string }>
}

export default async function ValidateCodePage({
	searchParams,
}: ValidatePageProps) {
	const { email } = await searchParams

	return (
		<div className="rounded-3xl border border-border/40 bg-card/50 p-8 backdrop-blur-xl shadow-2xl">
			<div className="mb-6">
				<Link
					href="/auth/recuperar-senha"
					className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
				>
					<ArrowLeft className="mr-1 size-3" />
					Alterar e-mail
				</Link>
				<h1 className="mt-4 text-xl font-bold tracking-tight">
					Verifique seu e-mail
				</h1>
				<p className="text-sm text-muted-foreground">
					Enviamos um código de 6 dígitos para{' '}
					<span className="font-medium text-foreground">{email}</span>
				</p>
			</div>

			<FormValidateCode email={email} />
		</div>
	)
}
