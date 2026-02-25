import { fetchAdapter as api } from '@/lib/api/fetch-adapter'
import { notFound } from 'next/navigation'
import { EditTemplateForm } from '../../components/edit-template-form'

export default async function EditTemplatePage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	// Busca o template atual para preencher o formulário
	const template = await api.get<any>(`/templates/${id}`).catch(() => null)

	if (!template) {
		notFound()
	}

	return (
		<div className="p-8 max-w-3xl mx-auto">
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
