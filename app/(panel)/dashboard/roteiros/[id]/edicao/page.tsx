import { notFound } from 'next/navigation'
import { EditTemplateForm } from '../../components/edit-template-form'
import { BackButton } from '@/components/back-button'
import { showTemplatesService } from '@/services/templates/show'
import { ServiceError } from '@/types/service-error'
import { ErrorState } from '@/components/error-state'

async function getEditTemplateData(id: string) {
	const template = await showTemplatesService({
		params: {
			templateId: id,
		},
	}).catch((err: ServiceError) => {
		if (err.status === 404) notFound()

		return {
			message: err.message,
		}
	})

	return { template }
}

export default async function EditTemplatePage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	const { template } = await getEditTemplateData(id)

	if ('message' in template) {
		return (
			<ErrorState to={`/dashboard/roteiros/${id}/edicao`}>
				{template.message}
			</ErrorState>
		)
	}

	return (
		<>
			<BackButton to={`/dashboard/roteiros/${id}`}>
				Voltar para Roteiro
			</BackButton>

			<header className="mb-8">
				<h1 className="text-3xl font-bold text-white">Editar Roteiro</h1>
				<p className="text-zinc-500 text-sm">
					Atualize as informações e etapas deste roteiro.
				</p>
			</header>

			<EditTemplateForm id={id} initialData={template} />
		</>
	)
}
