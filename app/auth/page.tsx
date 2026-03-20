import { FormLogin } from './form'

export default function LoginPage() {
	return (
		<div className="rounded-3xl border border-border/40 bg-card/50 p-8 backdrop-blur-xl shadow-2xl">
			<div className="mb-8">
				<h1 className="text-xl font-bold tracking-tight">Bem-vindo de volta</h1>
				<p className="text-sm text-muted-foreground">
					Acesse sua conta para gerenciar seus colaboradores.
				</p>
			</div>

			<FormLogin />
		</div>
	)
}
