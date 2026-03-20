import { FormResetPassword } from "./form"

interface ResetPageProps {
	searchParams: Promise<{ token?: string }>
}

export default async function ResetPasswordPage({
	searchParams,
}: ResetPageProps) {
	const { token } = await searchParams

	return (
		<div className="rounded-3xl border border-border/40 bg-card/50 p-8 backdrop-blur-xl shadow-2xl">
			<div className="mb-8">
				<h1 className="text-xl font-bold tracking-tight">Nova senha</h1>
				<p className="text-sm text-muted-foreground">
					Crie uma senha forte para proteger sua conta.
				</p>
			</div>

			<FormResetPassword token={token} />
		</div>
	)
}
