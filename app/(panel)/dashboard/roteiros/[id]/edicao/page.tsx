import { notFound } from 'next/navigation'
import { EditTemplateForm } from '../../components/edit-template-form'
import { BackButton } from '@/components/back-button'
import { showTemplatesService } from '@/services/templates/show'

export default async function EditTemplatePage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	const template = await showTemplatesService({
		params: {
			templateId: id,
		},
	})

	if (!template) {
		notFound()
	}

	return (
		<div className="p-8 max-w-5xl mx-auto">
			<BackButton to={`/dashboard/roteiros/${id}`}>Voltar para Roteiro</BackButton>

			<header className="mb-8">
				<h1 className="text-3xl font-bold text-white">Editar Roteiro</h1>
				<p className="text-zinc-500 text-sm">
					Atualize as informações e etapas deste roteiro.
				</p>
			</header>

			<EditTemplateForm id={id} initialData={template} />
		</div>
	)
}
