import { FormNewTemplate } from './form'
import { BackButton } from '@/components/back-button'

export default function NewTemplatePage() {
	return (
		<>
			<div className="mb-8">
				<BackButton to="/dashboard/roteiros">Voltar para Roteiros</BackButton>

				<h1 className="text-3xl font-bold text-white mt-2">Novo Roteiro</h1>
				<p className="text-zinc-500">
					Defina o título e as etapas desta trilha de onboarding.
				</p>
			</div>

			<FormNewTemplate />
		</>
	)
}
