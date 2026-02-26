import Link from 'next/link'
import { FormNewTemplate } from './form'

export default function NewTemplatePage() {
	return (
		<div className="p-8 max-w-3xl mx-auto">
			<div className="mb-8">
				<Link
					href="/dashboard/templates"
					className="text-sm text-zinc-500 hover:text-primary transition-colors"
				>
					← Voltar para listagem
				</Link>
				<h1 className="text-3xl font-bold text-white mt-2">Novo Roteiro</h1>
				<p className="text-zinc-500">
					Defina o título e as etapas desta trilha de onboarding.
				</p>
			</div>

			<FormNewTemplate />
		</div>
	)
}
